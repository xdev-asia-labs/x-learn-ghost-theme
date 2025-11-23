document.addEventListener("DOMContentLoaded", function () {
  const topicsSwiper = new Swiper(".topics-swiper", {
    // Enable responsive breakpoints
    breakpoints: {
      // Mobile first
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // Small tablets
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // Tablets
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      // Small desktops
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      // Large desktops
      1280: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },

    // Navigation (now positioned at top right)
    navigation: {
      nextEl: ".topics-swiper-button-next",
      prevEl: ".topics-swiper-button-prev",
    },

    // Pagination - DISABLED
    pagination: false,
    // OR you can comment out the entire pagination section:
    /*
    pagination: {
      el: ".topics-swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    */

    // Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Loop
    loop: true,

    // Speed
    speed: 600,

    // Touch and mouse
    grabCursor: true,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,

    // Responsive
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,

    // Effects
    effect: "slide",
    fadeEffect: {
      crossFade: true,
    },

    // Accessibility
    a11y: {
      enabled: true,
      prevSlideMessage: "{{t 'Previous slide'}}",
        nextSlideMessage: "{{t 'Next slide'}}",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
    },
  });

  // Initialize Popular Topics Swiper with smooth transition
  const popularTopicsSwiper = new Swiper(".popular-topics-swiper", {
    // Enable responsive breakpoints
    breakpoints: {
      // Mobile first
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // Small tablets
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // Tablets
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      // Small desktops
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      // Large desktops
      1280: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },

    // Navigation
    navigation: {
      nextEl: ".popular-topics-swiper-button-next",
      prevEl: ".popular-topics-swiper-button-prev",
    },

    // Pagination - DISABLED
    pagination: false,

    // Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Loop
    loop: true,

    // Speed
    speed: 600,

    // Touch and mouse
    grabCursor: true,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,

    // Responsive
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,

    // Effects
    effect: "slide",
    fadeEffect: {
      crossFade: true,
    },

    // Accessibility
    a11y: {
      enabled: true,
      prevSlideMessage: "Previous topic",
      nextSlideMessage: "Next topic",
      firstSlideMessage: "This is the first topic",
      lastSlideMessage: "This is the last topic",
    },

    // Add initialization callback to handle smooth transition
    on: {
      init: function () {
        // Hide skeleton and show swiper with fade-in effect
        const skeleton = document.getElementById("popular-topics-skeleton");
        const wrapper = document.getElementById("popular-topics-wrapper");

        if (skeleton && wrapper) {
          // Add a small delay to ensure smooth transition
          setTimeout(() => {
            skeleton.style.display = "none";
            wrapper.style.opacity = "1";
          }, 100);
        }
      },
    },
  });

  // Initialize Author Slider with Swiper
  const authorSwiper = new Swiper(".author-swiper", {
    // Enable responsive breakpoints
    breakpoints: {
      // Mobile first
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // Small tablets
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // Tablets
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      // Small desktops
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      // Large desktops
      1280: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },

    // Navigation
    navigation: {
      nextEl: ".author-swiper-button-next",
      prevEl: ".author-swiper-button-prev",
    },

    // Pagination - DISABLED
    pagination: false,

    // Autoplay
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Loop
    loop: true,

    // Speed
    speed: 600,

    // Touch and mouse
    grabCursor: true,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,

    // Responsive
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,

    // Effects
    effect: "slide",
    fadeEffect: {
      crossFade: true,
    },

    // Accessibility
    a11y: {
      enabled: true,
      prevSlideMessage: "Previous author",
      nextSlideMessage: "Next author",
      firstSlideMessage: "This is the first author",
      lastSlideMessage: "This is the last author",
    },
  });
});
