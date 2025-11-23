class TopicsSlider {
  constructor(selector) {
    this.slider = document.querySelector(selector);
    if (!this.slider) return;

    this.slides = this.slider.children;
    this.slideCount = this.slides.length;
    this.currentSlide = 0;
    this.slidesToShow = this.getSlidesToShow();
    this.autoplayInterval = null;

    // Touch/swipe variables
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isDragging = false;
    this.startPos = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;

    this.init();
  }

  getSlidesToShow() {
    const width = window.innerWidth;
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    if (width >= 640) return 2;
    return 1;
  }

  init() {
    this.createSliderStructure();
    this.createNavigation();
    this.createArrowNavigation();
    this.setupAutoplay();
    this.setupResponsive();
    this.setupTouchEvents();
    this.goToSlide(0);
    this.updateArrowStates();
  }

  createSliderStructure() {
    // Create wrapper for slides
    this.slidesWrapper = document.createElement("div");
    this.slidesWrapper.className = "topics-slider-wrapper";
    this.slidesWrapper.style.cssText = `
      display: flex;
      transition: transform 0.3s ease;
      width: 100%;
      touch-action: pan-y pinch-zoom;
      gap: 20px;
    `;

    // Move slides to wrapper
    Array.from(this.slides).forEach((slide) => {
      slide.style.cssText = `
        flex: 0 0 ${100 / this.slidesToShow}%;
        padding: 0 8px;
        box-sizing: border-box;
        user-select: none;
        min-width: 0;
        max-width: none;
      `;
      this.slidesWrapper.appendChild(slide);
    });

    this.slider.appendChild(this.slidesWrapper);
  }

  createArrowNavigation() {
    // Create navigation arrows
    this.prevArrow = document.createElement("button");
    this.prevArrow.className = "slider-arrow slider-prev";
    this.prevArrow.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    this.prevArrow.style.cssText = `
      position: absolute;
      left: -50px;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      border: 2px solid #e5e7eb;
      color: #6b7280;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;

    this.nextArrow = document.createElement("button");
    this.nextArrow.className = "slider-arrow slider-next";
    this.nextArrow.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    this.nextArrow.style.cssText = `
      position: absolute;
      right: -50px;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      border: 2px solid #e5e7eb;
      color: #6b7280;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;

    // Add hover effects
    this.prevArrow.addEventListener("mouseenter", () => {
      this.prevArrow.style.background = "#1363df";
      this.prevArrow.style.color = "white";
      this.prevArrow.style.borderColor = "#1363df";
    });
    this.prevArrow.addEventListener("mouseleave", () => {
      this.prevArrow.style.background = "white";
      this.prevArrow.style.color = "#6b7280";
      this.prevArrow.style.borderColor = "#e5e7eb";
    });

    this.nextArrow.addEventListener("mouseenter", () => {
      this.nextArrow.style.background = "#1363df";
      this.nextArrow.style.color = "white";
      this.nextArrow.style.borderColor = "#1363df";
    });
    this.nextArrow.addEventListener("mouseleave", () => {
      this.nextArrow.style.background = "white";
      this.nextArrow.style.color = "#6b7280";
      this.nextArrow.style.borderColor = "#e5e7eb";
    });

    // Add click events
    this.prevArrow.addEventListener("click", () => this.prevSlide());
    this.nextArrow.addEventListener("click", () => this.nextSlide());

    this.slider.appendChild(this.prevArrow);
    this.slider.appendChild(this.nextArrow);
  }

  createNavigation() {
    // Create dots navigation
    this.dotsContainer = document.createElement("div");
    this.dotsContainer.className = "topics-slider-dots";
    this.dotsContainer.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 4px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -60px;
    `;

    const totalSlides = Math.ceil(this.slideCount / this.slidesToShow);
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = "slider-dot";
      dot.style.cssText = `
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        background-color: #eeeeee;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
      `;

      dot.addEventListener("click", () =>
        this.goToSlide(i * this.slidesToShow),
      );
      this.dotsContainer.appendChild(dot);
    }

    this.slider.appendChild(this.dotsContainer);
  }

  setupTouchEvents() {
    // Touch events
    this.slidesWrapper.addEventListener("touchstart", (e) =>
      this.touchStart(e),
    );
    this.slidesWrapper.addEventListener("touchend", (e) => this.touchEnd(e));
    this.slidesWrapper.addEventListener("touchmove", (e) => this.touchMove(e));

    // Mouse events for desktop drag
    this.slidesWrapper.addEventListener("mousedown", (e) => this.mouseDown(e));
    this.slidesWrapper.addEventListener("mousemove", (e) => this.mouseMove(e));
    this.slidesWrapper.addEventListener("mouseup", (e) => this.mouseUp(e));
    this.slidesWrapper.addEventListener("mouseleave", (e) => this.mouseUp(e));

    // Prevent context menu on right click
    this.slidesWrapper.addEventListener("contextmenu", (e) =>
      e.preventDefault(),
    );
  }

  touchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
    this.isDragging = true;
    this.slidesWrapper.style.transition = "none";
  }

  touchMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();

    this.touchEndX = e.changedTouches[0].screenX;
    const diff = this.touchStartX - this.touchEndX;
    const moveX =
      -(this.currentSlide * (100 / this.slidesToShow)) -
      (diff / this.slider.offsetWidth) * 100;

    this.slidesWrapper.style.transform = `translateX(${moveX}%)`;
  }

  touchEnd(e) {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.slidesWrapper.style.transition = "transform 0.3s ease";

    const diff = this.touchStartX - this.touchEndX;
    const threshold = this.slider.offsetWidth * 0.3; // 30% threshold

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    } else {
      this.goToSlide(this.currentSlide);
    }
  }

  mouseDown(e) {
    this.isDragging = true;
    this.startPos = e.clientX;
    this.slidesWrapper.style.transition = "none";
    this.slidesWrapper.style.cursor = "grabbing";
  }

  mouseMove(e) {
    if (!this.isDragging) return;

    const currentPos = e.clientX;
    const diff = this.startPos - currentPos;
    const moveX =
      -(this.currentSlide * (100 / this.slidesToShow)) -
      (diff / this.slider.offsetWidth) * 100;

    this.slidesWrapper.style.transform = `translateX(${moveX}%)`;
  }

  mouseUp(e) {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.slidesWrapper.style.transition = "transform 0.3s ease";
    this.slidesWrapper.style.cursor = "grab";

    const currentPos = e.clientX;
    const diff = this.startPos - currentPos;
    const threshold = this.slider.offsetWidth * 0.3;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    } else {
      this.goToSlide(this.currentSlide);
    }
  }

  goToSlide(index) {
    this.currentSlide = Math.max(
      0,
      Math.min(index, this.slideCount - this.slidesToShow),
    );
    const translateX = -(this.currentSlide * (100 / this.slidesToShow));
    this.slidesWrapper.style.transform = `translateX(${translateX}%)`;

    this.updateDots();
    this.updateArrowStates();
  }

  updateArrowStates() {
    // Update prev arrow state
    if (this.currentSlide === 0) {
      this.prevArrow.style.opacity = "0.5";
      this.prevArrow.style.cursor = "not-allowed";
      this.prevArrow.disabled = true;
    } else {
      this.prevArrow.style.opacity = "1";
      this.prevArrow.style.cursor = "pointer";
      this.prevArrow.disabled = false;
    }

    // Update next arrow state
    if (this.currentSlide >= this.slideCount - this.slidesToShow) {
      this.nextArrow.style.opacity = "0.5";
      this.nextArrow.style.cursor = "not-allowed";
      this.nextArrow.disabled = true;
    } else {
      this.nextArrow.style.opacity = "1";
      this.nextArrow.style.cursor = "pointer";
      this.nextArrow.disabled = false;
    }
  }

  updateDots() {
    const dots = this.dotsContainer.querySelectorAll(".slider-dot");
    const activeDotIndex = Math.floor(this.currentSlide / this.slidesToShow);

    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.style.backgroundColor = "#1363df";
      } else {
        dot.style.backgroundColor = "#eeeeee";
      }
    });
  }

  nextSlide() {
    const nextIndex = this.currentSlide + this.slidesToShow;
    if (nextIndex < this.slideCount) {
      this.goToSlide(nextIndex);
    } else {
      this.goToSlide(0); // Loop back to start
    }
  }

  prevSlide() {
    const prevIndex = this.currentSlide - this.slidesToShow;
    if (prevIndex >= 0) {
      this.goToSlide(prevIndex);
    } else {
      this.goToSlide(this.slideCount - this.slidesToShow); // Loop to end
    }
  }

  setupAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);

    // Pause on hover/touch
    this.slider.addEventListener("mouseenter", () => {
      clearInterval(this.autoplayInterval);
    });

    this.slider.addEventListener("mouseleave", () => {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 3000);
    });

    // Pause on touch start
    this.slider.addEventListener("touchstart", () => {
      clearInterval(this.autoplayInterval);
    });
  }

  setupResponsive() {
    const resizeObserver = new ResizeObserver(() => {
      const newSlidesToShow = this.getSlidesToShow();
      if (newSlidesToShow !== this.slidesToShow) {
        this.slidesToShow = newSlidesToShow;

        // Update slide widths
        Array.from(this.slides).forEach((slide) => {
          slide.style.flex = `0 0 ${100 / this.slidesToShow}%`;
          slide.style.minWidth = "0";
          slide.style.maxWidth = "none";
        });

        this.goToSlide(0);
        this.updateDots();
        this.updateArrowStates();
      }
    });

    resizeObserver.observe(this.slider);
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TopicsSlider(".popular-topics-slider");
});
