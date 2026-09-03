import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

// Buttons & actions
import Button from "carbon-react/lib/components/button/__next__";
import ButtonBar from "carbon-react/lib/components/button-bar";
import {
  ButtonToggle,
  ButtonToggleGroup,
} from "carbon-react/lib/components/button-toggle";
import IconButton from "carbon-react/lib/components/icon-button";
import MultiActionButton from "carbon-react/lib/components/multi-action-button";
import SplitButton from "carbon-react/lib/components/split-button";

// Form inputs
import { Checkbox } from "carbon-react/lib/components/checkbox";
import Switch from "carbon-react/lib/components/switch";
import Textbox from "carbon-react/lib/components/textbox";
import Textarea from "carbon-react/lib/components/textarea";
import Search from "carbon-react/lib/components/search";
import DateInput from "carbon-react/lib/components/date";
import DateRange from "carbon-react/lib/components/date-range";
import Decimal from "carbon-react/lib/components/decimal";
import Number from "carbon-react/lib/components/number";
import NumeralDate from "carbon-react/lib/components/numeral-date";
import Password from "carbon-react/lib/components/password";
import FileInput from "carbon-react/lib/components/file-input";
import GroupedCharacter from "carbon-react/lib/components/grouped-character";
import {
  SimpleColorPicker,
  SimpleColor,
} from "carbon-react/lib/components/simple-color-picker";
import {
  Select,
  Option,
} from "carbon-react/lib/components/select";
import {
  RadioButton,
  RadioButtonGroup,
} from "carbon-react/lib/components/radio-button";

// Layout
import Card, { CardFooter } from "carbon-react/lib/components/card";
import Hr from "carbon-react/lib/components/hr";
import { Tile, TileContent } from "carbon-react/lib/components/tile";
import DismissibleBox from "carbon-react/lib/components/dismissible-box";
import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";

// Navigation
import {
  Accordion,
  AccordionGroup,
} from "carbon-react/lib/components/accordion";
import {
  Breadcrumbs,
  Crumb,
} from "carbon-react/lib/components/breadcrumbs";
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
} from "carbon-react/lib/components/tabs/__next__";
import Pager from "carbon-react/lib/components/pager";
import ProgressTracker from "carbon-react/lib/components/progress-tracker";
import {
  StepSequence,
  StepSequenceItem,
} from "carbon-react/lib/components/step-sequence";
import Link from "carbon-react/lib/components/link";

// Feedback & status
import Badge from "carbon-react/lib/components/badge";
import Pill from "carbon-react/lib/components/pill";
import Loader from "carbon-react/lib/components/loader/__next__";
import Message from "carbon-react/lib/components/message";

// Overlays
import Confirm from "carbon-react/lib/components/confirm";
import Dialog from "carbon-react/lib/components/dialog";
import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import Drawer from "carbon-react/lib/components/drawer";
import Sidebar from "carbon-react/lib/components/sidebar";
import {
  ActionPopover,
  ActionPopoverItem,
} from "carbon-react/lib/components/action-popover";

// Data display
import {
  FlatTable,
  FlatTableHead,
  FlatTableHeader,
  FlatTableBody,
  FlatTableRow,
  FlatTableCell,
} from "carbon-react/lib/components/flat-table";
import Portrait from "carbon-react/lib/components/portrait";
import Profile from "carbon-react/lib/components/profile";

// Utility
import Icon from "carbon-react/lib/components/icon";
import Help from "carbon-react/lib/components/help";

import { Time } from "carbon-react/lib/components/time";
import type { TimeValue } from "carbon-react/lib/components/time";
import Divider from "carbon-react/lib/components/divider";
import VerticalDivider from "carbon-react/lib/components/vertical-divider";
import ButtonMinor from "carbon-react/lib/components/button-minor";
import Pod from "carbon-react/lib/components/pod";
import Heading from "carbon-react/lib/components/heading";
import LoaderBar from "carbon-react/lib/components/loader-bar";
import { LoaderSpinner } from "carbon-react/lib/components/loader-spinner";
import LoaderStar from "carbon-react/lib/components/loader-star";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import Tooltip from "carbon-react/lib/components/tooltip";

