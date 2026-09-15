import type { ReactNode } from "react";
import Box from "carbon-react/lib/components/box";

export const fullWidthFieldProps = {
  maxWidth: "100%",
  inputWidth: 100,
};

type RecordFormRowProps = {
  children: ReactNode;
  className?: string;
};

export function RecordFormRow({ children, className }: RecordFormRowProps) {
  return (
    <Box className={`salesQuoteCreate__formRow ${className ?? ""}`.trim()}>{children}</Box>
  );
}

type RecordFormCellProps = {
  children: ReactNode;
  className?: string;
};

export function RecordFormCell({ children, className }: RecordFormCellProps) {
  return (
    <Box className={`salesQuoteCreate__formCell ${className ?? ""}`.trim()}>{children}</Box>
  );
}
