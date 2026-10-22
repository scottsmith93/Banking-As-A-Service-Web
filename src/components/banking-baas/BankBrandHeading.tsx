import { useState } from "react";
import Typography from "carbon-react/lib/components/typography";

export default function BankBrandHeading({ bank }: { bank: { id: string; name: string; logo: string } }) {
  const [failed, setFailed] = useState(false);
  // Use the original wordmark as the heading, avoiding a repeated bank name beside it.
  return <Typography variant="h2" as="h2" id={`bank-heading-${bank.id}`} className="bankAccountGroup__brand">
    {failed ? bank.name : <img src={bank.logo} alt={bank.name} referrerPolicy="no-referrer" onError={() => setFailed(true)} />}
  </Typography>;
}
