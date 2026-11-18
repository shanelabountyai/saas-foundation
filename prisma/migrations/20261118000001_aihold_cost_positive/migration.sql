-- Hand-written (v1.7.1, audit A-09's second half). withBudget refuses a non-positive estimate in code (v1.6.4); this makes
-- the database refuse one too, so a hold can never lower the committed total under the hard cap. NOT VALID: new rows are
-- checked, and existing holds are left alone (they lapse within 15 minutes, and AiHold's forced RLS would hide them from
-- a migrating role that does not bypass RLS anyway).
ALTER TABLE "AiHold" ADD CONSTRAINT "AiHold_costMicros_positive" CHECK ("costMicros" > 0) NOT VALID;
