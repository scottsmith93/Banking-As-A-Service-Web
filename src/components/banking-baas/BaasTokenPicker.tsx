import { useState, type KeyboardEvent } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Pill from "carbon-react/lib/components/pill";
import Textbox from "carbon-react/lib/components/textbox";
import { interpolate } from "../../utils/interpolate";

type BaasTokenPickerProps = {
  id: string;
  label: string;
  placeholder: string;
  values: string[];
  options: string[];
  colour: "positive" | "negative";
  removeLabel: string;
  onChange: (values: string[]) => void;
};

export default function BaasTokenPicker({
  id,
  label,
  placeholder,
  values,
  options,
  colour,
  removeLabel,
  onChange,
}: BaasTokenPickerProps) {
  const [query, setQuery] = useState("");
  const matchingOptions = options.filter((option) => (
    option.toLowerCase().includes(query.trim().toLowerCase())
    && !values.includes(option)
  ));

  const addOption = (option: string) => {
    onChange([...values, option]);
    setQuery("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && matchingOptions.length > 0) {
      event.preventDefault();
      addOption(matchingOptions[0]);
    }
  };

  return (
    <Box className="baasTokenPicker" display="flex" flexDirection="column" gap={3}>
      <Textbox
        id={id}
        label={label}
        placeholder={placeholder}
        inputIcon="search"
        maxWidth="25rem"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      {matchingOptions.length > 0 && query.trim() && (
        <Box className="baasTokenPicker__options" display="flex" flexWrap="wrap" gap={1}>
          {matchingOptions.map((option) => (
            <Button key={option} size="small" variantType="secondary" onClick={() => addOption(option)}>
              {option}
            </Button>
          ))}
        </Box>
      )}
      <Box className="baasTokenPicker__values" display="flex" flexWrap="wrap" gap={2}>
        {values.map((value) => (
          <Pill
            key={value}
            pillRole="tag"
            colorVariant={colour}
            size="M"
            fill
            onDelete={() => onChange(values.filter((currentValue) => currentValue !== value))}
            ariaLabelOfRemoveButton={interpolate(removeLabel, { value })}
          >
            {value}
          </Pill>
        ))}
      </Box>
    </Box>
  );
}
