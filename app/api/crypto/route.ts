import { NextResponse } from 'next/server';

const CACHE_DURATION = 60 * 1000; // 60 seconds
const cache: { [key: string]: { data: any, timestamp: number } } = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const exchange = searchParams.get('exchange') || 'binance';

  const currentTime = Date.now();
  if (cache[exchange] && currentTime - cache[exchange].timestamp < CACHE_DURATION) {
    return NextResponse.json(cache[exchange].data);
  }

  try {
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // console.log(data)
    cache[exchange] = { data, timestamp: currentTime };
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return NextResponse.json({ error: 'Error fetching cryptocurrency data' }, { status: 500 });
  }
}
