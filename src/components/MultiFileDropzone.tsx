'use client';

import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  TrashIcon,
  XCircleIcon,
  Bars4Icon,
} from '@heroicons/react/24/solid';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const variants = {
  base: 'relative rounded-md p-4 w-full flex justify-center items-center flex-col cursor-pointer border-2 border-dashed border-gray-400 hover:border-gray-500 transition-colors duration-200 ease-in-out',
  image:
    'border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-100 rounded-md',
  active: 'border-2',
  disabled: 'bg-gray-200 border-gray-300 cursor-default pointer-events-none',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

export type FileState = {
  file?: File;
  key: string;
  progress: 'PENDING' | 'COMPLETE' | 'ERROR' | number;
  url?: string;
};


type InputProps = {
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

function SortableFileItem({
  fileState,
  onRemove,
}: {
  fileState: FileState;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fileState.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-16 w-full flex-row items-center justify-between rounded-md bg-slate-800 p-2 mt-2"
    >
      <div className="flex flex-row items-center gap-2">
        {/* Drag Handle */}
        <div {...attributes} {...listeners} className="cursor-grab p-1">
          <Bars4Icon className="h-5 w-5 text-gray-400" />
        </div>
        {/* Image Preview */}
        <div className="h-12 w-12">
          <img
            className="h-full w-full rounded-md object-cover"
            src={fileState.url ?? URL.createObjectURL(fileState.file!)}
            alt={fileState.file?.name ?? 'existing image'}
          />
        </div>
        {/* File Name & Size */}
        <div className="flex flex-col text-sm">
          <p className="text-white">
            {fileState.file?.name ?? 'Existing Image'}
          </p>
          {fileState.file && (
             <p className="text-gray-400">
                {formatFileSize(fileState.file.size)}
             </p>
          )}
        </div>
      </div>

      {/* CORRECTED: Icons section */}
      <div className="flex items-center gap-3">
        {/* Status Icon Area */}
        <div className="w-6 h-6">
          {fileState.progress === 'COMPLETE' && <CheckCircleIcon className="h-6 w-6 text-green-500" />}
          {fileState.progress === 'ERROR' && <XCircleIcon className="h-6 w-6 text-red-500" />}
          {typeof fileState.progress === 'number' && (
            <div className="relative h-6 w-6">
              <div className="h-full w-full rounded-full border-2 border-gray-400"></div>
              <div
                className="absolute inset-0 rounded-full border-2 border-white"
                style={{ clipPath: `inset(0 ${100 - fileState.progress}% 0 0)` }}
              />
            </div>
          )}
        </div>
        {/* Delete Button - always visible */}
        <button
          type="button"
          className="cursor-pointer p-1 transition-colors hover:text-red-500"
          onClick={onRemove}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

const MultiFileDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, value, className, disabled, onChange, onFilesAdded },
    ref,
  ) => {
    const [customError, _setCustomError] = React.useState<string>();
    if (dropzoneOptions?.maxFiles && value?.length) {
      disabled = disabled ?? value.length >= dropzoneOptions.maxFiles;
    }
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      onDrop: (acceptedFiles) => {
        const addedFiles = acceptedFiles.map<FileState>((file) => ({
          file,
          key: Math.random().toString(36).slice(2),
          progress: 'PENDING',
        }));
        void onFilesAdded?.(addedFiles);
        void onChange?.([...(value ?? []), ...addedFiles]);
      },
      ...dropzoneOptions,
    });

    // dnd-kit sensors and drag end handler
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    );

    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (over && active.id !== over.id && value) {
        const oldIndex = value.findIndex((item) => item.key === active.id);
        const newIndex = value.findIndex((item) => item.key === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          const reorderedFiles = arrayMove(value, oldIndex, newIndex);
          onChange?.(reorderedFiles);
        }
      }
    }

    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );

    const errorMessage = React.useMemo(() => {
        if (fileRejections[0]) {
            const { errors } = fileRejections[0];
            if (errors[0]?.code === 'file-too-large') {
                return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
            } else if (errors[0]?.code === 'file-invalid-type') {
                return ERROR_MESSAGES.fileInvalidType();
            } else if (errors[0]?.code === 'too-many-files') {
                return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
            } else {
                return ERROR_MESSAGES.fileNotSupported();
            }
        }
        return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div>
        <div
          {...getRootProps({
            className: dropZoneClassName,
          })}
        >
          <input ref={ref} {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-xs text-gray-400">
            <CloudArrowUpIcon className="h-10 w-10" />
            <div className="text-gray-400">drag & drop or click to upload</div>
          </div>
        </div>

        <div className="mt-1 text-xs text-red-500">
          {customError ?? errorMessage}
        </div>

        {/* wrap the file list with DndContext and SortableContext */}
        {value && value.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={value.map((item) => item.key)}
              strategy={verticalListSortingStrategy}
            >
              {value.map((fileState, i) => (
                <SortableFileItem
                  key={fileState.key}
                  fileState={fileState}
                  onRemove={() => {
                    void onChange?.(value.filter((_, index) => index !== i));
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    );
  },
);
MultiFileDropzone.displayName = 'MultiFileDropzone';

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return '0 Bytes';
  }
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

export { MultiFileDropzone };