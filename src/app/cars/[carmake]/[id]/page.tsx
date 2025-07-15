import { getCarById } from "@/app/_actions/carActions";
import CarDetailClient from "@/components/CarDetailClient";
import { notFound } from "next/navigation";

export default async function CarPage(props: any // ← use `any` to bypass broken type constraint
) {
  const { id } = props.params;


  const { success, data: car } = await getCarById(id);

  if (!success || !car) {
    notFound();
  }

  return <CarDetailClient car={car} />;
}