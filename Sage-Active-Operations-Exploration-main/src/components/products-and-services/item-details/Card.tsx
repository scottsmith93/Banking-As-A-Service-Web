import type { ReactNode } from "react";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/** Bordered container matching this project's established card pattern (see .documentHeaderCard). */
export function Card({ children, className }: CardProps) {
  return <Box className={`itemDetailsCard ${className ?? ""}`.trim()}>{children}</Box>;
}

type CardHeaderProps = {
  children: ReactNode;
  right?: ReactNode;
  className?: string;
};

export function CardHeader({ children, right, className }: CardHeaderProps) {
  return (
    <Box
      className={`itemDetailsCard__header ${className ?? ""}`.trim()}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box className="itemDetailsCard__headerText">{children}</Box>
      {right && <Box className="itemDetailsCard__headerRight">{right}</Box>}
    </Box>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h4" as="h3" className="itemDetailsCard__title">
      {children}
    </Typography>
  );
}

export function CardDescription({ children }: { children: ReactNode }) {
  return (
    <Typography variant="p" as="p" className="itemDetailsCard__description">
      {children}
    </Typography>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <Box className={`itemDetailsCard__content ${className ?? ""}`.trim()}>{children}</Box>;
}
