import { lazy, Suspense } from "react";

const isUIForkEnabled = import.meta.env.DEV || import.meta.env.MODE === "uifork";

// DEV TOOL: keep UIFork outside the product UI and load it only when explicitly
// enabled. The standard production build can then remove this optional chunk.
const UIForkWidget = isUIForkEnabled
  ? lazy(async () => {
      const { UIFork } = await import("uifork");
      return { default: UIFork };
    })
  : null;

export default function UIForkDevTools() {
  if (!UIForkWidget) return null;

  return (
    <Suspense fallback={null}>
      <UIForkWidget port={3030} />
    </Suspense>
  );
}
