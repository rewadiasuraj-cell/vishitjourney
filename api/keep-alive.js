/**
 * Supabase Keep-Alive API Endpoint for Vercel Cron
 * Prevents Supabase Free Tier auto-pausing by running a lightweight query every 3 days.
 */

export default async function handler(req, res) {
  const startTime = Date.now();
  console.log(`[Keep-Alive] 🕒 Triggered at ${new Date().toISOString()} via ${req.method || 'GET'}`);

  // 1. Validate Secret Token if CRON_SECRET is set
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers ? (req.headers['authorization'] || req.headers['x-cron-secret'] || '') : '';
  const querySecret = req.query ? req.query.secret : '';

  if (cronSecret) {
    const isBearer = authHeader === `Bearer ${cronSecret}`;
    const isDirect = authHeader === cronSecret || querySecret === cronSecret;

    if (!isBearer && !isDirect) {
      console.warn('[Keep-Alive] ⚠️ Unauthorized access attempt blocked.');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid or missing CRON_SECRET token'
      });
    }
  }

  // 2. Supabase Credentials from Environment or fallback defaults
  const supabaseUrl = process.env.SUPABASE_URL || 'https://vpydlvmukxfqnwceelrl.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'sb_publishable_mJhQqeCY-qu-UCJ5cQcdYg_yzhpmEq3';

  try {
    // 3. Lightweight query on Supabase PostgREST endpoint: SELECT id FROM bookings LIMIT 1
    const targetUrl = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/bookings?select=id&limit=1`;
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Keep-Alive] ❌ Supabase query failed (${response.status}):`, errorText);
      return res.status(response.status).json({
        success: false,
        error: `Supabase query failed with status ${response.status}`,
        details: errorText,
        durationMs: Date.now() - startTime
      });
    }

    const data = await response.json();
    const duration = Date.now() - startTime;
    console.log(`[Keep-Alive] ✅ Supabase keep-alive ping successful! (${duration}ms) - Records:`, JSON.stringify(data));

    return res.status(200).json({
      success: true,
      message: 'Supabase project is active and alive!',
      timestamp: new Date().toISOString(),
      durationMs: duration,
      dataPreview: data
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[Keep-Alive] ❌ Unexpected error during ping:', error.message || error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
      durationMs: duration
    });
  }
}
