export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateString(value: unknown, name: string, maxLen = 500): string | null {
  if (typeof value !== "string" || value.trim().length === 0) return `${name} wajib diisi`;
  if (value.length > maxLen) return `${name} maksimal ${maxLen} karakter`;
  return null;
}

export function validateNumber(value: unknown, name: string, min = 0, max = 99999): string | null {
  const num = Number(value);
  if (isNaN(num)) return `${name} harus berupa angka`;
  if (num < min || num > max) return `${name} harus antara ${min}–${max}`;
  return null;
}
