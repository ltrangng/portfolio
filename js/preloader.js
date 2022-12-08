
$(window).load(function(){
    "use strict";
    

    /* ==============================================
    Preloader
    =============================================== */

    // will first fade out the loading animation
    $("#loading-animation").fadeOut();
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(600).fadeOut("slow");

});