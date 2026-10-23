import Typography from "carbon-react/lib/components/typography";
import BankLogo from "../banking/BankLogo";

export default function BankBrandHeading({ bank }: { bank: { id: string; name: string; logo: string } }) {
  // The actual bank icon and full bank name remain legible even at compact heading sizes.
  return <Typography variant="h2" as="h2" id={`bank-heading-${bank.id}`} className="bankAccountGroup__brand">
    <BankLogo src={bank.logo} />{bank.name}
  </Typography>;
}
