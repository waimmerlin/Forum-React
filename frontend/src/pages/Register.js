import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css"

import ErrorBlock from "../components/ErrorBlock";

function Register() {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {}
    });

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleChange = () => {
        setChecked(!checked);
    };

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const errors = validate(values);
        if (Object.keys(errors).length > 0) {
            setValues((prev) => ({ ...prev, errors }));
            setShowModal(true)
            return;
        }

        if (checked && (values.password === values.confirmPassword)) {
            try {
                const response = await axios.post(`/api/v1/register`, { ...values });
                if (response.data.status === 'Success') {
                    navigate('/login');
                } else {
                    alert("Fail");
                }
            } catch (error) {
                console.error('Register request failed')
                setValues(prev => ({ ...prev, errors: { register: 'Register request failed. Please try again.' } }));
            }
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.username) {
            errors.username = "Username is required";
        } else if (values.username.length < 6 || values.username.length > 16) {
            errors.username = "Username must be at least 6 and no more than 16 characters";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (values.email.length < 10 || values.email.length > 50) {
            errors.email = "Email must be at least 5 and no more than 50 characters";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6 || values.password.length > 60) {
            errors.password = "Password must be at least 6 and no more than 60 characters";
        }

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
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
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <input 
                                type="text" 
                                placeholder="Username" 
                                value={values.username}
                                onChange={handleInput}
                                autoComplete="off"
                                name="username"
                                id="username"
                            />
                        </div>

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

                        <div className="form-group">
                            <input
                                type="password"
                                value={values.confirmPassword}
                                onChange={handleInput}
                                placeholder="Confirm Password"
                                autoComplete="off"
                                id="confirmPassword"
                                name="confirmPassword"
                            />
                        </div>
                        <div className="checkbox-group">
                            <label for="remember-me">
                                <input type="checkbox" id="remember-me" checked={values.checked} onChange={handleChange} /> I agree to the Terms of Use
                            </label>
                            <a href="#">Terms of Use</a>
                        </div>
                        <p className="signup">Already have an account? <Link to={'/login'}>Signin</Link></p>
                        <button className="submit-button" type="submit">Register</button>
                    </form>
                </div>                
            </div>
        </div>
    );
}

export default Register;
