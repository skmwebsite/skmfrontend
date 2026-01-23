//home page

export type THome = {
  categories: TCategories[];
  popular_products: TProduct[];
};

export type TShop = {
  id: number;
  name: string;
  slug: string;
  colour: string;
  products: TProduct[];
};

export type TCategories = {
  id: number;
  uuid: string;
  name: string;
  colour: string;
  image: string;
  slug: string;
  products_count: number;
  type: number;
};

export type TMenu = {
  category: string;
  image: string;
  products: TProduct[];
};
export type TPromoCode = {
  id: number;
  uuid: string;
  code: string;
  discount_type: 1 | 2;
  discount_value: string;
  from_date: string;
  to_date: string;
  status: 0 | 1;
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
export type TVariant = {
  id: number;
  uuid: string;
  name: string;
  unit: string;
  min_quantity: string;
  max_quantity: string;
  price: number;
  has_grind: 0 | 1;
  grind_quantity: string;
  grind_price: number;
  status: 0 | 1;
  ingredients: TIngredient[];
  spice_levels: TSpiceLevel[];
  is_primary: boolean;
};
export type TIngredient = {
  id: number;
  uuid: string;
  raw_material_name: string;
  quantity: string;
  unit: "gm" | "kg";
  price: number;
  quantity_in_gm: number;
  raw_materials: {
    id: number;
    uuid: string;
    name: string;
    unit: string;
    price: number;
    quantity_in_grams: number;
    price_per_gms: number;
    is_primary: boolean;
  }[];
};
export type TSpiceLevel = {
  id: number;
  uuid: string;
  level: number;
  quantity: string;
  price: number;
  is_default: 0 | 1;
  quantity_in_gm: string;
};
export type TProduct = {
  product_type: number;
  max_quantity: number;
  category_slug: string;
  id: number;
  colour: string;
  has_offer: number;
  uuid: string;
  name: string;
  slug: string;
  category_id: number;
  description: string;
  product_info: string;
  images: string[];
  tags: number;
  price: number;
  quantity: string;
  unit: string;
  thumbnail_image: string;
  category_name: string;
  variants: TVariant[];
};
export type TShopInner = {
  product_details: TProduct;
  popular_products: TProduct[];
};
