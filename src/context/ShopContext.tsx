import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------------- TYPES ---------------- */

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

interface ShopContextType {
  cart: Product[];
  wishlist: Product[];
  loading: boolean;
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  removeFromCart: (id: number) => void;
  removeFromWishlist: (id: number) => void;
}

/* ---------------- CONTEXT ---------------- */

const ShopContext = createContext<ShopContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load stored data once
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        const storedWishlist = await AsyncStorage.getItem("wishlist");

        if (storedCart) setCart(JSON.parse(storedCart));
        if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.log("❌ Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data when cart/wishlist changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        await AsyncStorage.setItem("wishlist", JSON.stringify(wishlist));
      } catch (error) {
        console.log("❌ Error saving data:", error);
      }
    };

    if (!loading) saveData();
  }, [cart, wishlist, loading]);

  const addToCart = (product: Product) => {
    setCart((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        loading,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

/* ---------------- CUSTOM HOOK ---------------- */

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return context;
};
