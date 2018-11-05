let email;
let password;
let blogpostId;
let amountblog;
let amountblog2;

const dbRefObject = firebase.database().ref().child('blogpostID')

dbRefObject.on('value', snap => {
    blogpostId = snap.val() + 1;
    amountblog = snap.val();
    amountblog2 = amountblog;
    console.log(amountblog2);

})

if (localStorage.getItem("user") === null && localStorage.getItem("pass") === null) {
    document.getElementById("box").style.display = "none";
    console.log("u bent niet ingelogd")

    //sign up

    document.querySelector("#signup").addEventListener("click", function () {
        document.getElementById("box").style.display = "block";

        email = document.querySelector("#email").value;
        password = document.querySelector("#password").value;
        document.getElementById("sign").innerHTML = "welcome " + email + " <button id='logout'>log out</button>";
        localStorage.setItem("user", email);
        localStorage.setItem("pass", password);
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            document.getElementById("box").style.display = "block";
            document.getElementById("sign").innerHTML = "welcome " + email + " <button id='logout'>log out</button>";
            localStorage.setItem("user", email);
            localStorage.setItem("pass", password);
        }).catch(function (error) {

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

    })

    //log in

    document.querySelector("#signin").addEventListener("click", function () {

        email = document.querySelector("#email2").value;
        password = document.querySelector("#password2").value;

        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            document.getElementById("box").style.display = "block";
            document.getElementById("sign").innerHTML = "welcome " + email + " <button id='logout'>log out</button>";
            localStorage.setItem("user", email);
            localStorage.setItem("pass", password);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });



    })


    //sign out


} else {
    document.getElementById("box").style.display = "block";

    console.log("u bent ingelogd")
    console.log(localStorage.getItem("user"))
    email = localStorage.getItem("user");
    password = localStorage.getItem("pass");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    document.getElementById("sign").innerHTML = "welcome " + email + " <button id='logout'>log out</button>";

    //addblogpostform
}


document.getElementById("logout").addEventListener("click", function () {
    firebase.auth().signOut()
        .then(function () {
            localStorage.clear();
        })
        .catch(function (error) {

        });
    location.reload();

})
document.getElementById("saveblogpost").addEventListener("click", function () {
    firebase.database().ref('blogobject/blogp' + blogpostId).set({
        username: email,
        blogcontent: document.getElementById("blogbericht").value
    })
    firebase.database().ref('blogpostID').set(blogpostId);
})

let domobj = document.getElementById("blogposts");

firebase.database().ref().child('blogpostID').on('value', snap => {
    let forloopnumber = snap.val();
    domobj.innerHTML = "";
    for (i = 1; i <= forloopnumber; i++) {
        console.log(i);
        firebase.database().ref().child('blogobject/blogp' + i + '/username').on('value', snap => {
            domobj.innerHTML += "written by: " + snap.val() + "";
            console.log(i);
        })
        firebase.database().ref().child('blogobject/blogp' + i + '/blogcontent').on('value', snap => {
            domobj.innerHTML += "<blockquote>" + snap.val() + "</blockquote>";
            console.log(i);
        })
    }
})