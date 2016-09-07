// @author: Thomas Thompson
// @github: tomtom28
// @comment: HW 6


// Initial array of animals
var animals = ['cat', 'dog', 'hamster', 'goldfish', 'frog', 'snail', 'turtle', 'rabbit', 'monkey', 'skunk', 'bird', 'squirrel', 'hedgehog', 'ferret', 'zebra', 'lion', 'eagle', 'rhino', 'elephant', 'butterfly'];


// -------------------------- Functions  --------------------------
$( document ).ready(function(){

	// Append Intial animal buttons
	renderButtons();

	// Call AJAX function to display animal Giphy on selected animal button
	$(document).on('click', '.animal_button', displayAnimalGif);


	$(document).on('click', '.gif_container', showGifHideImage);

	// ===================================================================

	// Append Animal Buttons to DOM
	function renderButtons(){ 

		// Deletes any previous button to prevent duplicates
		$('#animal_buttons').empty();

		// Loops through the array of animals
		for (var i = 0; i < animals.length; i++){

			// Then dynamicaly generate a button for each animal in the array 
		    var animalButton = $('<button>') 
		    animalButton.addClass('animal_button'); // Added a class 
		    animalButton.attr('data-name', animals[i]); // Added a data-attribute
		    animalButton.text(animals[i]); // Provided the initial button text
		    $('#animal_buttons').append(animalButton); // Added the button to the HTML
		}
	}

	// ===================================================================

	// Add new animals from the user input
	$('#add_animal').on('click', function(){

		// Grab the input from the textbox
		var newAnimal = $('#animal_input').val().trim().toLowerCase();


		// Validate user input
		var isUnique = true;
		for(var i = 0; i < animals.length; i++){
			if(animals[i] == newAnimal){
				isUnique = false;
			}
		}


		// Append new button if the input is unique
		if(newAnimal == ""){
			alert("Sorry. No empty buttons are allowed!")
		}
		else if(isUnique){

			// Add the new animal to the original list
			animals.push(newAnimal);
		
			
			// Add new buttons to the DOM
			renderButtons();

		}
		else{
			alert("You already have a " + newAnimal + " button!")
		}


		// Remove the default features of the Submit Button
		return false;
	})


	// ===================================================================

	// Collect Animal gif from GIPHY and display it to the DOM when the animal button is clicked
	function displayAnimalGif(){

		// Deletes old gifs
		$('#animal_images').empty();

		// Collect animal name data attribute from the button, replacing any spaces
		var animal = $(this).attr('data-name').replace(/ /g, '+');

		// Create the API URL
		var publicKey = "dc6zaTOxFJmzC"; // Public API Key
		var limit = "10"; // Limit API to 10 gifs
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=" + limit + "&api_key=" + publicKey;
		//console.log(queryURL);

		
		// Creates AJAX call for the specific animal button being clicked
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){

			// Loop through the JSON output to collect each Animal Object
			for(var i = 0; i < response.data.length; i++){

				// Collect the animal gif URLs
				var currentStillURL = response.data[i].images.fixed_height_still.url; // still image 
				var currentMovingURL = response.data[i].images.fixed_height.url; // moving image

				// Collect the animal gif Ratings
				var currentRating = response.data[i].rating;

					// Correct for empty rating
					if(currentRating == ""){
						currentRating = "none";
					}


				// Create a Div to house Gif and Rating
				var currentGifDiv = $('<div>');
				currentGifDiv.addClass('gif_container'); // Added a class
				currentGifDiv.attr('data-name', "unclicked"); // Added a Data Attributed for clicked
				
				// Append Rating to current gif
				var currentGifRating = $('<h1>');
				currentGifRating.text("Rating: " + currentRating);
				currentGifDiv.append(currentGifRating);

				// Append Still Image
				var currentGifImage = $('<img>');
				currentGifImage.addClass('still_gif'); // Added a class for still gif
				currentGifImage.attr("src", currentStillURL);
				currentGifDiv.append(currentGifImage);

				// Append Moving Gif Image
				var currentGif = $('<img>')
				currentGif.addClass('moving_gif'); // Added a class for animated gif
				currentGif.attr("src", currentMovingURL);
				currentGif.hide(); // Hide the moving gif
				currentGifDiv.append(currentGif);

				// Append current Div to the DOM
			    $('#animal_images').append(currentGifDiv);

			}

		});	
	}

	// ===================================================================
	
	// Display the Moving gif and Hide the still Image (and vice versa)
	function showGifHideImage(){

		// Determine in the gif was already clicked
		var clickTest = $(this).attr('data-name');
		
		// Gif is not clicked yet - Hide the still image & display the moving image
		if(clickTest == "unclicked"){

			var gifChildren = $(this).children();

			// Hide the Still Image
			$(gifChildren[1]).hide();

			// Display the Moving Image
			$(gifChildren[2]).show();

			// Change Data Name to clicked
			$(this).attr('data-name', "clicked");

		}
		// Gif was already clicked - Hide the moving image & show the still image
		else{

			var gifChildren = $(this).children();

			// Hide the Moving Image
			$(gifChildren[2]).hide();

			// Display the Still Image
			$(gifChildren[1]).show();


			// Change Data Name to unclicked
			$(this).attr('data-name', "unclicked");

		}
	
	}

	// ===================================================================

});





