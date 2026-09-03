import { useMemo, useState } from "react";
import Icon from "carbon-react/lib/components/icon";

type Decision = "hire" | "invest" | "spend";

const decisionOptions: { id: Decision; label: string; icon: "people" | "business" | "cash"; description: string }[] = [
  { id: "hire", label: "Hire", icon: "people", description: "Add a person to the team" },
  { id: "invest", label: "Invest", icon: "business", description: "Put money into the business" },
  { id: "spend", label: "Spend", icon: "cash", description: "Make a one-off purchase" },
];

const decisionCopy: Record<Decision, { label: string; amountLabel: string; helper: string; defaultAmount: number }> = {
  hire: {
    label: "Hire",
    amountLabel: "Fully-loaded monthly cost",
    helper: "Include salary, tax, benefits and other regular costs.",
    defaultAmount: 4200,
  },
  invest: {
    label: "Invest",
    amountLabel: "Initial investment",
    helper: "Enter the amount you plan to put into the business.",
    defaultAmount: 12000,
  },
  spend: {
    label: "Spend",
    amountLabel: "One-off spend",
    helper: "Enter the total cost of the purchase or project.",
    defaultAmount: 2500,
  },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(amount);

export default function ProjectsPage() {
  const [decision, setDecision] = useState<Decision>("hire");
  const [amount, setAmount] = useState(decisionCopy.hire.defaultAmount);
  const [cashBalance, setCashBalance] = useState(48000);
  const [safetyThreshold, setSafetyThreshold] = useState(15000);

  const copy = decisionCopy[decision];
  const result = useMemo(() => {
    const projectedCash = cashBalance - amount;
    const ratio = projectedCash / safetyThreshold;
    const status = ratio >= 1 ? "feasible" : ratio >= 0.8 ? "borderline" : "not-feasible";
    return { projectedCash, status };
  }, [amount, cashBalance, safetyThreshold]);

  const changeDecision = (nextDecision: Decision) => {
    setDecision(nextDecision);
    setAmount(decisionCopy[nextDecision].defaultAmount);
  };

  return (
    <main className="projectsPage">
      <header className="projectsPage__header">
        <div>
          <h1>Projects</h1>
          <p className="projectsPage__intro">
            Explore the impact of a business decision before you commit. Adjust the assumptions to see what your cash position could look like.
          </p>
        </div>
        <div className="projectsPage__headerBadge">
          <Icon type="flash" aria-hidden />
          Assumptions-based simulator
        </div>
      </header>

      <section className="projectsPage__workspace" aria-label="Project feasibility simulator">
        <div className="projectsPage__scenario">
          <div className="projectsPage__sectionHeading">
            <div>
              <h2>What are you considering?</h2>
            </div>
            <span className="projectsPage__stepCount">1 of 2</span>
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
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="projectsPage__amountBlock">
            <div className="projectsPage__fieldHeader">
              <label htmlFor="project-amount">{copy.amountLabel}</label>
              <span>{formatCurrency(amount)}</span>
            </div>
            <input
              id="project-amount"
              className="projectsPage__range"
              type="range"
              min="0"
              max="50000"
              step="500"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
            <div className="projectsPage__rangeLabels"><span>£0</span><span>£50,000</span></div>
            <p>{copy.helper}</p>
          </div>

          <div className="projectsPage__assumptions">
            <div className="projectsPage__sectionHeading">
              <div>
                <h2>Check your assumptions</h2>
              </div>
              <span className="projectsPage__stepCount">2 of 2</span>
            </div>
            <div className="projectsPage__inputGrid">
              <label>
                Current cash balance
                <span className="projectsPage__inputWrap"><span>£</span><input type="number" min="0" value={cashBalance} onChange={(event) => setCashBalance(Number(event.target.value))} /></span>
              </label>
              <label>
                Safety threshold
                <span className="projectsPage__inputWrap"><span>£</span><input type="number" min="0" value={safetyThreshold} onChange={(event) => setSafetyThreshold(Number(event.target.value))} /></span>
              </label>
            </div>
            <p className="projectsPage__assumptionNote"><Icon type="info" aria-hidden /> These figures are assumptions for this simulation. Connect your accounting data to replace them with live balances.</p>
          </div>
        </div>

        <aside className={`projectsPage__result projectsPage__result--${result.status}`} aria-live="polite">
          <div className="projectsPage__resultTop">
            <div className="projectsPage__statusIcon"><Icon type={result.status === "feasible" ? "tick" : result.status === "borderline" ? "alert" : "blocked"} aria-hidden /></div>
            <h2>{result.status === "not-feasible" ? "Not feasible" : result.status.charAt(0).toUpperCase() + result.status.slice(1)}</h2>
            <p>{result.status === "feasible" ? `Your projected cash stays above your safety threshold after you ${copy.label.toLowerCase()}.` : result.status === "borderline" ? "This decision brings you close to your safety threshold. Review the assumptions before proceeding." : "This decision would take your projected cash below your safety threshold."}</p>
          </div>
          <dl className="projectsPage__resultDetails">
            <div><dt>Projected cash after impact</dt><dd>{formatCurrency(result.projectedCash)}</dd></div>
            <div><dt>Safety threshold</dt><dd>{formatCurrency(safetyThreshold)}</dd></div>
            <div><dt>Decision</dt><dd>{copy.label}</dd></div>
          </dl>
          <div className="projectsPage__resultBar"><span style={{ width: `${Math.min(100, Math.max(0, (result.projectedCash / Math.max(safetyThreshold, 1)) * 100))}%` }} /></div>
          <p className="projectsPage__resultFootnote">Calculation: projected cash after project impact versus safety threshold.</p>
        </aside>
      </section>

      <section className="projectsPage__dataNote">
        <div>
          <h2>Start with the numbers you know</h2>
          <p>Today this module is a client-led simulator. It can later connect to general ledger, expense accounts, bank accounts, and client or supplier accounts through Accounting / OData.</p>
        </div>
        <div className="projectsPage__dataTags" aria-label="Available data objects">
          <span>General ledger</span><span>Expense accounts</span><span>Bank accounts</span><span>Client / supplier accounts</span>
        </div>
      </section>
    </main>
  );
}
