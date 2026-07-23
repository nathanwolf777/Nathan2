export type FrameType = "solo" | "duo" | "duo-solo";

export interface FrameConfig {
  type: FrameType;
  time: string;
  firstName: string;
  lastName: string;
  p1FirstName: string;
  p1LastName: string;
  p2FirstName: string;
  p2LastName: string;
  rankingOverall: string; // #OV — classement général
  rankingAge: string; // #AG — classement catégorie d'âge
  showRanking: boolean; // afficher ou non les classements #OV / #AG
  shipping: ShippingMethod; // mode de livraison choisi
}

// Modes de livraison. Le point relais est offert, le domicile est majoré.
export type ShippingMethod = "relay" | "home";

export const SHIPPING_HOME_SURCHARGE = 2;

export function shippingCost(method: ShippingMethod): number {
  return method === "home" ? SHIPPING_HOME_SURCHARGE : 0;
}

export function shippingLabel(method: ShippingMethod): string {
  return method === "home"
    ? "Livraison à domicile"
    : "Livraison en point relais";
}

// Prix total = cadre + livraison.
export function totalFor(type: FrameType, method: ShippingMethod): number {
  return priceFor(type) + shippingCost(method);
}

// Pays figé : France uniquement pour l'instant.
export const COUNTRY_CODE = "FR";
export const COUNTRY_LABEL = "FRA";

export const PRICE_SOLO = 34.99;
export const PRICE_DUO = 39.99;
export const PRICE_DUO_SOLO = 34.99;

// Prix selon le modèle. Le Duo et le Duo (1 patch) sont au même prix.
export function priceFor(type: FrameType): number {
  if (type === "duo") return PRICE_DUO;
  if (type === "duo-solo") return PRICE_DUO_SOLO;
  return PRICE_SOLO;
}

// Libellé lisible du modèle.
export function labelFor(type: FrameType): string {
  if (type === "duo") return "Duo";
  if (type === "duo-solo") return "Duo (1 patch)";
  return "Solo";
}

// Est-ce un modèle à deux athlètes ?
export function isDuoType(type: FrameType): boolean {
  return type === "duo" || type === "duo-solo";
}

// Nombre d'emplacements velcro (patchs) selon le modèle.
export function patchCount(type: FrameType): number {
  return type === "duo" ? 2 : 1;
}

// Rétro-compatibilité (ancien nom encore importé ailleurs).
export const PRICE_EUR = PRICE_SOLO;

// Dimensions physiques du cadre.
export const FRAME_DIMENSIONS = "27 × 21 × 1,4 cm";

export const defaultConfig: FrameConfig = {
  type: "solo",
  time: "01:11:45",
  firstName: "Alexandre",
  lastName: "Dubois",
  p1FirstName: "Alexandre",
  p1LastName: "Dubois",
  p2FirstName: "Jeremy",
  p2LastName: "Ferrand",
  rankingOverall: "57",
  rankingAge: "128",
  showRanking: true,
  shipping: "relay",
};

export function flagEmoji(code: string): string {
  if (!code || code.length !== 2) return "🏳️";
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}
