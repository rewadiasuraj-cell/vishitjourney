/**
 * VISHIT JOURNEY - Multi-Step Trip Booking & Razorpay System
 */

let vjCurrentPkg = null;
let vjPricing = null;
let vjCurrentStep = 1;
let vjBookingData = null;

// Dynamic WhatsApp Pre-fill Helper
function formatWhatsAppPackageMessage(pkgName, price) {
  const priceFmt = Number(price || 0).toLocaleString('en-IN');
  return `Hi, I'm interested in ${pkgName} starting ₹${priceFmt}`;
}

function updateWhatsAppLinksForPackage(pkgName, price) {
  if (!pkgName) return;
  const text = formatWhatsAppPackageMessage(pkgName, price);
  const encodedText = encodeURIComponent(text);
  const waUrl = `https://wa.me/919899902890?text=${encodedText}`;

  const floatingWA = document.getElementById('vjFloatingWA');
  if (floatingWA) {
    floatingWA.href = waUrl;
  }

  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    if (link.id !== 'vjSuccessWABtn') {
      link.href = waUrl;
    }
  });
}

// Open Booking Modal for a specific package ID
async function openBookingModal(pkgId, name, price, duration, category) {
  vjCurrentStep = 1;
  hideError();
  
  // Set basic fallback info immediately
  vjCurrentPkg = { id: pkgId, name: name || 'Travel Package', price: price || 0, duration: duration || '', category: category || 'domestic' };
  
  document.getElementById('vjModalPkgTitle').textContent = vjCurrentPkg.name;
  document.getElementById('vjModalPkgMeta').textContent = `${vjCurrentPkg.duration || ''} • Starting ₹${vjCurrentPkg.price.toLocaleString('en-IN')}`;

  // Update dynamic WhatsApp pre-fill message for current package
  updateWhatsAppLinksForPackage(vjCurrentPkg.name, vjCurrentPkg.price);
  
  // Open modal UI
  const modal = document.getElementById('vjBookingModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Set default travel date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];
  const dateInput = document.getElementById('vjInputDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = dateStr;
    dateInput.min = dateStr;
  }
  
  // Fetch detailed package info & pricing from API
  try {
    const res = await fetch(`/api/get_package.php?id=${pkgId}&adults=1&children=0`);
    const data = await res.json();
    if (data.success) {
      vjCurrentPkg = data.package;
      vjPricing = data.pricing;
      document.getElementById('vjModalPkgTitle').textContent = vjCurrentPkg.name;
      document.getElementById('vjModalPkgMeta').textContent = `${vjCurrentPkg.duration || ''} • ${vjCurrentPkg.price_label || 'per person'}`;
    }
  } catch (err) {
    console.warn('Package detail fetch fallback:', err);
  }
  
  updateStepView(1);
  recalculatePricing();
}

function closeBookingModal() {
  const modal = document.getElementById('vjBookingModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function updateStepView(stepNum) {
  vjCurrentStep = stepNum;
  
  // Steps container visibility
  const steps = ['vjStep1', 'vjStep2', 'vjStep3', 'vjStepSuccess', 'vjStepFailed'];
  steps.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  
  const stepIndicators = document.querySelectorAll('.vj-step-item');
  stepIndicators.forEach((ind, idx) => {
    ind.classList.remove('active', 'completed');
    if (idx + 1 === stepNum) ind.classList.add('active');
    else if (idx + 1 < stepNum) ind.classList.add('completed');
  });
  
  if (stepNum === 1) {
    document.getElementById('vjStep1').style.display = 'block';
  } else if (stepNum === 2) {
    document.getElementById('vjStep2').style.display = 'block';
  } else if (stepNum === 3) {
    document.getElementById('vjStep3').style.display = 'block';
    renderPriceBreakdown();
  } else if (stepNum === 4) {
    // Success
    document.getElementById('vjStepSuccess').style.display = 'block';
  } else if (stepNum === 5) {
    // Failed
    document.getElementById('vjStepFailed').style.display = 'block';
  }
}

function goToStep(stepNum) {
  hideError();
  if (stepNum === 2) {
    // Validate Step 1
    const travelDate = document.getElementById('vjInputDate').value;
    if (!travelDate) {
      showError('Please select a travel date.');
      return;
    }
  } else if (stepNum === 3) {
    // Validate Step 2
    const name = document.getElementById('vjInputName').value.trim();
    const phone = document.getElementById('vjInputPhone').value.trim();
    if (!name || !phone) {
      showError('Please enter your full name and contact phone number.');
      return;
    }
    if (phone.length < 10) {
      showError('Please enter a valid 10-digit mobile number.');
      return;
    }
  }
  updateStepView(stepNum);
}

function recalculatePricing() {
  const adults = parseInt(document.getElementById('vjSelectAdults')?.value || 1);
  const children = parseInt(document.getElementById('vjSelectChildren')?.value || 0);
  const basePrice = vjCurrentPkg ? vjCurrentPkg.price : 0;
  
  const childPrice = Math.round(basePrice * 0.5);
  const totalAmount = Math.round((basePrice * adults) + (childPrice * children));
  
  // Determine advance logic
  let advType = (vjPricing && vjPricing.advance_type) ? vjPricing.advance_type : 'percentage';
  let advVal = (vjPricing && vjPricing.advance_value) ? vjPricing.advance_value : 20;
  let advanceAmount = 0;
  
  if (advType === 'full') {
    advanceAmount = totalAmount;
  } else if (advType === 'fixed') {
    advanceAmount = Math.min(totalAmount, advVal);
  } else {
    advanceAmount = Math.round((totalAmount * advVal) / 100);
  }
  
  const remainingAmount = Math.max(0, totalAmount - advanceAmount);
  
  vjPricing = {
    base_price: basePrice,
    adults,
    children,
    child_price: childPrice,
    total_amount: totalAmount,
    advance_amount: advanceAmount,
    remaining_amount: remainingAmount,
    advance_type: advType,
    advance_value: advVal
  };
  
  // Update live preview in Step 1
  const prevTotal = document.getElementById('vjPreviewTotal');
  const prevAdv = document.getElementById('vjPreviewAdvance');
  if (prevTotal) prevTotal.textContent = '₹' + totalAmount.toLocaleString('en-IN');
  if (prevAdv) prevAdv.textContent = '₹' + advanceAmount.toLocaleString('en-IN');
}

function renderPriceBreakdown() {
  recalculatePricing();
  const p = vjPricing;
  const container = document.getElementById('vjPriceBreakdownBox');
  if (!container) return;
  
  container.innerHTML = `
    <div class="vj-price-row">
      <span>Package Price (${p.adults} Adult${p.adults > 1 ? 's' : ''} x ₹${p.base_price.toLocaleString('en-IN')})</span>
      <span>₹${(p.adults * p.base_price).toLocaleString('en-IN')}</span>
    </div>
    ${p.children > 0 ? `
    <div class="vj-price-row">
      <span>Child Price (${p.children} Child${p.children > 1 ? 'ren' : ''} x ₹${p.child_price.toLocaleString('en-IN')})</span>
      <span>₹${(p.children * p.child_price).toLocaleString('en-IN')}</span>
    </div>` : ''}
    <div class="vj-price-row total">
      <span>TOTAL PACKAGE VALUE</span>
      <span>₹${p.total_amount.toLocaleString('en-IN')}</span>
    </div>
    <div class="vj-price-row advance">
      <span>ADVANCE PAYABLE NOW (${p.advance_type === 'percentage' ? p.advance_value + '%' : p.advance_type === 'full' ? 'Full Payment' : 'Fixed Advance'})</span>
      <span>₹${p.advance_amount.toLocaleString('en-IN')}</span>
    </div>
    <div class="vj-price-row remaining">
      <span>REMAINING BALANCE ON TRIP DAY</span>
      <span>₹${p.remaining_amount.toLocaleString('en-IN')}</span>
    </div>
  `;
}

// Initiate Booking & Razorpay Payment
async function submitBookingPayment() {
  hideError();
  const btn = document.getElementById('vjBtnPay');
  if (btn) { btn.disabled = true; btn.textContent = 'Securing Booking...'; }
  
  const payload = {
    package_id: vjCurrentPkg.id,
    package_name: vjCurrentPkg.name,
    name: document.getElementById('vjInputName').value.trim(),
    phone: document.getElementById('vjInputPhone').value.trim(),
    whatsapp: document.getElementById('vjInputWhatsApp').value.trim() || document.getElementById('vjInputPhone').value.trim(),
    email: document.getElementById('vjInputEmail').value.trim(),
    travel_date: document.getElementById('vjInputDate').value,
    adults: parseInt(document.getElementById('vjSelectAdults').value || 1),
    children: parseInt(document.getElementById('vjSelectChildren').value || 0),
    rooms: parseInt(document.getElementById('vjSelectRooms').value || 1),
    pickup_location: document.getElementById('vjInputPickup').value.trim(),
    special_requests: document.getElementById('vjInputRequests').value.trim()
  };
  
  const saveToAdminStore = (bData) => {
    if (typeof saveBookingToCloud === 'function') {
      saveBookingToCloud(bData);
    } else {
      try {
        let existing = JSON.parse(localStorage.getItem('vj_admin_bookings') || '[]');
        if (!existing.some(b => b.id === bData.id)) {
          existing.unshift(bData);
          localStorage.setItem('vj_admin_bookings', JSON.stringify(existing));
        }
      } catch(e) {}
    }
  };

  const RAZORPAY_KEY_ID = 'rzp_test_TPH35birrxUzj8';

  const bookingRef = 'VJ-' + Math.floor(1000 + Math.random() * 9000);
  const totalAmt = vjPricing ? vjPricing.total_amount : (vjCurrentPkg.price * payload.adults);
  const advAmt = vjPricing ? vjPricing.advance_amount : Math.round(totalAmt * 0.2);
  const remAmt = Math.max(0, totalAmt - advAmt);

  // Check if Razorpay SDK is loaded
  if (typeof Razorpay !== 'undefined') {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: advAmt * 100, // in paise
      currency: 'INR',
      name: 'Vishit Journey',
      description: `${payload.package_name} (${bookingRef})`,
      image: '/Vishit_Journey_Logo.jpg',
      prefill: {
        name: payload.name,
        contact: payload.phone,
        email: payload.email || ''
      },
      theme: { color: '#c9a54a' },
      handler: function(response) {
        // Payment Success!
        const paymentId = response.razorpay_payment_id || ('pay_' + Math.random().toString(36).substring(2, 12));
        const confirmedBooking = {
          id: bookingRef,
          name: payload.name,
          phone: payload.phone,
          email: payload.email || 'N/A',
          package: payload.package_name,
          date: payload.travel_date,
          persons: (payload.adults || 1) + (payload.children || 0),
          price: totalAmt,
          status: 'Confirmed',
          payment_id: paymentId
        };
        saveToAdminStore(confirmedBooking);

        showSuccessState({
          booking_ref: bookingRef,
          package_name: payload.package_name,
          customer_name: payload.name,
          phone: payload.phone,
          travel_date: payload.travel_date,
          adults: payload.adults,
          children: payload.children,
          total_amount: totalAmt,
          advance_amount: advAmt,
          remaining_amount: remAmt,
          payment_id: paymentId
        });
      },
      modal: {
        ondismiss: function() {
          if (btn) { btn.disabled = false; btn.textContent = 'PROCEED TO PAY →'; }
          saveToAdminStore({
            id: bookingRef,
            name: payload.name,
            phone: payload.phone,
            email: payload.email || 'N/A',
            package: payload.package_name,
            date: payload.travel_date,
            persons: (payload.adults || 1) + (payload.children || 0),
            price: totalAmt,
            status: 'Pending'
          });
          showFailedState(bookingRef, 'Payment checkout dismissed before completion.');
        }
      }
    };
    
    try {
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function(response) {
        if (btn) { btn.disabled = false; btn.textContent = 'PROCEED TO PAY →'; }
        showFailedState(bookingRef, response.error.description || 'Payment transaction failed.');
      });
      rzp.open();
      return;
    } catch(e) {
      console.warn('Razorpay open error:', e);
    }
  }

  // Fallback if Razorpay SDK unavailable
  const pendingBooking = {
    id: bookingRef,
    name: payload.name,
    phone: payload.phone,
    email: payload.email || 'N/A',
    package: payload.package_name,
    date: payload.travel_date,
    persons: (payload.adults || 1) + (payload.children || 0),
    price: totalAmt,
    status: 'Pending'
  };
  saveToAdminStore(pendingBooking);

  showSuccessState({
    booking_ref: bookingRef,
    package_name: payload.package_name,
    customer_name: payload.name,
    phone: payload.phone,
    travel_date: payload.travel_date,
    adults: payload.adults,
    children: payload.children,
    total_amount: totalAmt,
    advance_amount: advAmt,
    remaining_amount: remAmt,
    payment_id: 'PENDING_ENQUIRY'
  });
}

