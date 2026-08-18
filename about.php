<?php
require_once __DIR__ . '/config/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="psJq_vKOneKGa4XOJk3xLJ7ap7jF5pHo6Dv_h3q5hJY" />
<title>About Us — Vishit Journey | Premier Travel & Tour Experiences</title>
<meta name="description" content="Learn about Vishit Journey, India's premier travel agency providing customized tour packages for Kashmir, Ladakh, Himachal, Goa, and beyond. Explore our story, values, and client experiences.">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/booking.css">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --navy:#081428;
    --navy2:#0d1f3c;
    --gold:#c9a54a;
    --gold2:#e4c06e;
    --white:#fff;
    --offwhite:#f5f0e8;
    --muted:#8a9ab5;
    --card-bg:rgba(13,31,60,0.7);
    --border-gold:rgba(201,165,74,0.25);
  }
  html{scroll-behavior:smooth}
  body{font-family:'Jost',sans-serif;background:var(--navy);color:var(--white);overflow-x:hidden;line-height:1.6}

  /* ── EXACT MAIN SITE HEADER NAVBAR ── */
  nav {
    position: fixed !important;
    top: 0 !important; left: 0 !important; right: 0 !important;
    z-index: 1000 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: .25rem 4% !important;
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    border-bottom: 2px solid rgba(201, 165, 74, 0.3) !important;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08) !important;
  }
  .nav-links {
    display: flex !important;
    gap: 2rem !important;
    list-style: none !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .nav-links a {
    text-decoration: none !important;
    font-size: .8rem !important;
    font-weight: 600 !important;
    letter-spacing: 2px !important;
    text-transform: uppercase !important;
    color: #0d1f3c !important;
    padding: .5rem 1rem !important;
    border-radius: 20px !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    transition: all .2s ease !important;
    white-space: nowrap !important;
  }
  .nav-links a:hover, .nav-links a.active {
    color: var(--gold) !important;
    background: rgba(201, 165, 74, 0.08) !important;
  }
  .nav-right-actions {
    display: flex !important;
    align-items: center !important;
    gap: .8rem !important;
  }
  .nav-btn-signup {
    padding: .55rem 1.4rem !important;
    border: 1.5px solid var(--gold) !important;
    border-radius: 25px !important;
    background: var(--gold) !important;
    color: var(--navy) !important;
    font-family: 'Jost', sans-serif !important;
    font-size: .78rem !important;
    font-weight: 700 !important;
    letter-spacing: 1.5px !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    text-decoration: none !important;
    transition: all .25s ease !important;
    box-shadow: 0 4px 12px rgba(201, 165, 74, 0.35) !important;
    white-space: nowrap !important;
    display: inline-block !important;
  }
  .nav-btn-signup:hover {
    background: #0d1f3c !important;
    color: var(--gold) !important;
    border-color: #0d1f3c !important;
  }

  /* ── PAGE CONTENT ── */
  .main-wrapper {
    margin-top: 80px;
  }
  .hero-section{
    position:relative;padding:5rem 2rem 4rem;
    background:radial-gradient(circle at 50% 30%, rgba(201,165,74,0.15), transparent 70%), var(--navy);
    text-align:center;
  }
  .hero-subtitle{color:var(--gold);text-transform:uppercase;letter-spacing:3px;font-size:0.85rem;font-weight:600;margin-bottom:0.8rem}
  .hero-title{font-family:'Cormorant Garamond',serif;font-size:3.5rem;color:var(--white);margin-bottom:1.2rem;font-weight:700;line-height:1.15}
  .hero-title span{color:var(--gold);font-style:italic}
  .hero-desc{max-width:750px;margin:0 auto;color:var(--muted);font-size:1.1rem}

  /* ── STATS SECTION ── */
  .stats-grid{
    display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));
    gap:1.5rem;max-width:1100px;margin:2rem auto 4rem;padding:0 1.5rem;position:relative;z-index:10;
  }
  .stat-card{
    background:var(--card-bg);border:1px solid var(--border-gold);
    border-radius:20px;padding:2rem 1.5rem;text-align:center;backdrop-filter:blur(8px);
    transition:0.3s;
  }
  .stat-card:hover{transform:translateY(-5px);border-color:var(--gold)}
  .stat-num{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:700;color:var(--gold);margin-bottom:0.3rem}
  .stat-label{color:var(--offwhite);font-size:0.85rem;font-weight:600;text-transform:uppercase;letter-spacing:1px}

  /* ── STORY SECTION ── */
  .section-container{max-width:1100px;margin:0 auto;padding:3rem 1.5rem}
  .story-grid{display:grid;grid-template-columns:1fr 1fr;gap:3.5rem;align-items:center}
  @media(max-width:850px){.story-grid{grid-template-columns:1fr}}
  .story-img-wrap{position:relative;border-radius:20px;overflow:hidden;border:1px solid var(--border-gold)}
  .story-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:0.5s}
  .story-img-wrap:hover img{transform:scale(1.04)}
  .story-content h2{font-family:'Cormorant Garamond',serif;font-size:2.8rem;color:var(--white);margin-bottom:1.5rem;line-height:1.2}
  .story-content h2 span{color:var(--gold)}
  .story-content p{color:var(--muted);margin-bottom:1.2rem;font-size:1.05rem}

  /* ── VALUES SECTION ── */
  .values-grid{display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:2rem;margin-top:2.5rem}
  .value-card{
    background:var(--card-bg);border:1px solid var(--border-gold);
    border-radius:20px;padding:2.2rem 1.8rem;transition:0.3s;
  }
  .value-card:hover{border-color:var(--gold);transform:translateY(-5px)}
  .value-icon{font-size:2.2rem;color:var(--gold);margin-bottom:1.2rem}
  .value-card h3{font-family:'Cormorant Garamond',serif;font-size:1.6rem;color:var(--white);margin-bottom:0.8rem}
  .value-card p{color:var(--muted);font-size:0.95rem}

  /* ── CTA BANNER ── */
  .cta-banner{
    background:linear-gradient(135deg, rgba(201,165,74,0.15), rgba(8,20,40,0.9)), var(--navy2);
    border:1px solid var(--border-gold);border-radius:24px;
    padding:4rem 2rem;text-align:center;max-width:1100px;margin:4rem auto;position:relative;overflow:hidden;
  }
  .cta-banner h2{font-family:'Cormorant Garamond',serif;font-size:2.8rem;color:var(--white);margin-bottom:1rem}
  .cta-banner p{color:var(--offwhite);max-width:600px;margin:0 auto 2rem;font-size:1.05rem}

  /* ── FOOTER ── */
  footer{background:#040a14;border-top:1px solid var(--border-gold);padding:3rem 2rem 1.5rem;color:var(--muted)}
  .footer-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:2rem}
  @media(max-width:768px){.footer-grid{grid-template-columns:1fr}}
  .footer-col h4{color:var(--white);font-family:'Cormorant Garamond',serif;font-size:1.4rem;margin-bottom:1rem}
  .footer-col p{font-size:0.9rem;line-height:1.6}
  .footer-links{list-style:none}
  .footer-links li{margin-bottom:0.6rem}
  .footer-links a{color:var(--muted);text-decoration:none;transition:0.3s}
  .footer-links a:hover{color:var(--gold)}
  .copyright{text-align:center;margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,0.08);font-size:0.85rem}
