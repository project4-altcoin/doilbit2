import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        axios.post("http://localhost:3001/api/v1/login", user, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
            .then(res => {  
                console.log("res :", res);
                const cookie = document.cookie;
                console.log(cookie);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        setEmail(user.email);
        setPassword(user.password);
    }, [user]);

    return (
        <div class="grid">
          <div class="bg-white rounded-lg shadow flex  justify-center">
                <div>
                    <form action="/Login" method="post">
                        <p class="text-gray-700 text-xl font-semibold">
                        <h1>Login</h1><br />
                            <label>Username: <input class="bg-green-400 text-black" type="text" name="email" value={email} onChange={handleChange}/></label>
                            <br /><br />
                            <label>Password: <input class="bg-green-400 text-black" type="text" name="password" value={password} onChange={handleChange}/></label>
                            <br /><br />
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <button class="rounded-full py-2 px-3 bg-black text-white" onClick={handleSubmit}>Login</button>
                            </div>
                        </p>
                        </form>      
                     </div>
                </div>
        </div>
    );
}

export default Login;