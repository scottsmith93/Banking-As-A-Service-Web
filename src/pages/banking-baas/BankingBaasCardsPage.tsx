import BaasAccountNavigation from "../../components/banking-baas/BaasAccountNavigation";
import { useMemo, useState, type ComponentProps } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Dialog from "carbon-react/lib/components/dialog";
import { Tab, TabList, TabPanel, Tabs } from "carbon-react/lib/components/tabs/__next__";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { Breadcrumbs, Crumb } from "carbon-react/lib/components/breadcrumbs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BaasCardTile from "../../components/banking-baas/BaasCardTile";
import BaasIssueCardSidebar, { type BaasCardIssueFormData } from "../../components/banking-baas/BaasIssueCardSidebar";
import { stagedBaasAccounts, type DebitCard } from "../../data/bankingBaas";
import { useBankingBaas } from "../../context/useBankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { interpolate } from "../../utils/interpolate";

type CardTab = "all" | "issued" | "deactivated";
export default function BankingBaasCardsPage() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const localeCopy = getLocale(language);
  const copy = localeCopy.bankingBaas;
  const locale = getLocaleCode(language);
  const account = stagedBaasAccounts.find((candidate) => candidate.id === accountId) ?? stagedBaasAccounts[0];
  const { cards, addCard } = useBankingBaas();
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<CardTab>("all");
  const [isIssueSidebarOpen, setIsIssueSidebarOpen] = useState(searchParams.get("create") === "true");
  const [detailCard, setDetailCard] = useState<DebitCard | null>(() => cards.find(card => card.id === searchParams.get("card")) ?? null);
  const [lastIssuedCard, setLastIssuedCard] = useState<DebitCard | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const query = searchText.trim().toLowerCase();
  const matchingCards = cards.filter((card) => card.cardholder.toLowerCase().includes(query));
  const allCards = matchingCards;
  const issuedCards = matchingCards.filter((card) => card.status !== "deactivated");
  const deactivatedCards = matchingCards.filter((card) => card.status === "deactivated");
  const cardholders = useMemo(() => [...new Set(cards.map((card) => card.cardholder))], [cards]);

  const cardCopy = {
    deactivated: copy.cards.deactivated,
    monthlySpend: copy.cards.monthlySpend,
    validThrough: copy.cards.validThrough,
    viewDetails: copy.cards.viewDetails,
    manage: copy.cards.manage,
    cardholder: copy.cards.cardholder,
    virtual: copy.cards.virtual,
    physical: copy.cards.physical,
    expiry: copy.cards.expiry,
    securityCode: copy.cards.securityCode,
    active: copy.cards.active,
    ordered: copy.cards.ordered,
  };

  const handleIssueCard = (formData: BaasCardIssueFormData) => {
    const newCard = addCard({
      cardholder: formData.cardholder,
      colour: formData.colour,
      nickname: formData.nickname || copy.cards.newCardNickname,
      type: formData.type,
      network: formData.network,
    });
    setLastIssuedCard(newCard);
    setActiveTab("issued");
    setSuccessMessage(formData.type === "physical" ? copy.cardIssueForm.physicalSuccess.title : interpolate(copy.cards.created, { name: formData.cardholder }));
    setSearchText("");
    setSearchParams({}, { replace: true });
  };

  const handleCloseIssueSidebar = () => {
    setIsIssueSidebarOpen(false);
    if (searchParams.has("create")) setSearchParams({}, { replace: true });
  };

  return (
    <Box className="bankingBaasDetailPage">
      <BaasAccountNavigation accountId={account.id} active="cards" />
      <Box className="bankingBaasDetailPage__content" display="flex" flexDirection="column" gap={3}>
        <Box className="bankingBaasCardsPage__pageHeading" display="flex" flexDirection="column" gap={1}>
          <Breadcrumbs>
            <Crumb
              href="/banking"
              onClick={(event) => {
                event.preventDefault();
                navigate("/banking");
              }}
            >
              {localeCopy.appNavigation.primary.banking}
            </Crumb>
            <Crumb
              href={`/banking/baas/accounts/${account.id}`}
              onClick={(event) => {
                event.preventDefault();
                navigate(`/banking/baas/accounts/${account.id}`);
              }}
            >
              {account.name}
            </Crumb>
          </Breadcrumbs>
          <Box className="bankingBaasCardsPage__header" display="flex" justifyContent="space-between" alignItems="flex-end" gap={3}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="h1" as="h1">{copy.cards.title.replace("{accountName}", account.name)}</Typography>
              <Typography variant="p" as="p">{copy.cards.subtitle}</Typography>
            </Box>
          </Box>
        </Box>

        <Box className="bankingBaasCardsPage__filters" display="flex" alignItems="flex-end" gap={3}>
          <Textbox
            id="baas-card-search"
            label={copy.cards.searchLabel}
            placeholder={copy.cards.searchPlaceholder}
            inputIcon="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <Button variantType="primary" iconType="add" iconPosition="before" onClick={() => setIsIssueSidebarOpen(true)}>{copy.cards.issueCard}</Button>
        </Box>

        {successMessage && <Typography className="baasCardSuccess" variant="small" as="p" role="status">{successMessage}</Typography>}
        <Typography variant="small" as="p">{copy.cards.cardCount.replace("{count}", String(allCards.length))}</Typography>

        <Tabs selectedTabId={activeTab}>
          <TabList ariaLabel={copy.cards.tabsLabel} onTabChange={(tabId) => setActiveTab(tabId as CardTab)}>
            <Tab id="all" controls="all-cards-panel" label={`${copy.cards.all} (${allCards.length})`} />
            <Tab id="issued" controls="issued-cards-panel" label={`${copy.cards.issued} (${issuedCards.length})`} />
            <Tab id="deactivated" controls="deactivated-cards-panel" label={`${copy.cards.deactivated} (${deactivatedCards.length})`} />
          </TabList>
          <TabPanel id="all-cards-panel" tabId="all">
            <BaasCardGrid cards={allCards} copy={cardCopy} locale={locale} empty={copy.cards.empty} onOpenDetails={setDetailCard} />
          </TabPanel>
          <TabPanel id="issued-cards-panel" tabId="issued">
            <BaasCardGrid cards={issuedCards} copy={cardCopy} locale={locale} empty={copy.cards.empty} onOpenDetails={setDetailCard} />
          </TabPanel>
          <TabPanel id="deactivated-cards-panel" tabId="deactivated">
            <BaasCardGrid cards={deactivatedCards} copy={cardCopy} locale={locale} empty={copy.cards.empty} onOpenDetails={setDetailCard} />
          </TabPanel>
        </Tabs>
      </Box>

      <BaasIssueCardSidebar
        open={isIssueSidebarOpen}
        cardholders={cardholders}
        onCancel={handleCloseIssueSidebar}
        onIssue={handleIssueCard}
        onManage={() => { if (lastIssuedCard) setDetailCard(lastIssuedCard); }}
      />

      <Dialog open={detailCard !== null} onCancel={() => setDetailCard(null)} title={copy.cards.cardDetailsTitle} size="small">
        {detailCard && (
          <Box className="baasCardDetails" display="flex" flexDirection="column" gap={2}>
            <Typography variant="strong" as="p">{detailCard.cardholder}</Typography>
            <Typography variant="p" as="p">{detailCard.nickname} · {detailCard.type === "virtual" ? copy.cards.virtual : copy.cards.physical}</Typography>
            <Typography variant="p" as="p">{copy.cards.maskedNumber.replace("{lastFour}", detailCard.lastFour)}</Typography>
            <Typography variant="p" as="p">{copy.cards.monthlySpend}: {new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(detailCard.monthlySpendEur)}</Typography>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

function BaasCardGrid({
  cards,
  copy,
  locale,
  empty,
  onOpenDetails,
}: {
  cards: DebitCard[];
  copy: ComponentProps<typeof BaasCardTile>["copy"];
  locale: string;
  empty: string;
  onOpenDetails: (card: DebitCard) => void;
}) {
  if (cards.length === 0) {
    return <Typography variant="p" as="p">{empty}</Typography>;
  }

  return (
    <Box className="baasCardGrid">
      {cards.map((card) => <BaasCardTile key={card.id} card={card} copy={copy} locale={locale} onOpenDetails={onOpenDetails} />)}
    </Box>
  );
}
