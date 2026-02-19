import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyDBroHck1JhjnQL0aFS5XRX4bgGrSgPa0Q",
    authDomain: "netflix-clone-337fe.firebaseapp.com",
    projectId: "netflix-clone-337fe",
    storageBucket: "netflix-clone-337fe.firebasestorage.app",
    messagingSenderId: "141295256456",
    appId: "1:141295256456:web:5bc403a3e321614ddcf03d"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name, authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}
const logout = async () => {
    signOut(auth)
}
export { auth, db, signup, login, logout }