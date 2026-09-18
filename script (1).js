/* =========================================
   FIREBASE.JS
   AUTOMATIC EMERGENCY SOS SYSTEM
========================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   FIREBASE CONFIG
========================================= */

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "emergency-sos-system-2717b.firebaseapp.com",

    projectId:
        "emergency-sos-system-2717b",

    storageBucket:
        "emergency-sos-system-2717b.firebasestorage.app",

    messagingSenderId:
        "831859323537",

    appId: "YOUR_APP_ID",

    measurementId:
        "G-T8V9F5B3Q8"
};


/* =========================================
   INITIALIZE FIREBASE
========================================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


/* =========================================
   CURRENT USER
========================================= */

let currentUser = null;

onAuthStateChanged(auth, (user) => {

    currentUser = user;

    window.firebaseUser = user;

});


/* =========================================
   SAVE AUTOMATIC EMERGENCY ALERT
========================================= */

export async function saveAutomaticAlert(
    latitude = null,
    longitude = null,
    accuracy = null
) {

    try {

        const alertData = {

            type: "AUTOMATIC_SOS",

            status: "ACTIVE",

            source: "DEVICE_SENSOR",

            message:
                "Automatic emergency alert detected",

            createdAt:
                serverTimestamp(),

            location: {

                latitude: latitude,

                longitude: longitude,

                accuracy: accuracy

            },

            userId:
                currentUser
                    ? currentUser.uid
                    : "anonymous"

        };


        const docRef = await addDoc(
            collection(db, "emergencyAlerts"),
            alertData
        );


        console.log(
            "Emergency alert created:",
            docRef.id
        );


        return docRef.id;

    }

    catch (error) {

        console.error(
            "Firebase error:",
            error
        );

        throw error;
    }
}


/* =========================================
   SAVE MANUAL SOS
========================================= */

export async function saveManualAlert(
    latitude = null,
    longitude = null,
    accuracy = null
) {

    try {

        const alertData = {

            type: "MANUAL_SOS",

            status: "ACTIVE",

            source: "SOS_BUTTON",

            message:
                "Manual emergency SOS activated",

            createdAt:
                serverTimestamp(),

            location: {

                latitude: latitude,

                longitude: longitude,

                accuracy: accuracy

            },

            userId:
                currentUser
                    ? currentUser.uid
                    : "anonymous"

        };


        const docRef = await addDoc(
            collection(db, "emergencyAlerts"),
            alertData
        );


        return docRef.id;

    }

    catch (error) {

        console.error(error);

        throw error;
    }
}


/* =========================================
   GLOBAL ACCESS
========================================= */

window.firebaseDB = db;

window.firebaseAuth = auth;

window.saveAutomaticAlert =
    saveAutomaticAlert;

window.saveManualAlert =
    saveManualAlert;
