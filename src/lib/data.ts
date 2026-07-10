import { Product } from "./types";

export const products: Product[] = [
    {
        id: "1",
        name: "The Minimalist Midi Dress",
        slug: "minimalist-midi-dress-ivory",
        price: 262000,
        currency: "IDR",
        category: "Dresses",
        subCategory: "TRD",
        image: "/images/products/1.jpg",
        hoverImage: "/images/products/1.jpg",
        description: "A timeless silhouette designed for the woman who values effortless elegance. Crafted from 100% European linen in our Bandung workshop.",
        material: "100% Pure European Linen (200 GSM)",
        care: ["Machine wash cold, gentle cycle", "Air dry recommended", "Iron while slightly damp on medium heat"],
        features: ["Hidden side pockets", "Relaxed fit", "Pre-washed for softness", "Midi length"],
        sustainability: ["Made locally in Bandung", "Zero-waste pattern cutting", "Biodegradable fabric"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Ivory", "Oatmeal", "Black"]
    },
    {
        id: "2",
        name: "Relaxed Wide Leg Trousers",
        slug: "relaxed-wide-leg-trousers-oatmeal",
        price: 198000,
        currency: "IDR",
        category: "Bottoms",
        subCategory: "KULOT",
        image: "/images/products/2.jpg",
        hoverImage: "/images/products/2.jpg",
        description: "Effortlessly chic trousers with a comfortable elastic waistband. Perfect for transitioning from work to weekend.",
        material: "100% Pure European Linen (180 GSM)",
        care: ["Machine wash cold", "Hang dry", "Low iron if needed"],
        features: ["Elastic waistband", "Wide leg silhouette", "Side pockets", "High rise"],
        sustainability: ["Locally produced", "Natural fiber", "Durable construction"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Oatmeal", "Navy", "Sage"]
    },
    {
        id: "3",
        name: "Oversized Breeze Blouse",
        slug: "oversized-breeze-blouse-sage",
        price: 168000,
        currency: "IDR",
        category: "Tops",
        subCategory: "BLW S/S",
        image: "/images/products/3.jpg",
        hoverImage: "/images/products/3.jpg",
        description: "Lightweight and breathable, this oversized blouse is perfect for layering or wearing solo on warm days.",
        material: "100% Pure European Linen (160 GSM)",
        care: ["Machine wash cold", "Air dry", "Embrace natural creases"],
        features: ["Oversized fit", "Drop shoulder", "Curved hem", "Collar detail"],
        sustainability: ["Handcrafted in Bandung", "Minimal waste production", "Long-lasting quality"],
        sizes: ["One Size"],
        colors: ["Sage Green", "White", "Dusty Blue"]
    },
    {
        id: "4",
        name: "Terracotta Wrap Dress",
        slug: "terracotta-wrap-dress",
        price: 285000,
        currency: "IDR",
        category: "Dresses",
        subCategory: "TRD",
        image: "/images/products/4.jpg",
        hoverImage: "/images/products/4.jpg",
        description: "A stunning wrap silhouette in rich terracotta. Flattering on every body type with adjustable waist tie.",
        material: "100% Pure European Linen (200 GSM)",
        care: ["Hand wash or gentle machine wash", "Air dry in shade", "Steam or iron on medium"],
        features: ["Wrap closure with tie", "3/4 sleeves", "V-neckline", "Midi length"],
        sustainability: ["Ethical production", "Durable for 5+ years", "Timeless design"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Terracotta", "Black", "Olive"]
    },
    {
        id: "5",
        name: "Classic Linen Shirt",
        slug: "classic-linen-shirt-white",
        price: 178000,
        currency: "IDR",
        category: "Tops",
        subCategory: "BLW L/S",
        image: "/images/products/5.jpg",
        hoverImage: "/images/products/5.jpg",
        description: "The essential white linen shirt. A wardrobe staple that pairs with everything from jeans to skirts.",
        material: "100% Pure European Linen (170 GSM)",
        care: ["Machine wash cold", "Tumble dry low or air dry", "Iron for crisp look"],
        features: ["Button front", "Classic collar", "Chest pocket", "Relaxed fit"],
        sustainability: ["Made in Bandung", "Premium quality for longevity", "Natural material"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Light Blue", "Cream"]
    },
    {
        id: "6",
        name: "Flowy Midi Skirt",
        slug: "flowy-midi-skirt-cream",
        price: 188000,
        currency: "IDR",
        category: "Bottoms",
        subCategory: "ROD",
        image: "/images/products/6.jpg",
        hoverImage: "/images/products/6.jpg",
        description: "Elegant movement with every step. This midi skirt features a comfortable elastic waist and beautiful drape.",
        material: "100% Pure European Linen (180 GSM)",
        care: ["Machine wash cold", "Air dry", "Light iron if desired"],
        features: ["Elastic waistband", "A-line silhouette", "Midi length", "Side pockets"],
        sustainability: ["Slow fashion piece", "Built to last", "Locally crafted"],
        sizes: ["S", "M", "L"],
        colors: ["Cream", "Sage", "Black"]
    },
    {
        id: "7",
        name: "Linen V-Neck Tunic",
        slug: "linen-v-neck-tunic",
        price: 210000,
        currency: "IDR",
        category: "Tops",
        subCategory: "BLW S/S",
        image: "/images/products/7.jpg",
        hoverImage: "/images/products/7.jpg",
        description: "A versatile tunic with a flattering V-neckline. Can be worn as a top or a mini dress.",
        material: "100% Pure European Linen",
        care: ["Machine wash cold", "Air dry", "Light iron if desired"],
        features: ["V-neckline", "Relaxed fit", "Side slits"],
        sustainability: ["Slow fashion piece", "Built to last", "Locally crafted"],
        sizes: ["S", "M", "L"],
        colors: ["Ivory", "Navy"]
    },
    {
        id: "8",
        name: "Everyday Linen Shorts",
        slug: "everyday-linen-shorts",
        price: 155000,
        currency: "IDR",
        category: "Bottoms",
        subCategory: "KULOT",
        image: "/images/products/8.jpg",
        hoverImage: "/images/products/8.jpg",
        description: "Your go-to shorts for warm days. Comfortable elastic waist and practical pockets.",
        material: "100% Pure European Linen",
        care: ["Machine wash cold", "Air dry", "Light iron if desired"],
        features: ["Elastic waistband", "Drawstring", "Side pockets"],
        sustainability: ["Slow fashion piece", "Built to last", "Locally crafted"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Oatmeal", "Black", "Olive"]
    },
    {
        id: "9",
        name: "Linen Wrap Skirt",
        slug: "linen-wrap-skirt",
        price: 195000,
        currency: "IDR",
        category: "Bottoms",
        subCategory: "ROD",
        image: "/images/products/9.jpg",
        hoverImage: "/images/products/9.jpg",
        description: "A beautiful wrap skirt that adjusts perfectly to your waist. Elegant and comfortable.",
        material: "100% Pure European Linen",
        care: ["Machine wash cold", "Air dry", "Light iron if desired"],
        features: ["Wrap closure", "Midi length", "Flattering drape"],
        sustainability: ["Slow fashion piece", "Built to last", "Locally crafted"],
        sizes: ["One Size"],
        colors: ["Terracotta", "White"]
    },
    {
        id: "10",
        name: "Sleeveless Linen Maxi",
        slug: "sleeveless-linen-maxi",
        price: 295000,
        currency: "IDR",
        category: "Dresses",
        subCategory: "TRD",
        image: "/images/products/10.jpg",
        hoverImage: "/images/products/10.jpg",
        description: "A graceful sleeveless maxi dress perfect for summer evenings and garden parties.",
        material: "100% Pure European Linen",
        care: ["Machine wash cold", "Air dry", "Light iron if desired"],
        features: ["Sleeveless", "Maxi length", "Tiered skirt"],
        sustainability: ["Slow fashion piece", "Built to last", "Locally crafted"],
        sizes: ["S", "M", "L"],
        colors: ["Sage Green", "Cream", "Navy"]
    }
];

export const testimonials = [
    {
        quote: "This dress has been my uniform for three years. It's the only piece I truly need.",
        author: "Sari",
        location: "Jakarta",
        product: "Minimalist Midi Dress"
    },
    {
        quote: "Finally, sustainable fashion that doesn't break the bank. Julia Owers understands what we need.",
        author: "Dewi",
        location: "Surabaya",
        product: "Relaxed Wide Leg Trousers"
    },
    {
        quote: "The quality is unbelievable for the price. I've worn my linen blouse weekly for 2 years and it still looks new.",
        author: "Rina",
        location: "Bandung",
        product: "Oversized Breeze Blouse"
    },
    {
        quote: "I love knowing exactly where my clothes come from. The Bandung workshop story is so inspiring.",
        author: "Anita",
        location: "Medan",
        product: "Terracotta Wrap Dress"
    }
];

export const brandValues = [
    {
        title: "100% Pure Linen",
        description: "We use only the finest European flax fibers. No blends, no compromises. Breathable, sustainable, and hypoallergenic.",
        icon: "leaf"
    },
    {
        title: "Timeless Design",
        description: "Thoughtfully crafted silhouettes that transcend trends. Buy better, wear longer. Our pieces look as good in 5 years as they do today.",
        icon: "clock"
    },
    {
        title: "Conscious Craft",
        description: "Ethically produced in our Bandung workshop with minimal waste and fair labor practices. We know our team by name.",
        icon: "heart"
    },
    {
        title: "Accessible Luxury",
        description: "Sustainable fashion shouldn't be a luxury reserved for the wealthy. Premium quality at prices that make sense.",
        icon: "sparkles"
    }
];

export const sustainabilityStats = [
    { number: "60%", label: "Less water than cotton production" },
    { number: "5+", label: "Years of wear per piece" },
    { number: "50km", label: "Local production radius" },
    { number: "0", label: "Plastic in our packaging" }
];