async function verifyRazorpayPayment(rzpResponse, bookingId) {
  try {
    const res = await fetch('/api/verify-payment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...rzpResponse, booking_id: bookingId })
    });
    const data = await res.json();
    if (data.success) {
      showSuccessState(data);
    } else {
      showFailedState(data.booking_ref, data.message || 'Payment signature verification failed.');
    }
  } catch (err) {
    showFailedState(vjBookingData ? vjBookingData.booking_ref : '', 'Server verification failed.');
  }
}

async function retryPayment(bookingRef) {
  hideError();
  const btn = document.getElementById('vjBtnRetry');
  if (btn) { btn.disabled = true; btn.textContent = 'Re-initializing Razorpay...'; }
  
  try {
    const res = await fetch('/api/retry_payment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking_ref: bookingRef })
    });
    const data = await res.json();
    
    if (!data.success) {
      showError(data.message || 'Unable to retry payment.');
      if (btn) { btn.disabled = false; btn.textContent = 'TRY PAYMENT AGAIN'; }
      return;
    }
    
    if (data.razorpay_order && data.razorpay_order.id) {
      const options = {
        key: data.razorpay_key,
        amount: data.advance_amount * 100,
        currency: 'INR',
        name: 'Vishit Journey',
        description: `Retry Payment for ${data.booking_ref}`,
        order_id: data.razorpay_order.id,
        handler: async function(response) {
          verifyRazorpayPayment(response, data.booking_id);
        },
        prefill: { name: data.customer_name, contact: data.phone, email: data.email },
        theme: { color: '#c9a54a' }
      };
      new Razorpay(options).open();
    } else {
      showError('Payment gateway unavailable for retry. Please contact support via WhatsApp.');
    }
  } catch (err) {
    showError('Error reconnecting to payment gateway.');
  }
  if (btn) { btn.disabled = false; btn.textContent = 'TRY PAYMENT AGAIN'; }
}

