
var name, email, redg, password, address,userid, phone, ph, course, semester, gender, type;
function signup() {
  name = document.getElementById("name").value;
  email = document.getElementById("email").value;
  redg = document.getElementById("redg").value;
  password = document.getElementById("password").value;
  address = document.getElementById("address").value;
  phone = document.getElementById("phone").value;
  ph = document.getElementById("mobile").value;
  course = document.getElementById("course").value;
  semester = document.getElementById("semester").value;
  gender = document.getElementById("gender").value;
  type = document.getElementById("type").value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });
}
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    alert("Account created successfully");
    userid = user.uid;
    saveDetails();
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
function saveDetails(){
  firebase.database().ref(userid).set({
    name: name,
    email: email,
    regdno:redg,
    mobile:ph,
    course:course,
    semister:semester,
    gender:gender,
    type:type
  }, function(error) {
    if (error) {
      // The write failed...
    } else {
      alert("Data saved Succesfully");
      window.location.href = "profile.html";
    }
  });
}