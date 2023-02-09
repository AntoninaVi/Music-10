// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
// // import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
// // import { getFirestore, setDoc, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";


//     const firebaseConfig = {
//         apiKey: "AIzaSyDuFVHuCjPzzMvFm4Km2qtwDdbiqPdFIuA",
//         authDomain: "music-61e15.firebaseapp.com",
//         projectId: "music-61e15",
//         storageBucket: "music-61e15.appspot.com",
//         messagingSenderId: "90519520404",
//         appId: "1:90519520404:web:c12d160c883c1f75ed2081"
//     };




// // Initialize Firebase
// // firebase.initializeApp(config);
// const app = initializeApp(firebaseConfig);


// const audioPlayer = document.getElementById("music-player");

// // Get the audio file URL from Firebase
// firebase.database().ref("gs://music-61e15.appspot.com/Aaron.mp3").once("value").then(function (snapshot) {
//     audioPlayer.src = snapshot.val();
// });