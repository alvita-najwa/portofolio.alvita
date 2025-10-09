// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const certificateItems = document.querySelectorAll('.certificate-item');
const contactForm = document.getElementById('contactForm');
const darkModeToggle = document.createElement('button');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        // Hanya intercept kalau link internal (#something)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
        // Kalau href = about.html / contact.html biarkan default (redirect jalan)
    });
});


// Active Section Indicator
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill Bar Animation
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.dataset.progress;
        bar.style.width = width;
    });
};

// Trigger skill bar animation when skills section is in view
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target;
        const value = progress.getAttribute('data-progress');
        progress.style.width = value;  // langsung pakai value, sudah ada '%'

        observer.unobserve(progress);
      }
    });
  }, { threshold: 0.3 });

  skills.forEach(skill => {
    observer.observe(skill);
  });
});


// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Certificate Filtering
const certificateFilterBtns = document.querySelectorAll('.certificate-filter .filter-btn');

certificateFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        certificateFilterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        certificateItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Certificate Lightbox
certificateItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        openLightbox(imgSrc);
    });
});

// Lightbox Functionality
const openLightbox = (imgSrc) => {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="${imgSrc}" class="lightbox-content">
    `;
    
    document.body.appendChild(lightbox);
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
};

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show an alert
    alert(`Thank you ${name} for your message! I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // biar gak pindah halaman
    const data = new FormData(form);
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      msg.style.display = 'block'; // tampilkan pesan sukses
      form.reset(); // kosongkan form
    } else {
      msg.style.display = 'block';
      msg.style.color = 'red';
      msg.textContent = 'Oops! Something went wrong.';
    }
  });


// Initialize AOS (Animate On Scroll) - if library is included
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true
    });
}

window.onerror = function(message, source, lineno, colno, error) {
    console.log("Error caught: ", message);
};

