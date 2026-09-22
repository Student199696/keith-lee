import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  status: text("status").notNull().default("received"),
  engagementType: text("engagement_type").notNull(),
  objective: text("objective").notNull(),
  fullName: text("full_name").notNull(),
  workEmail: text("work_email").notNull(),
  organization: text("organization").notNull(),
  role: text("role").notNull(),
  decisionMaker: integer("decision_maker", { mode: "boolean" }).notNull().default(false),
  restaurantName: text("restaurant_name"),
  website: text("website"),
  location: text("location").notNull(),
  ownershipType: text("ownership_type"),
  numberOfLocations: integer("number_of_locations"),
  preferredDate: text("preferred_date").notNull(),
  dateFlexibility: text("date_flexibility").notNull(),
  budgetRange: text("budget_range").notNull(),
  audience: text("audience"),
  operations: text("operations"),
  dietary: text("dietary"),
  accessibility: text("accessibility"),
  travel: text("travel"),
  referralSource: text("referral_source"),
  attachmentCount: integer("attachment_count").notNull().default(0),
}, (table) => [
  index("idx_inquiries_status_created").on(table.status, table.createdAt),
  index("idx_inquiries_engagement_type").on(table.engagementType),
]);

export const inquiryFiles = sqliteTable("inquiry_files", {
  id: text("id").primaryKey(),
  inquiryId: text("inquiry_id").notNull().references(() => inquiries.id, { onDelete: "cascade" }),
  objectKey: text("object_key").notNull().unique(),
  originalName: text("original_name").notNull(),
  contentType: text("content_type").notNull(),
  size: integer("size").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_inquiry_files_inquiry_id").on(table.inquiryId)]);
