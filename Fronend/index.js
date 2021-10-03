let signup = document.getElementById('signupForm');
let susername = document.getElementById('susername');
let sname = document.getElementById('sname');
let spassword = document.getElementById('spassword');
let slocation = document.getElementById('slocation');
let sgender  = document.getElementById('sgender');
let login = document.getElementById('loginForm');

let lusername = document.getElementById('lusername');
let lpassword = document.getElementById('lpassword');
let signupMsg = document.getElementById('signupMsg');


signup.addEventListener('submit', (e)=>{
    e.preventDefault();
    fetch('http://localhost:3030/register', {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },        
        body:JSON.stringify({
            "username": susername.value,
            "password": spassword.value,
            "name": sname.value,
            "gender": sgender.value,
            "location": slocation.value
        })

    }).then(data=> data.json()).then(jsondata => {
        if (jsondata.msg.includes('exists')){
            signupMsg.textContent = '';
            signupMsg.textContent = "username already  exists";            
        } else if (jsondata.msg.includes('short')){
            signupMsg.textContent = '';
            signupMsg.textContent = 'password must be minimum 5 letters';            
        } else {
            location.href = 'login.html';
        }
        
    })
    .catch(e=>{
        console.log(e.status);                
    });    
});



// signup.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     let data = {
//                 "username": susername.value,
//                 "password": spassword.value,
//                 "name": sname.value,
//                 "gender": sgender.value,
//                 "location": slocation.value
//     };
//     console.log('hello');
//     let options = {
//         method: "POST",
//         headers: {
//         "content-type": "application/json",
//         // Accept: "application/json",
//         //   Authorization: "Bearer ACCESS-TOKEN"
//         },
//         body: JSON.stringify(data)
//     };
    
//     fetch("https://localhost:3000/register", options)
//         .then(function(response) {
//         return response.json();
//         })
//         .then(function(jsonData) {
//         console.log(jsonData);
//         }).catch((e)=>{
//             console.log(e);
//         });
//     console.log('end');
// });

