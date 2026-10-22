import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Link from "carbon-react/lib/components/link";
import Typography from "carbon-react/lib/components/typography";
import type { BankTransaction } from "../../../data/bankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { interpolate } from "../../../utils/interpolate";

export default function BaasTransactionLocation({ transaction }: { transaction: BankTransaction }) {
  const { copy, locale } = useTransactionPresentation();
  const location = transaction.location;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY as string | undefined;
  return <section className="baasTransactionLocation" aria-label={copy.location}>
    <Typography variant="strong" as="h3">{copy.location}</Typography>
    {location ? <>
      {apiKey ? <iframe
        className="baasTransactionLocation__map" title={interpolate(copy.mapTitle, { merchant: transaction.merchant })}
        src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(`${location.latitude},${location.longitude}`)}&language=${locale.slice(0, 2)}`}
        loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
      /> : <Box className="baasTransactionLocation__address" display="flex" alignItems="center" gap={2}><Icon type="location" aria-hidden /><Typography variant="p" as="p">{location.address}</Typography></Box>}
      <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">{copy.viewOnMap}</Link>
      <Typography variant="small" as="p">{copy.mapCaption}</Typography>
    </> : <Typography variant="small" as="p">{copy.onlineLocation}</Typography>}
  </section>;
}
