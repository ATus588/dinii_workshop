alter table "public"."reviews" alter column "id" set default nextval('reviews_id_seq'::regclass);
ALTER TABLE "public"."reviews" ALTER COLUMN "id" TYPE integer;
