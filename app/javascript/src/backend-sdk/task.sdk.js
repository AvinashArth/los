/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class Task {
      static remote = new Remote("http://127.0.0.1:8083/Task")
  
      static async getChartData(token) {
          return Task.remote.call("Task.getChartData", token)  
      }
      static async customerList(id, token) {
        const jsonData = { id: id};
            const response = await fetch(`http://localhost:3000/customer/list`, {
                keepalive: true,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            // console.log("kk", token)
            return response.json();
        }
        static async customerListFilter(id, token, label, value) {
            console.log("filter", id, token, value, label)
            let payload = {};
        
             if (label === "email") {
               payload = {
                "key": "email",
                 "value": value
                };
                const response = await fetch(`http://localhost:3000/filter/customer/list`, {
         keepalive: true,
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           },
         body: JSON.stringify(payload),
        });
        return response.json()
             } else if (label === "Customer Id") {
                payload = {
                  "key": "customer_info_id",
                   "value": value
                 };
                 const response = await fetch(`http://localhost:3000/filter/customer/list`, {
         keepalive: true,
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           },
         body: JSON.stringify(payload),
        });
        return response.json()
             } 
        //      else if (label === "Customer Name") {
        //        payload = {
        //         "key": "name",
        //         "value": value
        //         };
        //         const response = await fetch(`http://localhost:3000/filter/customer/list`, {
        //  keepalive: true,
        //  method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //      'Authorization': `Bearer ${token}`
        //    },
        //  body: JSON.stringify(payload),
        // });
        // return response.json()
        //     } 
            else if (label === "Mobile Number") {
              payload = {
              "key": "mobile",
              "value": value
               };
               const response = await fetch(`http://localhost:3000/filter/customer/list`, {
         keepalive: true,
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           },
         body: JSON.stringify(payload),
        });
        return response.json()
            } else if (label === "Loan Amount") {
                payload = {
                "key": "amount_offered",
                "value": value
                };
                const response = await fetch(`http://localhost:3000/filter/customer/list`, {
         keepalive: true,
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           },
         body: JSON.stringify(payload),
        });
        return response.json()
             } else if (label === "Status") {
               payload = {
               "key": "status",
                "value": value
              };
              const response = await fetch(`http://localhost:3000/filter/customer/list`, {
         keepalive: true,
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           },
         body: JSON.stringify(payload),
        });
        return response.json()
            }

        // console.log("filterpayload", payload);

// Fetch code for sending payload as POST request
        
        }
        
        static async contactForm(data, token) {
                const response = await fetch(`http://localhost:3000/user/query`, {
                    keepalive: true,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data),

                });
                return response.json();
            }
      
  //funnel/stats
  static async dashboardList(id,token) {
        const response = await fetch(`http://localhost:3000/funnel/stats`, {
            keepalive: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        // console.log("kk", token)
        return response.json();
    }
    //onboard/create
    static async createOnboard(data) {
      console.log("mkfk")
          const response = await fetch(`http://localhost:3000/onboard/create`, {
              keepalive: true,
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
          });
          return response.json();
      }
      static async getAll(token) {
          return Task.remote.call("Task.getAll", token)  
      }
  
      static async getById(token, id) {
          return Task.remote.call("Task.getById", token, id)  
      }
  
      static async create(token, title, description, dueDate, assignedTo, madeBy, status) {
          return Task.remote.call("Task.create", token, title, description, dueDate, assignedTo, madeBy, status)  
      }
  
      static async update(token, id, title, description, dueDate, assignedTo, madeBy, status) {
          return Task.remote.call("Task.update", token, id, title, description, dueDate, assignedTo, madeBy, status)  
      }
  
      static async delete(token, id) {
          return Task.remote.call("Task.delete", token, id)  
      }
  
      
  }
  
  export { Remote };
  