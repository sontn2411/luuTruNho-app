export type SettingsTabId =
  | "general"
  | "rooms"
  | "booking"
  | "notifications"
  | "security"
  | "database";

export interface SettingsTabItem {
  id: SettingsTabId;
  label: string;
  description: string;
  iconName: string;
}
