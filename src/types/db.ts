export type Division = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  icon: string | null;
  accent: string | null;
  image_url: string | null;
  product_count_label: string | null;
  sort_order: number;
  is_active: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  division_id: string | null;
  composition: string | null;
  form: string | null;
  packing: string | null;
  category: string | null;
  description: string | null;
  indications: string[] | null;
  mrp: number | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  divisions?: Pick<Division, "slug" | "name" | "accent"> | null;
};

export type EnquiryKind = "franchise" | "contact" | "product";
export type EnquiryStatus = "new" | "contacted" | "qualified" | "closed" | "spam";

export type Enquiry = {
  id: string;
  kind: EnquiryKind;
  full_name: string;
  email: string | null;
  phone: string;
  city: string | null;
  state: string | null;
  company: string | null;
  division: string | null;
  product_name: string | null;
  experience: string | null;
  message: string | null;
  status: EnquiryStatus;
  source_path: string | null;
  created_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  location: string | null;
  quote: string;
  rating: number;
  avatar_url: string | null;
  sort_order: number;
  is_active: boolean;
};


export type Certification = {
  id: string;
  name: string;
  description: string | null;
  badge_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export type Stat = {
  id: string;
  label: string;
  value: number;
  suffix: string | null;
  sort_order: number;
  is_active: boolean;
};
