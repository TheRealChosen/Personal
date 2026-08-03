"use client";

import { useEffect } from "react";
import RecoveryScreen from "@/components/ui/RecoveryScreen";
import Button, { LinkButton } from "@/components/ui/Button";

/**
 * Global error boundary — branded recovery screen.
 *
 * Catches any unexpected runtime error thrown inside the page tree (e.g. a
 * WebGL / Spline scene failure) before it can unmount the app into a blank or
 * broken page. It renders inside the root layout, so navigation stays intact,
 * and gives the visitor a retry (re-render the segment) or a way back home.
 *
 * `error` details are only surfaced to the console — production builds keep
 * error internals out of the UI to avoid leaking sensitive information.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Surface the details for debugging / monitoring (console only).
    console.error("[Hoekman] page error", error);
  }, [error]);

  return (
    <RecoveryScreen
      stamp="Oeps · Even iets mis"
      title="Er ging iets mis."
      actions={
        <>
          <Button onClick={() => unstable_retry()} arrow={false}>
            Probeer opnieuw
          </Button>

          <LinkButton href="/" variant="secondary" arrow={false}>
            Terug naar huis
          </LinkButton>
        </>
      }
    >
      Er is een onverwachte fout opgetreden. Probeer het opnieuw, of ga terug
      naar huis — de koffie staat klaar.
    </RecoveryScreen>
  );
}
