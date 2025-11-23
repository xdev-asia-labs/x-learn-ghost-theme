/**
 * Dropdown Navigation System for Ghost CMS
 * Reusable across any Ghost theme
 *
 * Features:
 * - Automatic dropdown detection based on minus sign (-) prefix
 * - Desktop: Hover-based dropdowns with smooth animations
 * - Mobile: Tap-to-expand collapsible sections
 * - No flashing - smooth fade-in effects
 * - Responsive design with Tailwind CSS
 *
 * Usage:
 * 1. Include this file in your theme
 * 2. Use the partial: {{> dropdown-navigation navigation=navigation isMobile=false}}
 * 3. Or call manually: DropdownNavigation.init()
 */

(function () {
  "use strict";

  // Configuration
  const config = {
    selectors: {
      desktopNav: "#desktop-nav",
      mobileNav: "#mobile-nav",
      subItemPrefix: "-",
    },
    timing: {
      dropdownDelay: 100,
      fadeInDelay: 200,
      transitionDuration: 300,
    },
    classes: {
      dropdown: "dropdown-menu",
      dropdownItem: "dropdown-item",
      expanded: "expanded",
      hidden: "hidden",
    },
  };

  // Utility functions
  const utils = {
    hasDropdown: (navigationData, currentIndex) => {
      let nextIndex = currentIndex + 1;
      while (
        nextIndex < navigationData.length &&
        navigationData[nextIndex].label.startsWith(
          config.selectors.subItemPrefix,
        )
      ) {
        nextIndex++;
      }
      return nextIndex > currentIndex + 1;
    },

    getSubItems: (navigationData, currentIndex) => {
      const subItems = [];
      let nextIndex = currentIndex + 1;

      // Look ahead to find consecutive items that start with minus
      while (
        nextIndex < navigationData.length &&
        navigationData[nextIndex].label.startsWith(
          config.selectors.subItemPrefix,
        )
      ) {
        subItems.push(navigationData[nextIndex]);
        nextIndex++;
      }

      return subItems;
    },

    createDropdownMenu: (subItems, isMobile = false) => {
      if (isMobile) {
        return utils.createMobileDropdown(subItems);
      } else {
        return utils.createDesktopDropdown(subItems);
      }
    },

    createDesktopDropdown: (subItems) => {
      const dropdown = document.createElement("div");
      dropdown.className = `${config.classes.dropdown} absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-${config.timing.transitionDuration} transform origin-top scale-95 group-hover:scale-100 z-90 backdrop-blur-sm`;

      // Add fixed dimensions to prevent layout shift
      dropdown.style.minWidth = "12rem"; // 192px
      dropdown.style.minHeight = "8rem"; // 128px

      // Add skeleton loading state
      dropdown.innerHTML = `
        <div class="rounded-xl p-2">
          <!-- Skeleton loader -->
          <div class="dropdown-skeleton space-y-2">
            <div class="h-8 bg-gray-100 rounded animate-pulse"></div>
            <div class="h-8 bg-gray-100 rounded animate-pulse"></div>
          </div>
          
          <!-- Actual content (initially hidden) -->
          <div class="dropdown-content opacity-0 transition-opacity duration-300">
            ${subItems
          .map(
            (subItem) => `
              <a href="${subItem.url}" class="${config.classes.dropdownItem
              } block px-4 py-2 text-sm text-gray-800 hover:text-blue-800 transition-all duration-200">
                ${subItem.label.replace(
                new RegExp(`^${config.selectors.subItemPrefix}\\s*`),
                "",
              )}
              </a>
            `,
          )
          .join("")}
          </div>
        </div>
      `;

      // Show content after a brief delay
      setTimeout(() => {
        const skeleton = dropdown.querySelector(".dropdown-skeleton");
        const content = dropdown.querySelector(".dropdown-content");
        if (skeleton && content) {
          skeleton.style.display = "none";
          content.style.opacity = "1";
        }
      }, 150);

      return dropdown;
    },

    createMobileDropdown: (subItems) => {
      const container = document.createElement("div");
      container.className = "mobile-dropdown-container";

      const subItemsContainer = document.createElement("div");
      subItemsContainer.className = `${config.classes.hidden} bg-gray-50 rounded-lg mx-2 mb-2`;
      subItemsContainer.innerHTML = `
        <div class="py-2">
          ${subItems
          .map(
            (subItem) => `
            <a href="${subItem.url
              }" class="block px-6 py-2 text-sm text-gray-800 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200">
              ${subItem.label.replace(
                new RegExp(`^${config.selectors.subItemPrefix}\\s*`),
                "",
              )}
            </a>
          `,
          )
          .join("")}
        </div>
      `;

      container.appendChild(subItemsContainer);
      return container;
    },
  };

  // Desktop dropdown functionality
  const desktopDropdowns = {
    init: function () {
      this.createDropdowns();
      this.fadeInNavigation();
    },

    createDropdowns: function () {
      const navItems = document.querySelectorAll(
        `${config.selectors.desktopNav} li`,
      );
      const navigationData = [];

      // Collect navigation data
      navItems.forEach((item, index) => {
        // Try to find either an <a> tag or <button> tag
        let link = item.querySelector("a");
        let label, url;

        if (link) {
          // Found an <a> tag
          label = link.textContent.trim();
          url = link.href;
        } else {
          // Try to find a <button> tag
          const button = item.querySelector("button");
          if (button) {
            label = button.textContent.trim();
            url = "#"; // Buttons don't have href, use placeholder
          } else {
            // Fallback: get text from the li element
            label = item.textContent.trim();
            url = "#";
          }
        }

        // Include ALL items in navigationData for processing
        if (label) {
          navigationData.push({ label, url, index, element: item });
          console.log(`Added to navigation: ${label} (index: ${index})`);
        }
      });

      // Process each navigation item
      navigationData.forEach((item, index) => {
        // Check if this item has sub-items (next items start with minus)
        const subItems = utils.getSubItems(navigationData, index);

        if (subItems.length > 0) {
          console.log(
            `Creating dropdown for: ${item.label} with ${subItems.length} sub-items`,
          );
          this.createDropdownForItem(item, subItems, navItems);
        } else {
          // Check if this item is a sub-item (starts with minus)
          if (item.label.startsWith(config.selectors.subItemPrefix)) {
            console.log(`Removing sub-item: ${item.label}`);
            // Completely remove sub-items from the DOM
            if (item.element) {
              item.element.remove(); // Use remove() instead of style.display = 'none'
            }
          }
        }
      });
    },

    createDropdownForItem: function (item, subItems, navItems) {
      const navItem = navItems[item.index];
      let link = navItem.querySelector("a");
      let button = navItem.querySelector("button");

      // If no link or button found, skip this item
      if (!link && !button) {
        console.warn(`No link or button found for item: ${item.label}`);
        return;
      }

      // Ensure the parent li has the 'group' class for hover effects
      if (!navItem.classList.contains("group")) {
        navItem.classList.add("group");
      }

      // Create new button with dropdown
      const newButton = document.createElement("button");

      // Copy classes from existing element (link or button) and ensure proper flex layout
      const existingElement = link || button;
      newButton.className =
        existingElement.className.replace("flex items-center", "") +
        " flex items-center justify-between w-full";

      newButton.innerHTML = `
        <span>${item.label}</span>
        <svg class="w-4 h-4 ml-2 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      `;

      // Create and add dropdown
      const dropdown = utils.createDropdownMenu(subItems, false);

      // Replace the existing element with new button
      if (link) {
        navItem.replaceChild(newButton, link);
      } else if (button) {
        navItem.replaceChild(newButton, button);
      }

      navItem.appendChild(dropdown);

      // Remove sub-items completely instead of hiding them
      subItems.forEach((subItem) => {
        if (subItem.element) {
          subItem.element.remove(); // Use remove() instead of style.display = 'none'
        }
      });
    },

    fadeInNavigation: function () {
      // Use immediate removal without requestAnimationFrame to ensure it happens
      const desktopNav = document.querySelector(config.selectors.desktopNav);
      if (desktopNav) {
        desktopNav.classList.remove("invisible");
        desktopNav.classList.add("visible");
        console.log("Desktop nav made visible");
      } else {
        console.warn("Desktop nav not found");
      }
    },
  };

  // Mobile dropdown functionality
  const mobileDropdowns = {
    init: function () {
      this.createDropdowns();
    },

    createDropdowns: function () {
      const navItems = document.querySelectorAll(
        `${config.selectors.mobileNav} li`,
      );
      const navigationData = [];

      // Collect navigation data
      navItems.forEach((item, index) => {
        const link = item.querySelector("a");
        if (link) {
          const label = link.textContent.trim();
          const url = link.href;
          navigationData.push({ label, url, index, element: item });
        }
      });

      // Process each navigation item
      navigationData.forEach((item, index) => {
        if (!item.label.startsWith(config.selectors.subItemPrefix)) {
          const subItems = utils.getSubItems(navigationData, index);

          if (subItems.length > 0) {
            this.createDropdownForItem(item, subItems, navItems);
          }
        }
      });
    },

    createDropdownForItem: function (item, subItems, navItems) {
      const navItem = navItems[item.index];
      let link = navItem.querySelector("a");
      let button = navItem.querySelector("button");

      // If no link or button found, skip this item
      if (!link && !button) {
        console.warn(`No link or button found for item: ${item.label}`);
        return;
      }

      // Create new button with dropdown arrow
      const newButton = document.createElement("button");

      // Copy classes from existing element (link or button)
      const existingElement = link || button;
      newButton.className =
        existingElement.className + " flex items-center justify-between w-full";

      newButton.innerHTML = `
        <span>${item.label}</span>
        <svg class="w-4 h-4 ml-2 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      `;

      // Create and add dropdown
      const dropdownContainer = utils.createMobileDropdown(subItems);
      const dropdown = dropdownContainer.querySelector(
        ".mobile-dropdown-container > div",
      );

      // Add click event to toggle dropdown
      newButton.addEventListener("click", function (e) {
        e.preventDefault();
        const isExpanded = !dropdown.classList.contains(config.classes.hidden);
        const arrow = newButton.querySelector("svg");

        if (isExpanded) {
          dropdown.classList.add(config.classes.hidden);
          arrow.style.transform = "rotate(0deg)";
        } else {
          dropdown.classList.remove(config.classes.hidden);
          arrow.style.transform = "rotate(180deg)";
        }
      });

      // Replace the existing element with new button
      if (link) {
        navItem.replaceChild(newButton, link);
      } else if (button) {
        navItem.replaceChild(newButton, button);
      }

      navItem.appendChild(dropdownContainer);

      // Remove sub-items completely instead of hiding them
      subItems.forEach((subItem) => {
        if (subItem.element) {
          subItem.element.remove(); // Use remove() instead of style.display = 'none'
        }
      });
    },
  };

  // Initialize when DOM is ready
  function init() {
    console.log("Dropdown Navigation: Initializing...");

    // Remove sub-items immediately to prevent flashing
    const allNavItems = document.querySelectorAll("a[href]");
    allNavItems.forEach((link) => {
      if (link.textContent.trim().startsWith(config.selectors.subItemPrefix)) {
        const parentLi = link.closest("li");
        if (parentLi) {
          parentLi.remove(); // Use remove() instead of style.display = 'none'
        }
      }
    });

    // Initialize dropdowns immediately without delay
    if (document.readyState === "loading") {
      console.log("Dropdown Navigation: DOM still loading, waiting...");
      document.addEventListener("DOMContentLoaded", function () {
        console.log(
          "Dropdown Navigation: DOM loaded, initializing dropdowns...",
        );
        // Initialize immediately on DOM ready
        desktopDropdowns.init();
        mobileDropdowns.init();
      });
    } else {
      console.log("Dropdown Navigation: DOM ready, initializing dropdowns...");
      // Initialize immediately if DOM is already ready
      desktopDropdowns.init();
      mobileDropdowns.init();
    }
  }

  // Auto-initialize
  init();

  // Export for external use
  window.DropdownNavigation = {
    init: init,
    config: config,
    utils: utils,
    desktop: desktopDropdowns,
    mobile: mobileDropdowns,
  };
})();
