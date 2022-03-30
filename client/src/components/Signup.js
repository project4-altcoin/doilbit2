import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";



const Signup = () => {
    const [user, setUser] = useState({
        userId: "",
        password: "",
        passwordConfirmation: "",
        email: ""
    });
    
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
    
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        axios.post("http://localhost:3001/exchange/signup", user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        setUserId(user.userId);
        setPassword(user.password);
        setEmail(user.email);
        setPasswordConfirmation(user.passwordConfirmation);
    }, [user]);



    return (
        <div class="">
          <div class="bg-white rounded-lg shadow flex  justify-center">
                <div>
                    <form action="/signup" method="post">
                        <p class="text-gray-700 text-xl font-semibold">
                        <h1>Signup</h1><br />
                            <label>Username: <input class="bg-green-400 text-black" type="text" name="userId" value={userId} onChange={handleChange}/></label>
                            <br /><br />
                            <label>Password: <input class="bg-green-400 text-black" type="text" name="password" value={password} onChange={handleChange}/></label>
                            <br /><br />
                            <label>passwordConfirmation: <input class="bg-green-400 text-black" type="text" name="passwordConfirmation" value={passwordConfirmation} onChange={handleChange}/></label>
                            <br /><br />
                            <label>Email: <input class="bg-green-400 text-black" type="text" name="email" value={email} onChange={handleChange}/></label>
                            <br /><br />
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <button class="rounded-full py-2 px-3 bg-black text-white" onClick={handleSubmit}>Signup</button>
                            </div>
                        </p>
                    </form>
                   
                        
          </div>
                </div>
        </div>
    );
}

export default Signup;