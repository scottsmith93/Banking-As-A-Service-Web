import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

const imgStorybookIcon = "/icon-storybook.svg";
const imgFigmaIcon = "/icon-figma.svg";
const imgDesignSystemIcon = "/icon-design-system.svg";
const imgGithubIcon = "/icon-github.svg";

type LinkCardProps = {
  imgSrc: string;
  title: string;
  description: string;
  href: string;
};

function LinkCard({ imgSrc, title, description, href }: LinkCardProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="home-link-card">
      <Box className="home-link-card__header">
        <img src={imgSrc} alt="" width={44} height={44} className="home-link-card__img-icon" aria-hidden />
        <Typography variant="h3" as="h2" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Typography variant="p" as="p" className="home-link-card__desc">
        {description}
      </Typography>
    </a>
  );
}

export default function DesignPlaygroundPage() {
  return (
    <Box className="pageContent">
      <Box className="pageIntro">
        <Typography variant="h1" as="h1">
          Hello, welcome the XD Carbon Playground
        </Typography>
        <Typography variant="p" as="p">
          You&apos;re all set! You can start prototyping and using components
          from Carbon. Feel free to remove everything on this page and start
          fresh.
        </Typography>
        <Typography variant="p" as="p">
          Below are some helpful links to get you started. Have fun!
        </Typography>
      </Box>

      <Box className="cardGrid">
        <LinkCard
          imgSrc={imgStorybookIcon}
          title="Storybook"
          description="Browse all Carbon components and the available props which you can apply."
          href="https://carbon.sage.com/?path=/story/welcome--welcome-page"
        />
        <LinkCard
          imgSrc={imgFigmaIcon}
          title="Figma Components"
          description="View all of the components in Figma before building in code."
          href="https://www.figma.com/design/Cie8BIDWKj4tEXCVGsen5A/Fusion-DS-Components?t=cbSPyfU5YMHbv7p0-0"
        />
        <LinkCard
          imgSrc={imgDesignSystemIcon}
          title="Design System"
          description="Browse all the components and pattern guidance on the design system website."
          href="https://designsystem.sage.com/"
        />
        <LinkCard
          imgSrc={imgGithubIcon}
          title="Github repo"
          description="View the Carbon source code and contribute to the component library."
          href="https://github.com/Sage/carbon"
        />
      </Box>
    </Box>
  );
}
