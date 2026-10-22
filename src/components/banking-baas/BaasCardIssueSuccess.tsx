import { useEffect, useRef } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Typography from "carbon-react/lib/components/typography";
import BaasCardCelebration from "./BaasCardCelebration";

type BaasCardIssueSuccessProps = {
  copy: { title: string; description: string; manageCard: string; createAnother: string };
  onManage: () => void;
  onCreateAnother: () => void;
};

export default function BaasCardIssueSuccess({ copy, onManage, onCreateAnother }: BaasCardIssueSuccessProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    // Bring confirmation into view after submitting at the bottom of the long form.
    const scrollContainer = content?.closest('[data-element="sidebar-content"]');
    if (scrollContainer) scrollContainer.scrollTop = 0;
    content?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="baasCardIssueSuccess" ref={contentRef}>
      <BaasCardCelebration />
      <Box display="flex" flexDirection="column" gap={1} role="status">
        <h2 tabIndex={-1}><Typography variant="h2" as="span">{copy.title}</Typography></h2>
        <Typography variant="p" as="p">{copy.description}</Typography>
      </Box>
      <Box className="baasCardIssueSuccess__actions" display="flex" flexWrap="wrap" justifyContent="center">
        <Button variantType="secondary" onClick={onManage}>{copy.manageCard}</Button>
        <Button variantType="primary" iconType="add" iconPosition="before" onClick={onCreateAnother}>{copy.createAnother}</Button>
      </Box>
    </div>
  );
}
