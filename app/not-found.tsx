"use client";

import { useEffect } from "react";
import RecoveryScreen from "@/components/ui/RecoveryScreen";
import { LinkButton } from "@/components/ui/Button";

/**
 * Global 404 — one-pager, so every unknown path is brought back home.
 *
 * This is a single-page site (only `/` is statically exported), but the Netlify
 * SPA rewrite (`/*` → `/index.html`, status 200) serves the homepage HTML for
 * *every* path. On a URL like `/index.html` or any unknown path, Next.js's
 * client router would otherwise swap in the default "404: This page could not
 * be found." UI right after hydration — the "page shows for a few seconds, then
 * 404" symptom.
 *
 * This page replaces that default everywhere (the client-router boundary AND
 * the generated `out/404.html`): it redirects straight home as soon as JS runs
 * (preserving any `#hash` deep link), and shows a brief branded fallback while
 * doing so — so visitors never see a broken "page not found" state.
 */
export default function NotFound() {
  useEffect(() => {
    // Preserve any query string (e.g. ?utm_source=...) and hash (e.g. #bezoek)
    // so tracking links and deep links still work after the redirect.
    window.location.replace(
      `/${window.location.search}${window.location.hash}`
    );
  }, []);

  return (
    <RecoveryScreen
      stamp="404 · Even geduld"
      title="Deze pagina bestaat niet."
      actions={
        <LinkButton href="/" arrow={false}>
          Terug naar huis
        </LinkButton>
      }
    >
      Geen zorgen — we brengen je meteen terug naar huis.
    </RecoveryScreen>
  );
}
