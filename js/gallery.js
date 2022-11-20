$(document).ready(function(){
    $(".button").click(function(){
        var name = $(this).attr("data-filter");
        if(name == "ux-ui"){
            $(".filter").filter("."+name).show("2000")
        }else{
            $(".filter").not("."+name).hide("2000");
            $(".filter").filter("."+name).show("2000");
        }
    });
    $(".navigation a").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
});