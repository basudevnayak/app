export interface Item {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemListResponse {
  items: Item[];
  total: number;
  page: number;
  limit: number;
} 