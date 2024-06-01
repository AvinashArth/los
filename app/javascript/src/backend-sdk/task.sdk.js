
   
  import { Remote } from "./remote.js"
  
  export class Task {
      static remote = new Remote("http://127.0.0.1:8083/Task")
  
      static async customerList(id, token, page) {
            const response = await fetch(`${process.env.API_URL}customer/list?page=${page}`, {
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
        static async customerListFilter(id, token, label, value, page) {
            // console.log("filter", id, token, value, label)
            let payload = {};
        
             if (label === "email") {
               payload = {
                "key": "email",
                 "value": value
                };
                const response = await fetch(`${process.env.API_URL}filter/customer/list?page=${page}`, {
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
                 const response = await fetch(`${process.env.API_URL}filter/customer/list?page=${page}`, {
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
               const response = await fetch(`${process.env.API_URL}filter/customer/list?page=${page}`, {
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
                const response = await fetch(`${process.env.API_URL}filter/customer/list=${page}`, {
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
              const response = await fetch(`${process.env.API_URL}filter/customer/list=${page}`, {
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
        
        }
        
        static async contactForm(data, token) {
                const response = await fetch(`${process.env.API_URL}user/query`, {
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
      
       static async dashboardList(token, data) {
        const response = await fetch(`${process.env.API_URL}funnel/stats`, {
            keepalive: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return response.json();
    }

    static async createOnboard(data) {
          const response = await fetch(`${process.env.API_URL}onboard/create`, {
              keepalive: true,
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
          });
          return response.json();
      }      
  }
  
  export { Remote };
  