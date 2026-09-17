import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "carbon-react/lib/components/icon";
import type { Language } from "../../context/useLanguage";
import type { PrimaryNavItem, SubmenuLink } from "../../data/primaryNav";
import { translateNavLabel } from "./navTranslation";

function isLinkActive(pathname: string, path?: string) {
  if (!path) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

function linkHasActiveDescendant(pathname: string, link: SubmenuLink): boolean {
  if (isLinkActive(pathname, link.path)) return true;
  return Boolean(link.children?.some((child) => linkHasActiveDescendant(pathname, child)));
}

function getInitialExpandedKeys(pathname: string, links: SubmenuLink[]): Set<string> {
  const keys = new Set<string>();
  const walk = (items: SubmenuLink[], prefix: string) => {
    items.forEach((item) => {
      const key = `${prefix}/${item.path ?? item.label}`;
      if (item.children?.length && linkHasActiveDescendant(pathname, item)) {
        keys.add(key);
        walk(item.children, key);
      }
    });
  };
  walk(links, "section");
  return keys;
}

type SectionLinkProps = {
  link: SubmenuLink;
  depth: number;
  keyPrefix: string;
  pathname: string;
  language: Language;
  expandedKeys: Set<string>;
  onToggle: (key: string) => void;
  onSelect: () => void;
};

function SectionLink({ link, depth, keyPrefix, pathname, language, expandedKeys, onToggle, onSelect }: SectionLinkProps) {
  const key = `${keyPrefix}/${link.path ?? link.label}`;
  const hasChildren = Boolean(link.children?.length);
  const expanded = expandedKeys.has(key);
  const active = isLinkActive(pathname, link.path) && !link.children?.some((child) => linkHasActiveDescendant(pathname, child));
  const className = `leftNav__panelItem leftNav__panelItem--depth${depth}${active ? " leftNav__panelItem--active" : ""}`;

  const content = (
    <>
      {hasChildren && (
        <Icon
          type="caret_right"
          className={`leftNav__panelCaret${expanded ? " leftNav__panelCaret--expanded" : ""}`}
          aria-hidden
        />
      )}
      <span>{translateNavLabel(link.label, language)}</span>
    </>
  );

  return (
    <li>
      {hasChildren ? (
        <button type="button" className={className} aria-expanded={expanded} onClick={() => onToggle(key)}>
          {content}
        </button>
      ) : (
        <Link to={link.path!} className={className} aria-current={active ? "page" : undefined} onClick={onSelect}>
          {content}
        </Link>
      )}
      {hasChildren && expanded && (
        <ul className="leftNav__panelSublist">
          {link.children!.map((child) => (
            <SectionLink
              key={`${key}/${child.path ?? child.label}`}
              link={child}
              depth={depth + 1}
              keyPrefix={key}
              pathname={pathname}
              language={language}
              expandedKeys={expandedKeys}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

type NavigationSectionPanelProps = {
  section: PrimaryNavItem;
  pathname: string;
  language: Language;
  onSelect: () => void;
};

export function NavigationSectionPanel({ section, pathname, language, onSelect }: NavigationSectionPanelProps) {
  const [expandedKeys, setExpandedKeys] = useState(() => getInitialExpandedKeys(pathname, section.submenu ?? []));
  const [trackedPathname, setTrackedPathname] = useState(pathname);

  if (trackedPathname !== pathname) {
    setTrackedPathname(pathname);
    setExpandedKeys(getInitialExpandedKeys(pathname, section.submenu ?? []));
  }

  const toggleExpanded = (key: string) => {
    setExpandedKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <aside className="leftNav__sectionPanel" aria-label={translateNavLabel(section.label, language)}>
      <ul className="leftNav__panelList">
        {section.submenu?.map((link) => (
          <SectionLink
            key={`${section.id}/${link.path ?? link.label}`}
            link={link}
            depth={0}
            keyPrefix={section.id}
            pathname={pathname}
            language={language}
            expandedKeys={expandedKeys}
            onToggle={toggleExpanded}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </aside>
  );
}
