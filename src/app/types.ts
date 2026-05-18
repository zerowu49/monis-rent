export interface Product {
  id: string;
  name: string;
  category: 'desk' | 'chair' | 'accessory';
  price: number;
  description: string;
  icon: string;
  color: string;
}

export interface SelectedItems {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}
