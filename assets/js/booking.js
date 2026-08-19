/**
 * VISHIT JOURNEY - Trip Booking, Itinerary Generator & Details Collection System
 */

let vjCurrentPkg = null;
let vjPricing = null;
let vjCurrentStep = 1;
let vjUserData = {};

// Detailed Package Day-by-Day Itineraries Database

// Detailed Package Day-by-Day Itineraries Database for all packages
const vjItineraryDatabase = {
  'char dham': [
    { day: 'Day 1', title: 'Arrival in Haridwar / Rishikesh', desc: 'Pickup from Station/Airport, transfer to Haridwar/Rishikesh hotel, evening Ganga Aarti.' },
    { day: 'Day 2', title: 'Haridwar to Barkot / Yamunotri Base', desc: 'Scenic drive via Mussoorie & Kempty Falls to Barkot base camp.' },
    { day: 'Day 3', title: 'Yamunotri Dham Darshan', desc: 'Trek to Yamunotri Temple, holy dip at Surya Kund & VIP Darshan.' },
    { day: 'Day 4', title: 'Barkot to Uttarkashi', desc: 'Drive along Bhagirathi river, visit Kashi Vishwanath Temple.' },
    { day: 'Day 5', title: 'Gangotri Dham Excursion', desc: 'Drive through Harsil valley to Gangotri Dham, offer prayers & return.' },
    { day: 'Day 6', title: 'Uttarkashi to Guptkashi', desc: 'Drive through Mandakini valley, stay in Guptkashi/Phata.' },
    { day: 'Day 7', title: 'Kedarnath Dham Darshan', desc: 'Helicopter or Trek to Kedarnath Temple, evening Aarti & stay.' },
    { day: 'Day 8', title: 'Kedarnath to Badrinath Dham', desc: 'Morning Pooja, transfer to Badrinath via Chopta & Joshimath.' },
    { day: 'Day 9', title: 'Badrinath Darshan & Mana Village', desc: 'Tapt Kund dip, Badrinath Darshan, Mana Village & Vyas Gufa.' },
    { day: 'Day 10', title: 'Badrinath to Rishikesh / Delhi Departure', desc: 'Return drive via Devprayag, drop at Rishikesh/Haridwar/Delhi.' }
  ],
  'do dham': [
    { day: 'Day 1', title: 'Haridwar to Guptkashi / Phata', desc: 'Drive along Alaknanda & Mandakini rivers to Guptkashi.' },
    { day: 'Day 2', title: 'Kedarnath Dham VIP Darshan', desc: 'Helicopter or Trek to Kedarnath Temple, evening Aarti & stay.' },
    { day: 'Day 3', title: 'Kedarnath to Badrinath Dham', desc: 'Morning Pooja at Kedarnath, transfer to Badrinath via Chopta.' },
    { day: 'Day 4', title: 'Badrinath Temple & Mana Village', desc: 'Morning Tapt Kund dip, Badrinath Darshan, Mana Village tour.' },
    { day: 'Day 5', title: 'Badrinath to Haridwar / Rishikesh Departure', desc: 'Return drive via Devprayag confluence, drop at Haridwar.' }
  ],
  'ek dham': [
    { day: 'Day 1', title: 'Haridwar to Phata / Joshimath', desc: 'Pickup and drive through scenic mountain roads to base camp.' },
    { day: 'Day 2', title: 'Kedarnath or Badrinath VIP Darshan', desc: 'Special VIP Darshan, Puja assistance & local exploration.' },
    { day: 'Day 3', title: 'Return Transfer & Departure', desc: 'Return drive to Haridwar/Rishikesh for onward journey.' }
  ],
  'dubai': [
    { day: 'Day 1', title: 'Dubai Airport VIP Transfer & Hotel Check-in', desc: 'Welcome at Dubai International Airport, private transfer to luxury hotel.' },
    { day: 'Day 2', title: 'Half-Day City Tour & Burj Khalifa 124th Floor', desc: 'Visit Dubai Frame, Jumeirah Beach, and Burj Khalifa observation deck.' },
    { day: 'Day 3', title: 'Desert Safari with 4x4 Dune Bashing & BBQ', desc: 'Thrilling desert safari, camel ride, henna, belly dance & BBQ dinner.' },
    { day: 'Day 4', title: 'Luxury Marina Dhow Dinner Cruise', desc: 'Leisure morning, evening luxury Dhow Cruise with buffet dinner in Dubai Marina.' },
    { day: 'Day 5', title: 'Duty Free Shopping & Airport Departure', desc: 'Gold Souk & Mall of Emirates shopping, airport transfer.' }
  ],
  'thailand': [
    { day: 'Day 1', title: 'Bangkok Arrival & Transfer to Pattaya', desc: 'Welcome at Suvarnabhumi Airport, drive to Pattaya beach resort.' },
    { day: 'Day 2', title: 'Coral Island Speedboat Tour with Lunch', desc: 'Speedboat ride to Coral Island, parasailing, snorkeling & Indian lunch.' },
    { day: 'Day 3', title: 'Alcazar Show & Transfer to Bangkok', desc: 'World famous Alcazar Show performance, transfer to Bangkok hotel.' },
    { day: 'Day 4', title: 'Bangkok City & Temple Tour', desc: 'Visit Wat Pho (Reclining Buddha) & Wat Traimit (Golden Buddha).' },
    { day: 'Day 5', title: 'Safari World & Marine Park Full Day Trip', desc: 'Full day at Safari World with wild animal shows & buffet lunch.' },
    { day: 'Day 6', title: 'Indra Market Shopping & Departure', desc: 'Shopping at Pratunam & Indra Market, airport drop.' }
  ],
  'bali': [
    { day: 'Day 1', title: 'Bali Airport Welcome & Pool Villa Check-in', desc: 'Flower garland welcome at Denpasar Airport, transfer to private pool villa.' },
    { day: 'Day 2', title: 'Kintamani Volcano & Ubud Swing Tour', desc: 'Visit Kintamani volcano, Tegalalang rice terraces & famous Bali swing.' },
    { day: 'Day 3', title: 'Nusa Dua Water Sports & Uluwatu Sunset', desc: 'Banana boat & parasailing, evening Kecak dance at Uluwatu Temple.' },
    { day: 'Day 4', title: 'Private Nusa Penida Island Speedboat Excursion', desc: 'Speedboat trip to Nusa Penida, Kelingking T-Rex Beach & Angel Billabong.' },
    { day: 'Day 5', title: 'Balinese Spa Session & Departure', desc: 'Couples massage session, souvenir shopping and airport transfer.' }
  ],
  'maldives': [
    { day: 'Day 1', title: 'Male Airport Speedboat & Water Villa Check-in', desc: 'Speedboat transfer to luxury island resort, water villa check-in.' },
    { day: 'Day 2', title: 'Coral Reef Snorkeling & Ocean Relaxation', desc: 'Guided snorkeling session in crystal clear lagoon & beach relaxation.' },
    { day: 'Day 3', title: 'Sunset Dolphin Cruise & Beachfront Dinner', desc: 'Evening dolphin watching cruise followed by candlelit beach dinner.' },
    { day: 'Day 4', title: 'Private Villa Pool & Spa Treatment', desc: 'Leisure day at private villa pool and wellness spa treatment.' },
    { day: 'Day 5', title: 'Farewell Breakfast & Speedboat Transfer', desc: 'Buffet breakfast, photos, and speedboat transfer to Male Airport.' }
  ],
  'kashmir': [
    { day: 'Day 1', title: 'Srinagar Airport Arrival & Houseboat Stay', desc: 'Transfer to Deluxe Houseboat on Dal Lake, 1-Hour Shikara ride.' },
    { day: 'Day 2', title: 'Srinagar Mughal Gardens Sightseeing', desc: 'Visit Nishat Bagh, Shalimar Bagh, Chashme Shahi & Shankaracharya Temple.' },
    { day: 'Day 3', title: 'Gulmarg Gondola Excursion', desc: 'Full day trip to Gulmarg, Gondola Cable Car ride & snow points.' },
    { day: 'Day 4', title: 'Pahalgam Valley Tour', desc: 'Drive to Pahalgam via saffron fields, visit Betaab Valley & Aru Valley.' },
    { day: 'Day 5', title: 'Sonmarg Glacier Trip', desc: 'Trip to Sonmarg & Thajiwas Glacier pony ride.' },
    { day: 'Day 6', title: 'Shopping & Srinagar Departure', desc: 'Handicraft & dry fruit shopping, Srinagar airport drop.' }
  ],
  'manali': [
    { day: 'Day 1', title: 'Manali Arrival & Hotel Check-in', desc: 'Pickup from Manali bus stand, hotel check-in, evening Mall Road walk.' },
    { day: 'Day 2', title: 'Solang Valley & Atal Tunnel Excursion', desc: 'Full day trip to Solang Valley for paragliding, zorbing & Atal Tunnel.' },
    { day: 'Day 3', title: 'Hadimba Temple & Local Sightseeing', desc: 'Visit Hadimba Temple, Vashisht Hot Water Springs & Tibetan Monastery.' },
    { day: 'Day 4', title: 'Naggar Castle & Departure', desc: 'Visit historic Naggar Castle & Kullu rafting spot, evening departure.' }
  ],
  'shimla': [
    { day: 'Day 1', title: 'Delhi to Shimla Drive', desc: 'Scenic mountain drive to Shimla, hotel check-in, Mall Road walk.' },
    { day: 'Day 2', title: 'Kufri & Chail Excursion', desc: 'Visit Kufri snow point, Himalayan Nature Park & Jakhoo Temple.' },
    { day: 'Day 3', title: 'Shimla to Manali Drive via Kullu', desc: 'Drive along Beas river, stop at Kullu Shawl Factory & Rafting point.' },
    { day: 'Day 4', title: 'Solang Valley & Manali Sightseeing', desc: 'Solang Valley adventure sports and Hadimba Devi temple visit.' },
    { day: 'Day 5', title: 'Return Drive to Delhi', desc: 'Breakfast, check-out and return drive to Delhi.' }
  ],
  'kasol': [
    { day: 'Day 1', title: 'Kasol Arrival & Parvati River Walk', desc: 'Arrival in Kasol, check-in to riverside camp/hotel, explore cafes.' },
    { day: 'Day 2', title: 'Manikaran Sahib Gurudwara & Hot Springs', desc: 'Visit Manikaran Sahib holy dip, Chalal village trek.' },
    { day: 'Day 3', title: 'Kasol to Manali Drive', desc: 'Drive to Manali via Kullu valley, evening Mall Road leisure.' },
    { day: 'Day 4', title: 'Solang Valley Snow Point', desc: 'Full day Solang Valley adventure sports & snow activity.' },
    { day: 'Day 5', title: 'Manali Local Tour', desc: 'Hadimba Temple, Vashisht & Van Vihar.' },
    { day: 'Day 6', title: 'Departure Transfer', desc: 'Souvenir shopping and return departure.' }
  ],
  'agra': [
    { day: 'Day 1', title: 'Delhi to Agra via Yamuna Expressway', desc: 'Morning drive to Agra, check-in, visit Agra Fort & Sunset Taj Mahal view.' },
    { day: 'Day 2', title: 'Sunrise Taj Mahal & Fatehpur Sikri', desc: 'Early morning Sunrise Taj Mahal visit, Fatehpur Sikri & drive to Delhi/Jaipur.' }
  ],
  'rajasthan': [
    { day: 'Day 1', title: 'Arrival in Jaipur (Pink City)', desc: 'Transfer to heritage hotel, visit City Palace & Janatar Mantar.' },
    { day: 'Day 2', title: 'Amber Fort & Hawa Mahal Tour', desc: 'Elephant/jeep ride at Amber Fort, Hawa Mahal & Jal Mahal photo stop.' },
    { day: 'Day 3', title: 'Jaipur to Jodhpur (Blue City)', desc: 'Drive to Jodhpur, visit Mehrangarh Fort & Jaswant Thada.' },
    { day: 'Day 4', title: 'Jodhpur to Jaisalmer Sand Dunes', desc: 'Drive to Jaisalmer desert camp, camel safari, Rajasthani folk dance & BBQ.' },
    { day: 'Day 5', title: 'Jaisalmer Fort & Patwon Ki Haveli', desc: 'Explore Golden Fort, Patwon Ki Haveli & Gadisar Lake.' },
    { day: 'Day 6', title: 'Jaisalmer to Udaipur (City of Lakes)', desc: 'Scenic drive to Udaipur, evening boat ride on Lake Pichola.' },
    { day: 'Day 7', title: 'Udaipur City Palace & Saheliyon Ki Bari', desc: 'Visit Udaipur City Palace, Saheliyon Ki Bari & Jagdish Temple.' },
    { day: 'Day 8', title: 'Shopping & Departure', desc: 'Bapu Bazaar shopping and departure transfer.' }
  ],
  'kerala': [
    { day: 'Day 1', title: 'Cochin Arrival to Munnar Tea Gardens', desc: 'Welcome at Cochin Airport, drive through Cheeyappara waterfalls to Munnar.' },
    { day: 'Day 2', title: 'Munnar Sightseeing Tour', desc: 'Visit Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam & Tea Museum.' },
    { day: 'Day 3', title: 'Munnar to Thekkady Spice Plantation', desc: 'Drive to Thekkady, spice plantation tour & Periyar Lake boat safari.' },
    { day: 'Day 4', title: 'Thekkady to Alleppey Houseboat Cruise', desc: 'Check-in to private luxury Houseboat, cruise through backwater canals.' },
    { day: 'Day 5', title: 'Alleppey to Kovalam Beach Resort', desc: 'Drive to Kovalam, relax at Lighthouse Beach & Samudra Beach.' },
    { day: 'Day 6', title: 'Trivandrum Sightseeing & Departure', desc: 'Visit Padmanabhaswamy Temple, Trivandrum Airport drop.' }
  ],
  'ladakh': [
    { day: 'Day 1', title: 'Leh Airport Arrival & Rest', desc: 'Welcome at Kushok Bakula Rimpochee Airport, complete rest for acclimatization.' },
    { day: 'Day 2', title: 'Leh Local Sightseeing', desc: 'Visit Shanti Stupa, Leh Palace, Magnetic Hill & Hall of Fame museum.' },
    { day: 'Day 3', title: 'Drive over Khardung La to Nubra Valley', desc: 'Cross Khardung La pass (18,380 ft), arrive Nubra Valley, double-humped camel safari.' },
    { day: 'Day 4', title: 'Diskit Monastery & Hunder Sand Dunes', desc: 'Visit giant Buddha statue at Diskit Monastery & Hunder dunes.' },
    { day: 'Day 5', title: 'Nubra Valley to Pangong Tso Lake', desc: 'Drive along Shyok river to world-famous blue Pangong Tso Lake, lakeside camp stay.' },
    { day: 'Day 6', title: 'Pangong Lake Sunrise to Leh', desc: 'Sunrise at Pangong Lake, drive back to Leh over Chang La pass.' },
    { day: 'Day 7', title: 'Shopping & Leh Airport Departure', desc: 'Souvenir shopping and airport drop.' }
  ],
  'goa': [
    { day: 'Day 1', title: 'Goa Arrival & Beach Resort Check-in', desc: 'Pickup from Airport/Thivim Station, check-in to resort near beach.' },
    { day: 'Day 2', title: 'North Goa Beaches & Fort Aguada', desc: 'Visit Fort Aguada, Calangute, Baga, and Anjuna Beach with water sports.' },
    { day: 'Day 3', title: 'South Goa Heritage & Sunset Cruise', desc: 'Basilica of Bom Jesus, Mangeshi Temple, Miramar beach & Mandovi river cruise.' },
    { day: 'Day 4', title: 'Leisure & Departure', desc: 'Relax at beach resort and airport/station drop.' }
  ],
  'rishikesh': [
    { day: 'Day 1', title: 'Rishikesh Arrival & Riverside Camping', desc: 'Arrival at Shivpuri camp, lunch, beach games, evening bonfire with music.' },
    { day: 'Day 2', title: '16km River Rafting & Cliff Jumping', desc: 'Thrilling 16km Ganga rafting, cliff jumping, body surfing & Ram Jhula walk.' },
    { day: 'Day 3', title: 'Triveni Ghat Ganga Aarti & Departure', desc: 'Morning yoga, visit Laxman Jhula & Triveni Ghat before departure.' }
  ],
  'udaipur': [
    { day: 'Day 1', title: 'Udaipur Arrival & Lake Pichola Walk', desc: 'Pickup from Udaipur Airport/Station, check-in to hotel, evening lake walk.' },
    { day: 'Day 2', title: 'City Palace & Sunset Boat Ride', desc: 'Visit magnificent City Palace, Jagdish Temple & sunset boat ride on Lake Pichola.' },
    { day: 'Day 3', title: 'Sajjangarh Monsoon Palace & Fateh Sagar', desc: 'Visit Monsoon Palace, Saheliyon Ki Bari gardens & Fateh Sagar Lake.' },
    { day: 'Day 4', title: 'Hathi Pol Shopping & Departure', desc: 'Local Rajasthani handicraft shopping and airport drop.' }
  ],
  'assam': [
    { day: 'Day 1', title: 'Guwahati Arrival to Shillong Drive', desc: 'Pickup at Guwahati Airport, drive to Shillong via Umiam Lake.' },
    { day: 'Day 2', title: 'Shillong & Elephant Falls Tour', desc: 'Visit Elephant Falls, Shillong Peak & Ward’s Lake.' },
    { day: 'Day 3', title: 'Cherrapunji Waterfalls Day Trip', desc: 'Excursion to Cherrapunji, Nohkalikai Falls, Mawsmai Cave & Seven Sisters Falls.' },
    { day: 'Day 4', title: 'Mawlynnong & Dawki Crystal River', desc: 'Visit Mawlynnong (cleanest village) & boat ride on Dawki Umngot river.' },
    { day: 'Day 5', title: 'Transfer to Kaziranga National Park', desc: 'Drive to Kaziranga, tea estate walk & cultural dance show.' },
    { day: 'Day 6', title: 'Kaziranga Elephant & Jeep Safari', desc: 'Early morning Elephant safari to spot One-Horned Rhino + Jeep safari.' },
    { day: 'Day 7', title: 'Kamakhya Temple & Guwahati Departure', desc: 'Visit Kamakhya Temple and Guwahati airport drop.' }
  ],
  'default': [
    { day: 'Day 1', title: 'Arrival & Hotel Check-in', desc: 'Pickup from Airport/Station, transfer to hotel, evening market walk.' },
    { day: 'Day 2', title: 'Full Day Guided Sightseeing', desc: 'Guided tour of top attractions, heritage landmarks & scenic spots.' },
    { day: 'Day 3', title: 'Outdoor Excursion & Adventure', desc: 'Full day outdoor excursion to nearby viewpoints and activity spots.' },
    { day: 'Day 4', title: 'Leisure & Local Culture', desc: 'Shopping, local food exploration & relaxed evening.' },
    { day: 'Day 5', title: 'Check-out & Departure', desc: 'Breakfast, check-out and drop transfer to Airport/Station.' }
  ]
};

