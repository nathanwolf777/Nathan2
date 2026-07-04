import type { Metadata } from "next";
import Configurator from "@/components/Configurator";
import { FrameType } from "@/data/product";

export const metadata: Metadata = {
  title: "Configurateur",
  description:
    "Personnalisez votre cadre souvenir HYROX : temps, nom, ville, année et vos classements. Prévisualisation en temps réel. 29,99 € — livraison gratuite.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const initialType: FrameType = searchParams.type === "duo" ? "duo" : "solo";
  return <Configurator initialType={initialType} />;
}
