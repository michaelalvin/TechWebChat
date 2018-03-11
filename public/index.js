var nameText = document.getElementById("username");
var postText = document.getElementById("post");
var button = document.getElementById("postbtn");
var emailText = document.getElementById("email");
var passwordText = document.getElementById("password");
var button = document.getElementById("postbtn");
var firebaseRef = firebase.database().ref();
var emailaddress;

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
    alert("Welcome " + email);
    window.location.href = "users.html";
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

