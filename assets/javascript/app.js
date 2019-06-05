// Javascript for Nav bar 
$(document).ready(function () {
    $(".menu-trigger").click(function () {
        $(".nav-menu").slideToggle(400, function () {
            $(this).toggleClass("nav-expanded").css('display', '');
        });
    });
    //variables for both API's
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
    var movieArray = [];
    var foodArray = [];

    $("choices-form").on("submit", function () {
        event.preventDefault();
    })

    //on click for submit button --> ajax requests from API's 
    $("#submit-button").on("click", function () {
        checkForm();
        if (formReady) {
            getInfo();
            formReady = false;
            locations = zomatoUrl + "locations?query=" + yourCity + "%2C" + yourState;
            $.ajax({
                type: "GET",
                beforeSend: function (request) {
                    request.setRequestHeader("user-key", 'fc5e13c945185137ec8e98446ea28a62');
                },
                //pulling the city ID number from user choice
                url: locations,
                success: function (msg) {
                    cityID = msg.location_suggestions[0].entity_id;
                    foodChoices = zomatoUrl + "search?entity_id=" + cityID + "&entity_type=city&radius=25000&q=" + yourFood;
                    //Zomato ajax request
                    $.ajax({
                        type: "GET",
                        beforeSend: function (request) {
                            request.setRequestHeader("user-key", 'fc5e13c945185137ec8e98446ea28a62');
                        },
                        url: foodChoices,
                        success: function (msg) {
                            populateFood(msg.restaurants);
                            foodArray = msg.restaurants;
                        }
                    });
                }
            });
            //TMB ajax request
            $.ajax({
                url: movieUrl + yourMood,
                method: "GET"
            }).then(function (response) {
                populateMovie(response.results);
                movieArray = response.results;
            });

        }
        //clear the entry fields
        resetForm();
    });

    $("#food-reset").on("click", function () {
        if (foodArray) {
            populateFood(foodArray);
        };
    });

    $("#movie-reset").on("click", function () {
        if (movieArray) {
            populateMovie(movieArray);
        };
    });
    //making sure all the forms are filled out before it submits
    function checkForm() {
        if ($("#moodInput").val() && $("#foodInput").val() && $("#inputCity").val() && $("#inputState").val()) {
            formReady = true;
        }
    };
    //grabbing the user inputs and assigning variables
    function getInfo() {
        yourMood = $("#moodInput").val();
        yourFood = $("#foodInput").val();
        yourCity = $("#inputCity").val();
        yourState = $("#inputState").val();
    };
    //pulling data from the API based on user input and randomizing the result so they get a differnt result each time
    function populateFood(array) {
        var arrayIdx = Math.floor(Math.random() * array.length);
        if (array[arrayIdx]) {
            $("#rest-name").html(`<p><span class="sugg-head">Name:</span> ${array[arrayIdx].restaurant.name}</p>`);
            $("#rest-address").html(`<p><span class="sugg-head">Address:</span> ${array[arrayIdx].restaurant.location.address}</p>`);
            $("#rest-price").html(`<p><span class="sugg-head">Average cost for two:</span> $${array[arrayIdx].restaurant.average_cost_for_two}</p>`);
            $("#rest-url").html(`<a href="${array[arrayIdx].restaurant.url}" target="_blank">${array[arrayIdx].restaurant.name}</p>`);
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
        } else {
            $("#rest-name").html(`There are no ${yourFood} restaurants near you!`);
        }
    };
    //clear the values from the form
    function resetForm() {
        $("#moodInput").val("");
        $("#foodInput").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
    }

    //pulling data from the API based on user input and randomizing the result so they get a differnt result each time
    function populateMovie(array) {
        var arrayIdx = Math.floor(Math.random() * array.length);
        $("#movie-name").html(`<p><span class="sugg-head">Name:</span> ${array[arrayIdx].title}</p>`);
        $("#movie-rating").html(`<p><span class="sugg-head">Rating:</span> ${array[arrayIdx].vote_average}</p>`);
        $("#movie-year").html(`<p><span class="sugg-head">Release:</span> ${array[arrayIdx].release_date}</p>`);
        $("#movie-bio").html(`<p><span class="sugg-head">Overview:</span> ${array[arrayIdx].overview}</p>`);
        if (array[arrayIdx].poster_path) {
            $("#movie-pic").attr("src", "https://image.tmdb.org/t/p/w1280" + array[arrayIdx].poster_path);
        } else {
            $("#movie-pic").attr("src", "https://www.quizony.com/favorite-food-quiz/favorite-food-quiz-small.jpg");
        };
        var movieId = array[arrayIdx].id;

        //second ajax so we can input the movie ID number
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=eb7d3ac3ab4b5230cee7db1df74366fd&language=en-US`,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            $("#trailer-embed").html(`<iframe id="trailer" src="https://www.youtube.com/embed/${response.results[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
            $("#trailer").css("position", "absolute");
            $("#trailer").css("top", "0");
            $("#trailer").css("left", "0");
            $("#trailer").css("right", "0");
            $("#trailer").css("bottom", "0");
            $("#trailer").css("height", "100%");
            $("#trailer").css("width", "100%");
        });
    }


});