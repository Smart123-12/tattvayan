// =============================================
// TATTVAYAN – Main JS v2.0
// Enhanced with Gujarati cultural animations
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initHamburger();
  initScrollAnimations();
  initFeatureCards();
  initExamsScroll();
  initLangSwitcher();
});

// ===== PARTICLES =====
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  
  const colors = [
    'rgba(255,153,51,0.2)', 
    'rgba(139,0,0,0.08)', 
    'rgba(212,160,23,0.15)', 
    'rgba(255,100,0,0.12)', 
    'rgba(255,180,80,0.14)',
    'rgba(255,215,0,0.1)'
  ];
  const count = window.innerWidth < 768 ? 8 : 16;
  
  for (let i = 0; i < count; i++) {
    createParticle(container, colors);
  }
  
  setInterval(() => {
    if (container.children.length < count) {
      createParticle(container, colors);
    }
  }, 3000);
}

function createParticle(container, colors) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 4 + 1;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const duration = Math.random() * 18 + 10;
  const delay = Math.random() * -20;
  const left = Math.random() * 100;
  const opacity = Math.random() * 0.5 + 0.15;
  
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    left: ${left}%;
    bottom: -10px;
    opacity: ${opacity};
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;
  
  container.appendChild(p);
  setTimeout(() => p.remove(), (duration + Math.abs(delay)) * 1000 + 2000);
}

// ===== NAVBAR SCROLL =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ===== HAMBURGER MENU =====
function initHamburger() {
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (!hamburger || !navLinks) return;
  
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navLinks.style.display = isOpen ? 'flex' : '';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'fixed';
    navLinks.style.top = '66px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(255,252,247,0.98)';
    navLinks.style.padding = '20px';
    navLinks.style.gap = '8px';
    navLinks.style.borderBottom = '1px solid rgba(139,0,0,0.1)';
    navLinks.style.zIndex = '99';
    navLinks.style.boxShadow = '0 8px 24px rgba(139,0,0,0.1)';
    navLinks.style.backdropFilter = 'blur(20px)';
    
    if (!isOpen) {
      navLinks.removeAttribute('style');
    }
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('[data-delay]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Observe feature/course/testimonial/stat cards
  const animElements = document.querySelectorAll(
    '.feature-card, .course-card, .testimonial-card, .stat-card, .plan-card, .exam-chip'
  );
  animElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`;
    observer.observe(el);
  });
}

// ===== FEATURE CARD RIPPLE =====
function initFeatureCards() {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
        background: radial-gradient(circle, rgba(255,153,51,0.2), transparent);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
      `;
      
      if (!document.querySelector('#rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = `@keyframes rippleEffect { to { transform: scale(2); opacity: 0; } }`;
        document.head.appendChild(style);
      }
      
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ===== EXAMS SCROLL AUTO =====
function initExamsScroll() {
  const scroll = document.getElementById('examsScroll');
  if (!scroll) return;
  
  let scrollDirection = 1;
  let scrollSpeed = 0.5;
  let isPaused = false;
  
  scroll.addEventListener('mouseenter', () => isPaused = true);
  scroll.addEventListener('mouseleave', () => isPaused = false);
  
  function autoScroll() {
    if (!isPaused) {
      scroll.scrollLeft += scrollDirection * scrollSpeed;
      if (scroll.scrollLeft >= scroll.scrollWidth - scroll.clientWidth) {
        scrollDirection = -1;
      } else if (scroll.scrollLeft <= 0) {
        scrollDirection = 1;
      }
    }
    requestAnimationFrame(autoScroll);
  }
  autoScroll();
}

// ===== LANGUAGE SWITCHER =====
function initLangSwitcher() {
  document.querySelectorAll('.lang-switcher').forEach(switcher => {
    switcher.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switcher.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const lang = btn.textContent;
        if (typeof showToast === 'function') {
          showToast(`Language: ${lang}`, 'info');
        }
      });
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== NUMBER COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
  const suffix = el.textContent.replace(/[0-9.,]/g, '').trim();
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;
  
  const timer = setInterval(() => {
    step++;
    current = Math.min(step * increment, target);
    el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)).toLocaleString() + suffix;
    if (step >= steps) clearInterval(timer);
  }, duration / steps);
}

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      if (!el.dataset.animated) {
        el.dataset.animated = 'true';
        animateCounter(el);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===== SIDEBAR ACTIVE LINK =====
function setActiveSidebarLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-link').forEach(link => {
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href').replace('../', ''))) {
      link.classList.add('active');
    }
  });
}
setActiveSidebarLink();

// ===== SIDEBAR MOBILE TOGGLE =====
window.toggleSidebar = function() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
};

// ===== TOAST NOTIFICATION =====
window.showToast = function(msg, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  const colors = {
    success: { bg: 'rgba(46,125,50,0.95)', border: '1px solid rgba(76,175,80,0.5)' },
    error: { bg: 'rgba(211,47,47,0.95)', border: '1px solid rgba(239,83,80,0.5)' },
    info: { bg: 'rgba(230,126,0,0.95)', border: '1px solid rgba(255,153,51,0.5)' }
  };
  const c = colors[type] || colors.info;
  
  toast.style.cssText = `
    background: ${c.bg};
    border: ${c.border};
    color: white;
    padding: 14px 22px;
    border-radius: 14px;
    font-size: 0.88rem;
    font-weight: 600;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    backdrop-filter: blur(12px);
    animation: fadeInUp 0.3s ease;
    max-width: 320px;
    cursor: pointer;
    font-family: 'Outfit', 'Inter', sans-serif;
  `;
  toast.textContent = msg;
  toast.addEventListener('click', () => toast.remove());
  container.appendChild(toast);
  setTimeout(() => { 
    toast.style.opacity = '0'; 
    toast.style.transition = 'opacity 0.3s'; 
    setTimeout(() => toast.remove(), 300); 
  }, 4000);
};
