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
  has_offer: number;
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
  name: string;
  unit: string;
  formatted_name: string;
  formatted_unit: string;
  min_quantity?: string;
  max_quantity?: string;

  price: number;
  has_grind: 0 | 1;
  grind_price: number;
  status: 0 | 1;
  is_customizable?: 0 | 1;
  ingredients?: TIngredient[];
  spice_levels?: TSpiceLevel[];
};
export type TIngredient = {
  id: number;
  raw_material_id: number;
  raw_material_name: string;
  quantity: string;
  unit: string;
  price: number;
  editable: 0 | 1;
  raw_materials: {
    id: number;
    name: string;
    unit: string;
    formatted_name: string;
    formatted_unit: string;
    price: number;
    quantity_in_grams: number;
    price_per_gms: number;
  }[];
};
export type TSpiceLevel = {
  id: number;
  level: number;
  quantity_in_gm: string;
  price: number;
};
export type TProduct = {
  product_type: number;
  max_quantity: number;
  category_slug?: string;

  id: number;
  colour?: string;
  has_offer: number;
  name: string;
  slug: string;
  description?: string;
  product_information?: string;
  images?: string[];
  status?: number;
  thumbnail_image: string;
  category_name: string;
  variants: TVariant[];
};
export type TShopInner = {
  product_details: TProduct;
  popular_products: TProduct[];
};

export type TMeta = {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  name: string;
};
