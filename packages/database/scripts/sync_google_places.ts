import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env from the packages/database directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prisma = new PrismaClient();
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Simple delay function to respect rate limits
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  if (!GOOGLE_PLACES_API_KEY) {
    console.error('❌ Error: GOOGLE_PLACES_API_KEY environment variable is not set in .env');
    process.exit(1);
  }

  console.log('🔄 Starting Google Places API Sync...');
  
  const hospitals = await prisma.hospital.findMany();
  console.log(`Found ${hospitals.length} hospitals in the database to process.`);

  let successCount = 0;
  let notFoundCount = 0;
  let errorCount = 0;

  for (const hospital of hospitals) {
    let currentPlaceId = hospital.placeId;

    try {
      // 1. If we don't have a placeId, search for it using Find Place API
      if (!currentPlaceId) {
        const searchQuery = `${hospital.name} ${hospital.city}`;
        const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
          searchQuery
        )}&inputtype=textquery&key=${GOOGLE_PLACES_API_KEY}`;

        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (searchData.status === 'OK' && searchData.candidates && searchData.candidates.length > 0) {
          currentPlaceId = searchData.candidates[0].place_id;
          console.log(`[${hospital.city}] Found Place ID for "${hospital.name}": ${currentPlaceId}`);
        } else {
          console.warn(`⚠️ [${hospital.city}] No Google Place found for "${hospital.name}" (Query: ${searchQuery})`);
          notFoundCount++;
          await delay(200); // rate limiting
          continue;
        }
      }

      // 2. We have a placeId, fetch the Place Details
      if (currentPlaceId) {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${currentPlaceId}&fields=photos,rating,user_ratings_total,reviews,formatted_address&key=${GOOGLE_PLACES_API_KEY}`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();

        if (detailsData.status === 'OK' && detailsData.result) {
          const result = detailsData.result;

          // Process photos (store just the photo_references as JSON array)
          const photos = result.photos ? result.photos.map((p: any) => p.photo_reference) : [];
          
          // Process reviews (store as JSON string)
          const reviews = result.reviews ? result.reviews : [];

          // 3. Update the hospital record
          await prisma.hospital.update({
            where: { id: hospital.id },
            data: {
              placeId: currentPlaceId,
              googleRating: result.rating || null,
              googleUserRatingsTotal: result.user_ratings_total || null,
              googleFormattedAddress: result.formatted_address || null,
              googlePhotos: photos.length > 0 ? JSON.stringify(photos) : null,
              googleReviews: reviews.length > 0 ? JSON.stringify(reviews) : null,
              lastSyncedAt: new Date()
            }
          });

          console.log(`✅ [${hospital.city}] Successfully synced details for "${hospital.name}"`);
          successCount++;
        } else {
          console.error(`❌ [${hospital.city}] Error fetching details for Place ID ${currentPlaceId}: ${detailsData.status}`);
          errorCount++;
        }
      }
    } catch (error: any) {
      console.error(`❌ [${hospital.city}] Network/Runtime error for "${hospital.name}": ${error.message}`);
      errorCount++;
    }

    // Rate limiting: 200ms delay between processing each hospital to stay well within Google Maps QPS limits
    await delay(200);
  }

  console.log('\n======================================');
  console.log('--- GOOGLE PLACES SYNC SUMMARY ---');
  console.log(`Total Processed: ${hospitals.length}`);
  console.log(`Successfully Synced: ${successCount}`);
  console.log(`Not Found on Google: ${notFoundCount}`);
  console.log(`Errors Encountered: ${errorCount}`);
  console.log('======================================\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
