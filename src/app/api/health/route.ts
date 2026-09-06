import { NextResponse } from 'next/server';

export async function GET() {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!configured) {
    return NextResponse.json({
      status: 'demo-mode',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: 'not-configured',
          detail: 'Running on the demo data layer. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to go live.',
        },
        api: {
          status: 'operational',
          version: 'v1',
        },
      },
    });
  }

  // Live mode: ping Supabase with a cheap query.
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = createClient();
    const start = Date.now();
    const { error } = await supabase.from('profiles').select('id').limit(1);
    const duration = Date.now() - start;

    return NextResponse.json(
      {
        status: error ? 'degraded' : 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          database: {
            status: error ? 'disconnected' : 'connected',
            latency: `${duration}ms`,
          },
          api: {
            status: 'operational',
            version: 'v1',
          },
        },
      },
      { status: error ? 503 : 200 }
    );
  } catch {
    return NextResponse.json(
      {
        status: 'degraded',
        timestamp: new Date().toISOString(),
        services: {
          database: { status: 'error' },
          api: { status: 'operational', version: 'v1' },
        },
      },
      { status: 503 }
    );
  }
}
