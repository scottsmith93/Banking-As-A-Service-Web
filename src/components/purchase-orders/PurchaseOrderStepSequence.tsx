import { StepSequence, StepSequenceItem } from "carbon-react/lib/components/step-sequence";
import DocumentHeaderCard from "../document-header/DocumentHeaderCard";
import { getOrderStatusSteps, type PurchaseOrderStatus } from "../../data/purchaseOrders";

type PurchaseOrderStepSequenceProps = {
  status: PurchaseOrderStatus;
};

export default function PurchaseOrderStepSequence({ status }: PurchaseOrderStepSequenceProps) {
  const steps = getOrderStatusSteps(status);

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
