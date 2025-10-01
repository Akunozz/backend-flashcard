-- DropForeignKey
ALTER TABLE "public"."Deck" DROP CONSTRAINT "Deck_turmaId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Deck" ADD CONSTRAINT "Deck_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "public"."Turma"("id") ON DELETE CASCADE ON UPDATE CASCADE;
