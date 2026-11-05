// Utility: cn helper combines clsx and tailwind-merge
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Reviewed: academic catalog & interface consistency check (v2.0.146)
