/**
 * DUC TIN & PARTNERS - Main JavaScript
 * Shared functionality across all pages
 */

document.addEventListener('DOMContentLoaded', function() {

  // === MOBILE MENU TOGGLE ===
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      // Toggle icon
      const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
      }
    });
  }

  // === ACTIVE NAVIGATION HIGHLIGHT ===
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a[href], header a[href]');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
      // Remove query params and hash for comparison
      const cleanHref = href.split('?')[0].split('#')[0];
      const cleanCurrent = currentPath.split('?')[0].split('#')[0];

      if (cleanHref === cleanCurrent ||
          (cleanCurrent.endsWith('/') && cleanHref === 'index.html' && cleanCurrent === '/') ||
          (cleanCurrent === '' && cleanHref === 'index.html')) {
        link.classList.add('font-bold', 'border-b-2', 'border-primary', 'pb-1');
        link.classList.remove('text-text-secondary');
        link.classList.add('text-primary');
      }
    }
  });

  // === FAQ ACCORDION ===
  const faqItems = document.querySelectorAll('.faq-item button');
  faqItems.forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.material-symbols-outlined');

      if (content) {
        const isHidden = content.classList.contains('hidden');
        content.classList.toggle('hidden');
        if (icon) {
          icon.textContent = isHidden ? 'remove' : 'add';
        }
      }
    });
  });

  // === LEAD GATE MODAL ===
  const leadGateModal = document.getElementById('lead-gate-modal');
  const leadGateClose = document.getElementById('lead-gate-close');
  const leadGateTriggers = document.querySelectorAll('[data-trigger="lead-gate"]');

  const isLeadGateUnlocked = sessionStorage.getItem('leadGateUnlocked') === 'true';

  if (leadGateModal && !leadGateModal.classList.contains('hidden')) {
    if (isLeadGateUnlocked) {
      leadGateModal.classList.add('hidden');
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  function openLeadGate() {
    if (leadGateModal) {
      leadGateModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLeadGate() {
    if (leadGateModal) {
      leadGateModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (leadGateClose) {
    leadGateClose.addEventListener('click', closeLeadGate);
  }

  leadGateTriggers.forEach(trigger => {
    trigger.addEventListener('click', openLeadGate);
  });

  // Close lead gate on overlay click only if there's a close button
  if (leadGateModal && leadGateClose) {
    leadGateModal.addEventListener('click', function(e) {
      if (e.target === this) closeLeadGate();
    });
  }

  const leadGateForm = document.getElementById('lead-gate-form');
  if (leadGateForm) {
    leadGateForm.addEventListener('submit', function(e) {
      e.preventDefault();
      sessionStorage.setItem('leadGateUnlocked', 'true');
      closeLeadGate();
      // Also enable any disabled download buttons if necessary
    });
  }

  // === CALCULATOR: Court Fee ===
  const courtFeeForm = document.getElementById('court-fee-form');
  const courtFeeResult = document.getElementById('court-fee-result');

  if (courtFeeForm) {
    courtFeeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const value = parseFloat(document.getElementById('claim-value')?.value) || 0;
      let fee = 0;

      // Simplified court fee calculation based on Vietnamese law
      if (value <= 0) {
        fee = 300000; // Non-monetary claim
      } else if (value <= 4000000) {
        fee = value * 0.05;
      } else if (value <= 80000000) {
        fee = 200000 + (value - 4000000) * 0.04;
      } else if (value <= 200000000) {
        fee = 3240000 + (value - 80000000) * 0.035;
      } else if (value <= 400000000) {
        fee = 7440000 + (value - 200000000) * 0.03;
      } else {
        fee = 13440000 + (value - 400000000) * 0.02;
      }

      const deposit = fee * 0.5;

      document.getElementById('fee-deposit').textContent = Math.round(deposit).toLocaleString('vi-VN') + ' VNĐ';
      document.getElementById('fee-total').textContent = Math.round(fee).toLocaleString('vi-VN') + ' VNĐ';

      if (courtFeeResult) {
        courtFeeResult.classList.remove('hidden');
        courtFeeResult.classList.add('page-fade-in');
      }
    });
  }

  // === CALCULATOR: Salary Gross-to-Net ===
  const salaryForm = document.getElementById('salary-form');
  const salaryResult = document.getElementById('salary-result');

  if (salaryForm) {
    salaryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const gross = parseFloat(document.getElementById('gross-salary')?.value) || 0;
      const dependents = parseInt(document.getElementById('dependents')?.value) || 0;
      const insurance = document.getElementById('include-insurance')?.checked || false;

      let bhxh = 0, bhyt = 0, bhtn = 0;
      if (insurance) {
        bhxh = Math.min(gross, 29800000) * 0.08;
        bhyt = Math.min(gross, 29800000) * 0.015;
        bhtn = Math.min(gross, 29800000) * 0.01;
      }

      // Simplified PIT calculation
      const taxableIncome = gross - bhxh - bhyt - bhtn - 11000000 - dependents * 4400000;
      let pit = 0;

      if (taxableIncome > 0) {
        if (taxableIncome <= 5000000) pit = taxableIncome * 0.05;
        else if (taxableIncome <= 10000000) pit = 250000 + (taxableIncome - 5000000) * 0.1;
        else if (taxableIncome <= 18000000) pit = 750000 + (taxableIncome - 10000000) * 0.15;
        else if (taxableIncome <= 32000000) pit = 1950000 + (taxableIncome - 18000000) * 0.2;
        else if (taxableIncome <= 52000000) pit = 4750000 + (taxableIncome - 32000000) * 0.25;
        else if (taxableIncome <= 80000000) pit = 9750000 + (taxableIncome - 52000000) * 0.3;
        else pit = 18150000 + (taxableIncome - 80000000) * 0.35;
      }

      const net = gross - bhxh - bhyt - bhtn - pit;

      document.getElementById('gross-display').textContent = Math.round(gross).toLocaleString('vi-VN');
      document.getElementById('bhxh-display').textContent = '- ' + Math.round(bhxh).toLocaleString('vi-VN');
      document.getElementById('bhyt-display').textContent = '- ' + Math.round(bhyt).toLocaleString('vi-VN');
      document.getElementById('bhtn-display').textContent = '- ' + Math.round(bhtn).toLocaleString('vi-VN');
      document.getElementById('pit-display').textContent = '- ' + Math.round(pit).toLocaleString('vi-VN');
      document.getElementById('net-display').textContent = Math.round(net).toLocaleString('vi-VN');

      if (salaryResult) {
        salaryResult.classList.remove('hidden');
        salaryResult.classList.add('page-fade-in');
      }
    });
  }

  // === CALCULATOR: PIT ===
  const pitForm = document.getElementById('pit-form');
  const pitResult = document.getElementById('pit-result');

  if (pitForm) {
    pitForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const incomeInput = document.getElementById('monthly-income');
      const insuranceInput = document.getElementById('insurance-deduction');
      const dependentsInput = document.getElementById('dependents');

      const gross = parseFloat(incomeInput.value) || 0;
      const insurance = parseFloat(insuranceInput.value) || 0;
      const dependents = parseInt(dependentsInput.value) || 0;

      const personalDeduction = 11000000;
      const dependentsDeduction = dependents * 4400000;

      let taxableIncome = gross - insurance - personalDeduction - dependentsDeduction;
      if (taxableIncome < 0) taxableIncome = 0;

      let pit = 0;
      if (taxableIncome > 0) {
        if (taxableIncome <= 5000000) pit = taxableIncome * 0.05;
        else if (taxableIncome <= 10000000) pit = 250000 + (taxableIncome - 5000000) * 0.1;
        else if (taxableIncome <= 18000000) pit = 750000 + (taxableIncome - 10000000) * 0.15;
        else if (taxableIncome <= 32000000) pit = 1950000 + (taxableIncome - 18000000) * 0.2;
        else if (taxableIncome <= 52000000) pit = 4750000 + (taxableIncome - 32000000) * 0.25;
        else if (taxableIncome <= 80000000) pit = 9750000 + (taxableIncome - 52000000) * 0.3;
        else pit = 18150000 + (taxableIncome - 80000000) * 0.35;
      }

      document.getElementById('total-income-display').textContent = Math.round(gross).toLocaleString('vi-VN');
      document.getElementById('personal-deduction-display').textContent = '- ' + personalDeduction.toLocaleString('vi-VN');
      document.getElementById('dependent-deduction-display').textContent = '- ' + dependentsDeduction.toLocaleString('vi-VN');
      document.getElementById('insurance-display').textContent = '- ' + Math.round(insurance).toLocaleString('vi-VN');
      document.getElementById('taxable-income-display').textContent = Math.round(taxableIncome).toLocaleString('vi-VN');
      document.getElementById('pit-tax-display').textContent = Math.round(pit).toLocaleString('vi-VN');

      if (pitResult) {
        pitResult.classList.remove('hidden');
        pitResult.classList.add('page-fade-in');
      }
    });
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // === HERO SEARCH FUNCTIONALITY ===
  const heroSearch = document.getElementById('hero-search');
  const heroSearchBtn = document.getElementById('hero-search-btn');

  if (heroSearch && heroSearchBtn) {
    heroSearchBtn.addEventListener('click', function() {
      const query = heroSearch.value.trim();
      if (query) {
        // Navigate to AI chatbot with the query
        window.location.href = 'pages/ai-chatbot.html?q=' + encodeURIComponent(query);
      }
    });

    heroSearch.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        heroSearchBtn.click();
      }
    });
  }

  // === APPOINTMENT BOOKING STEPS ===
  const appointmentSteps = document.querySelectorAll('.appointment-step');
  const nextButtons = document.querySelectorAll('.btn-next-step');
  const prevButtons = document.querySelectorAll('.btn-prev-step');

  let currentStep = 0;

  function showStep(index) {
    appointmentSteps.forEach((step, i) => {
      step.classList.toggle('hidden', i !== index);
    });
    updateProgress(index);
  }

  function updateProgress(index) {
    const progressItems = document.querySelectorAll('.progress-step');
    progressItems.forEach((item, i) => {
      if (i < index) {
        item.classList.add('bg-primary', 'text-on-primary');
        item.classList.remove('border', 'border-border-neutral', 'text-text-secondary');
      } else if (i === index) {
        item.classList.add('bg-primary', 'text-on-primary');
        item.classList.remove('border', 'border-border-neutral', 'text-text-secondary');
      } else {
        item.classList.remove('bg-primary', 'text-on-primary');
        item.classList.add('border', 'border-border-neutral', 'text-text-secondary');
      }
    });
  }

  nextButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (currentStep < appointmentSteps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // === AI CHATBOT SEND MESSAGE ===
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatFeed = document.getElementById('chat-feed');

  if (chatInput && chatSendBtn && chatFeed) {
    // Load query from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      addUserMessage(query);
      setTimeout(() => addAIResponse(query), 1000);
    }

    chatSendBtn.addEventListener('click', function() {
      sendMessage();
    });

    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;

      addUserMessage(text);
      chatInput.value = '';
      chatInput.style.height = 'auto';

      // Simulate AI response
      setTimeout(() => {
        addAIResponse(text);
      }, 800 + Math.random() * 1200);
    }

    function addUserMessage(text) {
      const bubble = document.createElement('div');
      bubble.className = 'flex gap-4 max-w-[85%] self-end flex-row-reverse page-fade-in';
      bubble.innerHTML = `
        <div class="w-10 h-10 rounded-full border border-border-neutral bg-surface-main flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-text-secondary">person</span>
        </div>
        <div class="flex flex-col gap-1 items-end">
          <span class="font-label-sm text-label-sm text-text-secondary">Bạn</span>
          <div class="bg-primary text-on-primary border border-primary p-4 rounded-DEFAULT rounded-tr-none font-body-md text-body-md leading-relaxed">${escapeHtml(text)}</div>
        </div>
      `;
      chatFeed.appendChild(bubble);
      chatFeed.scrollTop = chatFeed.scrollHeight;
    }

    function addAIResponse(userText) {
      const responses = [
        'Cảm ơn bạn đã đặt câu hỏi. Theo quy định tại Bộ luật Dân sự 2015, vấn đề này cần được xem xét dựa trên các tình tiết cụ thể. Tôi khuyên bạn nên tham khảo ý kiến luật sư để được tư vấn chi tiết.',
        'Về vấn đề của bạn, căn cứ theo Luật Hôn nhân và Gia đình 2014, việc giải quyết sẽ phụ thuộc vào thỏa thuận giữa các bên. Trường hợp không thỏa thuận được, Tòa án sẽ quyết định dựa trên quy định pháp luật.',
        'Theo quy định hiện hành, thủ tục này bao gồm các bước: (1) Chuẩn bị hồ sơ, (2) Nộp tại cơ quan có thẩm quyền, (3) Xử lý hồ sơ, (4) Nhận kết quả. Thời gian xử lý thông thường từ 15-30 ngày làm việc.',
        'Đây là một vấn đề pháp lý phức tạp. Tôi khuyến nghị bạn nên tìm đến sự hỗ trợ của luật sư chuyên môn để được tư vấn chi tiết và bảo vệ quyền lợi tốt nhất. Bạn có muốn tôi kết nối bạn với luật sư chuyên về lĩnh vực này không?'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const bubble = document.createElement('div');
      bubble.className = 'flex gap-4 max-w-[85%] page-fade-in';
      bubble.innerHTML = `
        <div class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 border border-primary">
          <span class="material-symbols-outlined">balance</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-label-sm text-label-sm text-text-secondary">Trợ Lý AI</span>
          <div class="bg-surface-alt border border-border-neutral p-4 rounded-DEFAULT rounded-tl-none font-body-md text-body-md text-text-primary leading-relaxed">
            <p>${escapeHtml(randomResponse)}</p>
          </div>
        </div>
      `;
      chatFeed.appendChild(bubble);
      chatFeed.scrollTop = chatFeed.scrollHeight;
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }

  // === DOWNLOAD BUTTONS (AI Form Library) ===
  document.querySelectorAll('[data-download]').forEach(btn => {
    btn.addEventListener('click', function() {
      const fileName = this.getAttribute('data-download') || 'file';

      // If lead gate exists, show it first
      if (leadGateModal && !leadGateModal.classList.contains('hidden')) {
        return; // Already showing
      }

      // Simulate download with a notification
      const originalText = this.innerHTML;
      this.innerHTML = '<span class="material-symbols-outlined text-[20px]">check_circle</span> Đã tải xuống';
      this.style.opacity = '0.7';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.opacity = '1';
        this.disabled = false;
      }, 2000);
    });
  });

  // === NUMBER COUNTER ANIMATION ===
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const duration = 1500; // 1.5 seconds counting
          
          // Scramble effect before starting (approx 500ms)
          let scrambleTicks = 0;
          const maxScramble = 10;
          const scramble = setInterval(() => {
            counter.innerText = Math.floor(Math.random() * (target * 1.5));
            scrambleTicks++;
            if (scrambleTicks >= maxScramble) {
              clearInterval(scramble);
              
              // Start real counting
              const increment = target / (duration / 16); // ~60fps
              let current = 0;
              const updateCounter = () => {
                current += increment;
                if (current < target) {
                  counter.innerText = Math.ceil(current);
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.innerText = target;
                }
              };
              updateCounter();
            }
          }, 50);
          
          observer.unobserve(counter);
        }
      });
    }, observerOptions);
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  console.log('DUC TIN & PARTNERS - Website Ready');
});
