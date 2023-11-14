alter table "public"."reviews" add constraint "reviews_menuId_userId_key" unique ("menuId", "userId");
