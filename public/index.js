var nameText = document.getElementById("username");
var postText = document.getElementById("post");
var button = document.getElementById("postbtn");
var emailText = document.getElementById("email");
var passwordText = document.getElementById("password");
var button = document.getElementById("postbtn");
var firebaseRef = firebase.database().ref();

/** Function to add a post to database **/
function submit() {
	var username = nameText.value;
	var post = postText.value;

	firebaseRef.push({username:username, text:post});
    postText.value = "";
}

function login() {
    var email = emailText.value;
    var pw = passwordText.value;

    firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
    });
}

function signup() {
    var email = emailText.value;
    var pw = passwordText.value;

    firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
    });
}

function logout() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
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
    alert("Welcome " + email);
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

// Begin listening for data only if user is signed in
//   startListening();