// ─── Stateful preview wrappers ───────────────────────────────────────────────

function CheckboxPreview() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Accept terms"
      checked={checked}
      onChange={() => setChecked((c) => !c)}
      id="prev-checkbox"
      name="prev-checkbox"
    />
  );
}

function SwitchPreview() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Enable feature"
      checked={checked}
      onChange={() => setChecked((c) => !c)}
      id="prev-switch"
      name="prev-switch"
    />
  );
}

function TextboxPreview() {
  const [val, setVal] = useState("");
  return (
    <Textbox
      label="Label"
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
}

function TextareaPreview() {
  const [val, setVal] = useState("");
  return (
    <Box width="100%">
      <Textarea
        label="Notes"
        value={val}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setVal(e.target.value)
        }
      />
    </Box>
  );
}

function SearchPreview() {
  const [val, setVal] = useState("");
  return (
    <Search
      value={val}
      onChange={(e) => setVal(e.target.value)}
      placeholder="Search…"
    />
  );
}

function SelectPreview() {
  const [val, setVal] = useState("");
  return (
    <Box width="100%">
      <Select
        label="Choose one"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      >
        <Option text="Option A" value="a" />
        <Option text="Option B" value="b" />
        <Option text="Option C" value="c" />
      </Select>
    </Box>
  );
}

function RadioPreview() {
  const [val, setVal] = useState("a");
  return (
    <RadioButtonGroup
      name="prev-radio"
      legend="Choose"
      value={val}
      onChange={(e) => setVal(e.target.value)}
    >
      <RadioButton id="r1" value="a" label="Option A" />
      <RadioButton id="r2" value="b" label="Option B" />
    </RadioButtonGroup>
  );
}

function DatePreview() {
  const [value, setValue] = useState("");
  return (
    <DateInput
      label="Date"
      value={value}
      onChange={(ev) => setValue(ev.target.value.formattedValue)}
    />
  );
}

function DateRangePreview() {
  const [value, setValue] = useState<string[]>(["", ""]);
  return (
    <div className="dateRangePreviewStack">
      <DateRange
        startLabel="Start"
        endLabel="End"
        value={value}
        onChange={(ev) => {
          const [start, end] = ev.target.value;
          setValue([start.formattedValue, end.formattedValue]);
        }}
      />
    </div>
  );
}

function DecimalPreview() {
  const [value, setValue] = useState("");
  return (
    <Decimal
      label="Amount"
      value={value}
      precision={2}
      onChange={(ev) => setValue(ev.target.value.formattedValue)}
    />
  );
}

