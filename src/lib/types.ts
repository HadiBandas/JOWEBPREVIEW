export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    currency: string;
    category: string;
    subCategory: string;
    image: string;
    hoverImage: string;
    description: string;
    material: string;
    care: string[];
    features: string[];
    sustainability: string[];
    sizes: string[];
    colors: string[];
}

export interface Testimonial {
    quote: string;
    author: string;
    location: string;
    product?: string;
}

export interface BrandValue {
    title: string;
    description: string;
    icon: string;
}

export interface SustainabilityStat {
    number: string;
    label: string;
}
