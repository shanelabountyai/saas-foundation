// Clone-owned (v1.7.1), like export-hooks.ts: the clone's own models with no orgId column, each with the reason (audit
// A-11). RLS does not cover them; scope their reads in code. The inv-29-33-rls invariant fails on a model that is neither
// org-scoped nor listed here or in src/core/db/global-models.ts. A table owned through a parent (a ledger line under an
// org's account) belongs here too, with the parent named: it is outside RLS and outside INV-34's export coverage.
//   LedgerLine: 'owned through LedgerAccount.orgId; every read joins the account and filters by org',
export const globalModels: Readonly<Record<string, string>> = {};
