# Express + Mongoose
## Consigna
    - Realizar un proyecto en Node.js que se conecte a una base de datos MongoDB llamada “class-zero” a través de mongoose.
    - Crear un model de users llamador “userModel.js” que utilice una colección llamada “users” y tenga la siguiente estructura de datos:
        - name: string, required.
        - age: number, required.
        - email: string, required, unique.
    - Crear un router llamado “userRouter.js” que tenga su ruta principal en “/api/users”.
    - Desarrollar en el router los endpoints correspondientes al CRUD pensado para trabajar con el model de forma asíncrona.
    - Corroborar los resultados con Postman.
