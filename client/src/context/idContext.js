import { createContext, useState } from 'react';

const idContext = createContext();

const IdProvider = ({children}) => {                // 칠드런 코드 : 
   const [id, setId] = useState([
        {
            name: '',
            email: '',
            password: '',
            balance: 0,
            id: '',
            token: ''
        }
    ]);

    

    return (
        <idContext.Provider value={{id: id}}>
            {children}
        </idContext.Provider>
    )
}

export { idContext, IdProvider };
