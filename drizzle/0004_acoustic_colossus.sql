ALTER TABLE "posts" RENAME COLUMN "created_at" TO "updated_at";--> statement-breakpoint
ALTER TABLE "blocks" ADD COLUMN "order" integer NOT NULL;