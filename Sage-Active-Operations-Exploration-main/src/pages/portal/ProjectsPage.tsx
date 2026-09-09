import { useMemo, useState } from "react";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";

type Decision = "hire" | "invest" | "spend";

const decisionOptions: { id: Decision; icon: "people" | "business" | "cash" }[] = [
  { id: "hire", icon: "people" },
  { id: "invest", icon: "business" },
  { id: "spend", icon: "cash" },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

export default function ProjectsPage() {
  const { language } = useLanguage();
  const copy = getLocale(language).projects;
  const [decision, setDecision] = useState<Decision>("hire");
  const [amount, setAmount] = useState(copy.decisions.hire.defaultAmount);
  const [cashBalance, setCashBalance] = useState(48000);
  const [safetyThreshold, setSafetyThreshold] = useState(15000);
  const [calculation, setCalculation] = useState({
    decision: "hire" as Decision,
    amount: copy.decisions.hire.defaultAmount,
    cashBalance: 48000,
    safetyThreshold: 15000,
  });

  const decisionCopy = copy.decisions[decision];
  const calculatedCopy = copy.decisions[calculation.decision];
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
    setAmount(copy.decisions[nextDecision].defaultAmount);
  };

  const calculate = () => {
    setCalculation({ decision, amount, cashBalance, safetyThreshold });
  };

  return (
    <main className="projectsPage">
      <header className="projectsPage__header">
        <div>
          <h1>{copy.title}</h1>
          <p className="projectsPage__intro">{copy.intro}</p>
        </div>
      </header>

      <section className="projectsPage__workspace" aria-label={copy.workspaceLabel}>
        <div className="projectsPage__scenario">
          <div className="projectsPage__sectionHeading">
            <div>
                <h2>{copy.considering}</h2>
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
                <strong>{copy.decisions[option.id].label}</strong>
                  <small>{copy.decisions[option.id].description}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="projectsPage__amountBlock">
            <label htmlFor="project-amount">{decisionCopy.amountLabel}</label>
            <span className="projectsPage__inputWrap">
              <span>€</span>
              <input
                id="project-amount"
                type="number"
                min="0"
                step="500"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
              />
            </span>
            <p>{decisionCopy.helper}</p>
          </div>

          <div className="projectsPage__assumptions">
            <div className="projectsPage__sectionHeading">
              <div>
                <h2>{copy.assumptions}</h2>
              </div>
            </div>
            <div className="projectsPage__inputGrid">
              <label>
                {copy.cashBalance}
                <span className="projectsPage__inputWrap"><span>€</span><input type="number" min="0" value={cashBalance} onChange={(event) => setCashBalance(Number(event.target.value))} /></span>
              </label>
              <label>
                {copy.safetyThreshold}
                <span className="projectsPage__inputWrap"><span>€</span><input type="number" min="0" value={safetyThreshold} onChange={(event) => setSafetyThreshold(Number(event.target.value))} /></span>
              </label>
            </div>
            <p className="projectsPage__assumptionNote"><Icon type="info" aria-hidden /> {copy.assumptionNote}</p>
          </div>
          <div className="projectsPage__calculate">
            <Button variant="default" variantType="primary" size="medium" onClick={calculate}>
              {copy.calculate}
            </Button>
          </div>
        </div>

        <aside className={`projectsPage__result projectsPage__result--${result.status}`} aria-live="polite">
          <div className="projectsPage__resultTop">
            <div className="projectsPage__resultHeading">
            <h3>{result.status === "feasible" ? copy.feasible : result.status === "borderline" ? copy.borderline : copy.notFeasible}</h3>
              <p>{result.status === "feasible" ? copy.feasibleMessage.replace("{decision}", calculatedCopy.label.toLowerCase()) : result.status === "borderline" ? copy.borderlineMessage : copy.notFeasibleMessage}</p>
            </div>
          </div>
          <dl className="projectsPage__resultDetails">
            <div><dt>{copy.projectedCash}</dt><dd>{formatCurrency(result.projectedCash)}</dd></div>
            <div><dt>{copy.safetyThreshold}</dt><dd>{formatCurrency(calculation.safetyThreshold)}</dd></div>
            <div><dt>{copy.decision}</dt><dd>{calculatedCopy.label}</dd></div>
          </dl>
          <div className="projectsPage__resultBar"><span style={{ width: `${Math.min(100, Math.max(0, (result.projectedCash / Math.max(calculation.safetyThreshold, 1)) * 100))}%` }} /></div>
          <p className="projectsPage__resultFootnote">{copy.resultFootnote}</p>
        </aside>
      </section>

    </main>
  );
}
