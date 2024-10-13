CREATE TABLE `facts` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`fact` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_DATE) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`apiKey`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`name` text,
	`email` text,
	`apiId` text NOT NULL,
	`apiKey` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_apiId_unique` ON `users` (`apiId`);