import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import { useLanguage } from "../context/useLanguage";

const threads = [
  { title: "Afternoon briefing", body: "7 incoming bank transactions need review across BNP Paribas, Crédit Agricole, and American Express. Cash sits at 20 436,06 €, with overdue invoices and bills due soon.", items: ["Review 7 pending bank transactions", "Chase 675,75 € across 3 overdue invoices", "Pay 2 bills due this week totaling 606,40 €"], action: "Open briefing", time: "8 minutes" },
  { title: "VAT return 1 April to 30 June 2026", body: "Needs submitting by 7 August 2026. Net VAT to pay is 15 470,00 € — the checks are complete and the return is ready to send to the DGFiP.", items: ["Sales invoices match taxable outputs", "Purchase invoices match deductible inputs", "French VAT rates have been applied correctly"], action: "Review VAT", time: "3 minutes" },
  { title: "Bank transactions to review", body: "64 transactions were coded automatically. 7 have category suggestions ready for review.", items: [], action: "Review transactions", time: "5 minutes" },
  { title: "Verify supplier bank details", body: "Fournitures Montclair payment is on hold until the new French bank account is confirmed.", items: [], action: "Review payment hold", time: "" },
];

const activity = [
  ["Copilot", "15:48", "Facture de vente pour Boulangerie des Lilas : 523,14 €"],
  ["Copilot", "16:41", "Devis DV-1184 envoyé à Atelier Lumière"],
  ["Camille", "16:12", "Déclaration sociale nominative (DSN) transmise pour 14 salariés"],
  ["Copilot", "07:40", "64 opérations bancaires lettrées automatiquement"],
  ["Vous", "04 sept.", "Virement fournisseur de 18 420,60 € approuvé"],
];

export default function AIAdvisorPage() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  const [question, setQuestion] = useState("");
  return (
    <Box className="pageContent aiAdvisorPage">
      <Box className="aiAdvisorPage__layout">
        <Box className="aiAdvisorPage__main">
          <Typography variant="h1" as="h1">AI Advisor</Typography>
          <Typography variant="p" as="p" className="aiAdvisorPage__subtitle">
            {isFrench ? "Posez une question à l’IA sur votre entreprise ou envoyez un message à votre comptable." : "Ask AI about your business or send messages to your Accountant."}
          </Typography>
          <Box className="aiAdvisorPage__composer">
            <label htmlFor="advisor-question">{isFrench ? "Envoyer un message à l’AI Advisor" : "Message AI Advisor"}</label>
            <textarea id="advisor-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={isFrench ? "Posez une question sur votre entreprise" : "Ask a question about your business"} />
            <Box className="aiAdvisorPage__composerActions"><Button variant="default" variantType="tertiary" size="small" aria-label={isFrench ? "Ajouter" : "Add"}>+</Button><Button variant="default" variantType="primary" size="small" aria-label={isFrench ? "Envoyer" : "Send"} disabled={!question.trim()}>↑</Button></Box>
          </Box>
          <Box className="aiAdvisorPage__sectionHeader"><Typography variant="h2" as="h2">{isFrench ? "Pour vous" : "For you"}</Typography></Box>
          <Box className="aiAdvisorPage__threads">
            {threads.map((thread) => <Box className="aiAdvisorPage__thread" key={thread.title}><Typography variant="h3" as="h3">{thread.title}</Typography><Typography variant="p" as="p">{thread.body}</Typography>{thread.items.length > 0 && <ul>{thread.items.map((item) => <li key={item}><Icon type="tick" aria-hidden />{item}</li>)}</ul>}<Box className="aiAdvisorPage__threadFooter"><Typography variant="p" as="p">{thread.time && `${isFrench ? "Temps estimé :" : "Estimated time to complete:"} ${thread.time}`}</Typography><Button variant="default" variantType="secondary" size="small">{isFrench ? "Consulter" : thread.action}</Button><span aria-hidden="true">⋮</span></Box></Box>)}
          </Box>
        </Box>
        <Box className="aiAdvisorPage__activity"><Typography variant="h2" as="h2">{isFrench ? "Activité récente" : "Recent activity"}</Typography><ol>{activity.map(([author, time, message]) => <li key={`${author}-${time}`}><span className="aiAdvisorPage__activityDot" aria-hidden="true" /><Box><Typography variant="small" as="p"><strong>{author}</strong> {time}</Typography><Typography variant="p" as="p">{message}</Typography><Typography variant="small" as="p">{isFrench ? "Mis à jour récemment…" : "Based on the latest activity…"}</Typography></Box></li>)}</ol><a href="#activity">{isFrench ? "Voir toute l’activité →" : "View activity →"}</a></Box>
      </Box>
    </Box>
  );
}
