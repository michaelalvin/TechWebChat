var nameText = document.getElementById("username");
var postText = document.getElementById("post");
var button = document.getElementById("postbtn");
var emailText = document.getElementById("email");
var passwordText = document.getElementById("password");
var button = document.getElementById("postbtn");
var firebaseRef = firebase.database().ref();

var emailaddress;

/** Function to add a post to database **/
function submit() {
	if(typeof emailaddress !== "undefined"){
        //variable exists, do what you want
        //replace @ and . because Firebase won't create child with those characters
        var directory = "users/" + emailaddress;
        directory = directory.replace("@", "_");
	    directory = directory.replace(".", "-"); //use replace all instead
        alert(directory);

        var username = nameText.value;
        var post = postText.value;

        var userref = firebaseRef.child(directory);
    	var messageref = userref.push({username:username, text:post});

    	postText.value = "";
    } else{
        setTimeout(waitForElement, 250);
    }
}

/** Function to add a data listener **/
var startListening = function() {
	if(typeof emailaddress !== "undefined"){
		var directory = "users/" + emailaddress;
		directory = directory.replace("@", "_");
	    directory = directory.replace(".", "-"); //use replace all instead

		userFirebaseRef = firebaseRef.child(directory);

		//Previous: firebaseRef.on('child_added', function(snapshot)
	    userFirebaseRef.on('child_added', function(snapshot) {
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
	} else{
        setTimeout(waitForElement, 250);
    }
}

/** Function to add a listener for user auth **/
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    emailaddress = user.email;
    // ...
    startListening();
  } else {
    // User is signed out.
    // ...
    alert("Goodbye " + email);

    var node = document.getElementById("results");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    //Delete conversation once user is logged out
    
  }
});

