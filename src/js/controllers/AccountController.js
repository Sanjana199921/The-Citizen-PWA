import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, addDoc } from "firebase/firestore";

import { app, db } from '../services/firebase';

import User from '../models/User';


class AccountController {

    errors = [];

    init = () => {
        this.setupEventListeners();
        this.isLoggedIn();
    }

    setupEventListeners = () => {

        if(document.querySelector('.form__signup')) {
            document.getElementById('fullName')?.addEventListener('change', e => {
                const fn = e.target;
                this.validateFullName(fn);
                this.controlDisplayErrors(this.errors);
            });
    
            document.getElementById('userName')?.addEventListener('change', e => {
                const un = e.target;
                this.validateUserName(un);
                this.controlDisplayErrors(this.errors);
            });
    
            document.getElementById('email')?.addEventListener('change', e => {
                const em = e.target;
                this.validateEmail(em);
                this.controlDisplayErrors(this.errors);
            });
    
            document.getElementById('password')?.addEventListener('change', e => {
                const password = e.target;
                const confirmPassword = document.getElementById('confirm-password');
                this.validatePassword(password);
    
                if (confirmPassword && confirmPassword?.value.length !== 0) {
                    this.validateConfirmPassword(password, confirmPassword);
                }
                this.controlDisplayErrors(this.errors);
            });

            document.querySelector('.form__signup').addEventListener('submit', this.onSignupSubmit);
        }

        document.querySelector('.form__login')?.addEventListener('submit', this.onLoginSubmit);

    }

    errorMsgs = () => {
        return {
            fullNameEmpty: 'Please enter your full name',
            fullNameLength: 'Your full name should be atleast 2 characters',
            userNameEmpty: 'Please enter your username',
            userNameLength: 'Your username should be atleast 2 characters',
            emailEmpty: 'Please enter your email address',
            emailInvalid: 'This email address is invalid',
            passwordEmpty: 'Please enter your password',
            passwordLength: 'Your password should be atleast 8 characters',
            confirmPasswordEmpty: 'confirmPasswordEmpty',
            passwordsMismatch: 'Passwords do not match',
        }
    }

    displayError = (inputID, error) => {
        let input = document.getElementById(inputID);
        let label = input.parentNode.children[0];
        input?.classList.add('form__input--error');
        label?.classList.add('form__label--error');
        let errorElement = input?.parentNode?.children[1];
        if (errorElement) {
            errorElement.textContent = error;
        }
    }

    clearError = (inputID, error) => {
        let index = this.errors.indexOf(error);
        
        if (index >= 0) {
            this.errors.splice(index, 1);
            let input = document.querySelector(inputID);
            let label = input.parentNode.children[0];
            input?.classList.remove('form__input--error');
            label?.classList.remove('form__label--error');
            let errorElement = input?.parentNode?.children[1];
            
            if (errorElement) {
                errorElement.textContent = '';
            }
        }

    }

    controlDisplayErrors(error) {
        if (error.includes(this.errorMsgs().fullNameEmpty)) {
            this.displayError('fullName', this.errorMsgs().fullNameEmpty)
        }

        if (error.includes(this.errorMsgs().fullNameLength)) {
            this.displayError('fullName', this.errorMsgs().fullNameLength)
        }

        if (error.includes(this.errorMsgs().userNameLength)) {
            this.displayError('userName', this.errorMsgs().userNameLength)
        }

        if (error.includes(this.errorMsgs().userNameEmpty)) {
            this.displayError('userName', this.errorMsgs().userNameEmpty)
        }

        if (error.includes(this.errorMsgs().emailInvalid)) {
            this.displayError('email', this.errorMsgs().emailInvalid)
        }

        if (error.includes(this.errorMsgs().emailEmpty)) {
            this.displayError('email', this.errorMsgs().emailEmpty)
        }

        if (error.includes(this.errorMsgs().passwordEmpty)) {
            this.displayError('password', this.errorMsgs().passwordEmpty)
        }

        if (error.includes(this.errorMsgs().passwordLength)) {
            this.displayError('password', this.errorMsgs().passwordLength)
        }

        
    }

    validateFullName = (fn) => {
        if (fn?.value.length === 0) {
            if (!this.errors.includes(this.errorMsgs().fullNameEmpty)) {
                this.errors.push(this.errorMsgs().fullNameEmpty);
            }
        }

        else if (fn?.value.length < 2) {
            if (!this.errors.includes(this.errorMsgs().fullNameLength)) {
                this.clearError('#fullName', this.errorMsgs().fullNameEmpty);
                this.errors.push(this.errorMsgs().fullNameLength);
            }
        }

        else {
            this.clearError('#fullName', this.errorMsgs().fullNameEmpty);
            this.clearError('#fullName', this.errorMsgs().fullNameLength);
        }

    }

