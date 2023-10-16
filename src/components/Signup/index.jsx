import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../../Firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { setDoc } from "firebase/firestore";
const Signup = (props) => {


    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [valid, setValid] = useState(""); // Corrected the useState destructuring
    const data = {
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [login, setLogin] = useState(data);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLogin({ ...login, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, pseudo } = login;
        createUserWithEmailAndPassword(auth, email, password)
            .then(authUser => {
                return setDoc(user(authUser.user.uid), {
                    pseudo,
                    email
                });
            })
            .then(() => {
                setLogin(data);
                setValid("Inscription validée");
                navigate('/Welcome');
            })
            .catch((error) => {
                setError(error);
                setLogin(data);
            });
    };

    const btnFinish =
        login.pseudo === "" ||
            login.email === "" ||
            login.password === "" ||
            login.password !== login.confirmPassword ? (
            <button disabled>Inscritption</button>
        ) : (
            <button>Inscritption</button>
        );

    const errorMsg = error !== "" && <span>{error.message}</span>;
    const validMsg = (valid !== "" && error !== "") && (
        <span style={{ color: "green", border: "1px solid var(--green-color)" }}>
            {valid}
        </span>
    );

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup"></div>
                <div className="formBoxRight">
                    {errorMsg}
                    {validMsg}
                    <div className="formContent">
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    value={login.pseudo}
                                    type="text"
                                    id="pseudo"
                                    required
                                    autoComplete="off"
                                />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    value={login.email}
                                    type="email"
                                    id="email"
                                    required
                                    autoComplete="off"
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    value={login.password}
                                    type="password"
                                    id="password"
                                    required
                                    autoComplete="off"
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    value={login.confirmPassword}
                                    type="password"
                                    id="confirmPassword"
                                    required
                                    autoComplete="off"
                                />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                            {btnFinish}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">
                                Vous êtes déjà inscrit ? Connectez vous{" "}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
