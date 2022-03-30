import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";


const Logout = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        axios.post("http://localhost:3001/api/v1/logout", user, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
            .then(res => {  
                
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
                    <form action="/Logout" method="post">
                        <p class="text-gray-700 text-xl font-semibold">
                        <h1>Logout</h1><br />
                            <button class="rounded-full py-2 px-3 bg-black text-white" onClick={handleSubmit}>Logout</button>
                        </p>
                        </form>      
                     </div>
                </div>
        </div>
    );
}

export default Logout;