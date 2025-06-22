export interface Product {
  _id?: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  discount: Number;
  images: string[];
  categoryId: string;
  isFeatured: boolean;
  isNewProduct: boolean;
}
