export const METAL_HEX: Record<'yellow' | 'white' | 'rose', string> = {
  yellow: '#D9B45B',
  white: '#C7CBCC',
  rose: '#D19E92',
};

export interface MetalItem {
  id: string;
  name: string;
  hex: string;
  locked?: boolean;
}

export const METAL_LIST: MetalItem[] = [
  { id: 'yellow', name: 'Yellow gold', hex: METAL_HEX.yellow },
  { id: 'white', name: 'White gold', hex: METAL_HEX.white },
  { id: 'rose', name: 'Rose gold', hex: METAL_HEX.rose },
];