

var nameText = document.getElementById("username");
var postText = document.getElementById("post");
var button = document.getElementById("postbtn");
var firebaseRef = firebase.database().ref();


/** Function to add a post to database **/
function submit() {
	var username = nameText.value;
	var post = postText.value;

	firebaseRef.push({username:username, text:post});
    postText.value = "";
}

/** Function to add a data listener **/
var startListening = function() {
  	firebaseRef.on('child_added', function(snapshot) {
    var msg = snapshot.val();
      
    var msgUsernameElement = document.createElement("b");
    msgUsernameElement.textContent = msg.username;
        
    var msgTextElement = document.createElement("p");
    msgTextElement.textContent = msg.text;
  
    var msgElement = document.createElement("div");
    msgElement.appendChild(msgUsernameElement);
    msgElement.appendChild(msgTextElement);

    msgElement.className = "msg";
    document.getElementById("results").appendChild(msgElement);
    });
  }

// Begin listening for data
startListening();