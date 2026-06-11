// Import the secure Firebase Authentication SDK modules directly via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration keys from the Google Console dashboard
const firebaseConfig = {
    apiKey: "AIzaSyARUAkC8KgF0aeVI8jZq1o78o74IVwRIHY",
    authDomain: "grace-auth-5bace.firebaseapp.com",
    projectId: "grace-auth-5bace",
    storageBucket: "grace-auth-5bace.firebasestorage.app",
    messagingSenderId: "144640581533",
    appId: "1:144640581533:web:f8afcb6756d0a9dd721974"
};

// Initialize the cloud engine connection
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Monitor form interactions smoothly
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the browser from refreshing the full window

        // Extract credentials cleanly from the secure DOM layout nodes
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const submitBtn = document.querySelector('.submit-btn');

        // Provide immediate visual indicator state feedback
        submitBtn.innerText = "AUTHENTICATING...";
        submitBtn.style.opacity = "0.5";

        // Query the authentication infrastructure layer
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Connection Approved! Clean the active user instance data
                submitBtn.innerText = "ACCESS GRANTED";
                submitBtn.style.background = "#22c55e"; // Flashes bright success green
                submitBtn.style.color = "#ffffff";
                
                setTimeout(() => {
                    // Snap the site user session cleanly back to your secured target node
                    window.location.href = "#home"; 
                    // Reset styling layout settings
                    submitBtn.innerText = "ENTER SYSTEM";
                    submitBtn.style.background = "";
                    submitBtn.style.color = "";
                    submitBtn.style.opacity = "";
                    loginForm.reset();
                }, 1200);
            })
            .catch((error) => {
                // Connection Refused! Catch authentication failures gracefully
                console.error("Auth Failure Code:", error.code);
                submitBtn.innerText = "ACCESS DENIED";
                submitBtn.style.background = "#ef4444"; // Flashes systemic error red
                submitBtn.style.color = "#ffffff";

                setTimeout(() => {
                    alert(`System Access Denied: Invalid parameters or unverified member node.`);
                    submitBtn.innerText = "ENTER SYSTEM";
                    submitBtn.style.background = "";
                    submitBtn.style.color = "";
                    submitBtn.style.opacity = "";
                }, 400);
            });
    });
}