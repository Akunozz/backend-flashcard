-- DropForeignKey
ALTER TABLE "public"."Card" DROP CONSTRAINT "Card_deckId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DeckSession" DROP CONSTRAINT "DeckSession_deckId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_cardId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeckSession" ADD CONSTRAINT "DeckSession_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "public"."Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
