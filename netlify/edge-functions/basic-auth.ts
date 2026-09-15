import type { Context } from "@netlify/edge-functions";

function unauthorizedResponse() {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      // Browser-native login prompt
      "WWW-Authenticate": 'Basic realm="Protected", charset="UTF-8"',
    },
  });
}

function parseBasicAuthHeader(headerValue: string | null) {
  if (!headerValue) return null;
  const [scheme, encoded] = headerValue.split(" ");
  if (scheme?.toLowerCase() !== "basic" || !encoded) return null;

  try {
    const decoded = atob(encoded);
    const idx = decoded.indexOf(":");
    if (idx < 0) return null;
    return {
      username: decoded.slice(0, idx),
      password: decoded.slice(idx + 1),
    };
  } catch {
    return null;
  }
}

export default async (request: Request, context: Context) => {
  // Allow Netlify internals (and avoid locking yourself out of function tooling).
  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/.netlify/")) {
    return context.next();
  }

  // Default behaviour: protect ONLY non-production deploys (branch deploys + deploy previews).
  // You can override this with BASIC_AUTH_SCOPE.
  // - "non_production" (default): protect branch-deploy + deploy-preview
  // - "all": protect production too
  const scope = (Netlify.env.get("BASIC_AUTH_SCOPE") ?? "non_production").toLowerCase();
  const deployContext = context.deploy?.context;

  const isNonProductionDeploy =
    deployContext === "branch-deploy" || deployContext === "deploy-preview";

  const shouldProtect =
    scope === "all" ? true : isNonProductionDeploy;

  if (!shouldProtect) {
    return context.next();
  }

  const expectedUsername = Netlify.env.get("BASIC_AUTH_USERNAME");
  const expectedPassword = Netlify.env.get("BASIC_AUTH_PASSWORD");

  // Fail closed if protection is enabled but credentials aren't configured.
  if (!expectedUsername || !expectedPassword) {
    return new Response(
      "Basic Auth is enabled but BASIC_AUTH_USERNAME / BASIC_AUTH_PASSWORD are not set.",
      { status: 500 },
    );
  }

  const provided = parseBasicAuthHeader(request.headers.get("Authorization"));
  if (!provided) {
    return unauthorizedResponse();
  }

  if (provided.username !== expectedUsername || provided.password !== expectedPassword) {
    return unauthorizedResponse();
  }

  return context.next();
};

