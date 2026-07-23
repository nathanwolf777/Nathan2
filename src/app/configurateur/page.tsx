import type { Metadata } from "next";
import Configurator from "@/components/Configurator";
import { FrameType } from "@/data/product";

export const metadata: Metadata = {
  title: "Configurateur",
  description:
    "Personnalisez votre cadre souvenir : temps, nom, pays et vos classements. Prévisualisation en temps réel. À partir de 39,99 € — livraison offerte en point relais, en France.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const initialType: FrameType = searchParams.type === "duo" ? "duo" : "solo";
  return <Configurator initialType={initialType} />;
}
