import {
  FerrisWheel,
  Landmark,
  Palette,
  Route,
  ShoppingBag,
  Telescope,
  TreePine,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type CategoryId =
  | "monuments"
  | "musees"
  | "attractions"
  | "shopping"
  | "gastronomie"
  | "nature"
  | "panoramas"
  | "transport";

export type Category = {
  id: CategoryId;
  label: string;
  Icon: LucideIcon;
  color: string;
  colorSoft: string;
};

export const categories: Category[] = [
  {
    id: "monuments",
    label: "Monuments & institutions",
    Icon: Landmark,
    color: "#2c5f9e",
    colorSoft: "#dde8f4",
  },
  {
    id: "musees",
    label: "Musées",
    Icon: Palette,
    color: "#7b5ea7",
    colorSoft: "#eae3f3",
  },
  {
    id: "attractions",
    label: "Attractions",
    Icon: FerrisWheel,
    color: "#c94f4f",
    colorSoft: "#f7e0dd",
  },
  {
    id: "shopping",
    label: "Shopping",
    Icon: ShoppingBag,
    color: "#b3527d",
    colorSoft: "#f4e0ea",
  },
  {
    id: "gastronomie",
    label: "Gastronomie",
    Icon: UtensilsCrossed,
    color: "#c97b2d",
    colorSoft: "#f7e9d7",
  },
  {
    id: "nature",
    label: "Parcs & nature",
    Icon: TreePine,
    color: "#4e8a4f",
    colorSoft: "#e0eedd",
  },
  {
    id: "panoramas",
    label: "Points de vue",
    Icon: Telescope,
    color: "#3b8a8c",
    colorSoft: "#dceeee",
  },
  {
    id: "transport",
    label: "Transports & accès",
    Icon: Route,
    color: "#5a6b7d",
    colorSoft: "#e3e8ed",
  },
];

const categoryIndex = new Map(categories.map((category) => [category.id, category]));

export function getCategory(id: CategoryId): Category {
  const category = categoryIndex.get(id);
  if (!category) {
    throw new Error(`Catégorie inconnue : ${id}`);
  }
  return category;
}
