import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

const PASSWORD = "active-client-portal";
const ACCESS_KEY = "active-client-portal-access";

function hasSessionAccess() {
  try {
    return sessionStorage.getItem(ACCESS_KEY) === "granted";
  } catch {
    return false;
  }
}

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(hasSessionAccess);
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem(ACCESS_KEY, "granted");
      setIsUnlocked(true);
      return;
    }
    setHasError(true);
  }

  if (isUnlocked) return <>{children}</>;

  return (
    <main className="passwordGate">
      <section className="passwordGate__card" aria-labelledby="password-gate-title">
        <div className="passwordGate__brand" aria-label="Sage Active">Sage <span>Active</span></div>
        <h1 id="password-gate-title">Client portal</h1>
        <p>Enter the password to view this prototype.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="prototype-password">Password</label>
          <input
            id="prototype-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setHasError(false);
            }}
            autoFocus
            autoComplete="current-password"
            aria-invalid={hasError}
            aria-describedby={hasError ? "password-gate-error" : undefined}
          />
          {hasError && <p id="password-gate-error" className="passwordGate__error">That password isn’t correct. Try again.</p>}
          <button type="submit">Continue</button>
        </form>
      </section>
    </main>
  );
}
