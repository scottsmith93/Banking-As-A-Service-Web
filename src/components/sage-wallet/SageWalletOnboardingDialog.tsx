import { useEffect, useRef, useState } from "react";
import Button from "carbon-react/lib/components/button/__next__";
import Dialog from "carbon-react/lib/components/dialog";
import Loader from "carbon-react/lib/components/loader";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import type { DebitCard } from "../../data/bankingBaas";
import { sageWalletCardholders, sageWalletDefaultLimitEur, sageWalletHeroPayment, sageWalletOpenedAccount, sageWalletPrefill } from "../../data/sageWalletOnboarding";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { interpolate } from "../../utils/interpolate";
import SageWalletAccountStep, { type SageWalletAccountForm } from "./SageWalletAccountStep";
import SageWalletCardStep, { SageWalletDoneStep } from "./SageWalletCardStep";
import SageWalletHero from "./SageWalletHero";
import SageWalletReadyStep from "./SageWalletReadyStep";
import type { SageWalletCardDraft, SageWalletView } from "./sageWalletTypes";
import "./sage-wallet.css";

type SageWalletOnboardingDialogProps = {
  open: boolean;
  onClose: () => void;
  onAccountOpened: () => void;
  onCreateCard: (card: Pick<DebitCard, "cardholder" | "nickname" | "colour" | "type" | "network">) => DebitCard;
  onViewAccount: () => void;
  onViewCards: () => void;
};

const TOTAL_STEPS = 3;
const STEP_NUMBER: Record<SageWalletView, number> = { account: 1, opening: 1, ready: 2, card: 3, done: 3 };
// PROTOTYPE: simulates provider latency while the account is opened; no account is really created.
const OPENING_DELAY_MS = 1800;

