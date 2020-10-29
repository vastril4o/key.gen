var firebaseConfig = {
    apiKey: "AIzaSyCXWa5T68BnJDgm8H8aFBOWsl25N32FFlI",
    authDomain: "keygen-3d9f4.firebaseapp.com",
    databaseURL: "https://keygen-3d9f4.firebaseio.com",
    projectId: "keygen-3d9f4",
    storageBucket: "keygen-3d9f4.appspot.com",
    messagingSenderId: "874493033506",
    appId: "1:874493033506:web:823a57fdf1e691aef15e7b",
    measurementId: "G-5TZJCFTMQ3"
};

// initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// listen
const counterLike = firebase.database().ref("like");
counterLike.on("value", (snapshot) => {
    document.getElementById("span_like").textContent = snapshot.val();
});

const counterDislike = firebase.database().ref("dislike");
counterDislike.on("value", (snapshot) => {
    document.getElementById("span_dislike").textContent = snapshot.val();
});

// update
function fbCounterIncrease(type) {
    if (type == 'like') {
        counterLike.transaction(val => val + 1, (err) => {
            if (err) {
                alert(err);
            }
        });
    } else if (type == 'dislike') {
        counterDislike.transaction(val => val + 1, (err) => {
            if (err) {
                alert(err);
            }
        });
    }
};