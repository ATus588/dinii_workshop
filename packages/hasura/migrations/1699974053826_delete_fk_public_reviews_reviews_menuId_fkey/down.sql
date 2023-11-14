alter table "public"."reviews"
  add constraint "reviews_menuId_fkey"
  foreign key ("menuId")
  references "public"."menu"
  ("id") on update cascade on delete cascade;
