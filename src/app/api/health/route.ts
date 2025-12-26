import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  
  // Basic database connection check
  const start = Date.now();
  const { error } = await supabase.from('health_check').select('*').limit(1).maybeSingle();
  const duration = Date.now() - start;

  if (error && error.code !== 'PGRST116') { // PGRST116 is "The result contains 0 rows", which is fine for connection check if table exists but is empty
     // If the table doesn't exist, it might throw an error, but that proves we connected to Supabase at least.
     // For a pure connection check without a specific table, we can just check auth or use a simple query if possible.
     // Since we don't know the schema, we'll assume a successful auth check is enough for "connectivity".
  }

  // Health check object
  const health = {
    status: error ? 'degraded' : 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: {
        status: error ? 'disconnected' : 'connected',
        latency: `${duration}ms`
      },
      api: {
        status: 'operational',
        version: 'v1'
      }
    }
  };

  return NextResponse.json(health, { status: error ? 503 : 200 });
}