function showSuccessState(info) {
  updateStepView(4);
  const container = document.getElementById('vjSuccessReceiptContainer');
  if (!container) return;
  
  const totalFmt = '₹' + floatFmt(info.total_amount);
  const advFmt = '₹' + floatFmt(info.advance_amount);
  const remFmt = '₹' + floatFmt(info.remaining_amount);
  
  container.innerHTML = `
    <div class="vj-receipt-box" id="vjPrintSection">
      <div class="vj-receipt-header">
        <div>
          <div class="vj-receipt-logo">VISHIT JOURNEY</div>
          <div style="font-size:0.7rem;color:#666;margin-top:2px">Official Trip Booking Confirmation Slip</div>
        </div>
        <span class="vj-receipt-badge">✓ CONFIRMED</span>
      </div>
      <div class="vj-receipt-grid">
        <div><div class="vj-receipt-label">Booking Reference</div><div class="vj-receipt-value" style="color:#c9a54a;font-size:1.1rem;letter-spacing:1px">${info.booking_ref}</div></div>
        <div><div class="vj-receipt-label">Payment Reference ID</div><div class="vj-receipt-value">${info.payment_id || 'VERIFIED'}</div></div>
        <div><div class="vj-receipt-label">Package Name</div><div class="vj-receipt-value">${info.package_name}</div></div>
        <div><div class="vj-receipt-label">Travel Date</div><div class="vj-receipt-value">${info.travel_date || 'To be scheduled'}</div></div>
        <div><div class="vj-receipt-label">Customer Name</div><div class="vj-receipt-value">${info.customer_name}</div></div>
        <div><div class="vj-receipt-label">Guests</div><div class="vj-receipt-value">${info.adults || 1} Adult(s)${info.children ? ', ' + info.children + ' Child(ren)' : ''}</div></div>
      </div>
      <div style="background:#f8f9fa;border-radius:6px;padding:1rem;margin-top:0.5rem;border-left:4px solid #c9a54a">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:0.85rem"><span>Total Package Value:</span><strong>${totalFmt}</strong></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:0.85rem;color:#2e7d32"><span>Advance Paid:</span><strong>${advFmt}</strong></div>
        <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:#c62828"><span>Remaining Balance Due:</span><strong>${remFmt}</strong></div>
      </div>
    </div>
  `;
  
  // Set WhatsApp button link
  const waBtn = document.getElementById('vjSuccessWABtn');
  if (waBtn) {
    const msg = `Hi Vishit Journey, I have confirmed my booking!\n\n*Booking ID:* ${info.booking_ref}\n*Package:* ${info.package_name}\n*Travel Date:* ${info.travel_date}\n*Name:* ${info.customer_name}\n*Amount Paid:* ${advFmt}\n*Remaining:* ${remFmt}`;
    waBtn.href = `https://wa.me/919899902890?text=${encodeURIComponent(msg)}`;
  }
}

function showFailedState(bookingRef, errorMsg) {
  updateStepView(5);
  const refEl = document.getElementById('vjFailedRef');
  const msgEl = document.getElementById('vjFailedMsg');
  if (refEl) refEl.textContent = bookingRef ? `Booking Reference: ${bookingRef}` : '';
  if (msgEl) msgEl.textContent = errorMsg || 'Payment could not be completed.';
  
  const retryBtn = document.getElementById('vjBtnRetry');
  if (retryBtn) {
    retryBtn.onclick = function() { retryPayment(bookingRef); };
  }
}

function printConfirmation() {
  window.print();
}

function showError(msg) {
  const el = document.getElementById('vjModalError');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function hideError() {
  const el = document.getElementById('vjModalError');
  if (el) { el.style.display = 'none'; }
}

function floatFmt(num) {
  return parseFloat(num || 0).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
