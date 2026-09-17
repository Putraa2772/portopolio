// ==========================================================================
// Wahyu Saputra Portfolio - JavaScript Interactions (Vanilla ES6+)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year Update in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Smooth Scroll for Navigation Links
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 3. Subtle 3D Tilt Micro-Interaction for Bento Cards on Desktop
  const cards = document.querySelectorAll('.bento-card, .profile-card');
  
  if (window.matchMedia('(min-width: 1024px)').matches) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 4. Subtle Interactive Ripple on Fishing Icon when clicked
  const fishingVisual = document.querySelector('.fishing-badge-container');
  if (fishingVisual) {
    fishingVisual.addEventListener('click', () => {
      fishingVisual.style.transform = 'scale(0.96)';
      setTimeout(() => {
        fishingVisual.style.transform = '';
      }, 200);
    });
  }

  // 5. Scroll Reveal Observer for Bento Cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.bento-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, box-shadow 0.35s ease, border-color 0.35s ease`;
    revealObserver.observe(el);
  });
});
