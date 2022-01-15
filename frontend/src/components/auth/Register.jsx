import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Register () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [firstName, setFirstname] = useState();
    const [lastName, setLastname] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {email, password, firstName,lastName,phone,address};
            await axios.post("http://localhost:5000/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:5000/users/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
   
    return ( 
        <div className="register" >
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                <br />
                <label>Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                <br />
                <label>First name: </label>
                <input type="text" id="firstName" onChange={e => setFirstname(e.target.value)}/>
                <br />
                <label>Last name: </label>
                <input type="text" id="lastName" onChange={e => setLastname(e.target.value)}/>
                <br />
                <label>Phone: </label>
                <input type="text" id="phone" onChange={e => setPhone(e.target.value)}/>
                <br />
                <label>Address: </label>
                <input type="text" id="address" onChange={e => setAddress(e.target.value)}/>
                <br />
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
        );
}
 
export default Register;