</style>
</head>
<body>

  <!-- EXACT SITE NAVBAR -->
  <nav>
    <a href="index.php" class="logo">
      <img src="Vishit_Journey_Logo.png" alt="Vishit Journey" style="height:64px;width:auto;display:block;">
    </a>
    <ul class="nav-links">
      <li><a href="index.php#destinations">Destinations</a></li>
      <li><a href="index.php#packages">Packages</a></li>
      <li><a href="contact.php">Contact Us</a></li>
      <li><a href="about.php" class="active">About Us</a></li>
    </ul>
    <div class="nav-right-actions">
      <a href="contact.php" class="nav-btn-signup">Plan My Trip →</a>
    </div>
  </nav>

  <div class="main-wrapper">
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="hero-subtitle">Crafting Unforgettable Memories</div>
      <h1 class="hero-title">About <span>Vishit Journey</span></h1>
      <p class="hero-desc">We believe travel isn't just about visiting new places — it's about feeling the pulse of extraordinary destinations, experiencing authentic cultures, and creating memories that last a lifetime.</p>
    </section>

    <!-- STATS BAR -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-num">5,000+</div>
        <div class="stat-label">Happy Travelers</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">50+</div>
        <div class="stat-label">Custom Packages</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">4.9 ★</div>
        <div class="stat-label">Customer Rating</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">24 / 7</div>
        <div class="stat-label">Dedicated Support</div>
      </div>
    </div>

    <!-- OUR STORY -->
    <section class="section-container">
      <div class="story-grid">
        <div class="story-img-wrap">
          <img src="/uploads/packages/kashmir.jpg" alt="Travel Beyond Limits" onerror="this.src='Vishit_Journey_Logo.jpg'">
        </div>
        <div class="story-content">
          <h2>Your Trusted Companion in <span>Luxury & Adventure Travel</span></h2>
          <p>Founded with a passion for wanderlust, <strong>Vishit Journey</strong> has grown into one of India’s most trusted boutique travel management agencies. From snow-capped peaks in Kashmir and Leh Ladakh to serene beaches in Goa and lush backwaters in Kerala, we design tailor-made journeys for families, honeymooners, and solo adventurers.</p>
          <p>Our experienced travel architects manage every detail — luxury stays, comfortable transport, curated sightseeing, and 24/7 on-ground assistance — so you can simply relax and enjoy every moment.</p>
        </div>
      </div>
    </section>

    <!-- CORE VALUES -->
    <section class="section-container">
      <div style="text-align:center;max-width:700px;margin:0 auto 2rem;">
        <h2 style="font-family:'Cormorant Garamond',serif;font-size:2.8rem;color:var(--white);">Why Travelers Choose <span>Vishit Journey</span></h2>
        <p style="color:var(--muted)">Our core promises ensure your travel experience is smooth, transparent, and unforgettable.</p>
      </div>
      <div class="values-grid">
        <div class="value-card">
          <div class="value-icon">✨</div>
          <h3>100% Customized Itineraries</h3>
          <p>No cookie-cutter trips. Every package is tailored according to your budget, preference, and travel pace.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🛡️</div>
          <h3>Transparent & Honest Pricing</h3>
          <p>Zero hidden charges. Complete clarity on inclusions, hotel categories, vehicle types, and meal plans.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">📞</div>
          <h3>On-Trip 24/7 Concierge</h3>
          <p>From the moment you land till your return flight, our dedicated trip coordinator is just a phone call away.</p>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <div class="cta-banner">
      <h2>Ready to Start Your Next Adventure?</h2>
      <p>Talk to our travel experts today and receive a personalized itinerary curated specifically for your dream holiday.</p>
      <a href="contact.php" class="nav-btn-signup" style="font-size:1rem;padding:0.8rem 2rem !important;">Book Free Consultation →</a>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Vishit Journey</h4>
        <p>Redefining luxury and leisure travel across India and worldwide. Experience seamless bookings, handpicked hotels, and curated tour packages.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><a href="index.php">Home</a></li>
          <li><a href="index.php#destinations">Destinations</a></li>
          <li><a href="contact.php">Contact Us</a></li>
          <li><a href="about.php">About Us</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms & Conditions</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Info</h4>
        <p>📞 Phone: +91 9899902890</p>
        <p>✉️ Email: vishitjourney2104@gmail.com</p>
        <p>🌐 Website: vishitjourney.com</p>
      </div>
    </div>
    <div class="copyright">
      &copy; 2026 Vishit Journey. All Rights Reserved.
    </div>
  </footer>

</body>
</html>
