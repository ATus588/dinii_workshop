alter table "public"."reviews" alter column "menuId" drop not null;
alter table "public"."reviews" add column "menuId" uuid;
