import React from "react";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

type Props = { children: React.ReactNode };

type State = { error: Error | null };

/**
 * Catches render errors inside a route so one broken screen does not blank the whole app.
 */
export default class RouteErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error(error, info.componentStack);
  }

  render(): React.ReactNode {
    const { error } = this.state;
    if (error) {
      return (
        <Box className="pageContent" p={3}>
          <Typography variant="h1" as="h1">
            Something went wrong on this page
          </Typography>
          <Typography variant="p" as="p">
            {error.message}
          </Typography>
          <Typography variant="span" as="pre">
            {error.stack}
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}
