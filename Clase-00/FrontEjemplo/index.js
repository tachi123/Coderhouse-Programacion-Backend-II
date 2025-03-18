function peticion(){

    fetch('http://localhost:8080/api/user/test')
        .then(result => result.json())
        .then(json => console.log(json)
    )
}

function obtenerUsuarios(){

    fetch('http://localhost:8080/api/user')
        .then(result => result.json())
        .then(json => console.log(json)
    )
}