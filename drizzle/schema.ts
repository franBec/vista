import { pgTable, serial, text, char, timestamp, foreignKey, date, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const address = pgTable("address", {
	id: serial().notNull(),
	addressLine1: text("address_line_1").notNull(),
	addressLine2: text("address_line_2"),
	city: text().notNull(),
	stateProvince: text("state_province").notNull(),
	postalCode: text("postal_code").notNull(),
	countryCode: char("country_code", { length: 2 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const person = pgTable("person", {
	id: serial().notNull(),
	givenName: text("given_name").notNull(),
	familyName: text("family_name").notNull(),
	gender: text().notNull(),
	birthDate: date("birth_date").notNull(),
	nationality: char({ length: 2 }),
	documentType: text("document_type").notNull(),
	documentNumber: text("document_number").notNull(),
	phoneNumber: text("phone_number"),
	addressId: integer("address_id").notNull(),
	clerkId: text("clerk_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.addressId],
			foreignColumns: [address.id],
			name: "person_address_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.clerkId],
			foreignColumns: [clerkUser.clerkId],
			name: "person_clerk_id_fkey"
		}).onDelete("set null"),
]);

export const clerkUser = pgTable("clerk_user", {
	id: serial().notNull(),
	clerkId: text("clerk_id").notNull(),
	email: text().notNull(),
	imageUrl: text("image_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});
