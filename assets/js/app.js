//Variables
let topics = ['Batman', 'Superman', 'Wonder Woman', 'Aquaman', 'Green Lantern', 'Spiderman', 'Wolverine', 'Hulk', 'Thor', 'Captain America'];

$(() => {
  //Initialize predefined buttons
  createButton();

  //Click Logic
  //When the form button is clicked
  $('button[type=submit]').click(function(event) {
    //Prevent button from reloading page
    event.preventDefault();
    //If there's a value in the form field then add it to a new button
    if ($('#superhero-input').val()) {
      createButton($('#superhero-input').val().trim());
      $('#superhero-input').val('');
    }
  })

  //When one of the super hero buttons is clicked run the showGifs function
  $('#button-bucket').on('click', '.btn', function() {
    showGifs($(this).attr('data-id'));
  })

  //When the images are clicked if its a still play the gif and visa versa
  $('#gif-bucket').on('click', 'img', function() {
    if ($(this).attr('src') === $(this).attr('data-still')) {
      $(this).attr('src', $(this).attr('data-gif'));
    } else {
      $(this).attr('src', $(this).attr('data-still'));
    }
  })

  //Functions
  //Creates a button for the value passed to it or initializes the predefined buttons
  function createButton(param) {
    if (param) {
      $('#button-bucket').append($('<button>').attr({
          'class': 'btn',
          type: 'button',
          'data-id': param
        }).text(param))
    } else {
      topics.forEach(function(hero) {
        $('#button-bucket').append($('<button>').attr({
          'class': 'btn',
          type: 'button',
          'data-id': hero
        }).text(hero))
      })
    }
  }

  //Gets the gifs for the button pressed and displays the first 10 of them on the page
  function showGifs(param) {
    let queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + param + '&limit=10&api_key=dc6zaTOxFJmzC';
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      $('#gif-bucket').html('');
      for (let i=0; i < 10; i++) {
        $('#gif-bucket').append($('<img>').attr({
          src: response.data[i].images.fixed_height_still.url,
          'data-gif': response.data[i].images.fixed_height.url,
          'data-still': response.data[i].images.fixed_height_still.url
        }))
      }
    });
  }

});
