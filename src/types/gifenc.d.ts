declare module "gifenc" {
  export interface QuantizeOptions {
    format?: string;
    [key: string]: unknown;
  }
  export interface WriteFrameOptions {
    palette?: number[][];
    delay?: number;
    [key: string]: unknown;
  }
  export function quantize(
    rgba: Uint8ClampedArray | number[],
    colors: number,
    options?: QuantizeOptions
  ): number[][];
  export function applyPalette(
    rgba: Uint8ClampedArray | number[],
    palette: number[][],
    format?: string
  ): Uint8Array;
  export function GIFEncoder(): {
    writeFrame(
      index: Uint8Array,
      width: number,
      height: number,
      options?: WriteFrameOptions
    ): void;
    finish(): void;
    bytes(): Uint8Array;
  };
}
