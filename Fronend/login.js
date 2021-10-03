let login = document.getElementById('loginForm');

let lusername = document.getElementById('lusername');
let lpassword = document.getElementById('lpassword');
let lmsg = document.getElementById('lmsg');

login.addEventListener('submit', (e)=>{
    e.preventDefault();
    data = {
        username: lusername.value,
        password: lpassword.value
    };    
    options = {        
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",            
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3030/login', options).then(jsondata=>jsondata.json()).then(
        data => {
            console.log(data);
            if(data.msg.includes('password')){
                console.log(data);                
                lmsg.textContent = 'invalid password';             
            } else if(data.msg.includes('user')) {
                lmsg.textContent = 'invalid user';             
            } else {
                location.href = 'dashboard.html';                     
            }
        }
    ).catch(e => console.log(e));        
});