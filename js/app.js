/**
 * Main Interactive Application Logic
 * 3D Card Tilts, Modal Management, Real-Time Cost Estimator,
 * AI Quick Assistant Widget, and Smooth UI Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Official Gmail Integration (Google Apps Script Web App Endpoint)
  // ==========================================================================
  // Paste your Google Apps Script Web App URL below to send emails silently in the background:
  const GMAIL_INTEGRATION_URL = window.GMAIL_INTEGRATION_URL || '';

  'use strict';

  // ==========================================================================
  // 1. Header Scroll & Navigation Active State
  // ==========================================================================
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy for Nav Links
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    if (currentSection) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && navMenu) {
    const hamburgerSvg = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    const closeSvg = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenuBtn.innerHTML = isOpen ? closeSvg : hamburgerSvg;
    });

    // Close menu on link click
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = hamburgerSvg;
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = hamburgerSvg;
      }
    });
  }

  // ==========================================================================
  // Default and Only Theme: Midnight Gold
  // ==========================================================================
  document.documentElement.setAttribute('data-theme', 'midnight-gold');
  localStorage.setItem('codenexa_theme', 'midnight-gold');
  if (typeof window.setQuantumCoreTheme === 'function') {
    window.setQuantumCoreTheme('midnight-gold');
  }

  // ==========================================================================
  // 2. 3D Tilt & Cursor Spotlight on Service Cards
  // ==========================================================================
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      // Apply 3D rotation
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      // Set cursor glow coordinates
      card.style.setProperty('--mouse-x', `${((x / rect.width) * 100).toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${((y / rect.height) * 100).toFixed(1)}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    // Make clicked card active/spotlighted
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('card-featured'));
      card.classList.add('card-featured');
    });
  });

  // ==========================================================================
  // 3. Tech Stack Filter Bar
  // ==========================================================================
  const techFilterBtns = document.querySelectorAll('.tech-filter-btn');
  const techBadges = document.querySelectorAll('.tech-badge-card');

  techFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      techFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      techBadges.forEach((badge) => {
        if (filter === 'all' || badge.getAttribute('data-cat') === filter) {
          badge.style.display = 'flex';
          badge.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          badge.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 5. Modal Management (Service Detail & AI Assistant)
  // ==========================================================================
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  // Close when clicking modal backdrop
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Close when clicking in-modal contact link
  document.querySelectorAll('.close-modal-link').forEach((link) => {
    link.addEventListener('click', () => {
      const modal = link.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(closeModal);
    }
  });

  // ==========================================================================
  // 5.5 Slide-out Left Quote Drawer (Requested by User)
  // ==========================================================================
  const sideQuoteDrawer = document.getElementById('sideQuoteDrawer');
  const sideDrawerToggle = document.getElementById('sideDrawerToggle');
  const sideQuoteForm = document.getElementById('sideQuoteForm');
  const sideDrawerFormBody = document.getElementById('sideDrawerFormBody');
  const sideDrawerSuccess = document.getElementById('sideDrawerSuccess');
  const sideResetBtn = document.getElementById('sideResetBtn');
  const sideBtnGmail = document.getElementById('sideBtnGmail');
  const sideBtnWhatsApp = document.getElementById('sideBtnWhatsApp');

  function openSideDrawer() {
    if (sideQuoteDrawer) sideQuoteDrawer.classList.add('open');
  }

  function closeSideDrawer() {
    if (sideQuoteDrawer) sideQuoteDrawer.classList.remove('open');
  }

  if (sideDrawerToggle) {
    sideDrawerToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sideQuoteDrawer) {
        sideQuoteDrawer.classList.toggle('open');
      }
    });
  }

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (sideQuoteDrawer && sideQuoteDrawer.classList.contains('open')) {
      if (!sideQuoteDrawer.contains(e.target)) {
        closeSideDrawer();
      }
    }
  });

  // Escape key closes side drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideQuoteDrawer && sideQuoteDrawer.classList.contains('open')) {
      closeSideDrawer();
    }
  });

  if (sideQuoteForm) {
    sideQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop unwanted blank tabs

      const name = document.getElementById('sideName')?.value?.trim() || 'Client';
      const email = document.getElementById('sideEmail')?.value?.trim() || 'Not Provided';
      const phone = document.getElementById('sidePhone')?.value?.trim() || 'Not Provided';
      const service = document.getElementById('sideService')?.value || 'Custom Web Solution';
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

      // Direct delivery from codenexatechnologies26@gmail.com to nathgokul325@gmail.com
      const targetEmail = 'nathgokul325@gmail.com';
      const companyEmail = 'codenexatechnologies26@gmail.com';

      const hiddenSubject = document.getElementById('sideHiddenSubject');
      if (hiddenSubject) hiddenSubject.value = `Quick Quote Request: ${name} (${service}) - Codenexa Technologies`;

      const hiddenCc = document.getElementById('sideHiddenCc');
      if (hiddenCc) {
        hiddenCc.value = (email && email !== 'Not Provided' && email !== targetEmail)
          ? `${companyEmail},${email}`
          : companyEmail;
      }

      const hiddenReplyTo = document.getElementById('sideHiddenReplyTo');
      if (hiddenReplyTo && email && email !== 'Not Provided') {
        hiddenReplyTo.value = email;
      }

      const emailSubject = `Quick Quote Request: ${name} (${service}) - Codenexa Technologies`;
      const emailBody = 
`Dear Gokulnath & Codenexa Engineering Team,

A new project quote request has been submitted through codenexatechnologies.in:

==================================================
CLIENT DETAILS
==================================================
• Name: ${name}
• Client Email: ${email}
• Phone: ${phone}
• Service Needed: ${service}
• Request Time: ${timestamp} IST
==================================================

From: Codenexa Technologies Official Platform
Direct Line / WhatsApp: +91 75581 43975`;

      const ccParam = `&cc=${encodeURIComponent(companyEmail + (email && email !== 'Not Provided' && email !== targetEmail ? ',' + email : ''))}`;
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}${ccParam}&body=${encodeURIComponent(emailBody)}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}${ccParam}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      const waMessage = `Hello Codenexa Team,\n\nI have requested a quick quote:\n• Name: ${name}\n• Email: ${email}\n• Phone: ${phone}\n• Service: ${service}`;
      const waUrl = `https://wa.me/917558143975?text=${encodeURIComponent(waMessage)}`;

      if (sideBtnGmail) sideBtnGmail.href = gmailUrl;
      if (sideBtnWhatsApp) sideBtnWhatsApp.href = waUrl;

      // Switch drawer view to success screen
      if (sideDrawerFormBody) sideDrawerFormBody.style.display = 'none';
      if (sideDrawerSuccess) sideDrawerSuccess.style.display = 'block';

      const submitBtn = document.getElementById('sideSubmitBtn');
      if (submitBtn) { submitBtn.textContent = 'Sending...'; submitBtn.disabled = true; }

      // 1. Google Apps Script Web App (Executes directly in Gmail)
      if (GMAIL_INTEGRATION_URL && GMAIL_INTEGRATION_URL.startsWith('https://script.google.com/')) {
        fetch(GMAIL_INTEGRATION_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            service: service,
            recipient: targetEmail,
            timestamp: timestamp
          })
        }).finally(() => {
          if (submitBtn) { submitBtn.textContent = 'Send Request →'; submitBtn.disabled = false; }
        });
      } else {
        // 2. FormSubmit AJAX background delivery (no popup tab!)
        const formData = new FormData(sideQuoteForm);
        fetch('https://formsubmit.co/ajax/' + targetEmail, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        }).then(res => res.json())
        .then(data => {
          console.log('Quote delivered to ' + targetEmail, data);
        }).catch(() => {
          if (window.location.protocol === 'file:') {
            window.open(gmailUrl, '_blank');
          }
        }).finally(() => {
          if (submitBtn) { submitBtn.textContent = 'Send Request →'; submitBtn.disabled = false; }
        });
      }
    });
  }

  if (sideResetBtn) {
    sideResetBtn.addEventListener('click', () => {
      if (sideDrawerSuccess) sideDrawerSuccess.style.display = 'none';
      if (sideDrawerFormBody) sideDrawerFormBody.style.display = 'block';
      if (sideQuoteForm) sideQuoteForm.reset();
    });
  }


  // ==========================================================================
  // 6. Service Detail Modal (Learn More on Cards)
  // ==========================================================================
  const serviceDetailModal = document.getElementById('serviceDetailModal');
  const serviceDetailTitle = document.getElementById('serviceDetailTitle');
  const serviceDetailDesc = document.getElementById('serviceDetailDesc');
  const serviceDetailSpecs = document.getElementById('serviceDetailSpecs');
  const serviceDetailStack = document.getElementById('serviceDetailStack');

  const serviceData = {
    'business-emails': {
      title: 'Business Emails (Workspace & M365)',
      desc: 'Complete enterprise-grade professional domain email configuration. We eliminate delivery issues, prevent domain spoofing, and guarantee 99.9% inbox placement.',
      specs: [
        'Domain-based address (e.g. yourname@yourcompany.com)',
        'Full SPF (Sender Policy Framework) TXT Record Setup',
        'DKIM (DomainKeys Identified Mail) 2048-bit Cryptographic Signing',
        'DMARC (Domain-based Message Authentication) Policy Enforced',
        'MX Routing, Auto-Forwarding & Spam Shield Filtering',
        'Seamless Mailbox Migration from cPanel / Webmail to Google/Microsoft'
      ],
      stack: ['Google Workspace', 'Microsoft 365', 'Cloudflare DNS', 'DKIM 2048', 'DMARC']
    },
    'modern-websites': {
      title: 'Modern Websites & Web Portals',
      desc: 'Next-generation responsive web development engineered for lightning speed, dynamic 3D interactions, ultra-high conversion rates, and SEO dominance.',
      specs: [
        'Custom bespoke UI/UX crafted with 3D WebGL / CSS animations',
        '100% Mobile & Tablet responsive cross-browser architecture',
        'Google PageSpeed & Core Web Vitals score 95+ guarantee',
        'Built-in Technical SEO, OpenGraph social cards & Schema.org markup',
        'Secure HTTPS SSL, Cloudflare edge caching, and DDoS shielding',
        'Easy-to-use Admin Dashboard for instant content updates'
      ],
      stack: ['HTML5 / Modern JS', 'Three.js / WebGL', 'Tailwind CSS', 'Node.js', 'PostgreSQL']
    },
    'ecommerce-sites': {
      title: 'Full-Fledged E-Commerce Platforms',
      desc: 'Scalable digital stores built to maximize checkout conversions, handle peak traffic spikes, and automate inventory and multi-channel order tracking.',
      specs: [
        'Dynamic Product Catalog with variants, sizes, and instant live search',
        'Integrated Instant Checkout with UPI, Cards, NetBanking & Wallets',
        'Automated Order Invoicing, GST calculations & PDF slips',
        'Real-time Inventory tracking with low stock alerts',
        'Customer Account Portal with Order History & Live Tracking',
        'Abandoned Cart recovery & Promo Code discount engine'
      ],
      stack: ['WooCommerce', 'Shopify / Custom React', 'Razorpay', 'Stripe', 'Redis']
    },
    'school-portals': {
      title: 'School & College Academic Portals',
      desc: 'Comprehensive educational management portals unifying admissions, student attendance, digital exam report cards, and automated fee collections.',
      specs: [
        'Online Student Admissions & Document Verification Pipeline',
        'Digital Fee Payment Gateway with Instant Receipt Generation',
        'Automated Student & Staff Attendance Tracking with SMS alerts',
        'Exam Schedule, Marksheet & Report Card Generation Module',
        'Dedicated Portals for Parents, Teachers, Students & Administrators',
        'Library Management, Hostel Management & Transport Tracking'
      ],
      stack: ['PHP / Laravel', 'React / Vue', 'MySQL Enterprise', 'AWS Cloud', 'SMS Gateway']
    },
    'store-management': {
      title: 'Store & Retail POS Management Software',
      desc: 'High-speed Point of Sale and inventory software built for physical retail outlets, supermarkets, hardware stores, and multi-branch chains.',
      specs: [
        'Lightning-Fast Barcode Scanning & Sub-Second POS Billing',
        'Thermal Printer & Cash Drawer Hardware Integration',
        'Multi-Warehouse & Multi-Store Live Stock Synchronization',
        'GST Compliant Invoicing with B2B & B2C Tax filing exports',
        'Customer Loyalty Points, Credit Book & Supplier Ledger',
        'Offline Billing Support: Keeps selling even when internet disconnects'
      ],
      stack: ['Electron / Desktop', 'Node.js Engine', 'SQLite / Cloud Sync', 'ESC/POS Thermal API']
    },
    'android-apps': {
      title: 'Android & Cross-Platform Mobile Apps',
      desc: 'Intuitive, fluid native and cross-platform Android mobile applications designed to engage users, push real-time notifications, and deploy to Google Play Store.',
      specs: [
        'Fluid native performance with 60 FPS modern UI animations',
        'Firebase Cloud Messaging (FCM) real-time push notifications',
        'Offline Data Caching with background synchronization',
        'Biometric fingerprint / face unlock authentication',
        'In-App Payments with Google Play Billing & UPI SDKs',
        'Full Google Play Console store publishing & compliance support'
      ],
      stack: ['Flutter', 'Kotlin Native', 'Firebase', 'RESTful API', 'Play Console']
    }
  };

  document.querySelectorAll('.open-service-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const serviceKey = btn.getAttribute('data-service');
      const data = serviceData[serviceKey];
      if (!data) return;

      serviceDetailTitle.textContent = data.title;
      serviceDetailDesc.textContent = data.desc;

      serviceDetailSpecs.innerHTML = data.specs
        .map(spec => `<li><span class="spec-check">✓</span> ${spec}</li>`)
        .join('');

      serviceDetailStack.innerHTML = data.stack
        .map(tech => `<span class="portfolio-tag">${tech}</span>`)
        .join('');

      openModal(serviceDetailModal);
    });
  });

  // ==========================================================================
  // 7. Sparkle / AI Quick Assistant Chat Widget
  // ==========================================================================
  const aiAssistantModal = document.getElementById('aiAssistantModal');
  const btnSparkle = document.querySelector('.btn-sparkle');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');

  if (btnSparkle) {
    btnSparkle.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(aiAssistantModal);
    });
  }

  const aiFaqs = {
    'contact': 'You can reach Codenexa Technologies directly via Phone/WhatsApp: 📞 <a href="tel:+917558143975" style="color:#f59e0b;font-weight:bold;">+91 75581 43975</a> or Email: ✉️ <a href="mailto:codenexatechnologies26@gmail.com" style="color:#f59e0b;font-weight:bold;">codenexatechnologies26@gmail.com</a>.',
    'phone': 'Our official direct line and WhatsApp support is 📞 <a href="tel:+917558143975" style="color:#f59e0b;font-weight:bold;">+91 75581 43975</a>.',
    'call': 'Call our development team directly at 📞 <a href="tel:+917558143975" style="color:#f59e0b;font-weight:bold;">+91 75581 43975</a>.',
    'price': 'We engineer custom tailored solutions based on your project specifications. Scroll down to the Contact section or click "Contact Us" to submit your project requirements and receive an official customized proposal directly in your email!',
    'cost': 'Every project is tailored with high-performance architecture. Contact us at 📞 <a href="tel:+917558143975" style="color:#f59e0b;font-weight:bold;">+91 75581 43975</a> or WhatsApp for an exact scope and proposal.',
    'service': 'Codenexa Technologies specializes in: 1) Modern Responsive Websites, 2) School & College Portals (ERP), 3) Retail Store POS Management, 4) E-Commerce Stores, 5) Android Mobile Apps, and 6) Business Emails (Workspace & M365).',
    'services': 'Codenexa Technologies specializes in: 1) Modern Responsive Websites, 2) School & College Portals (ERP), 3) Retail Store POS Management, 4) E-Commerce Stores, 5) Android Mobile Apps, and 6) Business Emails (Workspace & M365).',
    'school': 'Yes! Our School & College Academic Portals feature online admissions, student attendance, digital exam report cards, and automated fee collections with instant PDF receipts.',
    'email': 'We configure professional Google Workspace and Microsoft 365 business emails with full SPF, DKIM 2048-bit, and DMARC enforcement to guarantee 99.9% inbox deliverability.',
    'pos': 'Our Store Management POS supports rapid barcode scanning, thermal receipt printing, offline billing, GST reports, and multi-store inventory synchronization.',
    'app': 'We develop custom native and cross-platform Android mobile apps using Flutter and Kotlin, with real-time push notifications and complete Play Store publishing.',
    'website': 'We build responsive, high-performance websites with modern 3D WebGL animations, SEO optimization, and 95+ PageSpeed scores.'
  };

  function appendChatMessage(text, sender = 'ai') {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-msg-${sender}`;
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserChat(userText) {
    if (!userText.trim()) return;
    appendChatMessage(userText, 'user');
    if (chatInput) chatInput.value = '';

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg chat-msg-ai typing-msg';
    typingDiv.innerHTML = 'Thinking...';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typingDiv.remove();
      const lower = userText.toLowerCase();
      let matchedReply = null;

      for (const [key, reply] of Object.entries(aiFaqs)) {
        if (lower.includes(key)) {
          matchedReply = reply;
          break;
        }
      }

      if (!matchedReply) {
        matchedReply = `Thank you for your inquiry about "${userText}". We build custom websites, portals, store POS software, business emails, and Android apps. For immediate quotes and discussion, call 📞 <strong>+91 75581 43975</strong>, email ✉️ <strong>codenexatechnologies26@gmail.com</strong>, or <a href="https://wa.me/917558143975?text=Hello%20Codenexa%20Team" target="_blank" style="color:#f59e0b;text-decoration:underline;font-weight:bold;">Chat on WhatsApp (+91 75581 43975)</a>!`;
      }

      appendChatMessage(matchedReply, 'ai');
    }, 600);
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => handleUserChat(chatInput.value));
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUserChat(chatInput.value);
    });
  }

  // Pre-configured question chips
  document.querySelectorAll('.ai-question-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-q');
      handleUserChat(q);
    });
  });

  // ==========================================================================
  // 8. Contact Form Handling - Dispatches mail to codenexatechnologies26@gmail.com and CCs the user
  const mainContactForm = document.getElementById('mainContactForm');
  const contactFormContainer = document.getElementById('contactFormContainer');
  const contactSuccessPanel = document.getElementById('contactSuccessPanel');
  const contactSuccessSummary = document.getElementById('contactSuccessSummary');
  const contactSenderEmailCopy = document.getElementById('contactSenderEmailCopy');
  const contactResetBtn = document.getElementById('contactResetBtn');
  const btnContactMailto = document.getElementById('btnContactMailto');
  const btnContactGmail = document.getElementById('btnContactGmail');
  const btnContactWhatsApp = document.getElementById('btnContactWhatsApp');

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop unwanted blank tabs
      const name = document.getElementById('contactName')?.value?.trim() || 'Client';
      const phone = document.getElementById('contactPhone')?.value?.trim() || 'Not Provided';
      const email = document.getElementById('contactEmail')?.value?.trim() || 'Not Provided';
      const service = document.getElementById('contactService')?.value || 'General Inquiry';
      const message = document.getElementById('contactMessage')?.value?.trim() || '';
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

      // Synchronize hidden inputs for FormSubmit
      const hiddenSubject = document.getElementById('contactHiddenSubject');
      if (hiddenSubject) hiddenSubject.value = `Project Inquiry: ${name} - ${service} - Codenexa Technologies`;

      const hiddenCc = document.getElementById('contactHiddenCc');
      if (hiddenCc && email && email !== 'Not Provided') hiddenCc.value = email;

      const emailSubject = `Project Inquiry: ${name} - ${service} - Codenexa Technologies`;
      const emailBody = 
`Dear Codenexa Technologies Team,

I am submitting a new project inquiry via codenexatechnologies.in:

==================================================
CLIENT DETAILS
==================================================
• Name: ${name}
• Phone / WhatsApp: ${phone}
• Work Email: ${email}
• Interested Service: ${service}

==================================================
PROJECT REQUIREMENTS
==================================================
${message}

• Submitted: ${timestamp} IST
==================================================

Please review and reply with technical architecture, pricing, and next steps to ${email}.

Best regards,
${name}`;

      const targetEmail = 'nathgokul325@gmail.com';
      const companyEmail = 'codenexatechnologies26@gmail.com';
      const ccParam = `&cc=${encodeURIComponent(companyEmail + (email && email !== 'Not Provided' && email !== targetEmail ? ',' + email : ''))}`;
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}${ccParam}&body=${encodeURIComponent(emailBody)}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}${ccParam}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      const waMessage = `Hello Codenexa Technologies Team,\n\nI have submitted a project inquiry:\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email}\n• Service: ${service}\n• Message: ${message}`;
      const waUrl = `https://wa.me/917558143975?text=${encodeURIComponent(waMessage)}`;

      // Update success panel elements
      if (btnContactMailto) btnContactMailto.href = mailtoUrl;
      if (btnContactGmail) btnContactGmail.href = gmailUrl;
      if (btnContactWhatsApp) btnContactWhatsApp.href = waUrl;
      if (contactSenderEmailCopy) contactSenderEmailCopy.textContent = email;

      if (contactSuccessSummary) {
        contactSuccessSummary.innerHTML = `
          <div style="margin-bottom:0.35rem;"><strong style="color:#ffffff;">Primary Recipient:</strong> <span style="color:var(--accent-cyan);">${targetEmail}</span></div>
          <div style="margin-bottom:0.35rem;"><strong style="color:#ffffff;">Copy Sent To (CC):</strong> <span style="color:var(--accent-cyan);">${email}</span></div>
          <div style="margin-bottom:0.35rem;"><strong style="color:#ffffff;">Client:</strong> ${name} | ${phone}</div>
          <div style="margin-bottom:0.35rem;"><strong style="color:#ffffff;">Service:</strong> ${service}</div>
          <div><strong style="color:#ffffff;">Message:</strong> ${message.substring(0, 120)}${message.length > 120 ? '...' : ''}</div>
        `;
      }

      // Switch to success view in contact form panel
      if (contactFormContainer) contactFormContainer.style.display = 'none';
      if (contactSuccessPanel) contactSuccessPanel.style.display = 'block';

      // Check for Google Apps Script Gmail Integration Web App
      if (GMAIL_INTEGRATION_URL && GMAIL_INTEGRATION_URL.startsWith('https://script.google.com/')) {
        const submitBtn = mainContactForm.querySelector('button[type="submit"]');
        const origText = submitBtn ? submitBtn.innerHTML : 'Submit Inquiry →';
        if (submitBtn) { submitBtn.innerHTML = 'Sending via Gmail...'; submitBtn.disabled = true; }

        fetch(GMAIL_INTEGRATION_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            service: service,
            message: message,
            timestamp: timestamp
          })
        }).then(() => {
          if (contactFormContainer) contactFormContainer.style.display = 'none';
          if (contactSuccessPanel) contactSuccessPanel.style.display = 'block';
        }).catch(() => {
          window.location.href = gmailUrl;
        }).finally(() => {
          if (submitBtn) { submitBtn.innerHTML = origText; submitBtn.disabled = false; }
        });
      } else {
        // FormSubmit AJAX background delivery to nathgokul325@gmail.com (CC: codenexatechnologies26@gmail.com)
        const formData = new FormData(mainContactForm);
        fetch('https://formsubmit.co/ajax/' + targetEmail, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        }).then(res => res.json())
        .then(data => {
          console.log('Inquiry delivered to ' + targetEmail, data);
        }).catch(() => {
          if (window.location.protocol === 'file:') {
            window.open(gmailUrl, '_blank');
          }
        });
      }
    });
  }

  // Reset button to send another inquiry
  if (contactResetBtn) {
    contactResetBtn.addEventListener('click', () => {
      if (contactSuccessPanel) contactSuccessPanel.style.display = 'none';
      if (contactFormContainer) contactFormContainer.style.display = 'block';
      if (mainContactForm) mainContactForm.reset();
    });
  }
});