function NumberPreview() {
  const [value, setValue] = useState("10");
  return (
    <Number
      label="Quantity"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
}

function NumeralDatePreview() {
  const [value, setValue] = useState<{ dd?: string; mm?: string; yyyy?: string }>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  return (
    <NumeralDate
      label="Numeral date"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
}

function PasswordPreview() {
  const [value, setValue] = useState("");
  return (
    <Password
      label="Password"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
}

function FileInputPreview() {
  const [fileCount, setFileCount] = useState(0);
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FileInput
        label="Upload a file"
        isVertical
        minWidth="100%"
        maxWidth="100%"
        onChange={(files) => setFileCount(files.length)}
      />
      <Typography variant="small" as="span" color="blackOpacity55">
        Selected: {fileCount}
      </Typography>
    </Box>
  );
}

function GroupedCharacterPreview() {
  const [value, setValue] = useState("");
  return (
    <GroupedCharacter
      label="Reference"
      value={value}
      groups={[4, 4, 4]}
      separator=" "
      onChange={(ev) => setValue(ev.target.value.rawValue)}
    />
  );
}

function SimpleColorPickerPreview() {
  const indigo = "var(--colorsActionMajor500)";
  const info = "var(--colorsSemanticInfo500)";
  const amber = "var(--colorsSemanticCaution500)";

  const [value, setValue] = useState(indigo);
  return (
    <SimpleColorPicker
      legend="Theme colour"
      name="prev-simple-color"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
      childWidth={40}
    >
      <SimpleColor id="c-major" value={indigo} aria-label="Major action" />
      <SimpleColor id="c-info" value={info} aria-label="Info" />
      <SimpleColor id="c-caution" value={amber} aria-label="Caution" />
    </SimpleColorPicker>
  );
}

function TimePreview() {
  const [val, setVal] = useState<TimeValue>({ hours: "9", minutes: "30" });
  return (
    <Box width="100%">
      <Time
        label="Appointment time"
        name="preview-time"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </Box>
  );
}

function TooltipPreview() {
  return (
    <Tooltip message="Additional context appears here.">
      {/* Tooltip expects a DOM ref on its direct child; Box gives a stable host for listeners. */}
      <Box as="span" display="inline-flex" alignItems="center">
        <IconButton aria-label="Demo action" onClick={() => {}}>
          <Icon type="add" />
        </IconButton>
      </Box>
    </Tooltip>
  );
}

function DividerPreview() {
  return (
    <Box width="100%">
      <Typography variant="small" as="span">
        Above the rule
      </Typography>
      <Divider type="horizontal" />
      <Typography variant="small" as="span">
        Below the rule
      </Typography>
    </Box>
  );
}

function VerticalDividerPreview() {
  return (
    <Box display="flex" alignItems="stretch" gap={2} height="48px">
      <Typography variant="small" as="span">
        Left
      </Typography>
      <VerticalDivider />
      <Typography variant="small" as="span">
        Right
      </Typography>
    </Box>
  );
}

function GridPreview() {
  return (
    <Box width="100%">
      <GridContainer gridTemplateColumns="1fr 1fr" gridGap={2}>
        <GridItem>
          <Typography variant="small" as="span">
            Left cell
          </Typography>
        </GridItem>
        <GridItem>
          <Typography variant="small" as="span">
            Right cell
          </Typography>
        </GridItem>
      </GridContainer>
    </Box>
  );
}

function ButtonTogglePreview() {
  const [val, setVal] = useState("a");
  return (
    <ButtonToggleGroup
      id="prev-btg"
      label="View"
      value={val}
      onChange={(_e: React.MouseEvent<HTMLButtonElement>, v?: string) =>
        setVal(v ?? "")
      }
    >
      <ButtonToggle value="a">Day</ButtonToggle>
      <ButtonToggle value="b">Week</ButtonToggle>
      <ButtonToggle value="c">Month</ButtonToggle>
    </ButtonToggleGroup>
  );
}

function AccordionPreview() {
  return (
    <AccordionGroup>
      <Accordion title="Section one">
        <Typography variant="p" as="p">
          Content here.
        </Typography>
      </Accordion>
      <Accordion title="Section two">
        <Typography variant="p" as="p">
          More content.
        </Typography>
      </Accordion>
    </AccordionGroup>
  );
}

function TabsPreview() {
  return (
    <Tabs>
      <TabList ariaLabel="Navigation tabs">
        <Tab id="tab1" controls="panel1" label="First" />
        <Tab id="tab2" controls="panel2" label="Second" />
      </TabList>
      <TabPanel id="panel1" tabId="tab1">
        <Typography variant="p" as="p">
          First tab content.
        </Typography>
      </TabPanel>
      <TabPanel id="panel2" tabId="tab2">
        <Typography variant="p" as="p">
          Second tab content.
        </Typography>
      </TabPanel>
    </Tabs>
  );
}

function DialogPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onCancel={() => setOpen(false)}
        title="Example dialog"
      >
        <Typography variant="p" as="p">
          Dialog content goes here.
        </Typography>
      </Dialog>
    </>
  );
}

function ConfirmPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open confirm</Button>
      <Confirm
        open={open}
        title="Confirm action"
        subtitle="This action can’t be undone."
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        <Typography variant="p" as="p">
          Are you sure you want to continue?
        </Typography>
      </Confirm>
    </>
  );
}

function DialogFullScreenPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open full screen</Button>
      <DialogFullScreen
        open={open}
        onCancel={() => setOpen(false)}
        title="Full-screen dialog"
      >
        <Typography variant="p" as="p">
          Full-screen dialog content.
        </Typography>
      </DialogFullScreen>
    </>
  );
}

function SidebarPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={open}
        onCancel={() => setOpen(false)}
        header="Sidebar"
        subHeader="Overlay component preview"
        aria-label="Sidebar preview"
      >
        <Typography variant="p" as="p">
          Sidebar content.
        </Typography>
      </Sidebar>
    </>
  );
}

function DrawerPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", overflow: "hidden", height: "80px" }}>
      <Button onClick={() => setOpen((o) => !o)}>
        {open ? "Close drawer" : "Open drawer"}
      </Button>
      <Drawer
        expandedWidth="60%"
        animationDuration="0.15s"
        sidebar={
          <Typography variant="p" as="p">
            Sidebar
          </Typography>
        }
        expanded={open}
        onChange={() => setOpen((o) => !o)}
      >
        <span />
      </Drawer>
    </div>
  );
}

function DismissibleBoxPreview() {
  const [open, setOpen] = useState(true);
  return open ? (
    <DismissibleBox onClose={() => setOpen(false)}>
      <Typography variant="p" as="p">
        Dismissible content
      </Typography>
    </DismissibleBox>
  ) : (
    <Button onClick={() => setOpen(true)}>Show again</Button>
  );
}

function PagerPreview() {
  const [page, setPage] = useState(1);
  return (
    <Pager
      currentPage={page}
      totalRecords={100}
      pageSize={10}
      onPagination={(p) => setPage(p)}
    />
  );
}

// ─── Placeholder for system/abstract components ──────────────────────────────

function AbstractPlaceholder({ label }: { label: string }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="60px"
    >
      <Typography variant="small" as="span" color="blackOpacity55">
        {label}
      </Typography>
    </Box>
  );
}

// ─── Component card ───────────────────────────────────────────────────────────

type ComponentEntry = {
  name: string;
  slug: string;
  preview: React.ReactNode;
};

function ComponentCard({ comp }: { comp: ComponentEntry }) {
  return (
    <div className="componentCard">
      <div className="componentCard__preview">{comp.preview}</div>
      <div className="componentCard__footer">
        <span className="componentCard__name">{comp.name}</span>
        <a
          href={`https://carbon.sage.com/?path=/docs/${comp.slug}`}
          target="_blank"
          rel="noreferrer"
          className="componentCard__link"
          onClick={(e) => e.stopPropagation()}
        >
          Docs
        </a>
      </div>
    </div>
  );
}

// ─── Component groups ─────────────────────────────────────────────────────────

type GroupEntry = {
  title: string;
  description: string;
  components: ComponentEntry[];
};

