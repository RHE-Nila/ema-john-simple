import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import Login from "./Login";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const auth = Auth();
return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
    
}
export const useAuth = () => useContext(AuthContext);

export const  PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  

const getUser = user => {
    const {displayName, email, PhotoURL} = user;
    return {name: displayName, email, photo: PhotoURL};
}
const Auth = () => {
    const [user, setUser] = useState(null)

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
       return firebase.auth().signInWithPopup(provider)
            .then(res => {
               const signedInUser = getUser(res.user);
                setUser(signedInUser);
                return res.user;
            })
            .catch(err => {
                console.log(err);
                setUser(null);
                return err.message;
            })
    }
    const signOut = () => {
       return firebase.auth().signOut().then(function() {
            setUser(null);
            return true;
        }).catch(function(error) {
            return false;
        });
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(usr){
            if(usr) {
               const currUser = getUser(usr);
               setUser(currUser);
            }
            else {
                //no user is signed in.
            }
        });
    }, [])
    return {
        user,
        signInWithGoogle,
        signOut

    }
}

export default Auth;