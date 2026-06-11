// ── UNIFIED PRODUCTION FIREBASE IMPLEMENTATION MODULE ──
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your verified Firebase web application config keys
const firebaseConfig = {
    apiKey: "AIzaSyARUAkC8KgF0aeVI8jZq1o78o74IVwRIHY",
    authDomain: "grace-auth-5bace.firebaseapp.com",
    projectId: "grace-auth-5bace",
    storageBucket: "grace-auth-5bace.firebasestorage.app",
    messagingSenderId: "144640581533",
    appId: "1:144640581533:web:f8afcb6756d0a9dd721974"
};

// Start the cloud instance engine
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// App execution toggle states
let isRegisterMode = false;

// Gather DOM nodes carefully
const loginForm = document.getElementById('login-form');
const authTitle = document.getElementById('auth-title');
const submitBtn = document.getElementById('auth-submit-btn');
const toggleWrapper = document.getElementById('auth-toggle-wrapper');
const confirmPasswordInput = document.getElementById('register-confirm-password');

// Handle UI Layout Flipping
if (toggleWrapper) {
    toggleWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.id === 'go-to-register') {
            isRegisterMode = true;
            if (authTitle) authTitle.innerText = "CREATE ACCOUNT";
            if (submitBtn) submitBtn.innerText = "REGISTER NODE";
            if (confirmPasswordInput) {
                confirmPasswordInput.style.display = "block";
                confirmPasswordInput.setAttribute('required', 'true');
            }
            toggleWrapper.innerHTML = `Already registered? <a href="#" id="go-to-login">Sign In Here</a>`;
        } else if (e.target.id === 'go-to-login') {
            isRegisterMode = false;
            if (authTitle) authTitle.innerText = "SIGN IN";
            if (submitBtn) submitBtn.innerText = "ENTER SYSTEM";
            if (confirmPasswordInput) {
                confirmPasswordInput.style.display = "none";
                confirmPasswordInput.removeAttribute('required');
            }
            toggleWrapper.innerHTML = `Don't have an account? <a href="#" id="go-to-register">Create One</a>`;
        }
    });
}

// Form Execution Panel
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Run Account Registration Module
        if (isRegisterMode) {
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

            if (password !== confirmPassword) {
                alert("Validation Mismatch: Confirm password string doesn't match.");
                return;
            }

            if (submitBtn) {
                submitBtn.innerText = "CREATING NODE...";
                submitBtn.style.opacity = "0.5";
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    if (submitBtn) {
                        submitBtn.innerText = "NODE REGISTERED";
                        submitBtn.style.background = "#22c55e";
                        submitBtn.style.color = "#ffffff";
                    }
                    setTimeout(() => {
                        window.location.href = "#home";
                        window.location.reload();
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Firebase Registration Error:", error.code, error.message);
                    if (submitBtn) {
                        submitBtn.innerText = "REGISTRATION FAILED";
                        submitBtn.style.background = "#ef4444";
                        submitBtn.style.color = "#ffffff";
                    }
                    setTimeout(() => {
                        alert(`Database Refused: ${error.message}`);
                        if (submitBtn) {
                            submitBtn.innerText = "REGISTER NODE";
                            submitBtn.style.background = "";
                            submitBtn.style.color = "";
                            submitBtn.style.opacity = "";
                        }
                    }, 1200);
                });

        // Run Account Login Module
        } else {
            if (submitBtn) {
                submitBtn.innerText = "AUTHENTICATING...";
                submitBtn.style.opacity = "0.5";
            }

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    if (submitBtn) {
                        submitBtn.innerText = "ACCESS GRANTED";
                        submitBtn.style.background = "#22c55e";
                        submitBtn.style.color = "#ffffff";
                    }
                    setTimeout(() => {
                        window.location.href = "#home";
                        if (submitBtn) {
                            submitBtn.innerText = "ENTER SYSTEM";
                            submitBtn.style.background = "";
                            submitBtn.style.color = "";
                            submitBtn.style.opacity = "";
                        }
                        loginForm.reset();
                    }, 1200);
                })
                .catch((error) => {
                    console.error("Firebase Auth Error:", error.code, error.message);
                    if (submitBtn) {
                        submitBtn.innerText = "ACCESS DENIED";
                        submitBtn.style.background = "#ef4444";
                        submitBtn.style.color = "#ffffff";
                    }
                    setTimeout(() => {
                        alert(`System Refused: Incorrect credentials parameter map.`);
                        if (submitBtn) {
                            submitBtn.innerText = "ENTER SYSTEM";
                            submitBtn.style.background = "";
                            submitBtn.style.color = "";
                            submitBtn.style.opacity = "";
                        }
                    }, 1200);
                });
        }
    });
}
