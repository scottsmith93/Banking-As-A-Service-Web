import Box from "carbon-react/lib/components/box";
import Link from "carbon-react/lib/components/link";
import Typography from "carbon-react/lib/components/typography";

export type DirectoryItem = {
  id: string;
  title: string;
  description?: string;
  href: string;
};

export type DirectorySection = {
  id: string;
  label: string;
  items: DirectoryItem[];
};

type CategoryLinkMenuProps = {
  sections: DirectorySection[];
  ariaLabel: string;
};

export default function CategoryLinkMenu({ sections, ariaLabel }: CategoryLinkMenuProps) {
  return (
    <Box
      className="directoryMenu"
      as="nav"
      aria-label={ariaLabel}
      borderRadius="borderRadius100"
    >
      {sections.map((section, sectionIndex) => (
        <Box
          key={section.id}
          className={`directoryMenu__row${
            sectionIndex < sections.length - 1 ? " directoryMenu__row--bordered" : ""
          }`}
        >
          <Typography variant="strong" as="h2" className="directoryMenu__category">
            {section.label}
          </Typography>

          <Box className="directoryMenu__items">
            {section.items.map((item) => (
              <Box key={item.id} className="directoryMenu__item">
                <Link className="directoryMenu__itemLink" href={item.href}>
                  {item.title}
                </Link>
                {item.description && (
                  <Typography variant="p" as="p" className="directoryMenu__itemDescription">
                    {item.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
