/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class User {

     static async login(email, password) {
        const jsonData = { email: email, password: password };
            const response = await fetch(`${process.env.API_URL}login`, {
                keepalive: true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData),
            });
            return response.json();
        }
  
  }
  
  export { Remote };
  