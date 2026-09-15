// MOCK DATA — replace with real API responses

export type FixedAsset = {
  id: string;
  code: string;
  name: string;
  category: string;
  /** ISO date string */
  acquisitionDate: string;
  currentValueGbp: number;
};

export const fixedAssets: FixedAsset[] = [
  {
    id: "fa-001",
    code: "12145",
    name: "MacBook Air M2",
    category: "TANGIBLE - Other tangible fixed assets",
    acquisitionDate: "2024-01-04",
    currentValueGbp: 507.0,
  },
];

export const fixedAssetOptions = fixedAssets.map((asset) => ({
  text: `${asset.code} - ${asset.name}`,
  value: asset.id,
}));
