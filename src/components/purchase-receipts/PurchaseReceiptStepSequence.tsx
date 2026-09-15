import { StepSequence, StepSequenceItem } from "carbon-react/lib/components/step-sequence";
import DocumentHeaderCard from "../document-header/DocumentHeaderCard";
import { getReceiptStatusSteps, type PurchaseReceiptStatus } from "../../data/purchaseReceipts";

type PurchaseReceiptStepSequenceProps = {
  status: PurchaseReceiptStatus;
};

export default function PurchaseReceiptStepSequence({ status }: PurchaseReceiptStepSequenceProps) {
  const steps = getReceiptStatusSteps(status);

  return (
    <DocumentHeaderCard
      sections={[
        <StepSequence key="steps" orientation="vertical">
          {steps.map((step, index) => (
            <StepSequenceItem
              key={step.label}
              aria-label={step.label}
              hiddenCompleteLabel="Complete"
              hiddenCurrentLabel="Current"
              indicator={String(index + 1)}
              status={step.complete ? "complete" : step.current ? "current" : "incomplete"}
            >
              {step.label}
            </StepSequenceItem>
          ))}
        </StepSequence>,
      ]}
    />
  );
}
