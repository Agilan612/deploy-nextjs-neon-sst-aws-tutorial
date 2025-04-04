import { serial, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import validator from "validator"
import { createInsertSchema } from 'drizzle-zod';

export const LeadTable = pgTable("leads", {
  id: serial("id").primaryKey().notNull(),
  email: text('email').notNull(),
  firstName: varchar("first_name", {length: 150}),
  lastName: varchar("last_name", {length: 150}),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadTableSchema = createInsertSchema(LeadTable, {
  email: (schema) => schema.email.email().min(4),
  firstName: (schema) => schema.firstName.min(2).max(150).optional(0),
  lastName: (schema) => schema.lastName.min(2).max(150).optional(0),
});
