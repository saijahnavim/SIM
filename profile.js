var name, email, mobileno, cgpa = 0, list = [], userid, path;
var div =document.getElementsByClassName("tabcontent");
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userid = user.uid;
        getDetails();
        getMarks();
        getAttendance();
    } else {
        alert("Sign in to continue");
        window.location.href = "home.html";
        // User is signed out.
        // ...
    }
});

function getDetails() {
    firebase.database().ref(userid).once('value').then(function (snapshot) {
        name = snapshot.val().name;
        email = snapshot.val().email;
        mobile = snapshot.val().mobile;

        document.getElementById("username").innerHTML = name;
        document.getElementById("mobile").innerHTML = mobile;
        document.getElementById("email").innerHTML = email;
    });
}
function getMarks() {
    var body = document.getElementsByTagName("body")[0];
    var tbl = document.getElementById("Mtable");
    var tblBody = document.createElement("tbody");

    firebase.database().ref(userid + "/Marks").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {

            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            list.push(childData);

            var row = document.createElement("tr");
            var cell = document.createElement("td");
            var cellText = document.createTextNode(childData.sem);
            cell.appendChild(cellText);
            row.appendChild(cell);

            var cell = document.createElement("td");
            var cellText = document.createTextNode(childData.sgpa);
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);

            cgpa += childData.sgpa;
            cgpa = cgpa /2;

            var cell = document.createElement("td");
            var cellText = document.createTextNode(cgpa.toFixed(2));
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);
        });
        tbl.appendChild(tblBody);
        div.appendChild(tbl);
        tbl.setAttribute("border", "0");
    });
}
function getAttendance() {
    var body = document.getElementsByTagName("body")[0];
    var tbl = document.getElementById("Atable");
    var tblBody = document.createElement("tbody");
    

    firebase.database().ref(userid+ "/attendance").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {

            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = document.createElement("tr");
            var cell = document.createElement("td");
            var cellText = document.createTextNode(childData.sub);
            cell.appendChild(cellText);
            row.appendChild(cell);

            var cell = document.createElement("td");
            var progress = document.createElement("progress");
            progress.value = childData.percent;
            progress.max = 100;
            var cellText = document.createTextNode(childData.percent);
            cell.appendChild(progress);
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);
        });
        tbl.appendChild(tblBody);
        div.appendChild(tbl);
        tbl.setAttribute("border", "0");
    });
}
function signout(){
    firebase.auth().signOut().then(function() {
        window.location.href = "index.html";
      }).catch(function(error) {
        // An error happened.
      });
}
