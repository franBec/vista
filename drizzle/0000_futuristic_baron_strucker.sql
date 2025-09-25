-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "address" (
	"id" serial NOT NULL,
	"address_line_1" text NOT NULL,
	"address_line_2" text,
	"city" text NOT NULL,
	"state_province" text NOT NULL,
	"postal_code" text NOT NULL,
	"country_code" char(2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "person" (
	"id" serial NOT NULL,
	"given_name" text NOT NULL,
	"family_name" text NOT NULL,
	"gender" text NOT NULL,
	"birth_date" date NOT NULL,
	"nationality" char(2),
	"document_type" text NOT NULL,
	"document_number" text NOT NULL,
	"phone_number" text,
	"address_id" integer NOT NULL,
	"clerk_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "clerk_user" (
	"id" serial NOT NULL,
	"clerk_id" text NOT NULL,
	"email" text NOT NULL,
	"image_url" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_clerk_id_fkey" FOREIGN KEY ("clerk_id") REFERENCES "public"."clerk_user"("clerk_id") ON DELETE set null ON UPDATE no action;
*/