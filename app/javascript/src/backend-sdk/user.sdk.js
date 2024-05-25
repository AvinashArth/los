/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class User {
      static remote = new Remote("http://localhost:3000/login")
  
      static async create(name, email, password, userType, gender, phoneNumber, city, country) {
          return User.remote.call("User.create", name, email, password, userType, gender, phoneNumber, city, country)  
      }
  
      static async login(email, password) {
        const jsonData = { email: email, password: password };
            const response = await fetch(`http://localhost:3000/login`, {
                keepalive: true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData),
            });
            return response.json();
        }
  
      static async getUserByToken(token) {
          return User.remote.call("User.getUserByToken", token)  
      }
  
      static async logout(token) {
          return User.remote.call("User.logout", token)  
      }
  
      static async updateUser(token, updatedUser) {
          return User.remote.call("User.updateUser", token, updatedUser)  
      }
  
      static async sendForgotPasswordEmail(email) {
          return User.remote.call("User.sendForgotPasswordEmail", email)  
      }
  
      static async resetPassword(userId, password) {
          return User.remote.call("User.resetPassword", userId, password)  
      }
  
      
  }
  
  export { Remote };
  