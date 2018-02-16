

$(document).ready(function() {


    $('#captcha').on('input', function(){
        var is_five= $('#captcha').val();
        if((is_five != 5) || (is_five.length == 0)){$('#captcha').addClass("invalid");$('#error').text('No gifs for you.');$('#yo').addClass("jacksons_captcha"); }
        else{$('#captcha').removeClass("invalid");$('#yo').removeClass("jacksons_captcha");$('#error').text('');$("#form-gif-request").submit(fetchAndDisplayGif);}
    });

    
});

function fetchAndDisplayGif(event) {
    
    event.preventDefault();

    // get the user's input text from the DOM
    var searchQuery = $('#gif-request').val(); 
    var jacksonQuery = "Jackson 5 " + searchQuery;// TODO should be e.g. "dance"
    

    // configure a few parameters to attach to our request
    var params = { 
        api_key: "dc6zaTOxFJmzC", 
        tag : jacksonQuery, // TODO should be e.g. "jackson 5 dance"
    };
    
    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random?", //+ jacksonQuery, // TODO where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.
            
            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(response);

            $("#gif").attr('src' ,response.data.image_url);
            setGifLoadedStatus(true);

            
        },
        error: function() {
           
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
    
    
    $("#feedback").text("Loading...");
    setGifLoadedStatus(false);
    //$("#feedback").removeAttr("hidden");
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}