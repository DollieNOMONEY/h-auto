import { getCarById } from "@/app/_actions/carActions";
import CarDetailClient from "@/components/CarDetailClient";
import { notFound } from "next/navigation";

interface CarDetailPageProps {
  params: { carmake: string; id: string };
}

export default async function CarPage(props: CarDetailPageProps) {
  const { id } = props.params;

  const { success, data: car } = await getCarById(id);

  if (!success || !car) {
    notFound();
  }

  return <CarDetailClient car={car} />;
}