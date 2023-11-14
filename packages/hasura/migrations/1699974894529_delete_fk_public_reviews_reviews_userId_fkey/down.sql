alter table "public"."reviews"
  add constraint "reviews_userId_fkey"
  foreign key ("userId")
  references "public"."user"
  ("id") on update cascade on delete cascade;