    validateUserName = (un) => {
        if (un?.value.length === 0) {
            if (!this.errors.includes(this.errorMsgs().userNameEmpty)) {
                this.errors.push(this.errorMsgs().userNameEmpty);
            }
        }

        else if (un?.value.length < 2) {
            if (!this.errors.includes(this.errorMsgs().userNameLength)) {
                this.clearError('#userName', this.errorMsgs().userNameEmpty);
                this.errors.push(this.errorMsgs().userNameLength);
            }
        }

        else {
            this.clearError('#userName', this.errorMsgs().userNameEmpty);
            this.clearError('#userName', this.errorMsgs().userNameLength);
        }

    }

    validatePassword = (pw) => {
        if (pw?.value.length === 0) {
            if (!this.errors.includes(this.errorMsgs().passwordEmpty)) {
                this.errors.push(this.errorMsgs().passwordEmpty);
            }
        }

        else if (pw?.value.length < 8) {
            if (!this.errors.includes(this.errorMsgs().passwordLength)) {
                this.clearError('#password', this.errorMsgs().passwordEmpty);
                this.errors.push(this.errorMsgs().passwordLength);
            }
        }

        else {
            this.clearError('#password', this.errorMsgs().passwordEmpty);
            this.clearError('#password', this.errorMsgs().passwordLength);

        }
    }

    validateEmail(em) {
        if (em?.value.length === 0) {
            if (!this.errors.includes(this.errorMsgs().emailEmpty)) {
                this.errors.push(this.errorMsgs().emailEmpty);
            }
        }

        else if (!em?.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            if (!this.errors.includes(this.errorMsgs().emailInvalid)) {
                this.clearError('#email', this.errorMsgs().emailEmpty);
                this.errors.push(this.errorMsgs().emailInvalid);
            }
        }

        else {
            this.clearError('#email', this.errorMsgs().emailInvalid);
            this.clearError('#email', this.errorMsgs().emailEmpty);
        }
    }

    createUserAccount = async (data) => {
        const { fullName, userName, email, password } = data;
        const auth = getAuth(app);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;
            if(user) {
                console.log(user)
                const newUser = new User(fullName, userName, email);
                console.log(newUser)
                localStorage.setItem("access_token", user.accessToken);
                const created = await setDoc(doc(db, "users", user.uid), Object.assign({}, newUser))
                console.log(created)
                return true;
            }
            
            return false;
        } catch (error) {
            console.log(error)
            return false
        }
    }

    authenticateUser = async (data) => {
        const { email, password } = data;
        const auth = getAuth(app);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;
            if(user) {
                localStorage.setItem("access_token", user.accessToken);
                return true;
            }
            
            return false;
        } catch (error) {
            console.log(error)
            return false
        }
    }

    onSignupSubmit = async (e) => {
        e.preventDefault();
        const formBtn = document.querySelector('.form__button');

        const fullName = document.getElementById("fullName");
        const userName = document.getElementById("userName");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        
        this.validateFullName(fullName);
        this.validateEmail(email);
        this.validatePassword(password);
        this.validateUserName(userName);
        this.controlDisplayErrors(this.errors);

        if(this.errors.length === 0) {
            formBtn.setAttribute('disabled', 'disabled');
            formBtn.classList.add('btn--disabled');
            formBtn.value = "Please wait...."
            
            const accountCreated = await this.createUserAccount({
                fullName: fullName.value,
                userName: userName.value,
                email: email.value,
                password: password.value
            });

            if(!accountCreated) {
                formBtn.removeAttribute('disabled');
                formBtn.classList.remove('btn--disabled');
                formBtn.value = "Create your account";
                document.querySelector(".form__alert").style.display = "block";
                document.querySelector(".form__alert--text").textContent = "Something went wrong";
                return;
            }

            window.location.href = "./success.html";
        }

    }

    onLoginSubmit = async (e) => {
        e.preventDefault();
        const formBtn = document.querySelector('.form__button');
        formBtn.setAttribute('disabled', 'disabled');
        formBtn.classList.add('btn--disabled');
        formBtn.value = "Please wait...."

        const email = document.getElementById("email");
        const password = document.getElementById("password");
        
        const userAuthenticated = await this.authenticateUser({
            email: email.value,
            password: password.value
        });

        console.log(userAuthenticated)

        if(!userAuthenticated) {
            formBtn.removeAttribute('disabled');
            formBtn.classList.remove('btn--disabled');
            formBtn.value = "Sign in";
            document.querySelector(".form__alert").style.display = "block";
            document.querySelector(".form__alert--text").textContent = "Username/password is incorrect";
            return;
        }

        window.location.href = "./home.html";
    }

    isLoggedIn = () => {
        const token = localStorage.getItem("access_token");

        const loginWindow = document.getElementById("login");
        const signupWindow = document.getElementById("signup");
        const indexWindow = document.getElementById("index");

        if(token) {
            
            if(loginWindow || signupWindow || indexWindow) {
                console.log("home");
                window.location.href = "./home.html";
            }

            return;
        }
        
        else {
            
            if(loginWindow || signupWindow || indexWindow) {
                return;
            }

            window.location.href = "./";
        }
    }
    
    logOut = () => {
        localStorage.removeItem("access_token");
        window.location.href = "./";
    }

    onGetCurrentUser = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                document
            } 
        });
    }

}

export default AccountController;