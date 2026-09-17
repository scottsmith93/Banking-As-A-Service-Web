import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "carbon-react/lib/components/icon";
import { useLanguage } from "../context/useLanguage";
import { ADDITIONAL_NAV_ITEMS, PRIMARY_NAV_ITEMS } from "../data/primaryNav";
import { ROUTES, type PrimaryNavId } from "../routes";
import { NavigationFooter } from "./navigation/NavigationFooter";
import { NavigationSectionPanel } from "./navigation/NavigationSectionPanel";
import { translateNavLabel } from "./navigation/navTranslation";

const NAV_ITEMS = [...PRIMARY_NAV_ITEMS, ...ADDITIONAL_NAV_ITEMS];

export default function LeftNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [openSectionId, setOpenSectionId] = useState<PrimaryNavId | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSectionId(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const openSection = NAV_ITEMS.find((item) => item.id === openSectionId) ?? null;
  const go = (path: string) => {
    setOpenSectionId(null);
    navigate(path);
  };

  return (
    <nav className={`leftNav${collapsed ? " leftNav--collapsed" : ""}`} aria-label={translateNavLabel("Primary navigation", language)}>
      <div className="leftNav__brand">
        <Link
          to={ROUTES.home}
          className="leftNav__brandLink"
          aria-label={translateNavLabel("Sage home", language)}
          onClick={() => setOpenSectionId(null)}
        >
          <img src="/sage-logo.svg" alt="Sage" width={80} height={46} className="leftNav__brandLogo" />
          <span className="leftNav__brandDivider" aria-hidden />
          <span className="leftNav__brandProduct">Active</span>
        </Link>
      </div>

      <ul className="leftNav__primaryList">
        {NAV_ITEMS.map((item) => {
          const hasSubmenu = Boolean(item.hasSubmenu && item.submenu?.length);
          const sectionOpen = openSectionId === item.id;
          const active = item.isActive(pathname);
          const itemClassName = `leftNav__primaryItem${active ? " leftNav__primaryItem--active" : ""}${sectionOpen ? " leftNav__primaryItem--open" : ""}`;
          const itemContent = (
            <>
              <Icon type={item.iconType} className="leftNav__primaryIcon" aria-hidden />
              <span className="leftNav__primaryLabel">{translateNavLabel(item.label, language)}</span>
              {hasSubmenu && (
                <span className="leftNav__primaryCaret" aria-hidden>
                  <Icon type="caret_right" />
                </span>
              )}
            </>
          );

          return (
            <li key={item.id}>
              {hasSubmenu ? (
                <button
                  type="button"
                  className={itemClassName}
                  aria-expanded={sectionOpen}
                  onClick={() => setOpenSectionId((current) => current === item.id ? null : item.id)}
                >
                  {itemContent}
                </button>
              ) : (
                <Link
                  to={item.path!}
                  className={itemClassName}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpenSectionId(null)}
                >
                  {itemContent}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <NavigationFooter
        collapsed={collapsed}
        onNavigate={go}
        onToggleCollapsed={() => {
          setOpenSectionId(null);
          setCollapsed((current) => !current);
        }}
      />

      {openSection && (
        <NavigationSectionPanel
          key={openSection.id}
          section={openSection}
          pathname={pathname}
          language={language}
          onSelect={() => setOpenSectionId(null)}
        />
      )}
    </nav>
  );
}
