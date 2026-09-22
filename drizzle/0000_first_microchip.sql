CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`status` text DEFAULT 'received' NOT NULL,
	`engagement_type` text NOT NULL,
	`objective` text NOT NULL,
	`full_name` text NOT NULL,
	`work_email` text NOT NULL,
	`organization` text NOT NULL,
	`role` text NOT NULL,
	`decision_maker` integer DEFAULT false NOT NULL,
	`restaurant_name` text,
	`website` text,
	`location` text NOT NULL,
	`ownership_type` text,
	`number_of_locations` integer,
	`preferred_date` text NOT NULL,
	`date_flexibility` text NOT NULL,
	`budget_range` text NOT NULL,
	`audience` text,
	`operations` text,
	`dietary` text,
	`accessibility` text,
	`travel` text,
	`referral_source` text,
	`attachment_count` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `inquiries_reference_unique` ON `inquiries` (`reference`);--> statement-breakpoint
CREATE INDEX `idx_inquiries_status_created` ON `inquiries` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_inquiries_engagement_type` ON `inquiries` (`engagement_type`);--> statement-breakpoint
CREATE TABLE `inquiry_files` (
	`id` text PRIMARY KEY NOT NULL,
	`inquiry_id` text NOT NULL,
	`object_key` text NOT NULL,
	`original_name` text NOT NULL,
	`content_type` text NOT NULL,
	`size` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`inquiry_id`) REFERENCES `inquiries`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `inquiry_files_object_key_unique` ON `inquiry_files` (`object_key`);--> statement-breakpoint
CREATE INDEX `idx_inquiry_files_inquiry_id` ON `inquiry_files` (`inquiry_id`);--> statement-breakpoint
PRAGMA optimize;
