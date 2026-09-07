import { useMemo, useState } from "react";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import { useLanguage, type Language } from "../context/useLanguage";

type Decision = "hire" | "invest" | "spend";

const decisionOptions: { id: Decision; label: string; icon: "people" | "business" | "cash"; description: string }[] = [
  { id: "hire", label: "Hire", icon: "people", description: "Add a person to the team" },
  { id: "invest", label: "Invest", icon: "business", description: "Put money into the business" },
  { id: "spend", label: "Spend", icon: "cash", description: "Make a one-off purchase" },
];

const decisionCopy: Record<Language, Record<Decision, { label: string; amountLabel: string; helper: string; defaultAmount: number }>> = {
  English: {
    hire: { label: "Hire", amountLabel: "Fully-loaded monthly cost", helper: "Include salary, tax, benefits and other regular costs.", defaultAmount: 4200 },
    invest: { label: "Invest", amountLabel: "Initial investment", helper: "Enter the amount you plan to put into the business.", defaultAmount: 12000 },
    spend: { label: "Spend", amountLabel: "One-off spend", helper: "Enter the total cost of the purchase or project.", defaultAmount: 2500 },
  },
  French: {
    hire: { label: "Recruter", amountLabel: "Coût mensuel total", helper: "Incluez le salaire, les taxes, les avantages et les autres coûts réguliers.", defaultAmount: 4200 },
    invest: { label: "Investir", amountLabel: "Investissement initial", helper: "Saisissez le montant que vous prévoyez d’investir dans l’entreprise.", defaultAmount: 12000 },
    spend: { label: "Dépenser", amountLabel: "Dépense ponctuelle", helper: "Saisissez le coût total de l’achat ou du projet.", defaultAmount: 2500 },
  },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(amount);

export default function ProjectsPage() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  const [decision, setDecision] = useState<Decision>("hire");
  const [amount, setAmount] = useState(decisionCopy[language].hire.defaultAmount);
  const [cashBalance, setCashBalance] = useState(48000);
  const [safetyThreshold, setSafetyThreshold] = useState(15000);
  const [calculation, setCalculation] = useState({
    decision: "hire" as Decision,
    amount: decisionCopy.English.hire.defaultAmount,
    cashBalance: 48000,
    safetyThreshold: 15000,
  });

  const copy = decisionCopy[language][decision];
  const calculatedCopy = decisionCopy[language][calculation.decision];
  const result = useMemo(() => {
    const projectedCash = calculation.cashBalance - calculation.amount;
    const ratio = calculation.safetyThreshold > 0
      ? projectedCash / calculation.safetyThreshold
      : projectedCash >= 0 ? 1 : 0;
    const status = ratio >= 1 ? "feasible" : ratio >= 0.8 ? "borderline" : "not-feasible";
    return { projectedCash, status };
  }, [calculation]);

  const changeDecision = (nextDecision: Decision) => {
    setDecision(nextDecision);
    setAmount(decisionCopy[language][nextDecision].defaultAmount);
  };

  const calculate = () => {
    setCalculation({ decision, amount, cashBalance, safetyThreshold });
  };

  return (
    <main className="projectsPage">
      <header className="projectsPage__header">
        <div>
          <h1>{isFrench ? "Calculateur de projet" : "Project calculator"}</h1>
          <p className="projectsPage__intro">
            {isFrench ? "Évaluez l’impact d’une décision avant de vous engager. Ajustez les hypothèses pour voir l’évolution possible de votre trésorerie." : "Explore the impact of a business decision before you commit. Adjust the assumptions to see what your cash position could look like."}
          </p>
        </div>
      </header>

      <section className="projectsPage__workspace" aria-label="Project feasibility simulator">
        <div className="projectsPage__scenario">
          <div className="projectsPage__sectionHeading">
            <div>
              <h2>What are you considering?</h2>
            </div>
          </div>

          <div className="projectsPage__decisionGrid">
            {decisionOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`projectsPage__decision${decision === option.id ? " projectsPage__decision--active" : ""}`}
                aria-pressed={decision === option.id}
                onClick={() => changeDecision(option.id)}
              >
                <Icon type={option.icon} aria-hidden />
                <span>
                <strong>{isFrench ? ({ hire: "Recruter", invest: "Investir", spend: "Dépenser" }[option.id]) : option.label}</strong>
                  <small>{isFrench ? ({ hire: "Ajouter une personne à l’équipe", invest: "Investir dans l’entreprise", spend: "Effectuer un achat ponctuel" }[option.id]) : option.description}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="projectsPage__amountBlock">
            <label htmlFor="project-amount">{copy.amountLabel}</label>
            <span className="projectsPage__inputWrap">
              <span>£</span>
              <input
                id="project-amount"
                type="number"
                min="0"
                step="500"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
              />
            </span>
            <p>{copy.helper}</p>
          </div>

          <div className="projectsPage__assumptions">
            <div className="projectsPage__sectionHeading">
              <div>
                <h2>{isFrench ? "Vérifiez vos hypothèses" : "Check your assumptions"}</h2>
              </div>
            </div>
            <div className="projectsPage__inputGrid">
              <label>
                {isFrench ? "Solde de trésorerie actuel" : "Current cash balance"}
                <span className="projectsPage__inputWrap"><span>£</span><input type="number" min="0" value={cashBalance} onChange={(event) => setCashBalance(Number(event.target.value))} /></span>
              </label>
              <label>
                {isFrench ? "Seuil de sécurité" : "Safety threshold"}
                <span className="projectsPage__inputWrap"><span>£</span><input type="number" min="0" value={safetyThreshold} onChange={(event) => setSafetyThreshold(Number(event.target.value))} /></span>
              </label>
            </div>
            <p className="projectsPage__assumptionNote"><Icon type="info" aria-hidden /> {isFrench ? "Ces chiffres sont des hypothèses pour cette simulation. Connectez vos données comptables pour les remplacer par des soldes réels." : "These figures are assumptions for this simulation. Connect your accounting data to replace them with live balances."}</p>
          </div>
          <div className="projectsPage__calculate">
            <Button variant="default" variantType="primary" size="medium" onClick={calculate}>
              {isFrench ? "Calculer" : "Calculate"}
            </Button>
          </div>
        </div>

        <aside className={`projectsPage__result projectsPage__result--${result.status}`} aria-live="polite">
          <div className="projectsPage__resultTop">
            <div className="projectsPage__statusIcon"><Icon type={result.status === "feasible" ? "tick" : result.status === "borderline" ? "alert" : "blocked"} aria-hidden /></div>
            <div className="projectsPage__resultHeading">
            <h3>{isFrench ? ({ feasible: "Faisable", borderline: "À la limite", "not-feasible": "Non faisable" }[result.status]) : result.status === "not-feasible" ? "Not feasible" : result.status.charAt(0).toUpperCase() + result.status.slice(1)}</h3>
              <p>{result.status === "feasible" ? (isFrench ? `Votre trésorerie prévisionnelle reste supérieure à votre seuil de sécurité après l’opération « ${calculatedCopy.label.toLowerCase()} ».` : `Your projected cash stays above your safety threshold after you ${calculatedCopy.label.toLowerCase()}.`) : result.status === "borderline" ? (isFrench ? "Cette décision vous rapproche de votre seuil de sécurité. Vérifiez les hypothèses avant de continuer." : "This decision brings you close to your safety threshold. Review the assumptions before proceeding.") : (isFrench ? "Cette décision ferait passer votre trésorerie prévisionnelle sous votre seuil de sécurité." : "This decision would take your projected cash below your safety threshold.")}</p>
            </div>
          </div>
          <dl className="projectsPage__resultDetails">
            <div><dt>{isFrench ? "Trésorerie prévisionnelle après impact" : "Projected cash after impact"}</dt><dd>{formatCurrency(result.projectedCash)}</dd></div>
            <div><dt>{isFrench ? "Seuil de sécurité" : "Safety threshold"}</dt><dd>{formatCurrency(calculation.safetyThreshold)}</dd></div>
            <div><dt>{isFrench ? "Décision" : "Decision"}</dt><dd>{calculatedCopy.label}</dd></div>
          </dl>
          <div className="projectsPage__resultBar"><span style={{ width: `${Math.min(100, Math.max(0, (result.projectedCash / Math.max(calculation.safetyThreshold, 1)) * 100))}%` }} /></div>
          <p className="projectsPage__resultFootnote">{isFrench ? "Nous soustrayons le montant de la décision de votre solde de trésorerie actuel, puis comparons la trésorerie prévisionnelle à votre seuil de sécurité. Le résultat est faisable au-dessus du seuil, à la limite à proximité et non faisable en dessous." : "We subtract the decision amount from your current cash balance, then compare the projected cash with your safety threshold. The result is feasible above the threshold, borderline near it, and not feasible below it."}</p>
        </aside>
      </section>

    </main>
  );
}
