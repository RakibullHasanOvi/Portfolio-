/* ============================================
   RAKIBULL HASAN OVI — PORTFOLIO SCRIPTS
   ============================================ */

// ---- NAME TYPING ANIMATION ----
const names = ['Rakibull Hasan Ovi', 'Video Editor', 'Content Creator', 'Storyteller'];
let nameIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedName');
 
function typeLoop() {
  if (!typedEl) return;
  const current = names[nameIdx];
  const cursor = '<span class="cursor"></span>';
  if (!deleting) {
    charIdx++;
    typedEl.innerHTML = current.slice(0, charIdx) + cursor;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    charIdx--;
    typedEl.innerHTML = current.slice(0, charIdx) + cursor;
    if (charIdx === 0) {
      deleting = false;
      nameIdx = (nameIdx + 1) % names.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 100);
}
setTimeout(typeLoop, 1200);

// ---- YOUTUBE TAB SWITCHING ----
function switchTab(tab, el) {
  document.querySelectorAll('.yt-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.yt-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('panel-' + tab).classList.add('active');
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

// ---- SKILL BAR ANIMATION ----
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.style.width || bar.getAttribute('data-w');
        bar.style.setProperty('--target-w', w);
        bar.style.width = '0';
        setTimeout(() => bar.classList.add('animate'), 100);
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ---- STAT COUNTER ANIMATION ----
function animateCount(el, target, suffix = '') {
  let start = 0;
  const num = parseInt(target);
  if (isNaN(num)) return;
  const step = 1500 / num;
  const timer = setInterval(() => {
    start += 1;
    el.textContent = start + suffix;
    if (start >= num) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(el => {
        const original = el.textContent;
        const num = original.replace(/[^0-9]/g, '');
        const suffix = original.replace(/[0-9]/g, '');
        if (num && parseInt(num) < 100) animateCount(el, parseInt(num), suffix);
      });
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const aboutSection = document.querySelector('.about');
if (aboutSection) statObserver.observe(aboutSection);

// ---- MOBILE MENU ----
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');

if (hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- NAVBAR SCROLL EFFECT ----
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(13,13,13,0.95)';
  } else {
    nav.style.background = 'rgba(13,13,13,0.65)';
  }
});

// ---- PAGE SCROLL INDICATORS ----
const scrollTop = document.createElement('div');
scrollTop.className = 'scroll-indicator scroll-top';
scrollTop.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polyline points="18 15 12 9 6 15"></polyline></svg>';
scrollTop.title = 'Scroll to Top';
scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const scrollBottom = document.createElement('div');
scrollBottom.className = 'scroll-indicator scroll-bottom';
scrollBottom.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polyline points="6 9 12 15 18 9"></polyline></svg>';
scrollBottom.title = 'Scroll to Bottom';
scrollBottom.addEventListener('click', () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

document.body.appendChild(scrollTop);
document.body.appendChild(scrollBottom);
