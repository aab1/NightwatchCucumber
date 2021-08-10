const superagent = require('superagent');
/*
This is how to use post
(async () => {
    try {
      const res = await superagent.post('http://localhost:3001/api/patients/').send(
        {
            "addresses": null,
            "dob": "2021-06-28",
            "email_options": 0,
            "emails": null,
            "first_name": "superAgentTest",
            "gender": "Female",
            "is_declined_to_provide_addresses": 0,
            "is_declined_to_provide_phones": 0,
            "languages": null,
            "last_name": "Superagent",
            "middle_name": "M",
            "phones": null,
            "source_id": 1,
            "source_patient_id": "werwe54545",
            "ssn": "4546"
        }
      ).set({
          cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwic3ViIjoidGVzdEB0cmVsbGlzcnh0ZXN0b3V0bG9vay5vbm1pY3Jvc29mdC5jb20iLCJuYW1lIjoiVGVzdCBTdXBlciBVc2VyIiwiY3VzdG9tZXJfaWQiOjIsImlhdCI6MTYyNDkxMjUwMSwiZXhwIjoxNjI0OTk4OTAxfQ.GgdlR3Ssr9hUi7mh5n9J5Sz_gD5CoYgRoIrMYrWlV84"
      });
      console.log(res.body);
    } catch (err) {
      console.error(err);
    }
  })();
  */

 //https://reqres.in/api/users?page=2
 /**
  * This is how to use the get method
  */
//  (async () => {
//     try {
//       const res = await superagent.get('https://reqres.in/api/users?page=2');
//       console.log(res.body);
//     } catch (err) {
//       console.error(err);
//     }
//   })();

//   note that you can run just this page by using: 
// node index.js

// loop through Array of objects
let studentProfile = [
    {
        "id": 8,
        "firstName": "Jermaine",
        "lastName": "Alden",
        "email": "scelerisque.sed@senectuset.org",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 25,
        "firstName": "Paki",
        "lastName": "Samson",
        "email": "ornare@Mauriseuturpis.edu",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 29,
        "firstName": "Arden",
        "lastName": "Abel",
        "email": "consequat.enim@ultricessit.com",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 32,
        "firstName": "Noah",
        "lastName": "Oren",
        "email": "Proin.vel@placerat.org",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 33,
        "firstName": "Mason",
        "lastName": "Barry",
        "email": "id@incursus.co.uk",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 34,
        "firstName": "Elliott",
        "lastName": "Brady",
        "email": "Vestibulum@adlitora.net",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 44,
        "firstName": "Cedric",
        "lastName": "Zeus",
        "email": "Quisque.tincidunt@nullaanteiaculis.co.uk",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 46,
        "firstName": "Walter",
        "lastName": "Phelan",
        "email": "diam@nectellusNunc.edu",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 48,
        "firstName": "Kane",
        "lastName": "Alec",
        "email": "dignissim.Maecenas.ornare@adui.edu",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 52,
        "firstName": "Burton",
        "lastName": "Merrill",
        "email": "mauris@malesuada.ca",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 53,
        "firstName": "Rafael",
        "lastName": "Vladimir",
        "email": "mauris.ipsum.porta@sit.ca",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 56,
        "firstName": "Boris",
        "lastName": "Dexter",
        "email": "purus@mollis.co.uk",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 66,
        "firstName": "Tate",
        "lastName": "Martin",
        "email": "ante.blandit@semeget.org",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    },
    {
        "id": 85,
        "firstName": "Charles",
        "lastName": "Randall",
        "email": "ipsum.porta.elit@morbitristique.net",
        "programme": "Law",
        "courses": [
            "Criminal Law",
            "Constitutional Law",
            "Property Law",
            "Contracts"
        ]
    }
]

for (let i = 0; i < studentProfile.length; i++){
    if (studentProfile[i].id == 85) {
        console.log(studentProfile[i].email);
    }
}

function getDateTime() {
    let now     = new Date(); 
    let year    = now.getFullYear();
    let month   = now.getMonth()+1; 
    let day     = now.getDate();
    let hour    = now.getHours();
    let minute  = now.getMinutes();
    let second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    let dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

// example usage: realtime clock
// setInterval(function(){
    // currentTime = getDateTime();
    // document.getElementById("digital-clock").innerHTML = currentTime;
// }, 1000);
console.log(getDateTime());