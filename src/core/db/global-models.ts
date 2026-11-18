// The models with no orgId column, each with the reason it has none (audit A-11, v1.7.1). RLS (addendum §2) protects
// org-owned rows only: a model on this list is readable and writable by the app role in RLS enforce mode, and its reads
// must be scoped in code (by session, user or token). An invariant (inv-29-33-rls) fails on any model that is neither
// org-scoped nor listed here or in the clone's src/app/global-models.ts, so a table cannot silently fall outside RLS.
// A module's model carries its marker, so removing the module removes its line (scripts/foundation-modules.ts MARKED_FILES).
export const GLOBAL_MODELS: Readonly<Record<string, string>> = {
  User: 'a person belongs to many orgs; read by id from the session, by email at sign-in',
  Org: 'the tenant itself: read by slug in requireOrg before any org is set; membership is the access check',
  Session: 'a user’s, not an org’s; read by the sha256 of the cookie (INV-07)',
  LoginToken: 'a sign-in link, before any org is known; read by its hash',
  RecoveryCode: 'a user’s TOTP recovery codes; read by hash for the signed-in user',
  RateLimit: 'counters keyed by IP, email or user, shared across orgs',
  CapturedMessage: 'non-production outbox for e2e and the demo inbox; never in production',
  SsoSubject: 'a provider subject → user link: per issuer, not per org (an IdP may serve several orgs)', // sso
  StripeEvent: 'webhook dedupe by Stripe event id, before the event names its org', // billing
};
