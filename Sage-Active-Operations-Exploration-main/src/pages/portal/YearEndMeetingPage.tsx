import { useMemo, useState } from "react";
import Badge from "carbon-react/lib/components/badge";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import Icon from "carbon-react/lib/components/icon";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";

type ChecklistItem = {
  id: string;
  label: string;
  description: string;
};

export default function YearEndMeetingPage() {
  const { language } = useLanguage();
  const copy = getLocale(language).yearEndMeeting;
  const checklist = copy.checklist as ChecklistItem[];
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set(["statements"]));
  const completedCount = completedItems.size;
  const progress = Math.round((completedCount / checklist.length) * 100);
  const progressLabel = useMemo(() => copy.ready.replace("{count}", String(completedCount)).replace("{total}", String(checklist.length)), [completedCount, checklist.length, copy.ready]);

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

    </main>
  );
}
