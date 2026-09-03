import { useId, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import DialogComponent from "carbon-react/lib/components/dialog";
import FileInput from "carbon-react/lib/components/file-input";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import Link from "carbon-react/lib/components/link";
import { Option, Select } from "carbon-react/lib/components/select";
import { StepSequence, StepSequenceItem } from "carbon-react/lib/components/step-sequence";
import Switch from "carbon-react/lib/components/switch";
import Textarea from "carbon-react/lib/components/textarea";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import type { ProductOrServiceCategory } from "../../data/productsAndServices";

type CreateItemDialogProps = {
  open: boolean;
  onClose: () => void;
};

type WizardStep = 1 | 2;

function blankFormState() {
  return {
    name: "",
    itemId: "",
    type: "" as ProductOrServiceCategory | "",
    category: "",
    description: "",
    stockManaged: false,
    purchased: false,
    manufactured: false,
    sold: false,
  };
}

export default function CreateItemDialog({ open, onClose }: CreateItemDialogProps) {
  const idPrefix = useId();
  const [step, setStep] = useState<WizardStep>(1);
  const [form, setForm] = useState(blankFormState());

  const handleClose = () => {
    onClose();
    setStep(1);
    setForm(blankFormState());
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleCreate = () => {
    // PROTOTYPE: simulate successful save — replace with API call
    handleClose();
  };

  return (
    <DialogComponent
      open={open}
      onCancel={handleClose}
      title="New item"
      size="large"
      stickyFooter
      footer={
        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={3}>
          <Link onClick={handleClose}>Cancel</Link>
          {step === 1 ? (
            <Button variantType="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Box display="flex" gap={2}>
              <Button variantType="secondary" onClick={handleBack}>
                Back
              </Button>
              <Button variantType="primary" onClick={handleCreate}>
                Create
              </Button>
            </Box>
          )}
        </Box>
      }
    >
      <Box className="createItemDialog__steps">
        <StepSequence orientation="horizontal" aria-label="New item steps">
          <StepSequenceItem
            aria-label="Information"
            hiddenCompleteLabel="Complete"
            hiddenCurrentLabel="Current"
            indicator="1"
            status={step === 1 ? "current" : "complete"}
          >
            Information
          </StepSequenceItem>
          <StepSequenceItem
            aria-label="Management"
            hiddenCompleteLabel="Complete"
            hiddenCurrentLabel="Current"
            indicator="2"
            status={step === 2 ? "current" : "incomplete"}
          >
            Management
          </StepSequenceItem>
        </StepSequence>
      </Box>

      {step === 1 ? (
        <Box className="createItemDialog__columns" display="flex" gap={3}>
          <Box className="createItemDialog__card createItemDialog__informationCard">
            <Typography variant="strong" as="p" className="createItemDialog__cardTitle">
              Information
            </Typography>

            <Box className="createItemDialog__field">
              <Textbox
                id={`${idPrefix}-name`}
                label="Name"
                required
                autoFocus
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />
            </Box>

            <Box className="createItemDialog__field">
              <Textbox
                id={`${idPrefix}-item-id`}
                label="ID"
                required
                value={form.itemId}
                onChange={(event) => setForm((current) => ({ ...current, itemId: event.target.value }))}
              />
            </Box>

            <Box className="createItemDialog__field">
              <Select
                id={`${idPrefix}-type`}
                label="Type"
                required
                placeholder="<Select option>"
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    type: event.target.value as ProductOrServiceCategory,
                  }))
                }
              >
                <Option text="Product" value="Product" />
                <Option text="Service" value="Service" />
              </Select>
            </Box>

            <Box className="createItemDialog__field">
              <Box className="createItemDialog__categoryRow" display="flex" alignItems="flex-end" gap={1}>
                <Box className="createItemDialog__categoryInput">
                  <Textbox
                    id={`${idPrefix}-category`}
                    label="Category"
                    required
                    placeholder="<Start typing>"
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, category: event.target.value }))
                    }
                  />
                </Box>
                <Box className="createItemDialog__categorySearch">
                  <IconButton
                    aria-label="Search categories"
                    onClick={() => {
                      // PROTOTYPE: wire to a category picker when available
                    }}
                  >
                    <Icon type="search" />
                  </IconButton>
                </Box>
              </Box>
              <Link
                onClick={() => {
                  // PROTOTYPE: wire to a category detail view when available
                }}
              >
                View detail
              </Link>
            </Box>

            <Box className="createItemDialog__field">
              <Textarea
                id={`${idPrefix}-description`}
                label="Description"
                characterLimit={200}
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
              />
            </Box>
          </Box>

          <Box className="createItemDialog__card createItemDialog__imageCard">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className="createItemDialog__cardTitleRow"
            >
              <Typography variant="strong" as="p" className="createItemDialog__cardTitle">
                Image
              </Typography>
              <IconButton
                aria-label="More image actions"
                onClick={() => {
                  // PROTOTYPE: wire to an image actions menu when available
                }}
              >
                <Icon type="ellipsis_vertical" />
              </IconButton>
            </Box>

            <Box className="createItemDialog__imageDropzone">
              <FileInput
                id={`${idPrefix}-image`}
                isVertical
                onChange={() => {
                  // PROTOTYPE: wire to an upload flow when available
                }}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="createItemDialog__columns">
          <Box className="createItemDialog__card createItemDialog__managementCard">
            <Typography variant="strong" as="p" className="createItemDialog__cardTitle">
              Management
            </Typography>

            <Box className="createItemDialog__switches" display="flex" gap={4}>
              <Switch
                id={`${idPrefix}-stock-managed`}
                label="Stock management"
                checked={form.stockManaged}
                onChange={(event) =>
                  setForm((current) => ({ ...current, stockManaged: event.target.checked }))
                }
              />
              <Switch
                id={`${idPrefix}-purchased`}
                label="Purchased"
                checked={form.purchased}
                onChange={(event) =>
                  setForm((current) => ({ ...current, purchased: event.target.checked }))
                }
              />
              <Switch
                id={`${idPrefix}-manufactured`}
                label="Manufactured"
                checked={form.manufactured}
                onChange={(event) =>
                  setForm((current) => ({ ...current, manufactured: event.target.checked }))
                }
              />
              <Switch
                id={`${idPrefix}-sold`}
                label="Sold"
                checked={form.sold}
                onChange={(event) =>
                  setForm((current) => ({ ...current, sold: event.target.checked }))
                }
              />
            </Box>
          </Box>
        </Box>
      )}
    </DialogComponent>
  );
}
