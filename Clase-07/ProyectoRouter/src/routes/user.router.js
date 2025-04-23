import Router from './js/router.js';

export default class UserRouter extends Router{
    init(){
        //Nota que dentro de "init" realizamos la inicialización de nuestras rutas,
        //esto sería equivalente al "router.get"
        this.get('/', ["PUBLIC"] , (req, res) => {
            res.sendSuccess('Hola Coders');
        });

        this.get('/currentUser', ["USER", "USER_PREMIUM"] ,(req, res) => {
            res.sendSuccess(req.user);
        });
    }
}