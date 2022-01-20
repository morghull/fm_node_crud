CREATE TABLE "things"(
   "id" serial PRIMARY KEY,
   "body" text NOT NULL CHECK ("body"!=''),
   "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--UPDATE "things" SET "body"='test' WHERE "id"=0 RETURNING *;