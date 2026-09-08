import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import { useLanguage } from "../context/useLanguage";

const threads = [
  { title: "Documents needed for your VAT return", body: "Your accountant is preparing the VAT return for the period ending 30 June 2026. Please upload the remaining documents before 7 August so they can complete the review.", items: ["Upload missing purchase invoices", "Add receipts for business expenses", "Confirm any credit notes issued in June"], action: "View document request", time: "8 minutes" },
  { title: "Year-end documents to upload", body: "Your accountant has requested a few documents ahead of the year-end review. Upload them by 15 September to keep the accounts preparation on schedule.", items: ["Upload the latest bank statements", "Share asset purchase invoices and finance agreements", "Add details of outstanding customer balances"], action: "Upload documents", time: "5 minutes" },
  { title: "Accountant comments to review", body: "Camille Martin has added comments to three documents in your client file. Review the questions and reply before the next accounts review.", items: ["Confirm the purpose of the largest expense", "Answer the question on the supplier invoice", "Approve the draft document summary"], action: "Review comments", time: "4 minutes" },
  { title: "Document deadline approaching", body: "The deadline to send supporting documents for Boulangerie des Lilas is approaching. Your accountant is waiting for the final sales export and insurance certificate.", items: [], action: "Send documents", time: "" },
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
            <textarea id="advisor-question" aria-label={isFrench ? "Envoyer un message à l’AI Advisor" : "Message AI Advisor"} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={isFrench ? "Posez une question sur votre entreprise" : "Ask a question about your business"} />
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
