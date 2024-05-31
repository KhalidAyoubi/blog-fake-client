import { AuthService } from '../service/AuthService.js';

export class AuthController {

    #authService;
    constructor(){
        this.#authService = new AuthService();
    }

    logIn(){
        this.#authService.logIn();
    }

    logOut(){
        this.#authService.logOut();
    }
}

