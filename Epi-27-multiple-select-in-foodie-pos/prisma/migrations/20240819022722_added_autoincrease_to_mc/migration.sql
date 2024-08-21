-- AlterTable
CREATE SEQUENCE menuscategories_id_seq;
ALTER TABLE "MenusCategories" ALTER COLUMN "id" SET DEFAULT nextval('menuscategories_id_seq');
ALTER SEQUENCE menuscategories_id_seq OWNED BY "MenusCategories"."id";
