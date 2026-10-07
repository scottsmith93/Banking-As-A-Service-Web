import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";
import { PRIMARY_NAV_ITEMS } from "../data/primaryNav";
import { getTranslation } from "../locales";
import { NavigationFooter } from "./navigation/NavigationFooter";
import { NavigationHeader } from "./navigation/NavigationHeader";
import { NavigationTree } from "./navigation/NavigationTree";

export default function LeftNav() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const [collapsed, setCollapsed] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches,
  );
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedKeys(new Set());
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenus = () => setExpandedKeys(new Set());
  const toggleExpanded = (key: string) => {
    setExpandedKeys((current) => {
      if (current.has(key)) {
        const next = new Set(current);
        next.delete(key);
        return next;
      }
      if (PRIMARY_NAV_ITEMS.some((item) => item.id === key)) return new Set([key]);
      return new Set(current).add(key);
    });
  };

  return (
    <nav
      className={`leftNav${collapsed ? " leftNav--collapsed" : ""}`}
      aria-label={getTranslation(language, "appNavigation.ariaLabel")}
    >
      <NavigationHeader collapsed={collapsed} onNavigate={closeMenus} />
      <NavigationTree
        items={PRIMARY_NAV_ITEMS}
        pathname={pathname}
        language={language}
        collapsed={collapsed}
        expandedKeys={expandedKeys}
        onToggle={toggleExpanded}
        onNavigate={closeMenus}
        onExpandNavigation={() => setCollapsed(false)}
      />
      <NavigationFooter
        pathname={pathname}
        language={language}
        collapsed={collapsed}
        onNavigate={closeMenus}
        onToggleCollapsed={() => {
          closeMenus();
          setCollapsed((current) => !current);
        }}
      />
    </nav>
  );
}
