CREATE DATABASE chest;

DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
    EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
END $$;

CREATE TABLE "account" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"bio" varchar(255),
	"email" varchar(120) NOT NULL UNIQUE,
	"icon" varchar(255) NOT NULL,
	CONSTRAINT "account_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "listing" (
	"id_seller" integer NOT NULL,
	"id" serial NOT NULL,
	"id_category" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"name" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"price" FLOAT NOT NULL,
	"zipcode" integer NOT NULL,
	"negotiable" integer NOT NULL,
	"archived" integer NOT NULL,
	CONSTRAINT "listing_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "message" (
	"id" serial NOT NULL,
	"id_sender" serial NOT NULL,
	"id_recipient" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"text" varchar(255) NOT NULL,
	CONSTRAINT "message_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "selection" (
	"id" serial NOT NULL,
	"id_user" integer NOT NULL,
	"id_following" integer,
	"id_listing" integer,
	"id_tag" integer,
	CONSTRAINT "selection_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "listing_tag" (
	"id" serial NOT NULL,
	"id_tag" integer NOT NULL,
	"id_listing" integer NOT NULL,
	CONSTRAINT "listing_tag_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "category" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL UNIQUE,
	CONSTRAINT "category_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "image" (
	"id" serial NOT NULL,
	"id_listing" integer NOT NULL,
	"image" varchar(255) NOT NULL,
	CONSTRAINT "image_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "tag" (
	"id" serial NOT NULL,
	"tag" varchar(30) NOT NULL UNIQUE,
	"tag_count" integer NOT NULL,
	CONSTRAINT "tag_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "listing" ADD CONSTRAINT "listing_fk0" FOREIGN KEY ("id_seller") REFERENCES "account"("id");
ALTER TABLE "listing" ADD CONSTRAINT "listing_fk1" FOREIGN KEY ("id_category") REFERENCES "category"("id");

ALTER TABLE "message" ADD CONSTRAINT "message_fk0" FOREIGN KEY ("id_sender") REFERENCES "account"("id");
ALTER TABLE "message" ADD CONSTRAINT "message_fk1" FOREIGN KEY ("id_recipient") REFERENCES "account"("id");
ALTER TABLE "message" ADD CONSTRAINT "sender_noequal_recipient" CHECK ("id_sender" <> "id_recipient");

ALTER TABLE "selection" ADD CONSTRAINT "selection_fk0" FOREIGN KEY ("id_user") REFERENCES "account"("id");
ALTER TABLE "selection" ADD CONSTRAINT "selection_fk1" FOREIGN KEY ("id_following") REFERENCES "account"("id");
ALTER TABLE "selection" ADD CONSTRAINT "selection_fk2" FOREIGN KEY ("id_listing") REFERENCES "listing"("id");
ALTER TABLE "selection" ADD CONSTRAINT "selection_fk3" FOREIGN KEY ("id_tag") REFERENCES "tag"("id");
ALTER TABLE "selection" ADD CONSTRAINT "user_noequal_following" CHECK ("id_user" <> "id_following");

ALTER TABLE "listing_tag" ADD CONSTRAINT "listing_tag_fk0" FOREIGN KEY ("id_tag") REFERENCES "tag"("id");
ALTER TABLE "listing_tag" ADD CONSTRAINT "listing_tag_fk1" FOREIGN KEY ("id_listing") REFERENCES "listing"("id");

ALTER TABLE "image" ADD CONSTRAINT "image_fk0" FOREIGN KEY ("id_listing") REFERENCES "listing"("id");

CREATE UNIQUE INDEX "user_following" ON "selection"("id_user","id_following");
CREATE UNIQUE INDEX "favorite_listing" ON "selection"("id_user","id_listing");
CREATE UNIQUE INDEX "favorite_tag" ON "selection"("id_user","id_tag");

INSERT INTO "account" (name, bio, email, icon) VALUES('a','a','a@a.com', 'a.jpg');
INSERT INTO "account" (name, bio, email, icon) VALUES('b','b','b@b.com', 'b.jpg');
INSERT INTO "account" (name, bio, email, icon) VALUES('c','c','c@c.com', 'c.jpg');
INSERT INTO "account" (name, bio, email, icon) VALUES('d','d','d@d.com', 'd.jpg');
INSERT INTO "selection" (id_user, id_following) VALUES (1, 2);
INSERT INTO "selection" (id_user, id_following) VALUES (1, 3);
INSERT INTO "selection" (id_user, id_following) VALUES (3, 1);
INSERT INTO "selection" (id_user, id_following) VALUES (4, 1);
INSERT INTO "message" (id_sender, id_recipient, text) VALUES(1, 2, 'beans');
INSERT INTO "message" (id_sender, id_recipient, text) VALUES(1, 2, 'beansss');
INSERT INTO "message" (id_sender, id_recipient, text) VALUES(1, 3, 'bs');
INSERT INTO "message" (id_sender, id_recipient, text) VALUES(1, 3, 'asss');
INSERT INTO "message" (id_sender, id_recipient, text) VALUES(3, 1, 'avbsads');
INSERT INTO "message" (id_sender, id_recipient, text) VALUES(3, 1, '12321');
INSERT INTO "message" (id_sender, id_recipient, text) VALUES(4, 1, 'eee');
INSERT INTO "message" (id_sender, id_recipient, text) VALUES(4, 1, 'FFFF');
INSERT INTO "category" (name) VALUES('Shoes');
INSERT INTO "category" (name) VALUES('Automobile');
INSERT INTO "category" (name) VALUES('Electronics');
INSERT INTO "listing" (id_seller, id_category, name, description, price, zipcode, negotiable, archived) VALUES('1','1','Title', 'description', 1.1, 70091, 1, 0);
INSERT INTO "listing" (id_seller, id_category, name, description, price, zipcode, negotiable, archived) VALUES('2','1','Beep', 'desc', 1.1, 80021, 1, 1);
INSERT INTO "listing" (id_seller, id_category, name, description, price, zipcode, negotiable, archived) VALUES('3','2','Tit', 'doop', 1.1, 60042, 1, 0);
