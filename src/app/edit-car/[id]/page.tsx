import { getCarById } from "@/app/_actions/carActions";
import EditCarForm from "@/components/EditCarForm";
import { notFound } from "next/navigation";

export default async function EditCarPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const { success, data: car } = await getCarById(id);

  if (!success || !car) {
    notFound();
  }

  return <EditCarForm initialData={car} />;
}