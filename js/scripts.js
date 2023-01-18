(function ($) {

  if (typeof Drupal != 'undefined') {
    Drupal.behaviors.funnel = {
      attach: function (context, settings) {
        init();
      },

      completedCallback: function () {
        // Do nothing. But it's here in case other modules/themes want to override it.
      }
    }
  }

  $(function () {
    if (typeof Drupal == 'undefined') {
      init();
    }
  });

  $(window).load(function() {

  });

  function init() {
    initShowModal();
    initElmsAnimation();
    initMobileNav();
    // $('body:not(.front) .section-our-work .item .img').canvasHover();
    initSlider();
    slickSliderTeam();
  }

  function  slickSliderTeam() {
    var $body = $('body');

    if ($body.hasClass('slickSliderActive')) return;
    $body.addClass('slickSliderActive');

    var $wrap = $('.b-slider');
    if (!$wrap.length) return;

    $wrap.slick({
      dots: false,
      infinite: true,
      arrows: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: '<button type="button" class="slick-prev"><span></span></button>',
      nextArrow: '<button type="button" class="slick-next"><span></span></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  function initSlider() {
    var $wrapper = $('.section-image');

    if(!$wrapper.length || $wrapper.hasClass('processed')) return;

    $wrapper.addClass('processed');

    var $nav = $wrapper.find('.nav li');
    var $content = $wrapper.find('.slider li');
    var current = 0;
    var speed = 5000;
    var interval;

    setActive(current);

    $nav.find('a').on('click', function(e) {
      e.preventDefault();
      setActive($(this).parent().index());
      clearInterval(interval);
    });

    function setActive(index) {
      $nav.removeClass('active').eq(index).addClass('active');
      $content.removeClass('active').eq(index).addClass('active');
    }

    interval = setInterval(function() {
      if(current < $nav.length - 1) {
        current++;
      } else {
        current = 0;
      }

      setActive(current);
    }, speed);
  }

  function initMobileNav() {
    var $navWrapper = $('.nav');

    if(!$navWrapper.length) return;

    var $btn = $navWrapper.find('.btn-nav');

    $btn.on('click touch', checkNav);

    $('html').on('click touch', function (e) {
      if (!$(e.target).closest($navWrapper).length && $navWrapper.hasClass('nav-active')) {
        $navWrapper.removeClass('nav-active');
      }
    });

    function checkNav(e) {
      e.preventDefault();
      $navWrapper.toggleClass('nav-active');
    }
  }

  function initElmsAnimation() {
    window.sr = ScrollReveal();

    //section slogan
    sr.reveal('.section-slogan h1 strong', {
      duration: 1000,
      opacity: 0,
      scale: 0,
      origin: 'right',
      easing: 'ease-in-out',
      distance: '50px',
    }, 800);

    sr.reveal('.section-slogan h2', {
      duration: 600,
      opacity: 0,
      scale: 0,
      distance: '0',
      easing: 'ease-in-out',
      delay: 2100,
      afterReveal: function() {
        document.querySelector('.front .site-header .logo').classList.add('show');
        document.querySelector('.front .site-header .btn-nav').classList.add('show');
      }
    });

    sr.reveal('.section-slogan .sub-title', {
      duration: 600,
      opacity: 0,
      scale: 0,
      distance: '0',
      easing: 'ease-in-out',
      delay: 900,
    });

    //section work
    sr.reveal('.section-our-work .item', {
      duration: 800,
      opacity: 0,
      scale: 0,
      distance: 0,
    });

    sr.reveal('.section-team', {
      delay: 800,
      duration: 1500,
      opacity: 0,
      scale: 0,
      distance: 0,
      easing: 'ease',
    });

    sr.reveal('.section-grid.style-a .item', {
      duration: 800,
      opacity: 0,
      scale: 0,
      distance: 0,
    });

    //sr.reveal('.section-grid.style-a h2,.section-grid.style-a .text, .section-grid.style-a .btn-wrap ', {
    //  duration: 1200,
    //  opacity: 0,
    //  scale: 0,
    //  distance: "30px",
    //  origin: "top",
    //  easing: 'ease',
    //}, 500);

    sr.reveal('.section-image .nav li', {
      duration: 800,
      opacity: 0,
      scale: 0,
      distance: 0,
    }, 200);

    //section creative
    sr.reveal('.section-text .ico', {
      duration: 1000,
      opacity: 0,
      scale: 0,
      origin: 'bottom',
      distance: '10px',
    }, 200);

    sr.reveal('.section-text .title', {
      duration: 1000,
      opacity: 0,
      scale: 0,
      origin: 'bottom',
      distance: '10px',
    }, 200);

    sr.reveal('.section-image .inner', {
      duration: 1000,
      opacity: 0,
      scale: 0,
      origin: 'bottom',
      distance: '20px',
    }, 200);

    sr.reveal('.section-cols .col', {
      duration: 1000,
      opacity: 0,
      scale: 0,
      origin: 'bottom',
      distance: '20px',
    }, 200);

    sr.reveal('.site-footer .col', {
      duration: 1000,
      opacity: 0,
      scale: 0,
      origin: 'bottom',
      distance: '20px',
    }, 200);

    sr.reveal('.section-text.style-b h2', {
      duration: 1000,
      opacity: 0,
      scale: 0,
      origin: 'bottom',
      distance: '20px',
      easing: 'ease',
    });

    window.scrollTo(0,1);
  }

  function initShowModal() {
    checkHash(window.location.hash);

    $(window).on('hashchange', function() {
      checkHash(window.location.hash);
    });

    $('.modal').on('hide.bs.modal', function () {
      window.location.hash = '';
    });

    function checkHash(hash) {
      if(!hash) return;

      var $el = $(hash);

      if($el.hasClass('b-modal')) {
        $el.modal('show');
      }
    }
  }

})(jQuery);


  /* ==============================================
        Smooth Scroll on anchors
    =============================================== */  

    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
                scrollTop: target.offset().top -66
          }, 1000);
          return false;
        }
      }
  });



  