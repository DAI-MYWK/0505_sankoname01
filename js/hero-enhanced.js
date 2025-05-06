document.addEventListener('DOMContentLoaded', function() {
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  
  function showSlide(index) {
    heroSlides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    heroSlides[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
  }
  
  showSlide(currentSlide);
  
  if (heroSlides.length > 1) {
    setInterval(nextSlide, 5000);
  }
  
  const heroScrollBtn = document.querySelector('.hero-scroll');
  if (heroScrollBtn) {
    heroScrollBtn.addEventListener('click', function() {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
