/**
 * ==============================================================================
 * PORTOFOLIO WAHYU SAPUTRA - INTERAKSI JAVASCRIPT VANILLA
 * Siswa SMK Jurusan PPLG (Pengembangan Perangkat Lunak dan Gim)
 * ==============================================================================
 * 
 * Fitur & Fungsionalitas:
 * 1. Mobile Menu Toggle (Hamburger Menu) & Manajemen Status Aksesibilitas (ARIA)
 * 2. Smooth Scrolling & Active Navigation Link Spy Saat Scroll
 * 3. Header Elevation (Shadow) saat Pengguna Melakukan Scroll
 * 4. Validasi Formulir Kontak Interaktif Sebelum Pengiriman (Client-side)
 * 5. Pembaruan Tahun Hak Cipta Dinamis
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. ELEMEN SELEKTOR UTAMA
  // ----------------------------------------------------------------------------
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const currentYearSpan = document.getElementById('currentYear');

  // Input Fields Kontak
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const senderSubject = document.getElementById('senderSubject');
  const senderMessage = document.getElementById('senderMessage');

  // Field Error Messages
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // ----------------------------------------------------------------------------
  // 2. TAHUN DINAMIS PADA FOOTER
  // ----------------------------------------------------------------------------
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ----------------------------------------------------------------------------
  // 3. MOBILE MENU TOGGLE (HAMBURGER)
  // ----------------------------------------------------------------------------
  const toggleMobileMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    menuToggle.setAttribute('aria-expanded', String(nextState));
    primaryNav.classList.toggle('is-open', nextState);

    // Mencegah scroll pada body saat menu terbuka di layar ponsel
    if (nextState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    if (menuToggle.getAttribute('aria-expanded') === 'true') {
      menuToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Tutup menu saat tombol Escape ditekan
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // ----------------------------------------------------------------------------
  // 4. SMOOTH SCROLLING & TUTUP MENU SAAT LINK DIKLIK
  // ----------------------------------------------------------------------------
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          closeMobileMenu();

          // Scroll dengan penyesuaian offset header
          const headerOffset = header ? header.offsetHeight + 10 : 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update fokus aksesibilitas
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      }
    });
  });

  // ----------------------------------------------------------------------------
  // 5. HEADER SHADOW & ACTIVE NAV LINK SAAT SCROLL (SCROLL SPY)
  // ----------------------------------------------------------------------------
  const onScrollHandler = () => {
    const scrollY = window.pageYOffset;

    // Tambahkan shadow ke header jika di-scroll > 20px
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Identifikasi section aktif
    const headerOffset = header ? header.offsetHeight + 60 : 100;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerOffset;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScrollHandler, { passive: true });

  // ----------------------------------------------------------------------------
  // 6. VALIDASI FORMULIR KONTAK SEDERHANA & INTERAKTIF
  // ----------------------------------------------------------------------------
  
  // Format regex email standar RFC 5322 sederhana
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Tampilkan pesan error pada field tertentu
  const setFieldError = (inputEl, errorEl, message) => {
    inputEl.classList.add('is-invalid');
    if (errorEl) {
      errorEl.textContent = message;
    }
  };

  // Bersihkan pesan error pada field tertentu
  const clearFieldError = (inputEl, errorEl) => {
    inputEl.classList.remove('is-invalid');
    if (errorEl) {
      errorEl.textContent = '';
    }
  };

  // Reset status alert form
  const resetFormStatus = () => {
    if (formStatus) {
      formStatus.className = 'form-status';
      formStatus.textContent = '';
      formStatus.style.display = 'none';
    }
  };

  // Hapus tanda error seketika saat user mulai mengetik kembali
  if (senderName) {
    senderName.addEventListener('input', () => clearFieldError(senderName, nameError));
  }
  if (senderEmail) {
    senderEmail.addEventListener('input', () => clearFieldError(senderEmail, emailError));
  }
  if (senderSubject) {
    senderSubject.addEventListener('input', () => clearFieldError(senderSubject, subjectError));
  }
  if (senderMessage) {
    senderMessage.addEventListener('input', () => clearFieldError(senderMessage, messageError));
  }

  // Event Submit Formulir
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      resetFormStatus();

      let isValid = true;

      // 1. Validasi Nama
      const nameValue = senderName ? senderName.value.trim() : '';
      if (!nameValue) {
        setFieldError(senderName, nameError, 'Nama lengkap wajib diisi.');
        isValid = false;
      } else if (nameValue.length < 3) {
        setFieldError(senderName, nameError, 'Nama harus berisi minimal 3 karakter.');
        isValid = false;
      } else {
        clearFieldError(senderName, nameError);
      }

      // 2. Validasi Email
      const emailValue = senderEmail ? senderEmail.value.trim() : '';
      if (!emailValue) {
        setFieldError(senderEmail, emailError, 'Alamat email wajib diisi.');
        isValid = false;
      } else if (!isValidEmail(emailValue)) {
        setFieldError(senderEmail, emailError, 'Format email tidak valid (contoh: nama@domain.com).');
        isValid = false;
      } else {
        clearFieldError(senderEmail, emailError);
      }

      // 3. Validasi Subjek
      const subjectValue = senderSubject ? senderSubject.value.trim() : '';
      if (!subjectValue) {
        setFieldError(senderSubject, subjectError, 'Subjek pesan wajib diisi.');
        isValid = false;
      } else if (subjectValue.length < 3) {
        setFieldError(senderSubject, subjectError, 'Subjek minimal berisi 3 karakter.');
        isValid = false;
      } else {
        clearFieldError(senderSubject, subjectError);
      }

      // 4. Validasi Pesan
      const messageValue = senderMessage ? senderMessage.value.trim() : '';
      if (!messageValue) {
        setFieldError(senderMessage, messageError, 'Isi pesan tidak boleh kosong.');
        isValid = false;
      } else if (messageValue.length < 10) {
        setFieldError(senderMessage, messageError, 'Pesan terlalu pendek. Tuliskan minimal 10 karakter.');
        isValid = false;
      } else {
        clearFieldError(senderMessage, messageError);
      }

      // Jika ada input yang gagal lolos validasi
      if (!isValid) {
        if (formStatus) {
          formStatus.className = 'form-status status-error';
          formStatus.textContent = 'Mohon periksa kembali kolom yang ditandai merah di bawah.';
          formStatus.style.display = 'block';
        }

        // Fokus ke input pertama yang bermasalah
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Simulasikan pengiriman pesan dengan animasi tombol
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
        <span>Mengirim Pesan...</span>
      `;

      // Tambahkan keyframe spin dinamis bila belum ada
      if (!document.getElementById('spin-keyframes')) {
        const style = document.createElement('style');
        style.id = 'spin-keyframes';
        style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }

      setTimeout(() => {
        // Berikan respon sukses
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (formStatus) {
          formStatus.className = 'form-status status-success';
          formStatus.innerHTML = `
            <strong>Pesan Berhasil Terkirim!</strong> Terima kasih, <em>${escapeHtml(nameValue)}</em>. Wahyu Saputra akan segera merespons ke alamat email Anda (<em>${escapeHtml(emailValue)}</em>).
          `;
          formStatus.style.display = 'block';
        }

        // Reset form
        contactForm.reset();
      }, 1000);
    });
  }

  // Fungsi utilitas sanitasi sederhana pencegah XSS pada tampilan DOM
  function escapeHtml(string) {
    return String(string).replace(/[&<>"']/g, function (s) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[s];
    });
  }
});
