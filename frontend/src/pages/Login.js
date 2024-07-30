import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ErrorBlock from "../components/ErrorBlock";
import { useAuth } from "../hooks/useAuth";

function Login() {

    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => setShowModal(false);

    const [values, setValues] = useState({
        email: '',
        password: '',
        checked: false,
        errors: {}
    });

    const { login } = useAuth()

    const handleChange = () => {
        setValues(prev => ({ ...prev, checked: !prev.checked }));
    };

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const errors = validate(values);
        if (Object.keys(errors).length > 0) {
            setValues((prev) => ({ ...prev, errors }));
            setShowModal(true);
            return; 
        }

        try {
            const response = await axios.post(`/api/v1/login`, { ...values });
            if (response.data.status === 'Success') {
                const { userData } = response.data;
                await login(userData)
            } else {
                setValues(prev => ({ ...prev, errors: { login: 'Login failed. Please check your credentials.' } }));
            }
        } catch (error) {
            console.error("Login request failed");
            setValues(prev => ({ ...prev, errors: { login: 'Login request failed. Please try again.' } }));
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "email is required";
        } else if (values.email.length < 10 || values.email.length > 50) {
            errors.email = "email must be at least 6 and no more than 10 characters";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6 || values.password.length > 60) {
            errors.password = "Password must be at least 6 and no more than 60 characters";
        }

        return errors;
    };

    return (
        <div>
            {(values.errors && showModal) && (
                <ErrorBlock errorMessage={values.errors.email ? values.errors.email : values.errors.password} handleModalClose={handleModalClose} />
            )}
            <div className="container">
                <div className="login__container">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                value={values.email}
                                onChange={handleInput}
                                autoComplete="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                placeholder="Password"
                                value={values.password}
                                onChange={handleInput}
                                autoComplete="off"
                                name="password"
                                id="password"
                            />
                        </div>
                        <div className="checkbox-group">
                            <label for="remember-me">
                                <input type="checkbox" id="remember-me" checked={values.checked} onChange={handleChange} /> Remember me
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <p className="signup">Don't have an account? <Link to={'/register'}>Signup</Link></p>
                        <button className="submit-button" type="submit">Login</button>
                    </form>
                </div>                
            </div>

        </div>
    )
}

export default Login;