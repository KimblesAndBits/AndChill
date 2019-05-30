// Javascript for Nav bar 
$(document).ready(function() {	
    $(".menu-trigger").click(function() {
        $(".nav-menu").slideToggle(400, function() {
            $(this).toggleClass("nav-expanded").css('display', '');
        }); 
    });
    
    var formReady = false;
    var yourMood = "";
    var yourFood = "";
    var yourCity = "";
    var yourState = "";

    $("choices-form").on("submit", function() {
        event.preventDefault();
    })

    $("#submit-button").on("click", function(){
        checkForm();
        if(formReady) {
            console.log("CLICKED IT!");
            getInfo();
            formReady = false;
        }
    });

    function checkForm() {
        if($("#moodInput").val() && $("#foodInput").val() && $("#inputCity").val() && $("#inputState").val()) {
            formReady = true;
            console.log("Form Ready!");
        }
    };

    function getInfo() {
        yourMood = $("#moodInput").val();
        yourFood = $("#foodInput").val();
        yourCity = $("#inputCity").val();
        yourState = $("#inputState").val();
        $("#moodInput").val("");
        $("#foodInput").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
    }
}); 