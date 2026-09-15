import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "carbon-react/lib/components/icon";
import Pill from "carbon-react/lib/components/pill";
import Portrait from "carbon-react/lib/components/portrait";
import { PRIMARY_NAV_ITEMS, type PrimaryNavItem, type SubmenuLink } from "../data/primaryNav";
import { useNavMode } from "../context/useNavMode";
import { useLanguage } from "../context/useLanguage";
import { currentUser } from "../data/currentUser";
import { ROUTES } from "../routes";
import { getLocale } from "../locales";

type FooterFlyoutId = "profile" | "copilot" | "help" | null;

type FlyoutAnchor = {
  left: number;
  top: number;
  bottom: number;
};

type FlyoutLink = {
  key: string;
  label: string;
  onClick: () => void;
  selected?: boolean;
};

type FlyoutContent = {
  groups: FlyoutLink[][];
};

function translateNavLabel(label: string, language: "English" | "French") {
  const navigation = getLocale(language).navigation as Record<string, string>;
  return navigation[label] ?? label;
}

const ADDITIONAL_NAV_ITEMS: PrimaryNavItem[] = [
  {
    id: "sales-invoices",
    label: "Sale invoices",
    iconType: "document_right_align",
    path: ROUTES.sales.invoices,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.sales.invoices,
  },
  {
    id: "file-upload",
    label: "File upload",
    iconType: "upload",
    path: ROUTES.fileUpload,
    hasSubmenu: false,
    isActive: () => false,
  },
  {
    id: "projects",
    label: "Project calculator",
    iconType: "percentage_boxed",
    path: ROUTES.projects,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.projects,
  },
  {
    id: "financial-documents",
    label: "Financial documents",
    iconType: "document_vertical_lines",
    path: ROUTES.financialDocuments,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.financialDocuments,
  },
  {
    id: "year-end-meeting",
    label: "Year end meeting",
    iconType: "calendar",
    path: ROUTES.yearEndMeeting,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.yearEndMeeting,
  },
  {
    id: "ai-advisor",
    label: "AI Advisor",
    iconType: "lightbulb_on",
    path: ROUTES.aiAdvisor,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.aiAdvisor,
  },
];

