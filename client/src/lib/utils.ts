import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Minecraft username validation (3-16 characters)
export function isValidMinecraftUsername(username: string): boolean {
  return username.length >= 3 && username.length <= 16;
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Format date 
export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    return date;
  }
  
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

// Default error handler for fetch requests
export async function handleFetchErrors(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText
    }));
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
}
