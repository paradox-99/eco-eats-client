import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProv = ({children}) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const handleCreateUser = (email, password) => {
        setStatus(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const handleEmailLogin = (email, password) => {
        setStatus(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const handleGoogleLogin = () => {
        setStatus(true);
        return signInWithPopup(auth, googleProvider);
    }
    const handleGitHubLogin = () => {
        setStatus(true);
        return signInWithPopup(auth, gitHubProvider);
    }
    const handleFacebookLogin = () => {
        setStatus(true);
        return signInWithPopup(auth, facebookProvider);
    }

    const updateUser = (userName, email, password, url) => {
        return updateEmail(auth.currentUser, email)
            .then(
                updateProfile(auth.currentUser, {
                    displayName: userName,
                    photoURL: url
                })
                .then(
                    updatePassword(user, password))
            )
    }

    const logOut = () => {
        setStatus(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userID = currentUser?.uid || user?.uid;
            const loggedUser = { userID: userID };
            setUser(currentUser);
            setStatus(false);

            if (currentUser) {
                axios.post('https://ecoeats-server.vercel.app/jwt', loggedUser, { withCredentials: true })
            }
            else {
                axios.post('https://ecoeats-server.vercel.app/logout', loggedUser, { withCredentials: true })
            }
        });

        return (() => {
            unsubscribe();
        })
    }, []);

    const authInfo = { user, status, handleCreateUser, handleEmailLogin, logOut, handleGoogleLogin, handleGitHubLogin, handleFacebookLogin, updateUser };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProv.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AuthProv;