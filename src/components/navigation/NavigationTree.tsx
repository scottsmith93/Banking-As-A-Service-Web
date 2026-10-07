import { Link } from "react-router-dom";
import Icon from "carbon-react/lib/components/icon";
import Tooltip from "carbon-react/lib/components/tooltip";
import type { Language } from "../../context/useLanguage";
import type { PrimaryNavItem, SubmenuLink } from "../../data/primaryNav";
import { getNavigationLabel } from "./navTranslation";

function pathIsActive(pathname: string, path?: string): boolean {
  if (!path) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

function descendantIsActive(pathname: string, links?: SubmenuLink[]): boolean {
  return Boolean(links?.some((link) => pathIsActive(pathname, link.path) || descendantIsActive(pathname, link.children)));
}

type SubmenuItemProps = {
  link: SubmenuLink;
  depth: number;
  keyPrefix: string;
  pathname: string;
  language: Language;
  expandedKeys: Set<string>;
  onToggle: (key: string) => void;
  onNavigate: () => void;
};

function SubmenuItem({ link, depth, keyPrefix, pathname, language, expandedKeys, onToggle, onNavigate }: SubmenuItemProps) {
  const itemKey = `${keyPrefix}/${link.path ?? link.labelKey ?? link.label}`;
  const hasChildren = Boolean(link.children?.length);
  const expanded = expandedKeys.has(itemKey);
  const current = pathIsActive(pathname, link.path) && !descendantIsActive(pathname, link.children);
  const label = getNavigationLabel(language, link.labelKey, link.label);
  const className = `leftNav__navItem leftNav__navItem--depth${depth}${current ? " leftNav__navItem--current" : ""}`;

  return (
    <li>
      {hasChildren ? (
        <button type="button" className={className} aria-expanded={expanded} onClick={() => onToggle(itemKey)}>
          <span className="leftNav__navLabel">{label}</span>
          <Icon type={expanded ? "chevron_up" : "chevron_down"} className="leftNav__navCaret" aria-hidden />
        </button>
      ) : (
        <Link to={link.path!} className={className} aria-current={current ? "page" : undefined} onClick={onNavigate}>
          <span className="leftNav__navLabel">{label}</span>
        </Link>
      )}
      {hasChildren && expanded && (
        <ul className="leftNav__sublist">
          {link.children!.map((child) => (
            <SubmenuItem
              key={`${itemKey}/${child.path ?? child.labelKey ?? child.label}`}
              link={child}
              depth={depth + 1}
              keyPrefix={itemKey}
              pathname={pathname}
              language={language}
              expandedKeys={expandedKeys}
              onToggle={onToggle}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

type NavigationTreeProps = {
  items: PrimaryNavItem[];
  pathname: string;
  language: Language;
  collapsed: boolean;
  expandedKeys: Set<string>;
  onToggle: (key: string) => void;
  onNavigate: () => void;
  onExpandNavigation: () => void;
};

export function NavigationTree({ items, pathname, language, collapsed, expandedKeys, onToggle, onNavigate, onExpandNavigation }: NavigationTreeProps) {
  return (
    <ul className="leftNav__list">
      {items.map((item) => {
        const hasChildren = Boolean(item.hasSubmenu && item.submenu?.length);
        const expanded = expandedKeys.has(item.id);
        const active = item.isActive(pathname);
        const label = getNavigationLabel(language, item.labelKey, item.label);
        const className = `leftNav__navItem leftNav__navItem--primary${active ? " leftNav__navItem--sectionActive" : ""}`;
        const content = (
          <>
            <Icon type={item.iconType} className="leftNav__navIcon" aria-hidden />
            <span className="leftNav__navLabel">{label}</span>
            {hasChildren && <Icon type={expanded ? "chevron_up" : "chevron_down"} className="leftNav__navCaret" aria-hidden />}
          </>
        );
        const control = hasChildren ? (
          <button
            type="button"
            className={className}
            aria-expanded={expanded}
            onClick={() => {
              if (collapsed) onExpandNavigation();
              onToggle(item.id);
            }}
          >
            {content}
          </button>
        ) : (
          <Link to={item.path!} className={className} aria-current={active ? "page" : undefined} onClick={onNavigate}>
            {content}
          </Link>
        );

        return (
          <li key={item.id} className="leftNav__navItemWrap">
            {collapsed ? <Tooltip message={label} position="right">{control}</Tooltip> : control}
            {hasChildren && expanded && !collapsed && (
              <ul className="leftNav__sublist">
                {item.submenu!.map((link) => (
                  <SubmenuItem
                    key={`${item.id}/${link.path ?? link.labelKey ?? link.label}`}
                    link={link}
                    depth={1}
                    keyPrefix={item.id}
                    pathname={pathname}
                    language={language}
                    expandedKeys={expandedKeys}
                    onToggle={onToggle}
                    onNavigate={onNavigate}
                  />
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
