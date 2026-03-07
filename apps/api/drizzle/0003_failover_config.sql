-- Add failover configuration columns to apps table
ALTER TABLE `apps` ADD COLUMN `backup_supabase_url` text;
--> statement-breakpoint
ALTER TABLE `apps` ADD COLUMN `enable_failover` integer DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `apps` ADD COLUMN `failover_threshold_ms` integer DEFAULT 5000;
--> statement-breakpoint
ALTER TABLE `apps` ADD COLUMN `last_failover_at` integer;
--> statement-breakpoint
ALTER TABLE `apps` ADD COLUMN `is_in_failover` integer DEFAULT 0;
