import { Router } from 'express';
// import { CompanyRoutes } from './company/routers'; //Ejemplo de import


export class AppRoutes {

    static get routes(): Router {

        const router = Router();
        const path = require('path')

        // rutas de apis 
        // router.use('/api/companies', CompanyRoutes.routes); //Ejemplo de creacion de una API

        return router;
    }


}