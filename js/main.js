let passemail;

document.getElementById("forgot").addEventListener("click", function () {
    document.getElementById("passforgot").style.left = "0";
})
document.getElementById("forgotpassword").addEventListener("click", function () {
    passemail = document.getElementById("passemail").value;
    firebase.auth().sendPasswordResetEmail(passemail).then(function () {
        document.getElementById("passforgot").style.left = "100%";
        if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification("you will receive an email, check your inbox");
        }
    }).catch(function (error) {
        if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification("something went wrong, password not reset");
        }
    });
})
Notification.requestPermission();
let email;
let password;
let blogpostId;
let amountblog;
let amountblog2;
let everID;
let totalEver;
let totalEver2;
let removeBTN;
const dbRefObject = firebase.database().ref().child('blogpostID');
const dbRefObject2 = firebase.database().ref().child('totalEver');

function displayshit() {
    firebase.database().ref().child('totalEver').on('value', snap => {
        let forloopnumber = snap.val();
        document.getElementById("blogposts").innerHTML = "";
        let data = snap.val();
        for (i = 1; i <= forloopnumber; i++) {
            let x = i;
            console.log(i);
            firebase.database().ref().child('blogobject/blogp' + i).on('value', snap => {

                let data = snap.val();
                if (data.username !== null) {
                    document.getElementById("blogposts").innerHTML += "<div class='blogpost blogpost"+x+"'><h3>" + data.username + " wrote on " + data.date + "</h3><br><div class='title'>" + data.title + "</div><br>" + data.blogcontent + "<div class='remove rem" + x + "'>X</div><div class='edit edit" + x + "'>edit</div></div>";
                    console.log(i);

                    for (o = 1; o <= forloopnumber; o++) {
                        let r = o;

                        if (document.querySelector(".rem" + r) !== null) {
                            document.querySelector(".rem" + r).addEventListener("click", function () {
                                firebase.database().ref('blogobject/blogp' + r).remove();
                                everID--;
                                blogpostId--;
                                firebase.database().ref('blogpostID').set(blogpostId);
                                firebase.database().ref('totalEver').set(everID);
                                location.reload();

                            })
                        } else {}
                    }
                    for (f = 1; f <= forloopnumber; f++) {
                        let c = f;
                        console.log("edit" + c);
                        if (document.querySelector(".edit" + c) !== null) {
                            document.querySelector(".edit" + c).addEventListener('click', function () {
                                console.log("u klikte op blogpost" + c);
                                let v = c-1;
                                document.querySelector("#blogposts .blogpost"+c).innerHTML = '<input type="text" id="title2" placeholder="title"><textarea id="blogbericht2" ></textarea><script>CKEDITOR.replace("blogbericht2");</script><button id="savedisblogpost">add blogpost</button>';
                                document.getElementById("savedisblogpost").addEventListener("click", function () {
                                    if (Notification.permission === "granted") {
                                        // If it's okay let's create a notification
                                        var notification = new Notification("you edited a blogpost");
                                    }
                                    let today = new Date();
                                    let dd = today.getDate();
                                    let mm = today.getMonth() + 1;
                                    let yyyy = today.getFullYear();
                                    let dateTime = dd + '/' + mm + '/' + yyyy;
                                    let title = document.getElementById("title2").value;
                                    console.log(CKEDITOR.instances.blogbericht.getData());
                                    firebase.database().ref('blogobject/blogp' + c).set({
                                        username: email,
                                        blogcontent: document.getElementById("blogbericht2").value,
                                        date: dateTime,
                                        title: title
                                    })
                                    console.log("u deleted"+c);
                                    document.querySelector(".blogpost"+c).style.display ="none";

                                })
                            })
                        }
                    }
                } else {
                    document.getElementById("blogposts").innerHTML += "<br>";
                }
            })


        }
    })
}

dbRefObject.on('value', snap => {
    blogpostId = snap.val() + 1;
    amountblog = snap.val();
    amountblog2 = amountblog;
    console.log(amountblog2);

})
dbRefObject2.on('value', snap => {
    everID = snap.val() + 1;
    totalEver = snap.val();
    totalEver2 = totalEver;
    console.log(amountblog2);

})

if (localStorage.getItem("user") === null && localStorage.getItem("pass") === null) {
    document.getElementById("box").style.display = "none";
    console.log("u bent niet ingelogd")

    //sign up

    document.querySelector("#signup").addEventListener("click", function () {
        document.getElementById("box").style.display = "block";
        document.getElementById("blogtitle").style.display = "none";

        email = document.querySelector("#email").value;
        password = document.querySelector("#password").value;
        document.getElementById("sign").innerHTML = "welcome " + email + " <button id='logout'>log out</button>";
        localStorage.setItem("user", email);
        localStorage.setItem("pass", password);
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            document.getElementById("box").style.display = "block";
            document.getElementById("user").innerHTML = +email + " <button id='logout'>log out</button>";
            localStorage.setItem("user", email);
            localStorage.setItem("pass", password);
            displayshit();
            if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                var notification = new Notification("you have succesfully signed up");
            }
        }).catch(function (error) {

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        displayshit();
    })

    //log in

    document.querySelector("#signin").addEventListener("click", function () {

        email = document.querySelector("#email2").value;
        password = document.querySelector("#password2").value;

        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            document.getElementById("box").style.display = "block";
            document.getElementById("blogtitle").style.display = "none";
            document.getElementById("sign").style.display = "none";
            document.getElementById("user").innerHTML = email + " <button id='logout'>log out</button>";
            localStorage.setItem("user", email);
            localStorage.setItem("pass", password);
            displayshit();
            if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                var notification = new Notification("you have succesfully logged in");
            }
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        displayshit();


    })


    //sign out


} else {
    document.getElementById("box").style.display = "block";
    document.getElementById("blogtitle").style.display = "none";

    console.log("u bent ingelogd")
    console.log(localStorage.getItem("user"))
    email = localStorage.getItem("user");
    password = localStorage.getItem("pass");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    document.getElementById("sign").style.display = "none";
    document.getElementById("user").innerHTML = email + " <button id='logout'>log out</button>";

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
    if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("you posted a blogpost");
    }
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let dateTime = dd + '/' + mm + '/' + yyyy;
    let title = document.getElementById("title").value;
    console.log(CKEDITOR.instances.blogbericht.getData());
    firebase.database().ref('blogobject/blogp' + blogpostId).set({
        username: email,
        blogcontent: CKEDITOR.instances.blogbericht.getData(),
        date: dateTime,
        title: title
    })
    firebase.database().ref('blogpostID').set(blogpostId);
    firebase.database().ref('totalEver').set(everID);
})





displayshit();