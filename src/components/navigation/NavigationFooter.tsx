import { Link } from "react-router-dom";
import Icon, { type IconType } from "carbon-react/lib/components/icon";
import Tooltip from "carbon-react/lib/components/tooltip";
import type { Language } from "../../context/useLanguage";
import { ROUTES } from "../../routes";
import { getNavigationLabel } from "./navTranslation";

type FooterLink = {
  key: string;
  label: string;
  labelKey: string;
  path: string;
  iconType?: IconType;
  image?: string;
};

const FOOTER_LINKS: FooterLink[] = [
  { key: "profile", label: "My profile", labelKey: "appNavigation.footer.profile", path: ROUTES.myProfile, iconType: "person" },
  { key: "home", label: "Home", labelKey: "appNavigation.footer.home", path: ROUTES.home, iconType: "home" },
  { key: "notifications", label: "Notifications", labelKey: "appNavigation.footer.notifications", path: ROUTES.notifications, iconType: "alert_on" },
  { key: "tasks", label: "Tasks", labelKey: "appNavigation.footer.tasks", path: ROUTES.tasks, iconType: "document_tick" },
  { key: "copilot", label: "Copilot", labelKey: "appNavigation.footer.copilot", path: ROUTES.aiAdvisor, image: "/copilot-logo.svg" },
];

type NavigationFooterProps = {
  pathname: string;
  language: Language;
  collapsed: boolean;
  onNavigate: () => void;
  onToggleCollapsed: () => void;
};

export function NavigationFooter({ pathname, language, collapsed, onNavigate, onToggleCollapsed }: NavigationFooterProps) {
  const collapseLabel = getNavigationLabel(
    language,
    collapsed ? "appNavigation.footer.expand" : "appNavigation.footer.collapse",
    collapsed ? "Expand" : "Collapse",
  );

  return (
    <div className="leftNav__footer">
      <div className="leftNav__divider" aria-hidden />
      {FOOTER_LINKS.map((link) => {
        const label = getNavigationLabel(language, link.labelKey, link.label);
        const active = pathname === link.path;
        const control = (
          <Link
            to={link.path}
            className="leftNav__footerItem"
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
          >
            {link.image ? (
              <img src={link.image} alt="" className="leftNav__footerIcon" />
            ) : (
              <Icon type={link.iconType!} className="leftNav__footerIcon" aria-hidden />
            )}
            <span className="leftNav__footerLabel">{label}</span>
          </Link>
        );
        return collapsed ? (
          <Tooltip key={link.key} message={label} position="right">{control}</Tooltip>
        ) : (
          <span key={link.key} className="leftNav__footerControl">{control}</span>
        );
      })}
      {collapsed ? (
        <Tooltip message={collapseLabel} position="right">
          <button type="button" className="leftNav__footerItem" aria-label={collapseLabel} onClick={onToggleCollapsed}>
            <Icon type="chevron_right" className="leftNav__footerIcon" aria-hidden />
            <span className="leftNav__footerLabel">{collapseLabel}</span>
          </button>
        </Tooltip>
      ) : (
        <button type="button" className="leftNav__footerItem" aria-label={collapseLabel} onClick={onToggleCollapsed}>
          <Icon type="chevron_left" className="leftNav__footerIcon" aria-hidden />
          <span className="leftNav__footerLabel">{collapseLabel}</span>
        </button>
      )}
    </div>
  );
}
