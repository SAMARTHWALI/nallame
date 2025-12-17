declare global {
  interface HeroImage {
    uri: string;
    title: string;
    subtitle: string;
    tagline1: string;
    tagline2: string;
  }

  interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  images:string[];
  outOfStock?: boolean;
  onPress?: () => void;
  onAddToCart?: (item: any) => void;
  onAddToWishlist?: (item: any) => void;
}

  interface Category {
    id: number;
    name: string;
    image: string;
  }

  interface Product {
    id: number;
    name: string;
    price: string | number;
    image: string;
    outOfStock: boolean;
    images:string[];
  }

  interface Wedding{
    id: number;
    name: string;
    price: string | number;
    image: string;
    outOfStock: boolean;

  }
  interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
  }

  export interface HeroImage {
    uri: string;
    title: string;
    subtitle: string;
    tagline1: string;
    tagline2: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    image: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    outOfStock: boolean;
  }
  
  declare module 'react-native-vector-icons/Feather';
  declare module 'react-native-vector-icons/*';
}

export {};
