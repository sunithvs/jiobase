-- Rate limiting table for auth endpoints
CREATE TABLE IF NOT EXISTS `rate_limits` (
	`key` text NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_rate_limits_key` ON `rate_limits` (`key`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_rate_limits_expires` ON `rate_limits` (`expires_at`);

-- Login attempt tracking table for account lockout
CREATE TABLE IF NOT EXISTS `login_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`email` text NOT NULL,
	`ip_address` text,
	`success` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_login_attempts_email` ON `login_attempts` (`email`, `created_at`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_login_attempts_ip` ON `login_attempts` (`ip_address`, `created_at`);
