-- Add advanced rate limiting columns to apps table
ALTER TABLE `apps` ADD COLUMN `rate_limit_burst_size` integer DEFAULT 10;
--> statement-breakpoint
ALTER TABLE `apps` ADD COLUMN `track_per_ip` integer DEFAULT 1;
--> statement-breakpoint
ALTER TABLE `apps` ADD COLUMN `track_per_user` integer DEFAULT 1;
