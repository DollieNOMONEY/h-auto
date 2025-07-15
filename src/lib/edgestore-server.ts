import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStoreClient } from '@edgestore/server/core';

const es = initEdgeStore.create();

export const edgeStoreRouter = es.router({
  carImages: es.imageBucket(),
});

export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});

export type EdgeStoreRouter = typeof edgeStoreRouter;