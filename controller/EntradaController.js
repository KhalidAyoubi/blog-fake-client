import { EntradaService } from "../service/EntradaService.js";

export class EntradaController{
    #entradaService;

    constructor(entradaService) {
        this.#entradaService = new EntradaService();
    }

    getEntradas(){
        return this.#entradaService.getEntradas();
    }

    borrarEntrada(postId){
        this.#entradaService.borrarEntrada(postId);
    }

    getEntradaById(postId){
        return this.#entradaService.getEntradaById(postId);
    }

    guardarOActualizarEntrada(entrada){
        this.#entradaService.guardarOActualizarEntrada(entrada);
    }
}