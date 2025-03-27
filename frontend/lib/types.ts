export interface NFT {
  id: number;
  name: string;
  rarity: "common" | "rare" | "epic";
  level: number;
  image: string;
  price: number;
  owner: string;
  description?: string;
  evolutionStage?: number;
  rarityPercentage?: number;
  listingTime?: string;
  transactionHistory?: {
    time: string;
    price: number;
    from: string;
    to: string;
  }[];
}

export type SortOption = "price-asc" | "price-desc" | "time-asc" | "time-desc";
export type FilterOption = "all" | "common" | "rare" | "epic";