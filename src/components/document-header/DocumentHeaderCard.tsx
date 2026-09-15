import { Fragment, type ReactNode } from "react";
import Box from "carbon-react/lib/components/box";
import Divider from "carbon-react/lib/components/divider";

type DocumentHeaderCardProps = {
  /** Each entry renders as its own section, separated by a responsive divider. */
  sections: ReactNode[];
  /** Set to false to omit the separating divider between sections — they still keep a 16px gap. Defaults to true. */
  showDivider?: boolean;
};

/**
 * Carbon's document header pattern: a bordered card holding the key fields of a
 * document (invoice, order, quote...) just above its tab system. Sections sit
 * side by side with a vertical divider on wide screens, and stack with a
 * horizontal divider once the card is too narrow to fit them comfortably.
 */
export default function DocumentHeaderCard({ sections, showDivider = true }: DocumentHeaderCardProps) {
  return (
    <Box className={`documentHeaderCard${showDivider ? "" : " documentHeaderCard--noDivider"}`}>
      {sections.map((section, index) => (
        <Fragment key={index}>
          {index > 0 && showDivider && (
            <Box className="documentHeaderCard__divider" aria-hidden="true">
              <Box className="documentHeaderCard__dividerVertical" px={2}>
                <Divider type="vertical" height="100%" />
              </Box>
              <Box className="documentHeaderCard__dividerHorizontal" py={2}>
                <Divider type="horizontal" mt={0} mb={0} />
              </Box>
            </Box>
          )}
          <Box className="documentHeaderCard__section">{section}</Box>
        </Fragment>
      ))}
    </Box>
  );
}
