export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
export const wrapIndex = (index: number, length: number) => ((index % length) + length) % length;
