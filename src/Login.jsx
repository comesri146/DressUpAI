import React, { useState } from 'react';


const Login = () => {
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    return(
        <>
        <div className={`container ${isActive ? 'active' : ''}`} id="container">
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" name="name"></input>
                        <input type="email" placeholder="Email" name="email"></input>
                        <input type="password" placeholder="Password" name="password"></input>
                        <button type="submit" name="signup">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <span>or use your email password</span>
                        <input type="email" placeholder="Email" name="email"></input>
                        <input type="password" name="password" placeholder="Password" required></input>
                        <a href="#">Forget Your Password?</a>
                        <button type="submit" name="signin">Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}

export default Login;