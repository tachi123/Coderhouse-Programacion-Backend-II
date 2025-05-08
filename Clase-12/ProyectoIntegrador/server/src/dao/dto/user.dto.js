export default class UserDTO{
    constructor(user){
        //VALIDACIONES
        //TRANSFORMACIONES
        this.name = user.first_name;
        this.email = user.email;
        this.role = user.role ? user.role : 'user_role';
    }
}