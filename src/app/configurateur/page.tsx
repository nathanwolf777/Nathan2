import type { Metadata } from "next";
import Configurator from "@/components/Configurator";
import { FrameType } from "@/data/product";

export const metadata: Metadata = {
  title: "Configurateur",
  description:
    "Personnalisez votre cadre souvenir : temps, nom, pays et vos classements. Prévisualisation en temps réel. À partir de 21,99 € — livraison offerte en point relais, en France.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const valid: FrameType[] = ["solo", "duo", "duo-solo", "hexa"];
  const initialType: FrameType = valid.includes(
    searchParams.type as FrameType
  )
    ? (searchParams.type as FrameType)
    : "hexa";
  return <Configurator initialType={initialType} />;
}
