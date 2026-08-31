/**
 * Initial migration — no-op.
 *
 * The database schema was bootstrapped by Payload's dev-mode push on 2026-08-29
 * (recorded in payload_migrations as batch=-1 / name="dev"). This file snapshots
 * that state so Payload's migration runner has a versioned baseline.
 *
 * Because the schema already exists in the database, up() is intentionally empty.
 * All future schema changes must be new migration files.
 *
 * @see docs/08-governance/decision-log.md — 2026-08-29 Initial Stack Selection
 */
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/drizzle/postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Schema already exists — bootstrapped by dev-push on 2026-08-29.
  // Nothing to run.
  payload.logger.info({ msg: 'Migration 20260829_000000_initial: schema already exists, skipping.' })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // No-op — rolling back the initial schema is a manual process.
  payload.logger.info({ msg: 'Migration 20260829_000000_initial: down() is a no-op for the initial snapshot.' })
}
