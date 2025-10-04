ALTER TABLE "posts" ADD COLUMN "create_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_title_unique" UNIQUE("title");