function getItineraryForPackage(pkgName) {
  const nameLower = (pkgName || '').toLowerCase();
  if (nameLower.includes('char dham')) return vjItineraryDatabase['char dham'];
  if (nameLower.includes('do dham')) return vjItineraryDatabase['do dham'];
  if (nameLower.includes('ek dham') || nameLower.includes('dham')) return vjItineraryDatabase['ek dham'];
  if (nameLower.includes('dubai')) return vjItineraryDatabase['dubai'];
  if (nameLower.includes('thailand')) return vjItineraryDatabase['thailand'];
  if (nameLower.includes('bali')) return vjItineraryDatabase['bali'];
  if (nameLower.includes('maldives')) return vjItineraryDatabase['maldives'];
  if (nameLower.includes('kashmir')) return vjItineraryDatabase['kashmir'];
  if (nameLower.includes('manali') && !nameLower.includes('shimla') && !nameLower.includes('kasol')) return vjItineraryDatabase['manali'];
  if (nameLower.includes('shimla')) return vjItineraryDatabase['shimla'];
  if (nameLower.includes('kasol')) return vjItineraryDatabase['kasol'];
  if (nameLower.includes('agra') && !nameLower.includes('jaipur')) return vjItineraryDatabase['agra'];
  if (nameLower.includes('rajasthan') || nameLower.includes('jaipur')) return vjItineraryDatabase['rajasthan'];
  if (nameLower.includes('kerala')) return vjItineraryDatabase['kerala'];
  if (nameLower.includes('ladakh') || nameLower.includes('leh')) return vjItineraryDatabase['ladakh'];
  if (nameLower.includes('goa')) return vjItineraryDatabase['goa'];
  if (nameLower.includes('rishikesh')) return vjItineraryDatabase['rishikesh'];
  if (nameLower.includes('udaipur')) return vjItineraryDatabase['udaipur'];
  if (nameLower.includes('assam') || nameLower.includes('meghalaya')) return vjItineraryDatabase['assam'];
  return vjItineraryDatabase['default'];
}


