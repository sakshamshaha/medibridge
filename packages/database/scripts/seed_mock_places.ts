import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MOCK_PHOTOS = [
  "mock-photo-1",
  "mock-photo-2",
  "mock-photo-3",
  "mock-photo-4",
  "mock-photo-5",
];

const REVIEWERS = [
  "Anil Sharma", "Priya Desai", "Rahul Verma", "Sneha Patel", 
  "Vikram Singh", "Pooja Gupta", "Amit Kumar", "Neha Joshi",
  "Ramesh Yadav", "Kavita Reddy", "Sunil Tiwari", "Anjali Rao"
];

const POSITIVE_REVIEWS = [
  "Great facility and very attentive staff. Highly recommended.",
  "The doctors were very professional and explained everything clearly.",
  "Clean rooms, modern equipment, and excellent nursing care.",
  "Very efficient process from admission to discharge.",
  "Outstanding medical team. They saved my father's life.",
  "One of the best hospitals in the city for emergency care."
];

const MIXED_REVIEWS = [
  "Good doctors, but the billing process took way too long.",
  "The treatment was fine, but the waiting area was very crowded.",
  "Decent hospital overall, though parking is a major issue.",
  "Nurses were helpful, but the food provided was subpar."
];

// Helper to get random item from array
const sample = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
// Helper to get random integer between min and max (inclusive)
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
  console.log('🔄 Starting Mock Google Places Seed...');
  
  const hospitals = await prisma.hospital.findMany();
  console.log(`Found ${hospitals.length} hospitals to seed with mock data.`);

  let updatedCount = 0;

  for (const hospital of hospitals) {
    // Generate 3-5 random photos
    const photoCount = randomInt(3, 5);
    const photos = [];
    for (let i = 0; i < photoCount; i++) {
      photos.push(sample(MOCK_PHOTOS)); // We'll intercept these specific IDs in the proxy later
    }

    // Generate 3-4 random reviews
    const reviewCount = randomInt(3, 4);
    const reviews = [];
    let totalRating = 0;

    for (let i = 0; i < reviewCount; i++) {
      const isPositive = Math.random() > 0.3; // 70% chance of positive
      const rating = isPositive ? randomInt(4, 5) : 3;
      totalRating += rating;
      
      reviews.push({
        author_name: sample(REVIEWERS),
        rating: rating,
        relative_time_description: `${randomInt(1, 11)} months ago`,
        text: isPositive ? sample(POSITIVE_REVIEWS) : sample(MIXED_REVIEWS)
      });
    }

    const averageRating = (totalRating / reviewCount).toFixed(1);
    const userRatingsTotal = randomInt(15, 350);

    // Update hospital with mock data
    await prisma.hospital.update({
      where: { id: hospital.id },
      data: {
        placeId: `mock-place-${hospital.id}`,
        googleRating: parseFloat(averageRating),
        googleUserRatingsTotal: userRatingsTotal,
        googleFormattedAddress: hospital.address || `${hospital.name}, ${hospital.city}`,
        googlePhotos: JSON.stringify(photos),
        googleReviews: JSON.stringify(reviews),
        lastSyncedAt: new Date()
      }
    });

    updatedCount++;
    if (updatedCount % 20 === 0) {
      console.log(`Seeded ${updatedCount} / ${hospitals.length} hospitals...`);
    }
  }

  console.log(`✅ Successfully seeded mock Google Places data for ${updatedCount} hospitals.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
