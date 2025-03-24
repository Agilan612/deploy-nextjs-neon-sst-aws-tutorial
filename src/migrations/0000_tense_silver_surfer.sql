CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"first_name" varchar(150),
	"last_name" varchar(150),
	"description" text,
	"created_at" timestamp DEFAULT now()
);
