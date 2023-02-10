import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.13.0/firebase/storage.js";


    const firebaseConfig = {
        apiKey: "AIzaSyDuFVHuCjPzzMvFm4Km2qtwDdbiqPdFIuA",
        authDomain: "music-61e15.firebaseapp.com",
        projectId: "music-61e15",
        storageBucket: "music-61e15.appspot.com",
        messagingSenderId: "90519520404",
        appId: "1:90519520404:web:c12d160c883c1f75ed2081"
    };


    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);