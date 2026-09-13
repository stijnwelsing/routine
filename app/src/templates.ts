import type { Item, ItemTemplate } from "./types";
import { ITEM_TEMPLATES } from "./types";

function labelKey(label: string): string {
  return label.trim().toLowerCase().normalize("NFC");
}

export function isItemTemplate(value: string | null | undefined): value is ItemTemplate {
  return Boolean(value && (ITEM_TEMPLATES as readonly string[]).includes(value));
}

/** Lock tags. Label match only; never invent a tag for other items. */
export function lockedTemplate(label: string): ItemTemplate | null {
  const key = labelKey(label);
  if (key === "cafeïne 90 min na opstaan") return "public-framework";
  if (key === "wandelen na eten") return "evidence-informed";
  if (key === "low carb") return "user preference";
  if (key === "scherm uit 22:00") return "user preference";
  return null;
}

/** Fill lock tags on leftover rows. Keep an already-valid template on other items. */
export function defaultTemplate(item: Pick<Item, "template" | "label">): ItemTemplate | null {
  return lockedTemplate(item.label) ?? (isItemTemplate(item.template) ? item.template : null);
}

export function hasTemplate(item: Pick<Item, "template" | "label">): boolean {
  return defaultTemplate(item) !== null;
}
