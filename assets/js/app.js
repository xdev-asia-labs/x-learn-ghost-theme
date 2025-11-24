/*
=====================
JS Table of Conttent 
=====================
01. Preloader
02. Mobile Menu  
03. AOS Animation 
04. Current Date
05. Magnific Popup
06. InfiniteScroll
07. Masonry Grid
08. Scroll to Top
09. Tab 
10. Typewriter Effect
*/

(function () {
  "use strict";

  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  // Utility functions
  const $ = (selector) => {
    if (typeof selector === "string") {
      return document.querySelectorAll(selector);
    }
    return selector;
  };

  const $single = (selector) => {
    if (typeof selector === "string") {
      return document.querySelector(selector);
    }
    return selector;
  };

  const addEventSingle = (element, event, callback) => {
    if (element) {
      element.addEventListener(event, callback);
    }
  };

  const addEventMultiple = (elements, event, callback) => {
    if (elements && elements.length > 0) {
      elements.forEach((element) => {
        element.addEventListener(event, callback);
      });
    }
  };

  // All functions
  function preloader() {
    const preloader = $single(".preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      });
    }
  }

  function mobileToggle() {
    const mobileMenu = $single("#mobile-menu");
    const mobileMenuBtn = $single("#mobile-menu-toggle");
    const mobileMenuClose = $single("#mobile-menu-close");
    const mobileMenuContent = $single("#mobile-menu-content");
    const mobileMenuBackdrop = $single("#mobile-menu-backdrop");

    console.log("🔍 Mobile toggle elements found:", {
      mobileMenu: !!mobileMenu,
      mobileMenuBtn: !!mobileMenuBtn,
      mobileMenuClose: !!mobileMenuClose,
      mobileMenuContent: !!mobileMenuContent,
      mobileMenuBackdrop: !!mobileMenuBackdrop,
    });

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(" Mobile menu button clicked");

        // Show the mobile menu
        mobileMenu.style.display = "block";

        // Animate the content in
        setTimeout(() => {
          mobileMenuContent.classList.add("translate-x-0");
          mobileMenuContent.classList.remove("translate-x-full");
          mobileMenuBackdrop.classList.add("bg-opacity-50");
        }, 10);

        // Prevent body scroll
        document.body.classList.add("overflow-hidden");

        // Add aria attributes for accessibility
        mobileMenuBtn.setAttribute("aria-expanded", "true");

        console.log(" Mobile menu state: opened");
      });
    } else {
      console.warn("❌ Mobile menu elements not found");
    }

    if (mobileMenuClose && mobileMenu) {
      mobileMenuClose.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("❌ Mobile menu close button clicked");

        closeMobileMenu();
      });
    }

    // Close menu when clicking backdrop
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener("click", (e) => {
        if (e.target === mobileMenuBackdrop) {
          closeMobileMenu();
        }
      });
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (mobileMenu && mobileMenu.style.display === "block") {
        if (
          !mobileMenu.contains(e.target) &&
          !mobileMenuBtn?.contains(e.target)
        ) {
          closeMobileMenu();
        }
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu?.style.display === "block") {
        closeMobileMenu();
      }
    });

    // Function to close mobile menu
    function closeMobileMenu() {
      if (mobileMenu && mobileMenuContent) {
        // Animate the content out
        mobileMenuContent.classList.remove("translate-x-0");
        mobileMenuContent.classList.add("translate-x-full");

        // Fade out backdrop smoothly
        mobileMenuBackdrop.classList.remove("bg-opacity-50");
        mobileMenuBackdrop.classList.add("bg-opacity-0");

        // Hide the mobile menu after content animation completes
        setTimeout(() => {
          mobileMenu.style.display = "none";
          // Reset backdrop opacity for next open
          mobileMenuBackdrop.classList.remove("bg-opacity-0");
        }, 300);

        // Re-enable body scroll
        document.body.classList.remove("overflow-hidden");
        mobileMenuBtn?.setAttribute("aria-expanded", "false");

        console.log(" Mobile menu state: closed");
      }
    }
  }

  function aosAnimation() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  }

  function currentDate() {
    const dateElement = $single(".current-date");
    if (dateElement) {
      const currentDate = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      dateElement.textContent = currentDate.toLocaleDateString(
        "en-US",
        options,
      );
    }
  }

  function magnificPopup() {
    if (typeof $.magnificPopup !== "undefined") {
      $(".popup-image").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    }
  }

  function infiniteScroll() {
    const infiniteScrollElement = $single(".infinite-scroll");
    if (infiniteScrollElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Load more content logic here
            }
          });
        },
        {
          rootMargin: "100px",
        },
      );
      observer.observe(infiniteScrollElement);
    }
  }

  function masonryGrid() {
    const masonryGrid = $single(".masonry-grid");
    if (masonryGrid && typeof Masonry !== "undefined") {
      const masonry = new Masonry(masonryGrid, {
        itemSelector: ".masonry-item",
        columnWidth: ".masonry-sizer",
        percentPosition: true,
      });

      // Reload masonry after images load
      imagesLoaded(masonryGrid).on("progress", () => {
        masonry.layout();
      });
    }
  }

  function scrolltop() {
    const scrollTopButton = $(".scroll-top-button");
    if (scrollTopButton.length === 0) {
      return;
    }

    addEventSingle(window, "scroll", function () {
      if (window.pageYOffset > 300) {
        scrollTopButton.forEach((btn) => {
          btn.style.opacity = "1";
          btn.style.visibility = "visible";
        });
      } else {
        scrollTopButton.forEach((btn) => {
          btn.style.opacity = "0";
          btn.style.visibility = "hidden";
        });
      }
    });

    addEventMultiple(scrollTopButton, "click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  function tabFunction() {
    const tabButtons = $(".tab-button");
    const tabContents = $(".tab-content");

    addEventMultiple(tabButtons, "click", function () {
      const target = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and target content
      this.classList.add("active");
      const targetContent = $single(`[data-content="${target}"]`);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  }

  // Infinite Scroll Pagination for Ghost (Blog and Tag pages)
  function initInfiniteScroll() {
    const postsContainer = document.querySelector(".posts");
    const loadMoreBtn = document.querySelector(".js-load-posts");

    if (!postsContainer || !loadMoreBtn) {
      console.log("❌ Infinite scroll not initialized - missing elements");
      return;
    }

    console.log("✅ Infinite scroll initialized successfully!");
    console.log("📍 Current page:", window.location.pathname);

    // Hide the button initially
    loadMoreBtn.style.display = "none";

    // Create intersection observer for infinite scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMorePosts();
          }
        });
      },
      {
        rootMargin: "100px",
      },
    );

    // Create a sentinel element at the bottom
    const sentinel = document.createElement("div");
    sentinel.style.height = "20px";
    postsContainer.appendChild(sentinel);
    observer.observe(sentinel);

    let isLoading = false;
    let currentPage = 1;

    // Get pagination info from the page
    const paginationInfo = window.blogPagination || {};
    const totalPages = paginationInfo.totalPages || 1;
    const totalPosts = paginationInfo.totalPosts || 0;
    const postsPerPage = paginationInfo.postsPerPage || 18;

    console.log(
      `📊 Pagination: Page ${currentPage} of ${totalPages} (${totalPosts} total posts)`,
    );

    async function loadMorePosts() {
      if (isLoading || currentPage >= totalPages) return;

      isLoading = true;
      currentPage++;

      try {
        // Construct URL based on current page type (blog or tag)
        let nextUrl;
        const currentPath = window.location.pathname;

        if (currentPath.includes("/tag/")) {
          // Tag page
          const tagSlug = currentPath.split("/tag/")[1].split("/")[0];
          nextUrl = `/tag/${tagSlug}/page/${currentPage}/`;
        } else {
          // Blog page
          nextUrl = `/blog/page/${currentPage}/`;
        }

        console.log("🌐 Loading from:", nextUrl);

        const response = await fetch(nextUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const newPosts = doc.querySelectorAll(".postitem");
        console.log(`📝 Found ${newPosts.length} new posts`);

        if (newPosts.length > 0) {
          newPosts.forEach((post) => {
            postsContainer.insertBefore(post.cloneNode(true), sentinel);
          });

          // Update sentinel position
          observer.unobserve(sentinel);
          postsContainer.appendChild(sentinel);
          observer.observe(sentinel);

          // Show progress
          const loadedPosts = currentPage * postsPerPage;
          const remaining = totalPosts - loadedPosts;
          console.log(
            ` Progress: ${loadedPosts}/${totalPosts} posts loaded (${remaining} remaining)`,
          );
        }

        if (currentPage >= totalPages) {
          console.log(" Reached last page, cleaning up...");
          sentinel.remove();
          observer.disconnect();
        }
      } catch (error) {
        console.error("❌ Error loading posts:", error);
        currentPage--; // Reset on error
      } finally {
        isLoading = false;
      }
    }
  }

  // Move TOC inline after first paragraph
  function moveInlineTOC() {
    const tocContainer = $single('#inline-toc-container');
    const contentArea = $single('.gh-content');

    if (tocContainer && contentArea) {
      // Check if there are any headings in the content
      const headings = contentArea.querySelectorAll('h1, h2, h3, h4, h5, h6');

      if (headings.length === 0) {
        // No headings found, keep TOC hidden
        tocContainer.style.display = 'none';
        return;
      }

      // Find the first paragraph in the content
      const firstParagraph = contentArea.querySelector('p');

      if (firstParagraph) {
        // Show the TOC container
        tocContainer.classList.remove('hidden');
        tocContainer.style.display = 'block';

        // Move TOC after the first paragraph
        firstParagraph.parentNode.insertBefore(tocContainer, firstParagraph.nextSibling);

        // Initialize tocbot for the inline TOC
        if (typeof tocbot !== 'undefined') {
          tocbot.init({
            tocSelector: '#inline-toc-container .gh-toc',
            contentSelector: '.gh-content',
            headingSelector: 'h1, h2, h3, h4, h5, h6',
            hasInnerContainers: true,
            linkClass: 'toc-link',
            activeLinkClass: 'is-active-link',
            listClass: 'toc-list',
            isCollapsedClass: 'is-collapsed',
            collapsibleClass: 'is-collapsible',
            scrollSmooth: true,
            scrollSmoothDuration: 420,
            headingsOffset: 60,
            throttleTimeout: 50
          });
        }
      } else {
        // No first paragraph found, hide TOC
        tocContainer.style.display = 'none';
      }
    }
  }

  // 10. Typewriter Effect
  function typewriterEffect() {
    const elements = $(".typewriter-text");
    if (!elements || elements.length === 0) return;

    elements.forEach((el) => {
      const text = el.textContent.trim();

      // Fix height to prevent layout shift
      const parent = el.parentElement;
      if (parent) {
        parent.style.minHeight = parent.offsetHeight + 'px';
      }

      el.textContent = "";

      let i = 0;
      const speed = 30; // Typing speed in ms

      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          // Optional: Remove min-height after typing to allow resizing
          if (parent) parent.style.minHeight = '';
        }
      }

      // Use IntersectionObserver to start typing when in view
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              type();
              observer.unobserve(el); // Only type once
            }
          });
        }, { threshold: 0.1 });

        observer.observe(el);
      } else {
        // Fallback for browsers without IntersectionObserver
        type();
      }
    });
  }

  // Initialize all functionality when DOM is ready
  ready(function () {
    preloader();
    mobileToggle();
    aosAnimation();
    currentDate();
    magnificPopup();
    infiniteScroll();
    masonryGrid();
    scrolltop();
    tabFunction();
    moveInlineTOC(); // Add TOC positioning
    typewriterEffect(); // Initialize typewriter effect

    // Initialize infinite scroll pagination if we're on a page with posts
    if (document.querySelector(".posts")) {
      initInfiniteScroll();
    }
  });
})();
