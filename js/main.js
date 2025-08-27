(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-white shadow-sm').css('top', '-1px');
        } else {
            $('.sticky-top').removeClass('bg-white shadow-sm').css('top', '-100px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Experience
    $('.experience').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });
    
})(jQuery);

// product machine details js
    document.addEventListener("DOMContentLoaded", function () {
      const mainImage = document.getElementById("mainImage");
      const thumbs = document.querySelectorAll(".thumbs .thumb");

      thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
          // change main image
          const newSrc = thumb.getAttribute("data-full");
          mainImage.src = newSrc;

          // update aria-selected
          thumbs.forEach(t => t.setAttribute("aria-selected", "false"));
          thumb.setAttribute("aria-selected", "true");
        });
      });
    });
// certificate open model js
     document.addEventListener('DOMContentLoaded', function () {
    // Function to open the modal and populate data
    function openCertModal(card) {
        if (!card) return;

        const imgSrc = card.querySelector('.card-img-top').getAttribute('src');
        const title = card.dataset.title || card.querySelector('.cert-title').textContent;
        const issuer = card.querySelector('.cert-meta').textContent;
        const year = card.dataset.year;
        const downloadHref = card.querySelector('.download').getAttribute('href');

        // Populate modal
        document.getElementById('modalImg').src = imgSrc;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalIssuer').textContent = issuer;
        document.getElementById('modalYear').textContent = year;
        document.getElementById('modalDesc').textContent = issuer; // optional
        document.getElementById('modalDownload').href = downloadHref;

        // Show Bootstrap modal
        const modalEl = document.getElementById('certModal');
        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
    }

    // Click on overlay button
    document.querySelectorAll('.view-overlay').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.cert-card');
            openCertModal(card);
        });
    });

    // Click on image
    document.querySelectorAll('.card-img-top').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            const card = this.closest('.cert-card');
            openCertModal(card);
        });
    });
     });

//  company js
    

    $(document).ready(function () {
      var owl = $(".carousel-testimony").owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          1200: { items: 4 }
        }
      });

      // Custom navigation
      $(".btn-next").click(function () {
        owl.trigger('next.owl.carousel');
      });
      $(".btn-prev").click(function () {
        owl.trigger('prev.owl.carousel');
      });
    });

    window.addEventListener("scroll", function () {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
 
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // animate only once
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
 
    (function () {
      const DESKTOP_BP = 992;

      function handleScroll() {
        // Keep your scroll effect for desktop; mobile is already solid.
        if (window.innerWidth >= DESKTOP_BP) {
          const nav = document.querySelector('.navbar');
          if (!nav) return;
          if (window.scrollY > 10) nav.classList.add('scrolled');
          else nav.classList.remove('scrolled');
        }
      }

      function initMobileSubmenus() {
        // Remove existing handlers first (if re-init on resize)
        document.querySelectorAll('.dropdown-submenu > a[data-submenu-bound]').forEach(a => {
          a.replaceWith(a.cloneNode(true));
        });

        if (window.innerWidth >= DESKTOP_BP) return; // desktop unchanged

        // Toggle nested submenus on click
        document.querySelectorAll('.dropdown-submenu > a').forEach(anchor => {
          anchor.setAttribute('data-submenu-bound', '1');
          anchor.addEventListener('click', function (e) {
            // If the anchor has an href that navigates, prevent it so we can toggle
            e.preventDefault();
            e.stopPropagation();

            const submenu = this.nextElementSibling; // the nested .dropdown-menu
            if (!submenu) return;

            // Close any open sibling submenus
            const siblings = this.closest('li').parentElement.querySelectorAll('.dropdown-submenu > .dropdown-menu.show');
            siblings.forEach(s => { if (s !== submenu) s.classList.remove('show'); });

            // Toggle current
            submenu.classList.toggle('show');
          });
        });

        // When a top-level dropdown closes, also close any nested ones inside it
        document.querySelectorAll('.dropdown').forEach(drop => {
          drop.addEventListener('hide.bs.dropdown', () => {
            const openSubs = drop.querySelectorAll('.dropdown-submenu > .dropdown-menu.show');
            openSubs.forEach(s => s.classList.remove('show'));
          });
        });
      }

      // Prevent dropdown from closing when clicking inside on mobile (so users can expand submenus)
      function keepOpenOnInsideClick() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.addEventListener('click', function (e) {
            if (window.innerWidth < DESKTOP_BP) e.stopPropagation();
          });
        });
      }

      // Init on load
      document.addEventListener('DOMContentLoaded', function () {
        handleScroll();
        initMobileSubmenus();
        keepOpenOnInsideClick();
      });

      // Update on scroll/resize
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', function () {
        // Reset any open mobile submenus when crossing breakpoints
        if (window.innerWidth >= DESKTOP_BP) {
          document.querySelectorAll('.dropdown-submenu > .dropdown-menu.show').forEach(s => s.classList.remove('show'));
        }
        handleScroll();
        initMobileSubmenus();
      });
})();
    
// gallery
 document.addEventListener("DOMContentLoaded", function () {
      const filterBtns = document.querySelectorAll(".filter-btn");
      const items = document.querySelectorAll(".gallery-item");

      function filterGallery(filter) {
        items.forEach(item => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.classList.add("show");
          } else {
            item.classList.remove("show");
          }
        });
      }

      // default show all
      filterGallery("all");

      filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
          // remove active class
          filterBtns.forEach(b => b.classList.remove("active"));
          this.classList.add("active");

          // filter items
          let filter = this.getAttribute("data-filter");
          filterGallery(filter);
        });
      });
    });
  

// machine card
