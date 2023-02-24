/*
	Salient by TEMPLATE STOCK
	templatestock.co @templatestock
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

var $ = jQuery.noConflict();

$(document).ready(function($) {
    "use strict";

    /* global google: false */

    /* ==============================================
        Full height home-section
    =============================================== */
    
	var windowHeight = $(window).height(),
		topSection = $('#hero-section');
	topSection.css('height', windowHeight);

	$(window).resize(function(){
		var windowHeight = $(window).height();
		topSection.css('height', windowHeight);       
	});

    /* ==============================================
        Collapse menu on click
    =============================================== */

        $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
            if($(window).width() < 768 )
                $('.navbar-collapse').collapse('hide');
        });

    /* ==============================================
        Scrollspy
    =============================================== */

        $('body').scrollspy({
           target: '#navigation-nav',
           offset: 140      //px/
        });

    /* ==============================================
        Parallax
    =============================================== */
    
    $.stellar({
        responsive: true,
        horizontalScrolling: false,
        verticalOffset: 0
    });

    /* ==============================================
        Hero slider
    =============================================== */

    $('.caption-slides').bxSlider({
      pager: false,
      mode: 'fade',
      adaptiveHeight: true,
      controls: false,
      auto: true
    });

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

    /* ==============================================
     Bootstrap Tooltip
    =============================================== */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /* ==============================================
        Counter increment
    =============================================== */

    function countUp() {   
        var dataperc;   
        $('.statistic-percent').each(function(){
            dataperc = $(this).attr('data-perc'),
            $(this).find('.percentfactor').delay(6000).countTo({
                from: 0,                 // number to begin counting
                to: dataperc,      
                speed: 1000,             // ms
                refreshInterval: 10,
            });  
        });
    }
        
    $('.statistic-percent').waypoint(function() {
        countUp();
    },
    {
        offset: '95%',                 
        triggerOnce: true
    });

    /* ==============================================
        Skills bar
    =============================================== */

        $('.progress-bar').each(function(i) {
            $(this).appear(function() {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({'width' : percent + '%'});
            });
        });

    /* ==============================================
    Placeholder
    =============================================== */ 

    $('input, textarea').placeholder();

    /* ==============================================
        Animated content
    =============================================== */

    $('.animated').appear(function(){
        var el = $(this);
        var anim = el.data('animation');
        var animDelay = el.data('delay');
        if (animDelay) {

            setTimeout(function(){
                el.addClass( anim + " in" );
                el.removeClass('out');
            }, animDelay);

        }

        else {
            el.addClass( anim + " in" );
            el.removeClass('out');
        }    
    },{accY: -150});  
    

    /* ==============================================
        MailChip
    =============================================== */

    $('.mailchimp').ajaxChimp({
        callback: mailchimpCallback,
        url: "http://clas-design.us10.list-manage.com/subscribe/post?u=5ca5eb87ff7cef4f18d05e127&amp;id=9c23c46672" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
    });

    function mailchimpCallback(resp) {
         if (resp.result === 'success') {
            $('.subscription-success').html('<span class="icon-happy"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);
        
        } else if(resp.result === 'error') {
            $('.subscription-error').html('<span class="icon-sad"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-success').fadeOut(500);
        }  
    }


    /* ==============================================
    Fade In .back-to-top
    =============================================== */

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0,
            easing: 'swing'
        }, 750);
        return false;
    });



    /* ==============================================
     BX-Project Slider
    =============================================== */

        $(".project-slider").bxSlider({
            pager: false,
            controls: true,
            auto: true,        // Boolean:  (true/false)
            speed: 500,        // Animation speed.
            pause: 5000,      // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
            useCSS: false     // Boolean:  (true/false)
        });

    /* ==============================================
     BX-Project Slider
    =============================================== */

        $(".blog-slider").bxSlider({
            pager: false,
            controls: true,
            auto: true,        // Boolean:  (true/false)
            speed: 500,        // Animation speed.
            pause: 5000,      // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
            useCSS: false     // Boolean:  (true/false)
        });

    /* ==============================================
     BX-Slider Tweet&Process
    =============================================== */


        $('.tweet-slider').bxSlider({
          adaptiveHeight: true,
          controls: false,
          auto: true
        });

    /* ==============================================
        BxSlider Testimonial
    =============================================== */ 

    $(".testimonials-slider").bxSlider({
        nextSelector: ".tc-arrows .tc-arrow-right",
        prevSelector: ".tc-arrows .tc-arrow-left",
        nextText: "<i class='fa fa-angle-right'></i>",
        prevText: "<i class='fa fa-angle-left'></i>",
        pager: false,
        auto: true,          // Boolean:  (true/false)
        pause: 5000,         // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
        mode: 'vertical',    // Choose fade, slide
        useCSS: false        // Boolean:  (true/false)
    });

    /* ==============================================
        OWL Carousel
    =============================================== */

        $(".owl-carousel").owlCarousel({
 
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 4,
            itemsDesktop : [1199,3], //number of items displayed on resolution less then 1199px
            itemsDesktopSmall : [979,3] //number of items displayed on resolution less then 979px
 
        });

    /* ==============================================
        Responsive video
    =============================================== */
    
        $(".project-video, .video-creative, .video-post").fitVids();
        

    /* ==============================================
        MagnificPopup - lightbox effect
    =============================================== */
    
        // Example with multiple objects
        $('.zoom').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        $('.video-pop-up').magnificPopup({
            type: 'iframe',
        });

    /* ==============================================
        OWL Carousel (initialize screenshot carousel)
    =============================================== */
    
    $(".screenshots-carousel").owlCarousel({
 
        autoPlay: 3000, //Set AutoPlay to 3 seconds
 
        items : 5,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]
 
    });

});

$(window).load(function(){
    "use strict";
    
    /* ==============================================
    Isotope
    =============================================== */

        // FIlter
        if( $("#filter").length>0 ) {
            var container = $('#filter');
            container.isotope({
                itemSelector: '.gallery-item',
                transitionDuration: '0.8s'
            });
            $(".filter").click(function(){
                $(".filter.active").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                container.isotope({ 
                    filter: selector
                });
                return false;
            });

            $(window).resize(function(){
                setTimeout(function(){
                    container.isotope();
                },1000);
            }).trigger('resize');
        }


            if ( $('#type-masory').length ) {

            var $container = $('#type-masory');

            $container.imagesLoaded( function(){
              $container.fadeIn(1000).isotope({
                itemSelector : '.masonry-item'
              });
            });
        }


});