export class Entrada {
    #id;
    #titulo;
    #fechaPublicacion;
    #autor;
    #etiquetas

    /*constructor(id, titulo, fechaPublicacion, autor, etiquetas) {
        this._id = id;
        this._titulo = titulo;
        this._fechaPublicacion = fechaPublicacion;
        this._autor = autor;
        this.#etiquetas = etiquetas;
    }*/

    constructor() {
    }

    getId() {
        return this.#id;
    }

    setId(value) {
        this.#id = value;
    }

    getTitulo() {
        return this.#titulo;
    }

    setTitulo(value) {
        this.#titulo = value;
    }

    getFechaPublicacion() {
        return this.#fechaPublicacion;
    }

    setFechaPublicacion(value) {
        this.#fechaPublicacion = value;
    }

    getAutor() {
        return this.#autor;
    }

    setAutor(value) {
        this.#autor = value;
    }

    getEtiquetas() {
        return this.#etiquetas;
    }

    setEtiquetas(value) {
        this.#etiquetas = value;
    }
}