export const site = {
  name: "ATIN Healthcare",
  legalName: "ATIN Healthcare Pvt Ltd",
  short: "ATIN",
  tagline: "PCD Pharma Franchise, engineered for trust",
  description:
    "ATIN Healthcare Pvt Ltd is a WHO-GMP certified PCD pharma franchise company offering 500+ formulations across cardiac-diabetic, gynae, derma, ortho, paediatric and nutraceutical divisions — with genuine monopoly rights across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210",
  email: "info@atinhealthcare.com",
  address: {
    line1: "Plot No. 214, Industrial Area Phase-II",
    line2: "Baddi, Solan",
    city: "Himachal Pradesh 173205",
    country: "India",
  },
  socials: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Divisions", href: "/divisions" },
  { label: "Products", href: "/products" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Contact", href: "/contact" },
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];
