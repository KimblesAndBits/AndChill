// Javascript for Nav bar 
$(document).ready(function() {	
    $(".menu-trigger").click(function() {
        $(".nav-menu").slideToggle(400, function() {
            $(this).toggleClass("nav-expanded").css('display', '');
        }); 
    });
    
    var yourMood = "";
    var yourFood = "";
    var yourCity = "";
    var yourState = "";
    var yourZip = 00000;


    $("#submit-button").on("click", function(){
        event.preventDefault();
        yourMood = $("#moodInput").val();
        yourFood = $("#foodInput").val();
        yourCity = $("#inputCity").val();
        yourState = $("#inputState").val();
        yourZip = $("#inputZip").val();
        console.log(`${yourMood} ${yourFood} ${yourCity} ${yourState} ${yourZip}`)
        $("#moodInput").val("");
        $("#foodInput").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
        $("#inputZip").val("");
    });
}); 