export default function SageWalletOnboardingDialog({ open, onClose, onAccountOpened, onCreateCard, onViewAccount, onViewCards }: SageWalletOnboardingDialogProps) {
  const { language } = useLanguage();
  const { walletOnboarding: copy, cards: cardLabels } = getLocale(language).bankingBaas;
  const money = new Intl.NumberFormat(getLocaleCode(language), { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const formatEur = (amount: number) => money.format(amount);

  const initialAccountForm = (): SageWalletAccountForm => ({ accountName: copy.account.accountNameDefault, usage: sageWalletPrefill.usage, acceptedTerms: false, showErrors: false });
  const initialCardDraft = (): SageWalletCardDraft => ({ type: "virtual", cardholder: sageWalletPrefill.representative, monthlyLimitEur: sageWalletDefaultLimitEur, colour: "sage", deliveryAddress: sageWalletPrefill.businessAddress });

  const [view, setView] = useState<SageWalletView>("account");
  const [accountForm, setAccountForm] = useState(initialAccountForm);
  const [cardDraft, setCardDraft] = useState(initialCardDraft);
  const [cardholders, setCardholders] = useState(sageWalletCardholders);
  const [createdLastFour, setCreatedLastFour] = useState<string | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const openingTimer = useRef<number>();

  // Every time the modal opens it starts again from the first step.
  useEffect(() => {
    if (!open) return;
    setView("account");
    setAccountForm(initialAccountForm());
    setCardDraft(initialCardDraft());
    setCardholders(sageWalletCardholders);
    setCreatedLastFour(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset only when the modal opens, not on language changes
  }, [open]);

  // Move focus to each new step's heading so screen readers announce the change.
  useEffect(() => {
    if (open) headingRef.current?.focus();
  }, [open, view]);

  useEffect(() => () => window.clearTimeout(openingTimer.current), []);

  const openAccount = () => {
    if (!accountForm.accountName.trim() || !accountForm.acceptedTerms) {
      setAccountForm(form => ({ ...form, showErrors: true }));
      // Bring the first problem into view; the errors may sit below the fold.
      const firstInvalidId = !accountForm.accountName.trim() ? "sage-wallet-account-name" : "sage-wallet-terms";
      window.requestAnimationFrame(() => document.getElementById(firstInvalidId)?.focus());
      return;
    }
    setView("opening");
    openingTimer.current = window.setTimeout(() => {
      onAccountOpened();
      setView("ready");
    }, OPENING_DELAY_MS);
  };

  const createCard = () => {
    // PROTOTYPE: the monthly limit is shown and chosen, but the shared card store does not keep limits yet.
    const card = onCreateCard({ cardholder: cardDraft.cardholder, nickname: copy.card.nickname, colour: cardDraft.colour, type: cardDraft.type, network: "mastercard" });
    setCreatedLastFour(card.lastFour);
    setView("done");
  };

  const close = () => {
    window.clearTimeout(openingTimer.current);
    onClose();
  };

  const titles: Record<SageWalletView, string> = {
    account: interpolate(copy.account.title, { name: sageWalletPrefill.firstName }),
    opening: copy.opening.title,
    ready: copy.ready.title,
    card: copy.card.title,
    done: copy.done.title,
  };
  // The card pitch lives in the left panel so the card form fits without scrolling.
  const subtitles: Partial<Record<SageWalletView, string>> = { opening: copy.opening.body, ready: copy.ready.body };
  const step = STEP_NUMBER[view];

  return (
    <Dialog open={open} onCancel={close} size="extra-large" className="sageWalletDialog" aria-label={copy.dialogLabel}
      showCloseIcon={view !== "opening"} contentPadding={{ p: 0 }}>
      <div className="sageWallet">
        <SageWalletHero view={view} copy={copy.hero} cardPitch={{ body: copy.card.body, perks: copy.card.perks }} cardDraft={cardDraft} cardLabels={cardLabels} createdLastFour={createdLastFour}
          paymentAmount={formatEur(sageWalletHeroPayment.amountEur)} invoiceNumber={sageWalletHeroPayment.invoiceNumber} />

        <section className="sageWallet__panel" aria-labelledby="sage-wallet-step-title">
          <header className="sageWallet__header">
            <div className="sageWallet__progress" aria-hidden="true">
              {Array.from({ length: TOTAL_STEPS }, (_, index) => <span key={index} className={index < step ? "is-filled" : undefined} />)}
            </div>
            <div className="sageWallet__stepRow">
              <Typography variant="small" as="p" className="sageWallet__stepLabel">{interpolate(copy.progress, { current: step, total: TOTAL_STEPS })}</Typography>
              {view === "card" && <Pill size="S" pillRole="status" colorVariant="positive">{copy.card.badge}</Pill>}
            </div>
            <div ref={headingRef} tabIndex={-1} className="sageWallet__heading">
              <Typography variant="h2" as="h2" id="sage-wallet-step-title">{titles[view]}</Typography>
            </div>
            {subtitles[view] && <Typography variant="p" as="p" className="sageWallet__subtitle">{subtitles[view]}</Typography>}
          </header>

          {/* Re-keyed per view so each step slides in from the direction of travel. */}
          <div key={view} className="sageWallet__body">
            {view === "account" && <SageWalletAccountStep copy={copy.account} form={accountForm} onChange={setAccountForm} />}
            {view === "opening" && <div className="sageWallet__loading" role="status"><Loader size="large" /></div>}
            {view === "ready" && <SageWalletReadyStep copy={copy.ready} accountName={accountForm.accountName.trim()}
              openingBalance={new Intl.NumberFormat(getLocaleCode(language), { style: "currency", currency: "EUR" }).format(sageWalletOpenedAccount.openingBalanceEur)} />}
            {view === "card" && <SageWalletCardStep copy={copy.card} draft={cardDraft} cardholders={cardholders} formatEur={formatEur} onChange={setCardDraft}
              onAddCardholder={fullName => { setCardholders(current => [...current, fullName]); setCardDraft(current => ({ ...current, cardholder: fullName })); }} />}
            {view === "done" && <SageWalletDoneStep body={interpolate(cardDraft.type === "virtual" ? copy.done.virtualBody : copy.done.physicalBody, { lastFour: createdLastFour ?? "" })}
              nextHeading={copy.done.nextHeading} next={copy.done.next} />}
          </div>

          {view !== "opening" && <footer className="sageWallet__footer">
            {view === "account" && <>
              <Button variantType="tertiary" onClick={close}>{copy.account.cancel}</Button>
              <Button variantType="primary" onClick={openAccount}>{copy.account.submit}</Button>
            </>}
            {view === "ready" && <>
              <Button variantType="tertiary" onClick={close}>{copy.ready.skip}</Button>
              <Button variantType="primary" iconType="arrow_right" iconPosition="after" onClick={() => setView("card")}>{copy.ready.getCard}</Button>
            </>}
            {view === "card" && <>
              <Button variantType="tertiary" onClick={close}>{copy.card.later}</Button>
              <Button variantType="primary" iconType="credit_card" iconPosition="before" onClick={createCard}>{copy.card.create}</Button>
            </>}
            {view === "done" && <>
              <Button variantType="secondary" onClick={onViewAccount}>{copy.done.goToAccount}</Button>
              <Button variantType="primary" onClick={onViewCards}>{copy.done.viewCards}</Button>
            </>}
          </footer>}
        </section>
      </div>
    </Dialog>
  );
}