const GROUPS: GroupEntry[] = [
  {
    title: "Form inputs",
    description: "Components for capturing user data in forms.",
    components: [
      { name: "Checkbox", slug: "checkbox", preview: <CheckboxPreview /> },
      { name: "Switch", slug: "switch", preview: <SwitchPreview /> },
      { name: "Textbox", slug: "textbox", preview: <TextboxPreview /> },
      { name: "Textarea", slug: "textarea", preview: <TextareaPreview /> },
      { name: "Search", slug: "search", preview: <SearchPreview /> },
      { name: "Select", slug: "select", preview: <SelectPreview /> },
      {
        name: "Radio Button",
        slug: "radio-button",
        preview: <RadioPreview />,
      },
      {
        name: "Date",
        slug: "date",
        preview: <DatePreview />,
      },
      {
        name: "Date Range",
        slug: "date-range",
        preview: <DateRangePreview />,
      },
      {
        name: "Decimal",
        slug: "decimal",
        preview: <DecimalPreview />,
      },
      {
        name: "Number",
        slug: "number",
        preview: <NumberPreview />,
      },
      {
        name: "Numeral Date",
        slug: "numeral-date",
        preview: <NumeralDatePreview />,
      },
      {
        name: "Password",
        slug: "password",
        preview: <PasswordPreview />,
      },
      {
        name: "File Input",
        slug: "file-input",
        preview: <FileInputPreview />,
      },
      {
        name: "Grouped Character",
        slug: "grouped-character",
        preview: <GroupedCharacterPreview />,
      },
      {
        name: "Simple Color Picker",
        slug: "simple-color-picker",
        preview: <SimpleColorPickerPreview />,
      },
      {
        name: "Time",
        slug: "time",
        preview: <TimePreview />,
      },
    ],
  },
  {
    title: "Buttons & actions",
    description: "Interactive controls for triggering actions.",
    components: [
      {
        name: "Button",
        slug: "button",
        preview: (
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            <Button variantType="primary">Primary</Button>
            <Button variantType="secondary">Secondary</Button>
          </Box>
        ),
      },
      {
        name: "Button Bar",
        slug: "button-bar",
        preview: (
          <ButtonBar>
            <Button>Save</Button>
            <Button>Cancel</Button>
          </ButtonBar>
        ),
      },
      {
        name: "Button Minor",
        slug: "button-minor",
        preview: <ButtonMinor>Minor action</ButtonMinor>,
      },
      {
        name: "Button Toggle",
        slug: "button-toggle",
        preview: <ButtonTogglePreview />,
      },
      {
        name: "Icon Button",
        slug: "icon-button",
        preview: (
          <IconButton aria-label="Add" onClick={() => {}}>
            <Icon type="add" />
          </IconButton>
        ),
      },
      {
        name: "Multi Action Button",
        slug: "multi-action-button",
        preview: (
          <MultiActionButton text="Actions">
            <Button>Edit</Button>
            <Button>Delete</Button>
          </MultiActionButton>
        ),
      },
      {
        name: "Split Button",
        slug: "split-button",
        preview: (
          <SplitButton text="Save">
            <Button>Save and close</Button>
            <Button>Save draft</Button>
          </SplitButton>
        ),
      },
    ],
  },
  {
    title: "Layout",
    description: "Structural components for arranging and grouping content.",
    components: [
      {
        name: "Card",
        slug: "card",
        preview: (
          <Card>
            <Typography variant="p" as="p">
              Card content
            </Typography>
            <CardFooter>Footer</CardFooter>
          </Card>
        ),
      },
      {
        name: "Pod",
        slug: "pod",
        preview: (
          <Pod title="Expense policy" subtitle="Finance">
            <Typography variant="p" as="p">
              Review departmental spend limits before month end.
            </Typography>
          </Pod>
        ),
      },
      {
        name: "Tile",
        slug: "tile",
        preview: (
          <Tile>
            <TileContent>Tile content</TileContent>
          </Tile>
        ),
      },
      {
        name: "Heading",
        slug: "heading",
        preview: (
          <Heading
            title="Invoices"
            subheader="Outstanding and paid"
            headingType="h1"
            divider
          />
        ),
      },
      {
        name: "Hr",
        slug: "hr",
        preview: (
          <Box width="100%">
            <Typography variant="p" as="p">
              Above the line
            </Typography>
            <Hr />
            <Typography variant="p" as="p">
              Below the line
            </Typography>
          </Box>
        ),
      },
      {
        name: "Dismissible Box",
        slug: "dismissible-box",
        preview: <DismissibleBoxPreview />,
      },
      {
        name: "Definition List",
        slug: "definition-list",
        preview: (
          <Dl>
            <Dt>Name</Dt>
            <Dd>Jane Smith</Dd>
            <Dt>Role</Dt>
            <Dd>Designer</Dd>
          </Dl>
        ),
      },
      {
        name: "Box",
        slug: "box",
        preview: (
          <div className="preview-box-demo">
            <Typography variant="p" as="p">
              Box content
            </Typography>
          </div>
        ),
      },
      {
        name: "Fieldset",
        slug: "fieldset",
        preview: <AbstractPlaceholder label="Fieldset / form group" />,
      },
      {
        name: "Form",
        slug: "form",
        preview: <AbstractPlaceholder label="Form wrapper" />,
      },
      {
        name: "Inline Inputs",
        slug: "inline-inputs",
        preview: <AbstractPlaceholder label="Inline inputs" />,
      },
      {
        name: "Settings Row",
        slug: "settings-row",
        preview: <AbstractPlaceholder label="Settings row" />,
      },
      {
        name: "Divider",
        slug: "divider",
        preview: <DividerPreview />,
      },
      {
        name: "Vertical Divider",
        slug: "vertical-divider",
        preview: <VerticalDividerPreview />,
      },
      {
        name: "Grid",
        slug: "grid",
        preview: <GridPreview />,
      },
      {
        name: "Content",
        slug: "content",
        preview: <AbstractPlaceholder label="Content wrapper" />,
      },
      {
        name: "Detail",
        slug: "detail",
        preview: <AbstractPlaceholder label="Detail panel" />,
      },
    ],
  },
  {
    title: "Navigation",
    description: "Components that help users move through content and pages.",
    components: [
      {
        name: "Accordion",
        slug: "accordion",
        preview: <AccordionPreview />,
      },
      {
        name: "Breadcrumbs",
        slug: "breadcrumbs",
        preview: (
          <Breadcrumbs>
            <Crumb href="#">Home</Crumb>
            <Crumb href="#">Section</Crumb>
            <Crumb href="#" isCurrent>
              Page
            </Crumb>
          </Breadcrumbs>
        ),
      },
      {
        name: "Tabs",
        slug: "tabs",
        preview: <TabsPreview />,
      },
      {
        name: "Link",
        slug: "link",
        preview: (
          <Box display="flex" flexDirection="column" gap={1}>
            <Link href="#">Internal link</Link>
            <Link href="#" target="_blank">
              External link
            </Link>
          </Box>
        ),
      },
      {
        name: "Pager",
        slug: "pager",
        preview: <PagerPreview />,
      },
      {
        name: "Progress Tracker",
        slug: "progress-tracker",
        preview: (
          <Box width="100%">
            <ProgressTracker progress={60} length="100%" size="medium" />
          </Box>
        ),
      },
      {
        name: "Step Sequence",
        slug: "step-sequence",
        preview: (
          <StepSequence orientation="horizontal">
            <StepSequenceItem
              aria-label="Step 1"
              hiddenCompleteLabel="Complete"
              hiddenCurrentLabel="Current"
              indicator="1"
              status="complete"
            >
              Complete
            </StepSequenceItem>
            <StepSequenceItem
              aria-label="Step 2"
              hiddenCompleteLabel="Complete"
              hiddenCurrentLabel="Current"
              indicator="2"
              status="current"
            >
              Current
            </StepSequenceItem>
            <StepSequenceItem
              aria-label="Step 3"
              hiddenCompleteLabel="Complete"
              hiddenCurrentLabel="Current"
              indicator="3"
              status="incomplete"
            >
              Next
            </StepSequenceItem>
          </StepSequence>
        ),
      },
      {
        name: "Anchor Navigation",
        slug: "anchor-navigation",
        preview: <AbstractPlaceholder label="Anchor navigation" />,
      },
      {
        name: "Menu",
        slug: "menu",
        preview: <AbstractPlaceholder label="Horizontal menu" />,
      },
      {
        name: "Navigation Bar",
        slug: "navigation-bar",
        preview: <AbstractPlaceholder label="Navigation bar" />,
      },
      {
        name: "Pages",
        slug: "pages",
        preview: <AbstractPlaceholder label="Page carousel" />,
      },
      {
        name: "Step Flow",
        slug: "step-flow",
        preview: <AbstractPlaceholder label="Step flow" />,
      },
      {
        name: "Vertical Menu",
        slug: "vertical-menu",
        preview: <AbstractPlaceholder label="Vertical nav menu" />,
      },
      {
        name: "Global Header",
        slug: "global-header",
        preview: <AbstractPlaceholder label="Application header" />,
      },
      {
        name: "Adaptive Sidebar",
        slug: "adaptive-sidebar",
        preview: <AbstractPlaceholder label="Adaptive sidebar" />,
      },
    ],
  },
  {
    title: "Feedback & status",
    description: "Components for communicating system state and user feedback.",
    components: [
      {
        name: "Badge",
        slug: "badge",
        preview: (
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Badge counter={5}>
              <Button>Notifications</Button>
            </Badge>
          </Box>
        ),
      },
      {
        name: "Pill",
        slug: "pill",
        preview: (
          <Box display="flex" gap={1} flexWrap="wrap">
            <Pill pillRole="status">Active</Pill>
            <Pill pillRole="status" colorVariant="warning">
              Warning
            </Pill>
            <Pill pillRole="status" colorVariant="negative">
              Error
            </Pill>
          </Box>
        ),
      },
      {
        name: "Message",
        slug: "message",
        preview: (
          <Message variant="info" title="Info message">
            This is an informational message.
          </Message>
        ),
      },
      {
        name: "Loader",
        slug: "loader",
        preview: (
          <Box display="flex" gap={4} alignItems="center" flexWrap="wrap">
            <Loader />
            <Loader loaderType="ring" />
            <Loader loaderType="star" />
          </Box>
        ),
      },
      {
        name: "Loader Bar",
        slug: "loader-bar",
        preview: (
          <Box width="100%">
            <LoaderBar />
          </Box>
        ),
      },
      {
        name: "Loader Spinner",
        slug: "loader-spinner",
        preview: <LoaderSpinner size="medium" />,
      },
      {
        name: "Loader Star",
        slug: "loader-star",
        preview: <LoaderStar />,
      },
      {
        name: "Alert",
        slug: "alert",
        preview: <AbstractPlaceholder label="Alert dialog (modal)" />,
      },
      {
        name: "Note",
        slug: "note",
        preview: <AbstractPlaceholder label="Note / comment" />,
      },
      {
        name: "Preview",
        slug: "preview",
        preview: <AbstractPlaceholder label="Content preview skeleton" />,
      },
      {
        name: "Toast",
        slug: "toast",
        preview: <AbstractPlaceholder label="Toast notification" />,
      },
    ],
  },
  {
    title: "Overlays",
    description: "Dialogs, drawers and floating layers.",
    components: [
      {
        name: "Dialog",
        slug: "dialog",
        preview: <DialogPreview />,
      },
      {
        name: "Drawer",
        slug: "drawer",
        preview: <DrawerPreview />,
      },
      {
        name: "Action Popover",
        slug: "action-popover",
        preview: (
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
          </ActionPopover>
        ),
      },
      {
        name: "Confirm",
        slug: "confirm",
        preview: <ConfirmPreview />,
      },
      {
        name: "Dialog Full Screen",
        slug: "dialog-full-screen",
        preview: <DialogFullScreenPreview />,
      },
      {
        name: "Popover Container",
        slug: "popover-container",
        preview: <AbstractPlaceholder label="Popover container" />,
      },
      {
        name: "Portal",
        slug: "portal",
        preview: <AbstractPlaceholder label="Portal (DOM teleport)" />,
      },
      {
        name: "Sidebar",
        slug: "sidebar",
        preview: <SidebarPreview />,
      },
      {
        name: "Modal",
        slug: "modal",
        preview: (
          <AbstractPlaceholder label="Legacy modal (prefer Dialog)" />
        ),
      },
    ],
  },
  {
    title: "Data display",
    description: "Components for presenting structured or tabular data.",
    components: [
      {
        name: "Flat Table",
        slug: "flat-table",
        preview: (
          <FlatTable>
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>Name</FlatTableHeader>
                <FlatTableHeader>Role</FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              <FlatTableRow>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Designer</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>John Doe</FlatTableCell>
                <FlatTableCell>Engineer</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        ),
      },
      {
        name: "Portrait",
        slug: "portrait",
        preview: (
          <Box display="flex" gap={2} justifyContent="center">
            <Portrait initials="AB" size="ML" />
            <Portrait initials="CD" size="ML" darkBackground />
          </Box>
        ),
      },
      {
        name: "Profile",
        slug: "profile",
        preview: (
          <Profile
            name="Jane Smith"
            email="jane@example.com"
            initials="JS"
          />
        ),
      },
      {
        name: "Batch Selection",
        slug: "batch-selection",
        preview: <AbstractPlaceholder label="Batch selection" />,
      },
      {
        name: "Draggable",
        slug: "draggable",
        preview: <AbstractPlaceholder label="Drag and drop" />,
      },
      {
        name: "Duelling Picklist",
        slug: "duelling-picklist",
        preview: <AbstractPlaceholder label="Duelling picklist" />,
      },
      {
        name: "Image",
        slug: "image",
        preview: <AbstractPlaceholder label="Image component" />,
      },
      {
        name: "Link Preview",
        slug: "link-preview",
        preview: <AbstractPlaceholder label="Link preview card" />,
      },
      {
        name: "Tile Select",
        slug: "tile-select",
        preview: <AbstractPlaceholder label="Selectable tiles" />,
      },
      {
        name: "Advanced Color Picker",
        slug: "advanced-color-picker",
        preview: <AbstractPlaceholder label="Advanced colour picker" />,
      },
    ],
  },
  {
    title: "Utility",
    description: "Foundational and system-level components.",
    components: [
      {
        name: "Icon",
        slug: "icon",
        preview: (
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            <Icon type="add" fontSize="large" />
            <Icon type="edit" fontSize="large" />
            <Icon type="delete" fontSize="large" />
            <Icon type="search" fontSize="large" />
            <Icon type="settings" fontSize="large" />
            <Icon type="home" fontSize="large" />
          </Box>
        ),
      },
      {
        name: "Help",
        slug: "help",
        preview: (
          <Box display="inline-flex" alignItems="center" flexWrap="wrap" gap={2}>
            <Typography variant="p" as="span" mb={0} mt={0}>
              Need help?
            </Typography>
            <Help>This is some helpful information about the feature.</Help>
          </Box>
        ),
      },
      {
        name: "Tooltip",
        slug: "tooltip",
        preview: <TooltipPreview />,
      },
      {
        name: "Typography",
        slug: "typography",
        preview: (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h2" as="h2">
              Heading
            </Typography>
            <Typography variant="p" as="p">
              Body text
            </Typography>
            <Typography variant="small" as="span">
              Small label
            </Typography>
          </Box>
        ),
      },
      {
        name: "Carbon Provider",
        slug: "carbon-provider",
        preview: (
          <AbstractPlaceholder label="Theme + token provider" />
        ),
      },
      {
        name: "I18n Provider",
        slug: "i18n-provider",
        preview: <AbstractPlaceholder label="i18n / locale provider" />,
      },
      {
        name: "Text Editor",
        slug: "text-editor",
        preview: <AbstractPlaceholder label="Rich text editor" />,
      },
      {
        name: "Tokens Wrapper",
        slug: "tokens-wrapper",
        preview: <AbstractPlaceholder label="Design token wrapper" />,
      },
    ],
  },
];

// ─── Group section ────────────────────────────────────────────────────────────

function ComponentGroup({ group }: { group: GroupEntry }) {
  return (
    <Box className="componentGroup">
      <Typography variant="h3" as="h2" fontWeight="bold">
        {group.title}
      </Typography>
      <Typography variant="p" as="p" className="componentGroupDesc">
        {group.description}
      </Typography>
      <div className="componentGrid">
        {group.components.map((comp) => (
          <ComponentCard key={comp.slug} comp={comp} />
        ))}
      </div>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CarbonComponentsPage() {
  return (
    <Box className="pageContent">
      <Box className="pageIntro">
        <Typography variant="h1" as="h1">
          Carbon components
        </Typography>
        <Typography variant="p" as="p">
          Every component available in <code>carbon-react</code>, grouped by
          category — with live previews.
          <br />
          Click <strong>Docs</strong> on any card to open its full Storybook
          documentation on{" "}
          <a href="https://carbon.sage.com" target="_blank" rel="noreferrer">
            carbon.sage.com
          </a>
          .
        </Typography>
      </Box>

      {GROUPS.map((group) => (
        <ComponentGroup key={group.title} group={group} />
      ))}
    </Box>
  );
}
