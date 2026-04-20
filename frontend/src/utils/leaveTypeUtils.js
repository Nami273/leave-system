import { Umbrella, Thermometer, Users, Plane, Smile, HeartHandshake, PartyPopper, MoreHorizontal } from "lucide-react"

// Maps DB icon_name (lowercase) → Lucide component
export const ICON_MAP = {
  umbrella:    Umbrella,
  thermometer: Thermometer,
  user:        Users,
  plane:       Plane,
  smile:       Smile,
  heart:       HeartHandshake,
  party:       PartyPopper,
  more:        MoreHorizontal,
}

// Maps DB color_type (name) → hex background
export const COLOR_MAP = {
  blue:   "#a3dfff",
  pink:   "#ffafe3",
  orange: "#fac47f",
  green:  "#B1EFD8",
}

/**
 * Resolves the icon component and colors for a leave request/type.
 * Prefers DB fields (leave_type_icon, leave_type_color) over name-based fallbacks.
 *
 * @param {string} iconName  - value of leave_type_icon from API
 * @param {string} colorType - value of leave_type_color from API
 * @returns {{ Icon, color, bg }} — Icon: Lucide component; color: text/icon color hex; bg: background hex
 */
export function resolveLeaveTypeStyle(iconName, colorType) {
  const Icon = ICON_MAP[iconName] || Umbrella

  // Derive a dark foreground color from the background name
  const fgMap = {
    blue:   "#006dae",
    pink:   "#8c2d68",
    orange: "#b86814",
    green:  "#0a5c3e",
  }
  const bg    = COLOR_MAP[colorType] || "#e2e8f0"
  const color = fgMap[colorType]    || "#475569"

  return { Icon, color, bg }
}
