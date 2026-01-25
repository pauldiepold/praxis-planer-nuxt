ALTER TABLE `weeks` DROP COLUMN `company_id`;--> statement-breakpoint
ALTER TABLE `weeks` ADD `school_id` integer REFERENCES schools(id);