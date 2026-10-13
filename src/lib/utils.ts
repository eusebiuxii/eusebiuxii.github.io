import { clsx, type ClassValue } from "clsx"

/** Joins class names, skipping falsy values: cn(styles.btn, isActive && styles.active) */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
