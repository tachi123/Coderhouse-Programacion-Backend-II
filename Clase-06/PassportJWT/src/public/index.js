document.getElementById('loginForm').addEventListener('submit',
    async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        if(response.ok){
            console.log('Login exitoso');
            console.log(document.cookie); //Mostrar la cookie si viene sin HttpOnly
            //Redirigir
        }else{
            console.error("Error en el login")
        }
    }
)