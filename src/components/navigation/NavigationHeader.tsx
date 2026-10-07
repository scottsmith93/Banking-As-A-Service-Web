import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "carbon-react/lib/components/icon";
import { useLanguage } from "../../context/useLanguage";
import { currentUser } from "../../data/currentUser";
import { getLocale, getTranslation, SUPPORTED_LANGUAGES } from "../../locales";
import { ROUTES } from "../../routes";

type NavigationHeaderProps = {
  collapsed: boolean;
  onNavigate: () => void;
};

export function NavigationHeader({ collapsed, onNavigate }: NavigationHeaderProps) {
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const localizationCopy = getLocale(language).localization;
  const closeCompanyMenu = () => setIsCompanyMenuOpen(false);

  return (
    <div className="leftNav__header">
      <Link
        to={ROUTES.home}
        className="leftNav__brandLink"
        aria-label={getTranslation(language, "appNavigation.sageHome")}
        onClick={() => {
          closeCompanyMenu();
          onNavigate();
        }}
      >
        <span className="leftNav__brandCrop">
          <img src="/sage-logo.svg" alt="Sage" className="leftNav__brandImage" />
        </span>
      </Link>

      {collapsed ? (
        <span className="leftNav__companyAvatar" role="img" aria-label={currentUser.companyName}>
          {currentUser.companyInitials}
        </span>
      ) : (
        <>
          <button
            type="button"
            className="leftNav__companyButton"
            aria-label={getTranslation(language, "appNavigation.companyMenu")}
            aria-haspopup="menu"
            aria-expanded={isCompanyMenuOpen}
            onClick={() => setIsCompanyMenuOpen((open) => !open)}
          >
            <span className="leftNav__companyName">{currentUser.companyName}</span>
            <Icon type="caret_down" className="leftNav__companyCaret" aria-hidden />
          </button>

          {isCompanyMenuOpen && (
            <>
              <button
                type="button"
                className="leftNav__menuBackdrop"
                aria-label={getTranslation(language, "appNavigation.closeMenu")}
                onClick={closeCompanyMenu}
              />
              <div className="leftNav__companyMenu" role="menu">
                <span className="leftNav__companyMenuLabel">{localizationCopy.changeLanguage}</span>
                {SUPPORTED_LANGUAGES.map(({ id }) => (
                  <button
                    key={id}
                    type="button"
                    className="leftNav__companyMenuItem"
                    role="menuitemradio"
                    aria-checked={language === id}
                    onClick={() => {
                      setLanguage(id);
                      closeCompanyMenu();
                    }}
                  >
                    <span>{localizationCopy.languages[id]}</span>
                    {language === id && <Icon type="tick" aria-hidden />}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
