export type ProductCategory = 'refurbished' | 'new' | 'legacy';

export interface ProductItem {
  id: string;
  name: string;
  fullName: string;
  category: ProductCategory;
  subCategory?: string;
  description: string;
  applications: string[];
  specs: {
    label: string;
    value: string;
  }[];
  tareWeight?: string;
  material: string;
  closureType?: string;
  surfaceFinish?: string;
  isBestosia?: boolean;
  highlightBadge?: string;
  exportReady?: boolean;
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  category: ProductCategory | 'all';
  productId: string;
  quantity: string;
  message: string;
  deliveryLocation?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  imageAlt?: string;
  category: string;
  tags?: string;
  author: string;
  authorEmail?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type PageView = 
  | 'home'
  | 'products'
  | 'new-packaging'
  | 'facility'
  | 'about'
  | 'legacy-services'
  | 'blog'
  | 'blog-detail'
  | 'admin'
  | 'contact'
  | 'product-detail';


