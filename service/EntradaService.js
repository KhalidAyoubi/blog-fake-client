import { Entrada } from "../model/Entrada.js";

export class EntradaService {
    #blogId = "3231631406467359623";
    #info = localStorage.getItem('authInfo') ? JSON.parse(localStorage.getItem('authInfo')) : null;
    #tokenDeAcceso = this.#info ? this.#info['access_token'] : '';

    async getEntradas() {
        let url = `https://www.googleapis.com/blogger/v3/blogs/${this.#blogId}/posts`;

        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.#tokenDeAcceso}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: No se han podido obtener las entradas del blog');
                }
            })
            .then(data => {
                console.log(data.items);
                return data.items.map((item) => {
                    let entrada = new Entrada();
                    entrada.setId(item.id);
                    entrada.setTitulo(item.title);
                    entrada.setFechaPublicacion(item.published);
                    entrada.setAutor(item.author.displayName);
                    entrada.setEtiquetas(item.labels);
                    //console.log("Entrada objecte:",entrada);
                    return entrada;
                });
            });
    }

    async borrarEntrada(postId){
        let url = `https://www.googleapis.com/blogger/v3/blogs/${this.#blogId}/posts/${postId}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.#tokenDeAcceso}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 204) {
                    alert('Post borrado exitosamente.');
                    window.location.reload(); // Recargar la página para reflejar los cambios
                } else {
                    throw new Error('Error al borrar el post');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}