import Button from "carbon-react/lib/components/button/__next__";
import { Menu, MenuItem } from "carbon-react/lib/components/menu";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";
import { bankMovementsHref } from "../../utils/bankMovementNavigation";

export default function BaasAccountNavigation({ accountId, active = "overview" }: { accountId: string; active?: "overview" | "cards" | "transactions" }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const copy = getLocale(language).bankingBaas;
  const path = `/banking/baas/accounts/${accountId}`;
  return (
    <nav className="baasAccountNavigation" aria-label={copy.accountNavigation.ariaLabel}>
      <Menu menuType="white">
        <MenuItem href={path} selected={active === "overview"} ariaCurrent={active === "overview" ? "page" : undefined} onClick={(event) => { event.preventDefault(); navigate(path); }}>{copy.accountNavigation.overview}</MenuItem>
        <MenuItem href={`${path}/cards`} selected={active === "cards"} ariaCurrent={active === "cards" ? "page" : undefined} onClick={(event) => { event.preventDefault(); navigate(`${path}/cards`); }}>{copy.accountNavigation.debitCards}</MenuItem>
        <MenuItem href={bankMovementsHref(accountId)} selected={active === "transactions"} ariaCurrent={active === "transactions" ? "page" : undefined} onClick={(event) => { event.preventDefault(); navigate(bankMovementsHref(accountId)); }}>{copy.accountNavigation.transactions}</MenuItem>
        <MenuItem submenu={copy.accountNavigation.transfers} clickToOpen><Button variantType="tertiary" disabled>{copy.dashboard.transferMoney}</Button></MenuItem>
        <MenuItem submenu={copy.accountNavigation.statements} clickToOpen><Button variantType="tertiary" disabled>{copy.dashboard.viewStatements}</Button></MenuItem>
      </Menu>
      <Button size="small" variantType="secondary" iconType="chevron_down_thick" iconPosition="after" onClick={() => navigate("/banking")}>{copy.accountNavigation.switchAccount}</Button>
    </nav>
  );
}
