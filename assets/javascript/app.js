// Javascript for Nav bar 
$(document).ready(function() {	
    $(".menu-trigger").click(function() {
        $(".nav-menu").slideToggle(400, function() {
            $(this).toggleClass("nav-expanded").css('display', '');
        }); 
    });  
}); 