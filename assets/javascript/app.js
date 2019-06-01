// Javascript for Nav bar 
$(document).ready(function () {
    $(".menu-trigger").click(function () {
        $(".nav-menu").slideToggle(400, function () {
            $(this).toggleClass("nav-expanded").css('display', '');
        });
    });

    var zomatoUrl = "https://developers.zomato.com/api/v2.1/";
    var cityID = 0;
    var formReady = false;
    var yourMood = "";
    var yourFood = "";
    var yourCity = "";
    var yourState = "";
    var locations = "";
    var foodChoices = "";
    var movieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=eb7d3ac3ab4b5230cee7db1df74366fd&language=en-US&region=US&with_genres=";
    var formReady = false;

    $("choices-form").on("submit", function () {
        event.preventDefault();
    })

    $("#submit-button").on("click", function () {
        checkForm();
        if (formReady) {
            console.log("CLICKED IT!");
            getInfo();
            formReady = false;
            locations = zomatoUrl + "locations?query=" + yourCity + "%2C" + yourState;
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
                        foodChoices = zomatoUrl + "search?entity_id=" + cityID + "&entity_type=city&radius=5000&q=" + yourFood;
                        console.log("ready!"),
                            $.ajax({
                                type: "GET",
                                beforeSend: function (request) {
                                    request.setRequestHeader("user-key", 'fc5e13c945185137ec8e98446ea28a62');
                                },
                                url: foodChoices,
                                success: function (msg) {
                                    console.log('mes', msg);
                                    populateFood(msg.restaurants);
                                }
                            });
                    }
                });

                $.ajax({
                    url: movieUrl + yourMood,
                    method: "GET"
                }).then(function(response) {
                    populateMovie(response.results);
                })

        }
        resetForm();
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
    };

    function populateFood(array) {
        var arrayIdx = Math.floor(Math.random() * array.length);
        $("#rest-name").html(`<p><span class="sugg-head">Name:</span> ${array[arrayIdx].restaurant.name}</p>`);
        $("#rest-address").html(`<p><span class="sugg-head">Address:</span> ${array[arrayIdx].restaurant.location.address}</p>`);
        $("#rest-price").html(`<p><span class="sugg-head">Average cost for two:</span> $${array[arrayIdx].restaurant.average_cost_for_two}</p>`);
        $("#rest-url").html(`<a href="${array[arrayIdx].restaurant.url} target="_blank">${array[arrayIdx].restaurant.name}</p>`);
        if (array[arrayIdx].restaurant.thumb) {
            $("#rest-pic").attr("src", array[arrayIdx].restaurant.thumb);
        } else {
            $("#rest-pic").attr("src", "https://www.quizony.com/favorite-food-quiz/favorite-food-quiz-small.jpg");
        };
        if (array[arrayIdx].restaurant.user_rating.aggregate_rating) {
            $("#rest-rating").html(`<p><span class="sugg-head">Rating:</span> ${array[arrayIdx].restaurant.user_rating.aggregate_rating}</p>`);
        } else {
            $("#rest-rating").html(`<p><span class="sugg-head">Rating:</span> Pretty Dang Good!</p>`);
        }
    };

    function resetForm() {
        $("#moodInput").val("");
        $("#foodInput").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
    }

    function populateMovie(array) {
        console.log(array);
        $("#movie-name").text(`Name: ${array[0].title}`);
        $("#movie-genre").text(`Genre: ${array[0]}`);
        $("#movie-rating").text(`Rating: ${array[0]}`);
        $("#movie-year").text(`Release Year: ${array[0]}`);
        $("#movie-director").text(`Director: ${array[0]}`);
    }

    console.log("Thank you!");


});