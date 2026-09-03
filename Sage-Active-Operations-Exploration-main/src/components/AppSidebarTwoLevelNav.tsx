// Preserved reference implementation: the rail + content panel "two-level nested"
// nav ported from Sage/active.afa.prototype. Not wired into App.tsx anymore —
// superseded by LeftNav.tsx (built to match the Figma "Vision for Active" spec) —
// kept here in case this styling direction is wanted again.
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "carbon-react/lib/components/icon";
import { Menu, MenuItem } from "carbon-react/lib/components/menu";
import {
  VerticalMenu,
  VerticalMenuItem,
} from "carbon-react/lib/components/vertical-menu";
import { PRIMARY_NAV_ITEMS } from "../data/primaryNav";
import { ROUTES } from "../routes";

type UtilityPanel = "notifications" | "profile" | "copilot" | "help" | null;

function isSubmenuLinkActive(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function AppSidebarTwoLevelNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [utilityPanel, setUtilityPanel] = useState<UtilityPanel>(null);

  const toggleUtilityPanel = (panel: UtilityPanel) => {
    setUtilityPanel((current) => (current === panel ? null : panel));
  };

  const closeUtilityPanel = () => setUtilityPanel(null);

  const goTo = (path: string) => {
    closeUtilityPanel();
    navigate(path);
  };

  return (
    <>
      <div className="sidebarLogo">
        <Link to={ROUTES.home} className="sidebarLogo__link" aria-label="Sage home">
          <img
            src="/sage-logo.svg"
            alt="Sage"
            width={40}
            height={23}
            className="sidebarLogo__image"
          />
        </Link>
        {!isCollapsed && (
          <>
            <span className="sidebarLogo__divider" aria-hidden />
            <div className="sidebarLogo__spacer" />
            <Menu menuType="black">
              <MenuItem submenu="Leda Construction">
                <MenuItem href="#switch-business">Switch business</MenuItem>
              </MenuItem>
            </Menu>
          </>
        )}
      </div>

      <div className={`appSidebar${isCollapsed ? " appSidebar--collapsed" : ""}`}>
        <nav className="sidebarRail" aria-label="Primary navigation">
          <div className="sidebarRail__primary">
            <button
              type="button"
              className="sidebarRail__item sidebarRail__item--active"
              aria-current="true"
              onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            >
              <Icon type="hierarchy" />
              <span className="sidebarRail__itemLabel">My Business</span>
            </button>
          </div>

          <div className="sidebarRail__footer">
            <div className="sidebarRail__utilityWrap">
              <button
                type="button"
                className={`sidebarRail__utility sidebarRail__utility--profile${utilityPanel === "profile" ? " sidebarRail__utility--active" : ""}`}
                aria-label="Profile"
                aria-expanded={utilityPanel === "profile"}
                aria-haspopup="menu"
                onClick={() => toggleUtilityPanel("profile")}
              >
                <Icon type="person" />
              </button>
              {utilityPanel === "profile" && (
                <div className="sidebarRail__overlayLayer">
                  <button
                    type="button"
                    className="sidebarRail__overlayBackdrop"
                    aria-label="Close profile menu"
                    onClick={closeUtilityPanel}
                  />
                  <div className="sidebarRail__overlayPanel" role="menu" aria-label="Profile">
                    <a href="#my-profile" className="sidebarRail__overlayItem" onClick={closeUtilityPanel}>
                      My profile
                    </a>
                    <a href="#settings" className="sidebarRail__overlayItem" onClick={closeUtilityPanel}>
                      Settings
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="sidebarRail__utilityWrap">
              <button
                type="button"
                className={`sidebarRail__utility${utilityPanel === "notifications" ? " sidebarRail__utility--active" : ""}`}
                aria-label="Notifications"
                aria-expanded={utilityPanel === "notifications"}
                aria-haspopup="menu"
                onClick={() => toggleUtilityPanel("notifications")}
              >
                <Icon type="alert" />
              </button>
              {utilityPanel === "notifications" && (
                <div className="sidebarRail__overlayLayer">
                  <button
                    type="button"
                    className="sidebarRail__overlayBackdrop"
                    aria-label="Close notifications"
                    onClick={closeUtilityPanel}
                  />
                  <div className="sidebarRail__overlayPanel" role="menu" aria-label="Notifications">
                    <a
                      href="#notifications"
                      className="sidebarRail__overlayItem"
                      onClick={closeUtilityPanel}
                    >
                      Notifications
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="sidebarRail__utilityWrap">
              <button
                type="button"
                className={`sidebarRail__utility${utilityPanel === "copilot" ? " sidebarRail__utility--active" : ""}`}
                aria-label="Copilot"
                aria-expanded={utilityPanel === "copilot"}
                aria-haspopup="menu"
                onClick={() => toggleUtilityPanel("copilot")}
              >
                <img src="/copilot-logo.svg" alt="" width={20} height={20} />
              </button>
              {utilityPanel === "copilot" && (
                <div className="sidebarRail__overlayLayer">
                  <button
                    type="button"
                    className="sidebarRail__overlayBackdrop"
                    aria-label="Close Copilot menu"
                    onClick={closeUtilityPanel}
                  />
                  <div className="sidebarRail__overlayPanel" role="menu" aria-label="Copilot">
                    <a href="#chat" className="sidebarRail__overlayItem" onClick={closeUtilityPanel}>
                      Chat
                    </a>
                    <a href="#insights" className="sidebarRail__overlayItem" onClick={closeUtilityPanel}>
                      Insights
                    </a>
                    <div className="sidebarRail__overlayDivider" aria-hidden />
                    <a href="#copilot-settings" className="sidebarRail__overlayItem" onClick={closeUtilityPanel}>
                      Copilot settings
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="sidebarRail__utilityWrap">
              <button
                type="button"
                className={`sidebarRail__utility${utilityPanel === "help" ? " sidebarRail__utility--active" : ""}`}
                aria-label="Help"
                aria-expanded={utilityPanel === "help"}
                aria-haspopup="menu"
                onClick={() => toggleUtilityPanel("help")}
              >
                <svg className="sidebarRail__utilitySvg" viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M7.9 7.4a2.2 2.2 0 0 1 4.2.9c0 1.5-1.4 2.1-2 2.6-.5.4-.7.8-.7 1.3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="14.9" r="1" fill="currentColor" />
                </svg>
              </button>
              {utilityPanel === "help" && (
                <div className="sidebarRail__overlayLayer">
                  <button
                    type="button"
                    className="sidebarRail__overlayBackdrop"
                    aria-label="Close help menu"
                    onClick={closeUtilityPanel}
                  />
                  <div className="sidebarRail__overlayPanel" role="menu" aria-label="Help">
                    <button
                      type="button"
                      className="sidebarRail__overlayItem"
                      onClick={() => goTo(ROUTES.playgroundHome)}
                    >
                      Playground Home
                    </button>
                    <button
                      type="button"
                      className="sidebarRail__overlayItem"
                      onClick={() => goTo(ROUTES.carbonComponents)}
                    >
                      Carbon components
                    </button>
                    <div className="sidebarRail__overlayDivider" aria-hidden />
                    <a href="#support" className="sidebarRail__overlayItem" onClick={closeUtilityPanel}>
                      Support
                    </a>
                    <a href="#docs" className="sidebarRail__overlayItem" onClick={closeUtilityPanel}>
                      Documentation
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="sidebarRail__utility"
              aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
              onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            >
              {isCollapsed ? (
                <svg className="sidebarRail__utilitySvg" viewBox="0 0 20 20" aria-hidden="true">
                  <rect x="3" y="4" width="6" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M11 10h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path
                    d="m14.8 7.2 2.8 2.8-2.8 2.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg className="sidebarRail__utilitySvg" viewBox="0 0 20 20" aria-hidden="true">
                  <rect x="11" y="4" width="6" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M3 10h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path
                    d="m5.8 7.2-2.8 2.8 2.8 2.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {!isCollapsed && (
          <div className="sidebarContent">
            <VerticalMenu aria-label="Business navigation" height="100%">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const sectionActive = item.isActive(pathname);

                if (item.hasSubmenu && item.submenu) {
                  return (
                    <VerticalMenuItem
                      key={`${item.id}-${sectionActive ? "open" : "closed"}`}
                      title={item.label}
                      iconType={item.iconType}
                      height="32px"
                      active={sectionActive}
                      defaultOpen={sectionActive}
                    >
                      {item.submenu.map((link) => (
                        <VerticalMenuItem
                          key={link.path ?? link.label}
                          title={link.label}
                          height="32px"
                          active={Boolean(link.path) && isSubmenuLinkActive(pathname, link.path!)}
                          onClick={() => link.path && navigate(link.path)}
                        />
                      ))}
                    </VerticalMenuItem>
                  );
                }

                return (
                  <VerticalMenuItem
                    key={item.id}
                    title={item.label}
                    iconType={item.iconType}
                    height="32px"
                    active={sectionActive}
                    onClick={() => item.path && navigate(item.path)}
                  />
                );
              })}
            </VerticalMenu>
          </div>
        )}
      </div>
    </>
  );
}
