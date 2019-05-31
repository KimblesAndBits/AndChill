// Javascript for Nav bar 
$(document).ready(function () {
    $(".menu-trigger").click(function () {
        $(".nav-menu").slideToggle(400, function () {
            $(this).toggleClass("nav-expanded").css('display', '');
        });
    });

    var baseURL = "https://developers.zomato.com/api/v2.1/";
    var cityID = 0;
    var formReady = false;
    var yourMood = "";
    var yourFood = "";
    var yourCity = "";
    var yourState = "";
    var locations = "";
    var foodChoices = "";

    $("choices-form").on("submit", function () {
        event.preventDefault();
    })

    $("#submit-button").on("click", function () {
        checkForm();
        if (formReady) {
            console.log("CLICKED IT!");
            getInfo();
            formReady = false;
            locations = baseURL + "locations?query=" + yourCity + "%2C" + yourState;
            console.log("ready!"),
                $.ajax({
                    type: "GET",
                    beforeSend: function (request) {
                        request.setRequestHeader("user-key", 'fc5e13c945185137ec8e98446ea28a62');
                    },
                    url: locations,
                    success: function (msg) {
                        console.log('mes', msg.location_suggestions[0].entity_id);
                        cityID = msg.location_suggestions[0].entity_id;
                        foodChoices = baseURL + "search?entity_id=" + cityID + "&entity_type=city&radius=5000&cuisines=" + yourFood;
                        console.log("ready!"),
                            $.ajax({
                                type: "GET",
                                beforeSend: function (request) {
                                    request.setRequestHeader("user-key", 'fc5e13c945185137ec8e98446ea28a62');
                                },
                                url: foodChoices,
                                success: function (msg) {
                                    console.log('mes', msg);

                                }
                            });
                    }
                });
        }
    });

    function checkForm() {
        if ($("#moodInput").val() && $("#foodInput").val() && $("#inputCity").val() && $("#inputState").val()) {
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


console.log("Thank you!");


});