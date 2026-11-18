-- Hand-written (v1.7.1, audit A-14). "A domain belongs to at most one org" was check-then-write in verifyDomain, so two
-- orgs verifying the same domain at once could both succeed. The database now refuses a second verified row. An exclusion
-- constraint, not a partial unique index: Prisma ignores exclusion constraints, where `migrate dev` would try to drop an
-- index it cannot model. Its name is SSO_DOMAIN_VERIFIED_ONCE in src/modules/sso/settings.ts.
-- sso is a removable module: guarded for a clone that dropped its tables (F-09). Fails if two orgs already hold one domain
-- verified; resolve that by hand (unset verifiedAt on the wrong one) before migrating.
DO $$ BEGIN IF to_regclass('"SsoDomain"') IS NOT NULL THEN
  ALTER TABLE "SsoDomain" ADD CONSTRAINT "SsoDomain_verified_once" EXCLUDE USING btree ("domain" WITH =) WHERE ("verifiedAt" IS NOT NULL);
END IF; END $$;
