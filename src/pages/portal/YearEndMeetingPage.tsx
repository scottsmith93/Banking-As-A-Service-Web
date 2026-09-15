import { useMemo, useState } from "react";
import Badge from "carbon-react/lib/components/badge";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import Icon from "carbon-react/lib/components/icon";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";
import { formatWholeEur } from "../../utils/formatCurrency";

type ChecklistItem = {
  id: string;
  label: string;
  description: string;
};

const historicalData: Record<number, { cash: number[]; revenue: number[]; costs: number[] }> = {
  2024: {
    cash: [28400, 30100, 29600, 31800, 33700, 35200, 34100, 36500, 38200, 39100, 40500, 42800],
    revenue: [18200, 19600, 21100, 20500, 22400, 23100, 24600, 25200, 26900, 27500, 28800, 30100],
    costs: [12400, 13100, 13500, 12900, 14200, 14600, 15100, 15500, 16300, 16800, 17200, 17900],
  },
  2025: {
    cash: [42800, 44100, 45200, 44600, 46300, 47100, 45800, 47900, 49200, 50100, 51600, 53400],
    revenue: [30100, 31500, 32800, 32200, 34100, 35600, 36200, 37900, 38800, 40100, 41400, 42800],
    costs: [17900, 18300, 19100, 18800, 19700, 20400, 21100, 21600, 22400, 23100, 23900, 24500],
  },
};

export default function YearEndMeetingPage() {
  const { language } = useLanguage();
  const copy = getLocale(language).yearEndMeeting;
  const checklist = copy.checklist as ChecklistItem[];
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set(["statements"]));
  const [selectedYear, setSelectedYear] = useState(2026);
  const completedCount = completedItems.size;
  const progress = Math.round((completedCount / checklist.length) * 100);
  const progressLabel = useMemo(() => copy.ready.replace("{count}", String(completedCount)).replace("{total}", String(checklist.length)), [completedCount, checklist.length, copy.ready]);
  const history = copy.history;
  const historyData = historicalData[selectedYear];
  const maxHistoryValue = historyData
    ? Math.max(...historyData.cash, ...historyData.revenue, ...historyData.costs)
    : 0;
  const historyAxisLabels = [maxHistoryValue, maxHistoryValue / 2, 0];

  const toggleChecklistItem = (id: string) => {
    setCompletedItems((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className="yearEndMeetingPage">
      <header className="yearEndMeetingPage__header">
        <div><h1>{copy.title}</h1><p>{copy.intro}</p></div>
      </header>

      <div className="yearEndMeetingPage__yearLayout">
        <nav className="yearEndMeetingPage__yearTabs" aria-label={copy.yearSelection}>
          {[2026, 2025, 2024].map((year) => (
            <button
              key={year}
              type="button"
              className={`yearEndMeetingPage__yearTab${selectedYear === year ? " yearEndMeetingPage__yearTab--active" : ""}`}
              aria-current={selectedYear === year ? "page" : undefined}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </nav>

        <div className="yearEndMeetingPage__yearContent">
        {selectedYear === 2026 ? <>

      <section className="yearEndMeetingPage__progress" aria-label={copy.progressLabel}>
        <div>
          <h2>{copy.preparation}</h2>
          <p>{progress === 100 ? copy.progressComplete : copy.progressIncomplete}</p>
        </div>
        <strong>{progressLabel}</strong>
        <div className="yearEndMeetingPage__progressTrack" aria-hidden><span style={{ width: `${progress}%` }} /></div>
      </section>

      <section className="yearEndMeetingPage__grid">
        <div className="yearEndMeetingPage__panel">
          <div className="yearEndMeetingPage__panelHeader">
            <div>
                <h2>{copy.checklistTitle}</h2>
              <p>{copy.checklistIntro}</p>
            </div>
          </div>
          <div className="yearEndMeetingPage__checklist">
            {checklist.map((item) => {
              const complete = completedItems.has(item.id);
              return (
                <div key={item.id} className={`yearEndMeetingPage__checkItem${complete ? " yearEndMeetingPage__checkItem--complete" : ""}`}>
                  <Checkbox
                    id={`year-end-${item.id}`}
                    name={`year-end-${item.id}`}
                    label={item.label}
                    checked={complete}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="yearEndMeetingPage__carbonCheckbox"
                  />
                  <small>{item.description}</small>
                </div>
              );
            })}
          </div>
        </div>

        <div className="yearEndMeetingPage__panel">
          <div className="yearEndMeetingPage__panelHeader">
            <div>
                <h2>{copy.agendaTitle}</h2>
              <p>{copy.agendaIntro}</p>
            </div>
          </div>
          <div className="yearEndMeetingPage__agenda">
            {copy.agenda.map((item, index) => (
              <div className="yearEndMeetingPage__agendaItem" key={item.title}>
                <Badge
                  counter={index + 1}
                  size="medium"
                  variant="subtle"
                  aria-label={`${copy.agendaItem} ${index + 1}`}
                />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <span className="yearEndMeetingPage__agendaTime">{item.time}</span>
              </div>
            ))}
          </div>
          <button type="button" className="yearEndMeetingPage__addButton"><Icon type="plus" aria-hidden /> {copy.addAgenda}</button>
        </div>
      </section>

        </> : (
          <section className="yearEndMeetingPage__history" aria-label={`${history.title} ${selectedYear}`}>
            <div className="yearEndMeetingPage__historyKpis">
              {[
                [history.cashPosition, historyData.cash[11]],
                [history.revenue, historyData.revenue.reduce((sum, value) => sum + value, 0)],
                [history.operatingCosts, historyData.costs.reduce((sum, value) => sum + value, 0)],
                [history.closingPosition, historyData.cash[11]],
              ].map(([label, value]) => <div className="yearEndMeetingPage__historyKpi" key={label}><strong>{formatWholeEur(Number(value), language)}</strong><span>{label}</span></div>)}
            </div>
            <div className="yearEndMeetingPage__historyGrid">
              <div className="yearEndMeetingPage__historyPanel"><h3>{history.cashTrend}</h3><div className="yearEndMeetingPage__historyChartFrame"><div className="yearEndMeetingPage__historyYAxis">{historyAxisLabels.map((value) => <span key={value}>{formatWholeEur(value, language)}</span>)}</div><div className="yearEndMeetingPage__historyChart">{historyData.cash.map((value, index) => <div className="yearEndMeetingPage__historyBarGroup" key={history.months[index]}><span style={{ height: `${Math.max(8, (value / maxHistoryValue) * 100)}%` }} /><small>{history.months[index]}</small></div>)}</div></div></div>
              <div className="yearEndMeetingPage__historyPanel"><h3>{history.revenueTrend}</h3><div className="yearEndMeetingPage__historyChartFrame"><div className="yearEndMeetingPage__historyYAxis">{historyAxisLabels.map((value) => <span key={value}>{formatWholeEur(value, language)}</span>)}</div><div className="yearEndMeetingPage__historyChart yearEndMeetingPage__historyChart--dual">{historyData.revenue.map((value, index) => <div className="yearEndMeetingPage__historyBarGroup" key={history.months[index]}><span className="yearEndMeetingPage__historyBar--revenue" style={{ height: `${Math.max(8, (value / maxHistoryValue) * 100)}%` }} /><span className="yearEndMeetingPage__historyBar--cost" style={{ height: `${Math.max(8, (historyData.costs[index] / maxHistoryValue) * 100)}%` }} /><small>{history.months[index]}</small></div>)}</div></div></div>
            </div>
          </section>
        )}
        </div>
      </div>

    </main>
  );
}
