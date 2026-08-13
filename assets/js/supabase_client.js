/**
 * VISHIT JOURNEY - Realtime Supabase Cloud Integration
 */

const SUPABASE_URL = 'https://vpydlvmukxfqnwceelrl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_mJhQqeCY-qu-UCJ5cQcdYg_yzhpmEq3';

let dbClient = null;

function initSupabase() {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    dbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✦ Supabase Realtime Cloud Connected!');
  }
}

// Global booking saver (Saves to Supabase Cloud + LocalStorage backup)
async function saveBookingToCloud(bookingObj) {
  // LocalStorage Backup
  try {
    let existing = JSON.parse(localStorage.getItem('vj_admin_bookings') || '[]');
    if (!existing.some(b => b.id === bookingObj.id)) {
      existing.unshift(bookingObj);
      localStorage.setItem('vj_admin_bookings', JSON.stringify(existing));
    }
  } catch(e) {}

  // Supabase Cloud Insert
  if (dbClient) {
    try {
      const { data, error } = await dbClient.from('bookings').insert([{
        id: bookingObj.id,
        customer_name: bookingObj.name,
        phone: bookingObj.phone,
        email: bookingObj.email,
        package_name: bookingObj.package,
        travel_date: bookingObj.date,
        guests: bookingObj.persons,
        price: bookingObj.price,
        status: bookingObj.status || 'Pending'
      }]);
      if (error) console.warn('Supabase insert notice (table auto-syncing):', error.message);
    } catch(err) {
      console.warn('Supabase network notice:', err);
    }
  }
}

// Global enquiry saver
async function saveEnquiryToCloud(enquiryObj) {
  try {
    let existing = JSON.parse(localStorage.getItem('vj_admin_enquiries') || '[]');
    existing.unshift(enquiryObj);
    localStorage.setItem('vj_admin_enquiries', JSON.stringify(existing));
  } catch(e) {}

  if (dbClient) {
    try {
      await dbClient.from('enquiries').insert([{
        name: enquiryObj.name,
        contact: enquiryObj.contact,
        destination: enquiryObj.dest,
        message: enquiryObj.msg,
        status: enquiryObj.status || 'New',
        date: enquiryObj.date || new Date().toISOString().slice(0,10)
      }]);
    } catch(err) {}
  }
}

// Auto init on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupabase);
} else {
  initSupabase();
}
