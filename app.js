// AJAX is really AJAJ fun-fact, xml is so old and dead now that it's barely used, JSON is the standard for web data
// The name kind of stuck around because it's so integral to the history of web dev, I should research it

var dataRequest = new XMLHttpRequest(); // XMLHttpRequest is a built in object for handling data from the back-end
dataRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json'); // takes 2 params, the type of request and the location of the data
dataRequest.onload = function() { // triggers when data comes in from the request
      console.log(dataRequest.responseText);
      var textString = dataRequest.responseText; // Store data as a text string
      console.log(textString[0]); // Prints [ because it's perceived as a text string
      // we want it as ajax data
      var jsonString = JSON.parse(textString); // JSON.parse returns the text as a json object
      var anotherjsonString = JSON.parse(dataRequest.responseText); // we can do it this way too
      // The below two values write the same thing
      console.log(jsonString);
      console.log(anotherjsonString);
      // Now that we've got json data let's attach this to an event that triggers on button click?
};
dataRequest.send(); // send the request and using the onload function to handle it when it comes in

//here we have our event handler, which is basically what it was earlier with no telemetry
var pageCount = 1; // Tutorial example uses 3 pages that follow a specific format, this var decides which pages load

// Same as the above commented function
function sendData() {
      var dataRequest = new XMLHttpRequest();
      dataRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCount + '.json');
      dataRequest.onload = function() {
            if (dataRequest.status >= 200 && dataRequest.status < 400) { // 200 and 300 status are good
                  var json = JSON.parse(dataRequest.responseText);
                  writeData(json); // function to render html on the page, pass in the object and manipulate it
            } else {
                  console.log("Server is broken");
            }
      };

      dataRequest.onerror = function() {
            console.log("Bad Connection");
      };

      dataRequest.send();
      pageCount++;
      if (pageCount > 3) {
            document.getElementById('btn').style.display = 'none';

      }
}

// vanilla js method
function writeData(data) {
      var dataString = '';
      var container = document.getElementById('container');
      for (i = 0; i < data.length; i++) {
            dataString += '<p class="content">' + data[i].name + " is a " + data[i].species + ' that wants to eat ';
            for (j = 0; j < data[i].foods.likes.length; j++) {
                  if (j == 0) {
                        dataString += data[i].foods.likes[j];
                  } else {
                        dataString += ' and ' + data[i].foods.likes[j];
                  }
            }
            dataString += ' and hates ';
            for (j = 0; j < data[i].foods.dislikes.length; j++) {
                  if (j == 0) {
                        dataString += data[i].foods.dislikes[j];
                  } else {
                        dataString += ' and ' + data[i].foods.dislikes[j];
                  }
            }
            dataString += '</p>';
      }
      container.insertAdjacentHTML('beforeend', dataString); // method of inserting data, but we need to change it's form again to actually be in strings
      // the above prints all the data from the json to the page
}

// in jquery
function jSend() {
      $.ajax({
            url: "https://learnwebcode.github.io/json-example/animals-1.json",
            type: "GET",
            crossDomain: true, // order matters for CORS
            dataType: "json", // This must be here, and must have json
            success: function(response) {
                  // Iterate over the response collection
                  // Follow the format of writeData method
                  // Test...
            },
            error: function(xhr, status) {
                  alert("error");
            }
      });
}