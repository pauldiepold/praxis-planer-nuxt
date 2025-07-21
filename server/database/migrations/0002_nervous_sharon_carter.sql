PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_weeks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`week_start_date` text NOT NULL,
	`status` text DEFAULT 'free' NOT NULL,
	`student_id` integer,
	`notes` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_weeks`("id", "week_start_date", "status", "student_id", "notes", "createdAt", "updatedAt") SELECT "id", "week_start_date", "status", "student_id", "notes", "createdAt", "updatedAt" FROM `weeks`;--> statement-breakpoint
DROP TABLE `weeks`;--> statement-breakpoint
ALTER TABLE `__new_weeks` RENAME TO `weeks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;