/**
 * Image Lightbox
 * Pure JavaScript image popup viewer for Ghost theme
 */
(function () {
    'use strict';

    class ImageLightbox {
        constructor() {
            this.lightbox = null;
            this.currentIndex = 0;
            this.images = [];
            this.init();
        }

        init() {
            // Create lightbox HTML
            this.createLightbox();

            // Find all images in post content and make them clickable
            this.initImages();

            // Add event listeners
            this.addEventListeners();
        }

        createLightbox() {
            const lightboxHTML = `
        <div id="image-lightbox" class="fixed inset-0 z-[9999] hidden items-center justify-center bg-black/95 backdrop-blur-sm">
          <!-- Close button -->
          <button id="lightbox-close" class="absolute top-4 right-4 z-50 p-3 text-white hover:text-gray-300 transition-colors rounded-full hover:bg-white/10" aria-label="Close lightbox">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Previous button -->
          <button id="lightbox-prev" class="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white hover:text-gray-300 transition-colors rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Previous image">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <!-- Next button -->
          <button id="lightbox-next" class="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white hover:text-gray-300 transition-colors rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Next image">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <!-- Image container -->
          <div class="relative w-full h-full flex items-center justify-center p-4">
            <img id="lightbox-image" src="" alt="" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fadeIn" />
            
            <!-- Loading spinner -->
            <div id="lightbox-loading" class="absolute inset-0 flex items-center justify-center">
              <div class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          </div>

          <!-- Image counter -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm backdrop-blur">
            <span id="lightbox-counter"></span>
          </div>

          <!-- Image caption -->
          <div id="lightbox-caption" class="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-2xl px-6 py-3 bg-black/70 text-white text-center rounded-lg backdrop-blur text-sm hidden"></div>
        </div>
      `;

            // Append to body
            document.body.insertAdjacentHTML('beforeend', lightboxHTML);

            // Get references
            this.lightbox = document.getElementById('image-lightbox');
            this.lightboxImage = document.getElementById('lightbox-image');
            this.lightboxLoading = document.getElementById('lightbox-loading');
            this.lightboxCounter = document.getElementById('lightbox-counter');
            this.lightboxCaption = document.getElementById('lightbox-caption');
            this.closeBtn = document.getElementById('lightbox-close');
            this.prevBtn = document.getElementById('lightbox-prev');
            this.nextBtn = document.getElementById('lightbox-next');
        }

        initImages() {
            // Find all images in post content (not in header, footer, sidebar)
            const contentSelectors = [
                '.gh-content img',
                '.post-content img',
                '.entry-content img',
                'article img'
            ];

            const allImages = [];
            contentSelectors.forEach(selector => {
                const imgs = document.querySelectorAll(selector);
                imgs.forEach(img => {
                    // Skip if already in array or if it's a small icon/avatar
                    if (!allImages.includes(img) && img.naturalWidth > 200 && img.naturalHeight > 200) {
                        allImages.push(img);
                    }
                });
            });

            // Store images and add click handlers
            this.images = allImages.map((img, index) => {
                const data = {
                    src: img.src,
                    alt: img.alt || '',
                    title: img.title || '',
                    index: index
                };

                // Make image clickable
                img.style.cursor = 'pointer';
                img.classList.add('lightbox-trigger');

                // Add click handler
                img.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open(index);
                });

                // Add hover effect
                img.addEventListener('mouseenter', () => {
                    img.style.opacity = '0.85';
                    img.style.transition = 'opacity 0.3s ease';
                });

                img.addEventListener('mouseleave', () => {
                    img.style.opacity = '1';
                });

                return data;
            });

            console.log(`🖼️  Image Lightbox: Found ${this.images.length} images`);
        }

        addEventListeners() {
            // Close button
            this.closeBtn.addEventListener('click', () => this.close());

            // Navigation buttons
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('hidden')) {
                    if (e.key === 'Escape') this.close();
                    if (e.key === 'ArrowLeft') this.prev();
                    if (e.key === 'ArrowRight') this.next();
                }
            });

            // Click outside image to close
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.close();
                }
            });

            // Prevent scrolling when lightbox is open
            this.lightbox.addEventListener('wheel', (e) => {
                e.preventDefault();
            }, { passive: false });
        }

        open(index) {
            this.currentIndex = index;
            this.show();
            this.loadImage();
            this.updateCounter();
            this.updateNavButtons();

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        close() {
            this.lightbox.classList.add('hidden');
            this.lightbox.classList.remove('flex');

            // Re-enable body scroll
            document.body.style.overflow = '';
        }

        show() {
            this.lightbox.classList.remove('hidden');
            this.lightbox.classList.add('flex');
        }

        loadImage() {
            const imageData = this.images[this.currentIndex];

            // Show loading
            this.lightboxLoading.classList.remove('hidden');
            this.lightboxImage.style.opacity = '0';

            // Create new image to preload
            const img = new Image();

            img.onload = () => {
                this.lightboxImage.src = imageData.src;
                this.lightboxImage.alt = imageData.alt;

                // Update caption
                if (imageData.alt || imageData.title) {
                    this.lightboxCaption.textContent = imageData.alt || imageData.title;
                    this.lightboxCaption.classList.remove('hidden');
                } else {
                    this.lightboxCaption.classList.add('hidden');
                }

                // Hide loading, show image
                this.lightboxLoading.classList.add('hidden');
                this.lightboxImage.style.opacity = '1';
            };

            img.onerror = () => {
                console.error('Failed to load image:', imageData.src);
                this.lightboxLoading.classList.add('hidden');
                this.lightboxCaption.textContent = 'Failed to load image';
                this.lightboxCaption.classList.remove('hidden');
            };

            img.src = imageData.src;
        }

        prev() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.loadImage();
                this.updateCounter();
                this.updateNavButtons();
            }
        }

        next() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++;
                this.loadImage();
                this.updateCounter();
                this.updateNavButtons();
            }
        }

        updateCounter() {
            if (this.images.length > 1) {
                this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
            } else {
                this.lightboxCounter.textContent = '';
            }
        }

        updateNavButtons() {
            // Disable/enable navigation buttons
            this.prevBtn.disabled = this.currentIndex === 0;
            this.nextBtn.disabled = this.currentIndex === this.images.length - 1;

            // Hide buttons if only one image
            if (this.images.length <= 1) {
                this.prevBtn.style.display = 'none';
                this.nextBtn.style.display = 'none';
            } else {
                this.prevBtn.style.display = 'block';
                this.nextBtn.style.display = 'block';
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new ImageLightbox();
        });
    } else {
        new ImageLightbox();
    }
})();
