import {
  Armchair,
  Sofa,
  Sparkles,
  Droplets,
  ShieldCheck,
  SunDim,
  Shield,
  Car,
  Crown,
  Flame,
  Wrench,
} from "lucide-react";

export const iconMap = {
  Armchair,
  Sofa,
  Sparkles,
  Droplets,
  ShieldCheck,
  SunDim,
  Shield,
  Car,
  Crown,
  Flame,
};

export function ServiceIcon({ name, className }) {
  const Icon = iconMap[name] || Wrench;
  return <Icon className={className} />;
}
