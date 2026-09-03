import { useMemo } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import Textarea from "carbon-react/lib/components/textarea";
import TextEditor, { createFromHTML } from "carbon-react/lib/components/text-editor";
import { Tile, TileContent } from "carbon-react/lib/components/tile";
import Typography from "carbon-react/lib/components/typography";
import {
  defaultFinalInvoiceNotes,
  defaultIntroductoryNotes,
} from "../../data/invoiceCreateForm";

const toolbarControls = [
  "typography",
  "bold",
  "italic",
  "underline",
  "unordered-list",
  "ordered-list",
  "link",
] as const;

function paragraphsToLexicalJson(paragraphs: string[]): string {
  return createFromHTML(paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join(""));
}

type ReadOnlyFieldProps = {
  label: string;
  value: string;
};

function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <Box className="salesInvoiceCreate__readOnlyField">
      <Typography variant="strong" as="p" className="salesInvoiceCreate__readOnlyLabel">
        {label}
      </Typography>
      <Typography variant="p" as="p" className="salesInvoiceCreate__readOnlyValue">
        {value}
      </Typography>
    </Box>
  );
}

type InvoiceNotesSectionProps = {
  fieldIdPrefix: string;
  internalNotes: string;
  onInternalNotesChange: (value: string) => void;
  onIntroductoryNotesChange: (value: string) => void;
  onFinalInvoiceNotesChange: (value: string) => void;
};

export default function InvoiceNotesSection({
  fieldIdPrefix,
  internalNotes,
  onInternalNotesChange,
  onIntroductoryNotesChange,
  onFinalInvoiceNotesChange,
}: InvoiceNotesSectionProps) {
  const introductoryNotesInitialValue = useMemo(
    () => paragraphsToLexicalJson(defaultIntroductoryNotes),
    [],
  );
  const finalInvoiceNotesInitialValue = useMemo(
    () => paragraphsToLexicalJson(defaultFinalInvoiceNotes),
    [],
  );

  return (
    <Box className="salesInvoiceCreate__notesCard">
      <Tile roundness="default" p={3}>
        <TileContent>
          <Box display="flex" alignItems="center" className="salesInvoiceCreate__sectionTitleGroup">
            <Icon type="bullet_list_dotted" color="--colorsActionMajor500" />
            <Typography variant="strong" as="p" className="salesInvoiceCreate__sectionTitle">
              Notes
            </Typography>
          </Box>

          <Box className="salesInvoiceCreate__notesGrid">
            <Box className="salesInvoiceCreate__notesColumn">
              <TextEditor
                id={`${fieldIdPrefix}-introductory-notes`}
                labelText="Introductory notes"
                inputHint="Add a personalised introduction to this invoice."
                required
                characterLimit={500}
                initialValue={introductoryNotesInitialValue}
                toolbarControls={[...toolbarControls]}
                onChange={(value) => onIntroductoryNotesChange(value)}
                header={
                  <Button
                    variantType="subtle"
                    iconType="chat"
                    iconPosition="before"
                    className="salesInvoiceCreate__aiButton"
                  >
                    Draft with Copilot
                  </Button>
                }
              />

              <TextEditor
                id={`${fieldIdPrefix}-final-invoice-notes`}
                labelText="Final invoice notes"
                inputHint="This includes notes from your document preferences and customer records. To be shown after totals in your invoice document."
                required
                characterLimit={600}
                initialValue={finalInvoiceNotesInitialValue}
                toolbarControls={[...toolbarControls]}
                onChange={(value) => onFinalInvoiceNotesChange(value)}
              />
            </Box>

            <Box className="salesInvoiceCreate__notesColumn">
              <Textarea
                id={`${fieldIdPrefix}-internal-notes`}
                label="Internal notes"
                fieldHelp="Add notes for this invoice. These notes are not shown to your customer."
                characterLimit={1000}
                value={internalNotes}
                onChange={(event) => onInternalNotesChange(event.target.value)}
                rows={4}
              />

              <ReadOnlyField label="External order number" value="No number" />
              <ReadOnlyField
                label="Software version"
                value="This is assigned when your invoice is finalised."
              />
            </Box>
          </Box>
        </TileContent>
      </Tile>
    </Box>
  );
}