// Open Booking & Itinerary Modal

function openBooking(id, name, price, duration, category) {
  const pkgName = encodeURIComponent(name || 'Travel Package');
  const pkgPrice = encodeURIComponent(price || 0);
  const pkgDur = encodeURIComponent(duration || '');
  window.location.href = '/booking?pkg=' + pkgName + '&price=' + pkgPrice + '&duration=' + pkgDur;
}

async function openBookingModal(pkgId, name, price, duration, category) {
  vjCurrentStep = 1;
  hideError();
  
  vjCurrentPkg = {
    id: pkgId || 1,
    name: name || 'Custom Travel Package',
    price: price || 15000,
    duration: duration || '5D / 4N',
    category: category || 'domestic'
  };

  const titleEl = document.getElementById('vjModalPkgTitle');
  const metaEl = document.getElementById('vjModalPkgMeta');
  if (titleEl) titleEl.textContent = vjCurrentPkg.name;
  if (metaEl) metaEl.textContent = `${vjCurrentPkg.duration} • Starting ₹${Number(vjCurrentPkg.price).toLocaleString('en-IN')}`;

  const modal = document.getElementById('vjBookingModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Pre-fill tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = document.getElementById('vjInputDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  showStep(1);
}

function closeBookingModal() {
  const modal = document.getElementById('vjBookingModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function showStep(stepNum) {
  vjCurrentStep = stepNum;
  const s1 = document.getElementById('vjStep1');
  const s2 = document.getElementById('vjStep2');
  const s3 = document.getElementById('vjStep3');

  if (s1) s1.style.display = stepNum === 1 ? 'block' : 'none';
  if (s2) s2.style.display = stepNum === 2 ? 'block' : 'none';
  if (s3) s3.style.display = stepNum === 3 ? 'block' : 'none';
}

// Handle Form Submission (Collect Name, Phone, Location & Show Itinerary)
function handleDetailsSubmit(e) {
  if (e) e.preventDefault();
  hideError();

  const name = (document.getElementById('vjInputName')?.value || '').trim();
  const phone = (document.getElementById('vjInputPhone')?.value || '').trim();
  const location = (document.getElementById('vjInputCity')?.value || document.getElementById('vjInputPickup')?.value || '').trim();
  const travelDate = document.getElementById('inputDate')?.value || document.getElementById('vjInputDate')?.value || '';
  const adults = document.getElementById('vjSelectAdults')?.value || '2';
  const children = document.getElementById('vjSelectChildren')?.value || '0';

  if (!name || !phone) {
    showError('Please enter your Full Name and Mobile Phone Number.');
    return;
  }

  vjUserData = {
    name,
    phone,
    location: location || 'Delhi NCR',
    travelDate,
    adults,
    children,
    pkgName: vjCurrentPkg ? vjCurrentPkg.name : 'Travel Package',
    duration: vjCurrentPkg ? vjCurrentPkg.duration : '5D / 4N',
    price: vjCurrentPkg ? vjCurrentPkg.price : 15000
  };

  // Save Inquiry lead
  try {
    let existing = JSON.parse(localStorage.getItem('vj_admin_inquiries') || '[]');
    existing.unshift({
      id: 'INQ-' + Math.floor(1000 + Math.random() * 9000),
      ...vjUserData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('vj_admin_inquiries', JSON.stringify(existing));
  } catch(err) {}

  // Format WhatsApp Message to +91 98999 02890
  const text = `Hi Vishit Journey! I want to get custom quote & itinerary details for ${vjUserData.pkgName}.\n\n👤 *Name:* ${vjUserData.name}\n📞 *Phone:* ${vjUserData.phone}\n📍 *Starting City:* ${vjUserData.location}\n🗓 *Travel Date:* ${vjUserData.travelDate}\n👥 *Guests:* ${vjUserData.adults} Adults${vjUserData.children > 0 ? ', ' + vjUserData.children + ' Children' : ''}\n\nPlease share detailed PDF itinerary and best package price!`;
  const waUrl = `https://wa.me/919899902890?text=${encodeURIComponent(text)}`;

  // AUTOMATICALLY OPEN WHATSAPP TO +91 98999 02890
  window.open(waUrl, '_blank');

  renderItineraryScreen();
  showStep(2);
}

function renderItineraryScreen() {
  const container = document.getElementById('vjItineraryContent');
  if (!container) return;

  const itineraryList = getItineraryForPackage(vjUserData.pkgName);

  let html = `
    <div style="background:linear-gradient(135deg, #0d1f3c 0%, #1a2b4c 100%); color:#fff; padding:1.2rem; border-radius:16px; margin-bottom:1.2rem; border:1px solid rgba(201,165,74,0.4);">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(201,165,74,0.2); padding-bottom:0.6rem; margin-bottom:0.8rem;">
        <div>
          <span style="font-size:0.7rem; color:#c9a54a; text-transform:uppercase; font-weight:700; letter-spacing:1.5px;">CUSTOMER DETAILS</span>
          <h4 style="font-size:1.1rem; color:#fff; margin-top:2px;">${vjUserData.name}</h4>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.75rem; color:#dcdcdc; display:block;">📞 ${vjUserData.phone}</span>
          <span style="font-size:0.75rem; color:#c9a54a; display:block;">📍 ${vjUserData.location}</span>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:#e0e0e0;">
        <span>🗓 Travel Date: <strong>${vjUserData.travelDate || 'Flexible'}</strong></span>
        <span>👥 Guests: <strong>${vjUserData.adults} Adult(s)${vjUserData.children > 0 ? ', ' + vjUserData.children + ' Child' : ''}</strong></span>
      </div>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h4 style="font-family:'Cormorant Garamond',serif; font-size:1.5rem; color:#0d1f3c; margin-bottom:0.8rem; font-weight:700;">
        📍 Detailed Day-by-Day Itinerary
      </h4>
      <div style="display:flex; flex-direction:column; gap:0.8rem;">
  `;

  itineraryList.forEach(item => {
    html += `
      <div style="background:#f8f6f0; border-left:4px solid #c9a54a; padding:0.9rem 1.1rem; border-radius:0 12px 12px 0;">
        <span style="font-size:0.72rem; font-weight:800; color:#c9a54a; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:2px;">${item.day}</span>
        <h5 style="font-size:0.98rem; font-weight:700; color:#0d1f3c; margin-bottom:4px;">${item.title}</h5>
        <p style="font-size:0.85rem; color:#4a5568; margin:0; line-height:1.4;">${item.desc}</p>
      </div>
    `;
  });

  html += `
      </div>
    </div>

    <div style="background:#f0f7ff; border:1px solid #bfdbfe; border-radius:14px; padding:1rem; margin-bottom:1.5rem;">
      <h5 style="font-size:0.9rem; font-weight:700; color:#1e40af; margin-bottom:0.4rem;">✨ Package Inclusions Included:</h5>
      <ul style="font-size:0.82rem; color:#1e3a8a; margin:0; padding-left:1.2rem; line-height:1.6;">
        <li>Private AC Vehicle Transfer for complete tour duration</li>
        <li>Pre-booked Luxury Hotel / Resort accommodation</li>
        <li>Complimentary Daily Breakfast & Dinner meals</li>
        <li>VIP Darshan & Temple Entry assistance (where applicable)</li>
        <li>24/7 Dedicated Vishit Journey Trip Manager Support</li>
      </ul>
    </div>
  `;

  container.innerHTML = html;

  // Set WhatsApp action link
  const waBtn = document.getElementById('vjItineraryWABtn');
  if (waBtn) {
    const text = `Hi Vishit Journey, I filled out my details for ${vjUserData.pkgName}.

*Name:* ${vjUserData.name}
*Phone:* ${vjUserData.phone}
*Location:* ${vjUserData.location}
*Travel Date:* ${vjUserData.travelDate}

Please share customized quotes & PDF itinerary!`;
    waBtn.href = `https://wa.me/919899902890?text=${encodeURIComponent(text)}`;
  }
}

// Download Itinerary as Clean PDF / Printable Sheet
function downloadItineraryPDF() {
  if (!vjUserData || !vjUserData.name) {
    alert('Please fill out your details first.');
    return;
  }

  const itineraryList = getItineraryForPackage(vjUserData.pkgName);
  
  let daysHtml = '';
  itineraryList.forEach(item => {
    daysHtml += `
      <div style="margin-bottom: 12px; padding: 10px 14px; background: #f9f9f9; border-left: 4px solid #c9a54a; border-radius: 4px;">
        <strong style="color: #c9a54a; font-size: 11px; text-transform: uppercase;">${item.day}</strong>
        <h4 style="margin: 2px 0 4px; color: #0d1f3c; font-size: 14px;">${item.title}</h4>
        <p style="margin: 0; color: #555; font-size: 12px; line-height: 1.4;">${item.desc}</p>
      </div>
    `;
  });

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Vishit Journey - ${vjUserData.pkgName} Itinerary</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 25px; color: #333; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #c9a54a; padding-bottom: 15px; margin-bottom: 20px; }
        .brand { font-size: 24px; font-weight: bold; color: #0d1f3c; }
        .brand span { color: #c9a54a; }
        .sub { font-size: 12px; color: #666; }
        .box { background: #0d1f3c; color: #fff; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .box-grid { display: flex; justify-content: space-between; font-size: 13px; margin-top: 8px; }
        h3 { color: #0d1f3c; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
        .footer { margin-top: 30px; border-top: 1px solid #ddd; padding-top: 12px; font-size: 11px; color: #777; text-align: center; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">VISHIT <span>JOURNEY</span></div>
          <div class="sub">Travel Beyond Limits | Luxury Tour Packages</div>
        </div>
        <div style="text-align: right; font-size: 12px;">
          <strong>Call / WhatsApp:</strong> +91 98999 02890<br>
          <strong>Website:</strong> www.vishitjourney.com
        </div>
      </div>

      <div class="box">
        <div style="font-size: 18px; font-weight: bold; color: #e4c06e;">${vjUserData.pkgName}</div>
        <div style="font-size: 12px; color: #ccc;">Duration: ${vjUserData.duration} • Starting ₹${Number(vjUserData.price).toLocaleString('en-IN')}</div>
        <div class="box-grid">
          <div><strong>Customer Name:</strong> ${vjUserData.name}</div>
          <div><strong>Phone:</strong> ${vjUserData.phone}</div>
          <div><strong>Starting City:</strong> ${vjUserData.location}</div>
          <div><strong>Travel Date:</strong> ${vjUserData.travelDate || 'Flexible'}</div>
        </div>
      </div>

      <h3>Detailed Day-by-Day Itinerary Plan</h3>
      ${daysHtml}

      <h3>Package Inclusions</h3>
      <ul style="font-size: 12px; line-height: 1.6; color: #444;">
        <li>Private AC Vehicle for complete tour transfers</li>
        <li>Luxury Hotel / Resort Accommodation</li>
        <li>Daily Breakfast & Dinner</li>
        <li>Sightseeing & VIP Darshan Assistance</li>
        <li>24/7 Dedicated Trip Manager Support</li>
      </ul>

      <div class="footer">
        Vishit Journey • Office on 1st Floor, Plot No. 2, Metro Pillar 786, Uttam Nagar, New Delhi • Helpline: +91 98999 02890
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function showError(msg) {
  const el = document.getElementById('vjModalError');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function hideError() {
  const el = document.getElementById('vjModalError');
  if (el) { el.style.display = 'none'; }
}


// Attach global window functions for 100% reliable click execution
window.openBooking = openBooking;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.handleDetailsSubmit = handleDetailsSubmit;
window.downloadItineraryPDF = downloadItineraryPDF;
window.showStep = showStep;
