document.addEventListener("DOMContentLoaded", () => {
  // Toggle navigation menu
  const navOpenBtn = document.querySelector('.navOpenBtn');
  navOpenBtn.addEventListener('click', () => {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.classList.toggle('active');
  });

  $(function() {
    $('.menu-list > li:has(ul)').on('click', function(event) {
      if ($(event.target).is('a') && $(event.target).next('ul').length) {
        event.preventDefault();
      }
      event.stopPropagation();
      $(this).children('ul').stop(true, true).slideToggle(300);
      $(this).toggleClass('active');
      $(this).siblings().children('ul').slideUp(300).parent().removeClass('active');
    });

    $(document).on('click', function() {
      $('.menu-list ul').stop(true, true).slideUp(300);
      $('.menu-list > li').removeClass('active');
    });

    $('.menu-list ul').on('click', function(event) {
      event.stopPropagation();
    });
  });

  // Slideshow functionality
  let slideIndex = 0;
  let autoSlideInterval;
  const slideInterval = 10000;

  function showSlides(n) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dots-slide");

    slideIndex = ((n - 1 + slides.length) % slides.length) + 1;

    slides.forEach((slide, index) => {
      slide.style.display = index === slideIndex - 1 ? "block" : "none";
    });

    dots.forEach((dot, index) => {
      dot.className = index === slideIndex - 1 ? dot.className + " active-slide" : dot.className.replace(" active-slide", "");
    });
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => plusSlides(1), slideInterval);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  showSlides(slideIndex);
  startAutoSlide();

  let touchStartX = 0;
  let touchEndX = 0;
  const slider = document.querySelector('.slider-container');

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    stopAutoSlide();
  }, false);

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX) plusSlides(1);
    if (touchEndX > touchStartX) plusSlides(-1);
    startAutoSlide();
  }, false);

  document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  }, { passive: false });

  document.querySelectorAll('.dots-slide').forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide(index + 1);
    });
  });

  document.querySelector('.prev-slider-images').addEventListener('click', () => {
    plusSlides(-1);
  });

  document.querySelector('.next-slider-images').addEventListener('click', () => {
    plusSlides(1);
  });

  // Accordion-style question items
  const questionItems = document.querySelector('.question-items');
  questionItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('question-question')) {
      const questionItem = event.target.parentElement;
      const wasActive = questionItem.classList.contains('active');
      document.querySelectorAll('.question-item').forEach(item => item.classList.remove('active'));
      if (!wasActive) questionItem.classList.add('active');
    }
  });

  // Card slider functionality
  let currentSlideCard = 0;
  const slidesCard = document.querySelector('.slider-wrapper');
  const cardCards = document.querySelectorAll('.card-card');
  const prevButton = document.querySelector('.prev-slider-cards');
  const nextButton = document.querySelector('.next-slider-cards');

  function getVisibleSlidesCount() {
    const sliderWidth = slidesCard.offsetWidth;
    const cardStyle = window.getComputedStyle(cardCards[0]);
    const cardWidth = cardCards[0].offsetWidth + parseInt(cardStyle.marginLeft, 10) + parseInt(cardStyle.marginRight, 10);
    return Math.floor(sliderWidth / cardWidth);
  }

  function updateSlideWidthAndVisibility() {
    const visibleSlidesCount = getVisibleSlidesCount();
    prevButton.style.display = currentSlideCard === 0 ? 'none' : 'inline-flex';
    nextButton.style.display = currentSlideCard >= cardCards.length - visibleSlidesCount ? 'none' : 'inline-flex';
  }

  function moveSlide(direction) {
    const visibleSlidesCount = getVisibleSlidesCount();
    currentSlideCard += direction;
    if (currentSlideCard >= cardCards.length) currentSlideCard = 0;
    if (currentSlideCard < 0) currentSlideCard = cardCards.length - 1;

    const cardStyle = window.getComputedStyle(cardCards[0]);
    const cardWidth = cardCards[0].offsetWidth + parseInt(cardStyle.marginLeft, 10) + parseInt(cardStyle.marginRight, 10);
    slidesCard.scrollTo({
      left: currentSlideCard * cardWidth,
      behavior: 'smooth'
    });
    updateSlideWidthAndVisibility();
  }

  slidesCard.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  slidesCard.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX) moveSlide(1);
    if (touchEndX > touchStartX) moveSlide(-1);
  }, false);

  updateSlideWidthAndVisibility();

  window.addEventListener('resize', updateSlideWidthAndVisibility);
  prevButton.addEventListener('click', () => moveSlide(-1));
  nextButton.addEventListener('click', () => moveSlide(1));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') moveSlide(-1);
    if (event.key === 'ArrowRight') moveSlide(1);
  });

  slidesCard.setAttribute('role', 'region');
  slidesCard.setAttribute('aria-label', 'Card Slider');
  prevButton.setAttribute('aria-label', 'Previous Slide');
  nextButton.setAttribute('aria-label', 'Next Slide');

  // Tab slider functionality
  const tabContainer = document.querySelector(".tab-container .tab");
  const prevTabButton = document.querySelector(".prev-slider-tab");
  const nextTabButton = document.querySelector(".next-slider-tab");
  const tabButtons = document.querySelectorAll(".tab button.tablinks");
  const tabPanels = document.querySelectorAll(".tabcontent");

  function toggleControlVisibility() {
    const hasOverflow = tabContainer.scrollWidth > tabContainer.clientWidth;
    const scrollLeft = tabContainer.scrollLeft;
    const maxScrollLeft = tabContainer.scrollWidth - tabContainer.clientWidth;

    prevTabButton.style.display = scrollLeft > 0 ? "inline-flex" : "none";
    nextTabButton.style.display = scrollLeft < maxScrollLeft ? "inline-flex" : "none";

    tabContainer.classList.toggle("has-overflow", hasOverflow);
  }

  function activateTab(tabName) {
    tabButtons.forEach(button => button.classList.remove("active"));
    tabPanels.forEach(panel => panel.style.display = "none");

    const activeButton = document.querySelector(`button[data-tab="${tabName}"]`);
    const activePanel = document.getElementById(tabName);

    activeButton.classList.add("active");
    activePanel.style.display = "block";
  }

  tabButtons.forEach(button => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
  });

  function moveTabSlide(direction) {
    const width = tabContainer.clientWidth;
    const scrollAmount = tabContainer.scrollLeft + (width / 2) * direction;

    tabContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });

    toggleControlVisibility();
  }

  prevTabButton.addEventListener("click", () => moveTabSlide(-1));
  nextTabButton.addEventListener("click", () => moveTabSlide(1));

  window.addEventListener("resize", toggleControlVisibility);

  tabContainer.setAttribute("role", "tablist");
  tabButtons.forEach(button => {
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", button.dataset.tab);
  });
  tabPanels.forEach(panel => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", panel.id);
  });

  toggleControlVisibility();
});
