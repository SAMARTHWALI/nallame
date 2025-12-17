import { createContext, useState, ReactNode } from "react";

// ---------- 1️⃣ Define the types for the context ----------
export interface MenuContextType {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

// ---------- 2️⃣ Create the context with default values ----------
export const MenuContext = createContext<MenuContextType>({
  menuOpen: false,
  openMenu: () => {},
  closeMenu: () => {}
});

// ---------- 3️⃣ Provide context to the app ----------
export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <MenuContext.Provider value={{ menuOpen, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
}
