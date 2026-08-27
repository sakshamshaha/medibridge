import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');
  
  if (!ref) {
    return new NextResponse('Missing photo reference', { status: 400 });
  }

  if (ref.startsWith('mock-photo-')) {
    // Intercept mock references and return a placeholder hospital image
    // You can use any free generic placeholder service. We'll use Unsplash Source or a similar service.
    // Since Unsplash Source is deprecated, we'll use a reliable placeholder service with hospital themes
    const num = ref.replace('mock-photo-', '');
    const placeholderUrl = `https://picsum.photos/seed/hospital${num}/800/600`;
    return NextResponse.redirect(placeholderUrl);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.error("Missing GOOGLE_PLACES_API_KEY in frontend env");
    return new NextResponse('Server configuration error', { status: 500 });
  }

  try {
    const googleUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${ref}&key=${apiKey}`;
    const imageRes = await fetch(googleUrl);
    
    if (!imageRes.ok) {
      return new NextResponse('Failed to fetch image from Google', { status: imageRes.status });
    }

    const blob = await imageRes.blob();
    const headers = new Headers();
    headers.set('Content-Type', imageRes.headers.get('content-type') || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

    return new NextResponse(blob, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("Error proxying Google Places photo:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
