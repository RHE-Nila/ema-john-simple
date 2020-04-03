import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () =>{
        auth.signInWithGoogle()
        .then(res => {
            window.location.pathname = '/review';
        })
    }
    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = '/';
        })
    }

    return (
        <div>
            <h1> Welcome to the firebase party !!!</h1>
            {
                auth.user ? <button onClick={handleSignOut}>Sign Out</button> : 
                <button onClick={handleSignIn}>Sing in with Google</button>
            }
        </div>
    );
};

export default Login;