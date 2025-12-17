import { useEffect, useRef, useState } from "react";

export interface Wedding extends Product {}

/**
 * ✅ Android Emulator MUST use 10.0.2.2
 * This maps to your host machine (PC)
 */
const BASE_URL = "http://192.168.0.102:5000/api";

export const useApi = () => {
  const heroImagesRef = useRef<HeroImage[]>([]);
  const sareeCategoriesRef = useRef<Category[]>([]);
  const accessoriesRef = useRef<Category[]>([]);
  const newArrivalsRef = useRef<Product[]>([]);
  const weddingCollectionRef = useRef<Wedding[]>([]);

  const [loading, setLoading] = useState(true);
  const [, forceUpdate] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("🚀 API FUNCTION CALLED");

      // HERO
      const heroRes = await fetch(`${BASE_URL}/hero/`);
      console.log("HERO STATUS:", heroRes.status);
      const hero = await heroRes.json();

      // CATEGORIES
      const catRes = await fetch(`${BASE_URL}/categories/`);
      console.log("CATEGORIES STATUS:", catRes.status);
      const categories = await catRes.json();

      // ACCESSORIES
      const accRes = await fetch(`${BASE_URL}/accessories/`);
      console.log("ACCESSORIES STATUS:", accRes.status);
      const accessories = await accRes.json();

      // NEW ARRIVALS
      const newRes = await fetch(`${BASE_URL}/products/new-arrivals`);
      console.log("NEW ARRIVALS STATUS:", newRes.status);
      const newArrivals = await newRes.json();

      // WEDDING COLLECTION
      const wedRes = await fetch(`${BASE_URL}/products/wedding-collection`);
      console.log("WEDDING STATUS:", wedRes.status);
      const wedding = await wedRes.json();

      heroImagesRef.current = hero;
      sareeCategoriesRef.current = categories;
      accessoriesRef.current = accessories;
      newArrivalsRef.current = newArrivals;
      weddingCollectionRef.current = wedding;

      forceUpdate(v => !v);
    } catch (err) {
      console.log("❌ API FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    heroImages: heroImagesRef.current,
    sareeCategories: sareeCategoriesRef.current,
    accessories: accessoriesRef.current,
    newArrivals: newArrivalsRef.current,
    weddingCollection: weddingCollectionRef.current,
  };
};