function isLinkActive(pathname: string, path?: string) {
  if (!path) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

function linkHasActiveDescendant(pathname: string, link: SubmenuLink): boolean {
  if (isLinkActive(pathname, link.path)) return true;
  return Boolean(link.children?.some((child) => linkHasActiveDescendant(pathname, child)));
}

// Whether some link *below* this level matches the current route — used to
// suppress the active indicator on a parent when a more specific descendant
// is the true current page, so only one item is ever marked active.
function anyDescendantActive(pathname: string, links?: SubmenuLink[]): boolean {
  if (!links) return false;
  return links.some((link) => linkHasActiveDescendant(pathname, link));
}

function initialExpandedKeys(pathname: string, navItems: PrimaryNavItem[]): Set<string> {
  const keys = new Set<string>();

  const walk = (links: SubmenuLink[], keyPrefix: string) => {
    for (const link of links) {
      const key = `${keyPrefix}/${link.path ?? link.label}`;
      if (link.children?.length && linkHasActiveDescendant(pathname, link)) {
        keys.add(key);
        walk(link.children, key);
      }
    }
  };

  for (const item of navItems) {
    if (!item.submenu?.length) continue;
    if (item.isActive(pathname)) {
      keys.add(item.id);
      walk(item.submenu, item.id);
    }
  }

  return keys;
}

type SubmenuRowProps = {
  link: SubmenuLink;
  depth: number;
  keyPrefix: string;
  pathname: string;
  expandedKeys: Set<string>;
  toggleExpanded: (key: string) => void;
  go: (path: string) => void;
  language: "English" | "French";
};

function SubmenuRow({
  link,
  depth,
  keyPrefix,
  pathname,
  expandedKeys,
  toggleExpanded,
  go,
  language,
}: SubmenuRowProps) {
  const key = `${keyPrefix}/${link.path ?? link.label}`;
  const hasChildren = Boolean(link.children?.length);
  const isExpanded = expandedKeys.has(key);
  const ownMatch = isLinkActive(pathname, link.path);
  const descendantMatch = anyDescendantActive(pathname, link.children);
  // While expanded, only the visible descendant should carry the indicator.
  // While collapsed, the descendant is hidden, so this row stands in for it.
  const active = isExpanded ? ownMatch && !descendantMatch : ownMatch || descendantMatch;

  return (
    <li className="leftNav__itemWrap">
      <button
        type="button"
        className={`leftNav__item leftNav__item--depth${depth}${active ? " leftNav__item--active" : ""}`}
        aria-current={active ? "page" : undefined}
        aria-expanded={hasChildren ? isExpanded : undefined}
        onClick={(e) => {
          // Some rows (e.g. "Sales invoices") both link to their own page
          // AND have children — clicking the caret toggles the sublist,
          // clicking anywhere else on the row navigates to the page.
          if (hasChildren && (e.target as HTMLElement).closest(".leftNav__itemCaret")) {
            toggleExpanded(key);
            return;
          }
          if (link.path) {
            go(link.path);
          } else if (hasChildren) {
            toggleExpanded(key);
          }
        }}
      >
        <span className="leftNav__itemLabel">{translateNavLabel(link.label, language)}</span>
        {hasChildren && (
          <Icon
            type="caret_right"
            className={`leftNav__itemCaret${isExpanded ? " leftNav__itemCaret--expanded" : ""}`}
            aria-hidden
          />
        )}
      </button>

      {hasChildren && isExpanded && (
        <ul className="leftNav__sublist">
          {link.children!.map((child) => (
            <SubmenuRow
              key={`${key}/${child.path ?? child.label}`}
              link={child}
              depth={depth + 1}
              keyPrefix={key}
              pathname={pathname}
              expandedKeys={expandedKeys}
              toggleExpanded={toggleExpanded}
              go={go}
              language={language}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function LeftNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mode } = useNavMode();
  const navItems =
    mode === "essentials"
      ? [
          ...PRIMARY_NAV_ITEMS.filter((item) => !["accounting", "compliance"].includes(item.id)),
          ...ADDITIONAL_NAV_ITEMS.filter((item) => item.id !== "sales-invoices"),
        ]
      : [
          ...PRIMARY_NAV_ITEMS.filter((item) => item.id === "dashboard"),
          ...ADDITIONAL_NAV_ITEMS.filter((item) => item.id !== "sales-invoices"),
        ];
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() =>
    initialExpandedKeys(pathname, navItems),
  );

  // The two modes have entirely different item trees (different ids/keys),
  // so previously-expanded keys from one don't carry meaning in the other —
  // recompute from scratch whenever the mode changes. Adjusted during render
  // (React's documented pattern for resetting state on a prop/value change)
  // rather than in an Effect, which would cause an extra render pass.
  const [expandedKeysMode, setExpandedKeysMode] = useState(mode);
  if (mode !== expandedKeysMode) {
    setExpandedKeysMode(mode);
    setExpandedKeys(initialExpandedKeys(pathname, navItems));
  }

  const [footerFlyout, setFooterFlyout] = useState<FooterFlyoutId>(null);
  const [anchor, setAnchor] = useState<FlyoutAnchor | null>(null);
  const { language, setLanguage } = useLanguage();

  const closeFooterFlyout = () => setFooterFlyout(null);

  const toggleFooterFlyout = (id: FooterFlyoutId, target: HTMLElement) => {
    setFooterFlyout((current) => {
      if (current === id) return null;
      const rect = target.getBoundingClientRect();
      setAnchor({ left: rect.right, top: rect.top, bottom: rect.bottom });
      return id;
    });
  };

  const toggleExpanded = (key: string) => {
    setExpandedKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const go = (path: string) => {
    closeFooterFlyout();
    navigate(path);
  };

  const footerFlyoutContent: FlyoutContent | null = (() => {
    if (footerFlyout === "profile") {
      return {
        groups: [
          [
            { key: "my-profile", label: "Manage subscription", onClick: () => go(ROUTES.myProfile) },
          ],
          [
            {
              key: "language-english",
              label: "English",
              selected: language === "English",
              onClick: () => {
                setLanguage("English");
                closeFooterFlyout();
              },
            },
            {
              key: "language-french",
              label: "French",
              selected: language === "French",
              onClick: () => {
                setLanguage("French");
                closeFooterFlyout();
              },
            },
          ],
        ],
      };
    }

    if (footerFlyout === "copilot") {
      return {
        groups: [
          [
            { key: "chat", label: "Chat", onClick: closeFooterFlyout },
            { key: "insights", label: "Insights", onClick: closeFooterFlyout },
          ],
          [{ key: "copilot-settings", label: "Copilot settings", onClick: closeFooterFlyout }],
        ],
      };
    }

    if (footerFlyout === "help") {
      return {
        groups: [
          [
            { key: "playground-home", label: "Playground Home", onClick: () => go(ROUTES.playgroundHome) },
            { key: "carbon-components", label: "Carbon components", onClick: () => go(ROUTES.carbonComponents) },
          ],
          [
            { key: "support", label: "Support", onClick: closeFooterFlyout },
            { key: "docs", label: "Documentation", onClick: closeFooterFlyout },
          ],
        ],
      };
    }

    return null;
  })();

  return (
    <nav className={`leftNav${isCollapsed ? " leftNav--collapsed" : ""}`} aria-label="Primary navigation">
      <div className="leftNav__logo">
        <Link to={ROUTES.home} className="leftNav__logoLink" aria-label="Sage home">
          <img src="/sage-logo.svg" alt="Sage" width={40} height={23} className="leftNav__logoImage" />
        </Link>
      </div>

      <ul className="leftNav__list">
        {navItems.map((item) => {
          const hasSubmenu = Boolean(item.hasSubmenu && item.submenu?.length);
          const isExpanded = expandedKeys.has(item.id);
          // While expanded, only the visible descendant should carry the
          // indicator. While collapsed, the descendant is hidden, so this
          // item stands in for it — item.isActive() already covers both
          // cases since it's a broad "somewhere in this section" prefix
          // check, so it only needs suppressing when a child is showing it.
          const active =
            item.isActive(pathname) &&
            (!isExpanded || !anyDescendantActive(pathname, item.submenu));
          return (
            <li key={item.id} className="leftNav__itemWrap">
              <button
                type="button"
                className={`leftNav__item${active ? " leftNav__item--active" : ""}`}
                aria-current={active ? "page" : undefined}
                aria-expanded={hasSubmenu ? isExpanded : undefined}
                onClick={(e) => {
                  if (hasSubmenu && (e.target as HTMLElement).closest(".leftNav__itemCaret")) {
                    toggleExpanded(item.id);
                    return;
                  }
                  if (item.path) {
                    go(item.path);
                  } else if (hasSubmenu) {
                    toggleExpanded(item.id);
                  }
                }}
              >
                <Icon type={item.iconType} className="leftNav__itemIcon" aria-hidden />
                <span className="leftNav__itemLabel">{translateNavLabel(item.label, language)}</span>
                {item.id === "ai-advisor" && (
                  <span className="leftNav__upgradePill">
                    <Pill pillRole="tag" colorVariant="positive" isDarkBackground size="S">Upgrade</Pill>
                  </span>
                )}
                {hasSubmenu && (
                  <Icon
                    type="caret_right"
                    className={`leftNav__itemCaret${isExpanded ? " leftNav__itemCaret--expanded" : ""}`}
                    aria-hidden
                  />
                )}
              </button>

              {hasSubmenu && isExpanded && (
                <ul className="leftNav__sublist">
                  {item.submenu!.map((link) => (
                    <SubmenuRow
                      key={`${item.id}/${link.path ?? link.label}`}
                      link={link}
                      depth={1}
                      keyPrefix={item.id}
                      pathname={pathname}
                      expandedKeys={expandedKeys}
                      toggleExpanded={toggleExpanded}
                      go={go}
                      language={language}
                    />
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <div className="leftNav__footer">
        <div className="leftNav__divider" aria-hidden />

        <button
          type="button"
          className="leftNav__item leftNav__profile"
          aria-haspopup="menu"
          aria-expanded={footerFlyout === "profile"}
          onClick={(e) => toggleFooterFlyout("profile", e.currentTarget)}
        >
          <span className="leftNav__profileAvatar">
            <Portrait
              initials={currentUser.initials}
              shape="circle"
              size="S"
              backgroundColor="#007e45"
              foregroundColor="#ffffff"
              alt=""
            />
            <span className="leftNav__profileStatusDot" aria-hidden />
          </span>
          <span className="leftNav__profileText">
            <span className="leftNav__profileName">{currentUser.name}</span>
            <span className="leftNav__profileRole">{currentUser.role}</span>
          </span>
          <Icon type="caret_right" className="leftNav__itemCaret" aria-hidden />
        </button>

        <button
          type="button"
          className="leftNav__item"
          aria-haspopup="menu"
          aria-expanded={footerFlyout === "copilot"}
          onClick={(e) => toggleFooterFlyout("copilot", e.currentTarget)}
        >
          <img src="/copilot-logo.svg" alt="" width={20} height={20} className="leftNav__itemIcon" />
          <span className="leftNav__itemLabel">{translateNavLabel("Copilot", language)}</span>
        </button>

        <button
          type="button"
          className="leftNav__item"
          aria-haspopup="menu"
          aria-expanded={footerFlyout === "help"}
          onClick={(e) => toggleFooterFlyout("help", e.currentTarget)}
        >
          <Icon type="help" className="leftNav__itemIcon" aria-hidden />
          <span className="leftNav__itemLabel">{translateNavLabel("Help", language)}</span>
        </button>

        <button
          type="button"
          className="leftNav__item"
          aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
          onClick={() => {
            closeFooterFlyout();
            setIsCollapsed((collapsed) => !collapsed);
          }}
        >
          <Icon type="box_arrow_left" className="leftNav__itemIcon" aria-hidden />
          <span className="leftNav__itemLabel">{translateNavLabel(isCollapsed ? "Expand" : "Collapse", language)}</span>
        </button>
      </div>

      {footerFlyout &&
        anchor &&
        footerFlyoutContent &&
        createPortal(
          <>
            <button
              type="button"
              className="leftNav__flyoutBackdrop"
              aria-label={translateNavLabel("Close menu", language)}
              onClick={closeFooterFlyout}
            />
            <div
              className="leftNav__flyoutPanel"
              role="menu"
              style={{
                position: "fixed",
                left: anchor.left + 8,
                bottom: window.innerHeight - anchor.bottom,
              }}
            >
              {footerFlyoutContent.groups.map((group, groupIndex): ReactNode => (
                <div key={groupIndex}>
                  {groupIndex > 0 && <div className="leftNav__flyoutDivider" aria-hidden />}
                  {group.map((link) => (
                    <button
                      key={link.key}
                      type="button"
                      className="leftNav__flyoutItem"
                      aria-pressed={link.selected}
                      onClick={link.onClick}
                    >
                      {link.key === "language-english" || link.key === "language-french"
                        ? link.label
                        : translateNavLabel(link.label, language)}
                      {link.selected && (
                        <span className="leftNav__flyoutSelectedPill">
                          {language === "French" ? "Sélectionné" : "Selected"}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </>,
          document.body,
        )}

      {isAiAdvisorOpen &&
        createPortal(
          <>
            <button
              type="button"
              className="aiAdvisor__backdrop"
              aria-label={translateNavLabel("Close AI Advisor", language)}
              onClick={() => setIsAiAdvisorOpen(false)}
            />
            <aside
              className="aiAdvisor__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ai-advisor-title"
            >
              <div className="aiAdvisor__header">
                <div>
                  <p className="aiAdvisor__eyebrow">Sage intelligence</p>
                  <h2 id="ai-advisor-title">AI Advisor</h2>
                </div>
                <button
                  type="button"
                  className="aiAdvisor__close"
                  aria-label={translateNavLabel("Close AI Advisor", language)}
                  onClick={() => setIsAiAdvisorOpen(false)}
                >
                  <Icon type="cross" aria-hidden />
                </button>
              </div>
              <div className="aiAdvisor__body">
                <div className="aiAdvisor__icon" aria-hidden>
                  <Icon type="lightbulb_on" />
                </div>
                <h3>How can I help?</h3>
                <p>Ask questions about your business and get useful guidance from Sage.</p>
              </div>
            </aside>
          </>,
          document.body,
        )}
    </nav>
  );
}
