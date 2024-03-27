CREATE TABLE "work"(
    "id" BIGINT NOT NULL,
    "department_id" BIGINT NOT NULL,
    "handler_id" BIGINT NULL,
    "group_id" BIGINT NULL,
    "document_id" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    "sensitivity" VARCHAR(255) NOT NULL,
    "priority" VARCHAR(255) NOT NULL,
    "keywords" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "key_words" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "is_reassignment" BOOLEAN NOT NULL
);
ALTER TABLE
    "work" ADD PRIMARY KEY("id");
CREATE TABLE "department"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "department" ADD PRIMARY KEY("id");
CREATE TABLE "status"(
    "id" BIGINT NOT NULL,
    "work_id" BIGINT NOT NULL,
    "handler_id" BIGINT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "status_description" TEXT NOT NULL
);
ALTER TABLE
    "status" ADD PRIMARY KEY("id");
CREATE TABLE "attachments"(
    "id" BIGINT NOT NULL,
    "work_id" BIGINT NOT NULL,
    "attachment_creator" BIGINT NOT NULL,
    "document_name" VARCHAR(255) NOT NULL,
    "attachment_type" VARCHAR(255) NOT NULL,
    "attachment_url" TEXT NOT NULL,
    "attachment_keywords" TEXT NOT NULL,
    "attachment_description" TEXT NOT NULL,
    "created_at" DATE NOT NULL,
    "status" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "attachments" ADD PRIMARY KEY("id");
CREATE TABLE "group"(
    "id" BIGINT NOT NULL,
    "department_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "group" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" BIGINT NOT NULL,
    "incharge_id" BIGINT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "department_id" BIGINT NOT NULL,
    "middle_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "privilege" VARCHAR(255) NOT NULL,
    "designation" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "account_status" VARCHAR(255) NOT NULL,
    "user_role" VARCHAR(255) NOT NULL,
    "profile_picture" VARCHAR(255) NOT NULL

);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "attachments" ADD CONSTRAINT "attachments_status_foreign" FOREIGN KEY("status") REFERENCES "status"("status");
ALTER TABLE
    "attachments" ADD CONSTRAINT "attachments_work_id_foreign" FOREIGN KEY("work_id") REFERENCES "status"("work_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_department_id_foreign" FOREIGN KEY("department_id") REFERENCES "department"("id");
ALTER TABLE
    "status" ADD CONSTRAINT "status_work_id_foreign" FOREIGN KEY("work_id") REFERENCES "work"("id");
ALTER TABLE
    "status" ADD CONSTRAINT "status_handler_id_foreign" FOREIGN KEY("handler_id") REFERENCES "work"("handler_id");
ALTER TABLE
    "work" ADD CONSTRAINT "work_department_id_foreign" FOREIGN KEY("department_id") REFERENCES "department"("id");
ALTER TABLE
    "group" ADD CONSTRAINT "group_department_id_foreign" FOREIGN KEY("department_id") REFERENCES "department"("id");
ALTER TABLE
    "work" ADD CONSTRAINT "work_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "group"("id");
ALTER TABLE
    "work" ADD CONSTRAINT "work_handler_id_foreign" FOREIGN KEY("handler_id") REFERENCES "users"("id");
ALTER TABLE
    "attachments" ADD CONSTRAINT "attachments_attachment_creator_foreign" FOREIGN KEY("attachment_creator") REFERENCES "status"("handler_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_incharge_id_foreign" FOREIGN KEY("incharge_id") REFERENCES "users"("id");