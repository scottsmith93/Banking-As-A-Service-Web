import { useMemo, useState } from "react";
import Badge from "carbon-react/lib/components/badge";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import Icon from "carbon-react/lib/components/icon";
import { useLanguage } from "../context/useLanguage";

type ChecklistItem = {
  id: string;
  label: string;
  description: string;
};

const checklist: ChecklistItem[] = [
  {
    id: "statements",
    label: "Previous financial statements",
    description: "Review the latest statements before the meeting.",
  },
  {
    id: "agenda",
    label: "Agenda confirmed",
    description: "Agree the topics and questions to cover together.",
  },
  {
    id: "documents",
    label: "Documents gathered",
    description: "Make sure your accountant has the documents they need.",
  },
  {
    id: "points",
    label: "Points to address",
    description: "Capture decisions, concerns and follow-up questions.",
  },
  {
    id: "client-pack",
    label: "Client pack ready",
    description: "Prepare the final pack to take away after the meeting.",
  },
];

const agendaItems = [
  { time: "10 min", title: "Review the year", detail: "Look back at performance and key financial statements." },
  { time: "15 min", title: "Open points", detail: "Work through questions, missing documents and decisions." },
  { time: "15 min", title: "Plan ahead", detail: "Agree actions, owners and priorities for the next period." },
];

export default function YearEndMeetingPage() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set(["statements"]));
  const completedCount = completedItems.size;
  const progress = Math.round((completedCount / checklist.length) * 100);
  const progressLabel = useMemo(() => `${completedCount} of ${checklist.length} ready`, [completedCount]);
  const translatedChecklist = isFrench
    ? checklist.map((item) => ({
      ...item,
      label: {
        statements: "États financiers précédents",
        agenda: "Ordre du jour confirmé",
        documents: "Documents réunis",
        points: "Points à aborder",
        "client-pack": "Dossier client prêt",
      }[item.id],
      description: {
        statements: "Consultez les derniers états avant la réunion.",
        agenda: "Convenez ensemble des sujets et des questions à traiter.",
        documents: "Vérifiez que votre comptable dispose des documents nécessaires.",
        points: "Notez les décisions, préoccupations et questions de suivi.",
        "client-pack": "Préparez le dossier final à emporter après la réunion.",
      }[item.id],
    }))
    : checklist;
  const translatedAgenda = isFrench
    ? [
      { time: "10 min", title: "Revoir l’année", detail: "Examinez les résultats et les principaux états financiers." },
      { time: "15 min", title: "Points ouverts", detail: "Traitez les questions, les documents manquants et les décisions." },
      { time: "15 min", title: "Préparer la suite", detail: "Convenez des actions, des responsables et des priorités pour la prochaine période." },
    ]
    : agendaItems;

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
        <div>
          <h1>{isFrench ? "Réunion de fin d’exercice" : "Year end meeting"}</h1>
          <p>{isFrench ? "Préparez une conversation ciblée avec votre comptable sur l’année à venir." : "Prepare for a focused conversation with your accountant about the year ahead."}</p>
        </div>
      </header>

      <section className="yearEndMeetingPage__progress" aria-label={isFrench ? "Progression de la préparation de la réunion" : "Meeting preparation progress"}>
        <div>
          <h2>{isFrench ? "Préparation de la réunion" : "Meeting preparation"}</h2>
          <p>{progress === 100 ? (isFrench ? "Tout est prêt pour votre réunion." : "Everything is ready for your meeting.") : (isFrench ? "Complétez la liste avant de rencontrer votre comptable." : "Complete the checklist before you meet with your accountant.")}</p>
        </div>
        <strong>{isFrench ? `${completedCount} sur ${checklist.length} prêts` : progressLabel}</strong>
        <div className="yearEndMeetingPage__progressTrack" aria-hidden><span style={{ width: `${progress}%` }} /></div>
      </section>

      <section className="yearEndMeetingPage__grid">
        <div className="yearEndMeetingPage__panel">
          <div className="yearEndMeetingPage__panelHeader">
            <div>
                <h2>{isFrench ? "Liste de préparation" : "Preparation checklist"}</h2>
              <p>{isFrench ? "Gardez l’essentiel au même endroit." : "Keep the essentials in one place."}</p>
            </div>
          </div>
          <div className="yearEndMeetingPage__checklist">
            {translatedChecklist.map((item) => {
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
                <h2>{isFrench ? "Ordre du jour suggéré" : "Suggested agenda"}</h2>
              <p>{isFrench ? "Utilisez les documents fournis, les détails du calendrier et les conversations pour préparer la discussion." : "Use supplied documents, calendar details and conversations to inform the discussion."}</p>
            </div>
          </div>
          <div className="yearEndMeetingPage__agenda">
            {translatedAgenda.map((item, index) => (
              <div className="yearEndMeetingPage__agendaItem" key={item.title}>
                <Badge
                  counter={index + 1}
                  size="medium"
                  variant="subtle"
                  aria-label={`${isFrench ? "Point de l’ordre du jour" : "Agenda item"} ${index + 1}`}
                />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <span className="yearEndMeetingPage__agendaTime">{item.time}</span>
              </div>
            ))}
          </div>
          <button type="button" className="yearEndMeetingPage__addButton"><Icon type="plus" aria-hidden /> {isFrench ? "Ajouter un point à l’ordre du jour" : "Add an agenda point"}</button>
        </div>
      </section>

    </main>
  );
}
