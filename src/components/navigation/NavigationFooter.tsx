import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Icon from "carbon-react/lib/components/icon";
import Portrait from "carbon-react/lib/components/portrait";
import { useLanguage } from "../../context/useLanguage";
import { currentUser } from "../../data/currentUser";
import { getLocale, SUPPORTED_LANGUAGES } from "../../locales";
import { ROUTES } from "../../routes";
import { translateNavLabel } from "./navTranslation";

type FooterFlyoutId = "profile" | "language" | "copilot" | "help" | null;
type FlyoutLink = { key: string; label: string; onClick: () => void; selected?: boolean };
type FlyoutContent = { groups: FlyoutLink[][] };

type NavigationFooterProps = {
  collapsed: boolean;
  onNavigate: (path: string) => void;
  onToggleCollapsed: () => void;
};

export function NavigationFooter({ collapsed, onNavigate, onToggleCollapsed }: NavigationFooterProps) {
  const { language, setLanguage } = useLanguage();
  const localizationCopy = getLocale(language).localization;
  const [flyout, setFlyout] = useState<FooterFlyoutId>(null);
  const closeFlyout = () => setFlyout(null);
  const go = (path: string) => { closeFlyout(); onNavigate(path); };
  const toggleFlyout = (id: FooterFlyoutId) => setFlyout((current) => current === id ? null : id);

  const content: FlyoutContent | null = (() => {
    if (flyout === "profile") return { groups: [[{ key: "my-profile", label: "Manage subscription", onClick: () => go(ROUTES.myProfile) }]] };
    if (flyout === "language") return { groups: [SUPPORTED_LANGUAGES.map(({ id }) => ({ key: `language-${id.toLowerCase()}`, label: localizationCopy.languages[id], selected: language === id, onClick: () => { setLanguage(id); closeFlyout(); } }))] };
    if (flyout === "copilot") return { groups: [[{ key: "chat", label: "Chat", onClick: closeFlyout }, { key: "insights", label: "Insights", onClick: closeFlyout }], [{ key: "copilot-settings", label: "Copilot settings", onClick: closeFlyout }]] };
    if (flyout === "help") return { groups: [[{ key: "playground-home", label: "Playground Home", onClick: () => go(ROUTES.playgroundHome) }, { key: "carbon-components", label: "Carbon components", onClick: () => go(ROUTES.carbonComponents) }], [{ key: "support", label: "Support", onClick: closeFlyout }, { key: "docs", label: "Documentation", onClick: closeFlyout }]] };
    return null;
  })();

  return (
    <div className="leftNav__footer">
      <div className="leftNav__divider" aria-hidden />
      <button type="button" className="leftNav__footerItem leftNav__profile" aria-haspopup="menu" aria-expanded={flyout === "profile"} onClick={() => toggleFlyout("profile")}>
        <span className="leftNav__profileAvatar">
          <Portrait initials={currentUser.initials} shape="circle" size="S" backgroundColor="var(--colorsActionMajor500)" foregroundColor="var(--colorsUtilityYang100)" alt="" />
          <span className="leftNav__profileStatusDot" aria-hidden />
        </span>
        <span className="leftNav__profileText"><span className="leftNav__profileName">{currentUser.name}</span><span className="leftNav__profileRole">{currentUser.role}</span></span>
        <Icon type="caret_right" className="leftNav__footerCaret" aria-hidden />
      </button>
      <button type="button" className="leftNav__footerItem" aria-label={localizationCopy.changeLanguage} aria-haspopup="menu" aria-expanded={flyout === "language"} onClick={() => toggleFlyout("language")}>
        <Icon type="worldwide_location" className="leftNav__footerIcon" aria-hidden />
        <span>{localizationCopy.language}</span><Icon type="caret_right" className="leftNav__footerCaret" aria-hidden />
      </button>
      <button type="button" className="leftNav__footerItem" aria-haspopup="menu" aria-expanded={flyout === "copilot"} onClick={() => toggleFlyout("copilot")}>
        <img src="/copilot-logo.svg" alt="" width={20} height={20} className="leftNav__footerIcon" />
        <span>{translateNavLabel("Copilot", language)}</span>
      </button>
      <button type="button" className="leftNav__footerItem" aria-haspopup="menu" aria-expanded={flyout === "help"} onClick={() => toggleFlyout("help")}>
        <Icon type="help" className="leftNav__footerIcon" aria-hidden />
        <span>{translateNavLabel("Help", language)}</span>
      </button>
      <button type="button" className="leftNav__footerItem" aria-label={translateNavLabel(collapsed ? "Expand navigation" : "Collapse navigation", language)} onClick={() => { closeFlyout(); onToggleCollapsed(); }}>
        <Icon type="box_arrow_left" className="leftNav__footerIcon" aria-hidden />
        <span>{translateNavLabel(collapsed ? "Expand" : "Collapse", language)}</span>
      </button>

      {flyout && content && createPortal(
        <>
          <button type="button" className="leftNav__flyoutBackdrop" aria-label={translateNavLabel("Close menu", language)} onClick={closeFlyout} />
          <div className={`leftNav__flyoutPanel${collapsed ? " leftNav__flyoutPanel--collapsed" : ""}`} role="menu">
            {content.groups.map((group, groupIndex): ReactNode => (
              <div key={groupIndex}>
                {groupIndex > 0 && <div className="leftNav__flyoutDivider" aria-hidden />}
                {group.map((link) => (
                  <button key={link.key} type="button" className="leftNav__flyoutItem" role={link.selected === undefined ? "menuitem" : "menuitemradio"} aria-checked={link.selected} onClick={link.onClick}>
                    {link.key.startsWith("language-") ? link.label : translateNavLabel(link.label, language)}
                    {link.selected && <span className="leftNav__flyoutSelectedPill">{localizationCopy.selected}</span>}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>,
        document.body,
      )}
    </div>
  );
}
