import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import type { CardType } from "./baasCardIssueTypes";

type Props = {
  cardType: CardType;
  isProcessing: boolean;
  errors: Record<string, boolean>;
  validationAttempt: number;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export default function BaasCardIssueFormFrame({ cardType, isProcessing, errors, validationAttempt, onSubmit, children }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const lastAttempt = useRef(0);
  useEffect(() => {
    const form = formRef.current;
    const scrollContainer = form?.closest('[data-element="sidebar-content"]');
    if (scrollContainer) scrollContainer.scrollTop = 0;
    form?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  }, [cardType]);
  useEffect(() => {
    if (validationAttempt === lastAttempt.current) return;
    lastAttempt.current = validationAttempt;
    if (Object.values(errors).some(Boolean)) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors, validationAttempt]);
  return <form className="baasIssueForm" ref={formRef} onSubmit={onSubmit} aria-busy={isProcessing} noValidate>{children}</form>;
}
