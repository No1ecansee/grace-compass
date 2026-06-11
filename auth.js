// Import the secure Firebase Authentication SDK modules directly via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration keys from the Google Console dashboard
const firebaseConfig = {
    apiKey: "AIzaSyARUAkC8KgF0aeVI8jZq1o78o74IVwRIHY",
    authDomain: "grace-auth-5bace.firebaseapp.com",
    projectId: "grace-auth-5bace",
    storageBucket: "grace-auth-5bace.firebasestorage.app",
    messagingSenderId: "144640581533",
    appId: "1:144640581533:web:f8afcb6756d0a9dd721974"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Application State Variables
let isRegisterMode = false;

// DOM Layout Selectors
const loginForm = document.getElementById('login-form');
const authTitle = document.getElementById('auth-title');
const submitBtn = document.getElementById('auth-submit-btn');
const toggleWrapper = document.getElementById('auth-toggle-wrapper');
const confirmPasswordInput = document.getElementById('register-confirm-password');

// ── TOGGLE INTERFACE STATE SWITCH MECHANISM ──
toggleWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'go-to-register') {
        isRegisterMode = true;
        authTitle.innerText = "CREATE ACCOUNT";
        submitBtn.innerText = "REGISTER NODE";
        confirmPasswordInput.style.display = "block";
        confirmPasswordInput.setAttribute('required', 'true');
        toggleWrapper.innerHTML = `Already registered? <a href="#" id="go-to-login">Sign In Here</a>`;
    } else if (e.target.id === 'go-to-login') {
        isRegisterMode = false;
        authTitle.innerText = "SIGN IN";
        submitBtn.innerText = "ENTER SYSTEM";
        confirmPasswordInput.style.display = "none";
        confirmPasswordInput.removeAttribute('required');
        toggleWrapper.innerHTML = `Don't have an account? <a href="#" id="go-to-register">Create One</a>`;
    }
});

// ── CORE SUBMISSION ROUTER PANEL ──
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // 1. RUN REGISTER ACCOUNT SUB-ROUTINE
        if (isRegisterMode) {
            const confirmPassword = confirmPasswordInput.value;

            if (password !== confirmPassword) {
                alert("Validation Failure: Password parameters do not match.");
                return;
            }

            submitBtn.innerText = "CREATING NODE...";
            submitBtn.style.opacity = "0.5";

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    submitBtn.innerText = "NODE REGISTERED";
                    submitBtn.style.background = "#22c55e";
                    submitBtn.style.color = "#ffffff";
                    
                    setTimeout(() => {
                        alert("Account deployment successful! Logging in...");
                        window.location.href = "#home";
                        location.reload(); // Hard reset view state 
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Registration Refused:", error.code);
                    submitBtn.innerText = "REGISTRATION FAILED";
                    submitBtn.style.background = "#ef4444";
                    submitBtn.style.color = "#ffffff";
                    
                    setTimeout(() => {
                        alert(`Registration Denied: ${error.message}`);
                        submitBtn.innerText = "REGISTER NODE";
                        submitBtn.style.background = "";
                        submitBtn.style.color = "";
                        submitBtn.style.opacity = "";
                    }, 1200);
                });

        // 2. RUN STANDARD SIGN IN SUB-ROUTINE
        } else {
            submitBtn.innerText = "AUTHENTICATING...";
            submitBtn.style.opacity = "0.5";

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    submitBtn.innerText = "ACCESS GRANTED";
                    submitBtn.style.background = "#22c55e";
                    submitBtn.style.color = "#ffffff";
                    
                    setTimeout(() => {
                        window.location.href = "#home";
                        submitBtn.innerText = "ENTER SYSTEM";
                        submitBtn.style.background = "";
                        submitBtn.style.color = "";
                        submitBtn.style.opacity = "";
                        loginForm.reset();
                    }, 1200);
                })
                .catch((error) => {
                    submitBtn.innerText = "ACCESS DENIED";
                    submitBtn.style.background = "#ef4444";
                    submitBtn.style.color = "#ffffff";

                    setTimeout(() => {
                        alert(`System Access Denied: Invalid member configuration parameters.`);
                        submitBtn.innerText = "ENTER SYSTEM";
                        submitBtn.style.background = "";
                        submitBtn.style.color = "";
                        submitBtn.style.opacity = "";
                    }, 1200);
                });
        }
    });
}
