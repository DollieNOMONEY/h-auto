import { getCarById } from "@/app/_actions/carActions";
import CarDetailClient from "@/components/CarDetailClient";
import { notFound } from "next/navigation";

export default async function CarPage(props: {
  params: { carmake: string; id: string };
}) {
  const { id } = await props.params;

  const { success, data: car } = await getCarById(id);

  if (!success || !car) {
    notFound();
  }

  return <CarDetailClient car={car} />;
}