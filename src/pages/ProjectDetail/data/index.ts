import {
  Wind,
  Lightning as Zap,
  Drop as Droplets,
  GridFour as Grid,
  House as HomeIcon,
  PaintBrush as PaintBucket,
  Factory,
} from "phosphor-react";

// Service type mapping to icons
export const SERVICE_ICONS = {
  hvac: Wind,
  electricity: Zap,
  plumbing: Droplets,
  flooring: Grid,
  roofing: HomeIcon,
  painting: PaintBucket,
  manufacturer: Factory,
} as Record<string, React.ComponentType<{ className?: string; size?: number }>>;
