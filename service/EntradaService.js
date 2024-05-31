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
                    entrada.setContenido(item.content);
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

    async getEntradaById(postId){
        return fetch(`https://www.googleapis.com/blogger/v3/blogs/${this.#blogId}/posts/${postId}`, {
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
                //console.log("data:",data);
                let entrada = new Entrada();
                entrada.setId(data.id);
                entrada.setTitulo(data.title);
                entrada.setFechaPublicacion(data.published);
                entrada.setAutor(data.author.displayName);
                entrada.setEtiquetas(data.labels);
                entrada.setContenido(data.content);
                return entrada;
            });
    }

    //Los hago en una misma función ya que lo único que difiere es si existe o no el postId en la url
    async guardarOActualizarEntrada(entrada){
        let url = `https://www.googleapis.com/blogger/v3/blogs/${this.#blogId}/posts/${entrada.getId() ? entrada.getId() : ''}`;
        let metodo = entrada.getId() ? 'PATCH' : 'POST';
        console.log("url: ",url);
        console.log("metodo: ", metodo);

        let datosPost = {
            title: entrada.getTitulo(),
            content: entrada.getContenido(),
            labels: entrada.getEtiquetas()
        };

        console.log("datos: ", datosPost)

        fetch(url, {
            method: metodo,
            headers: {
                'Authorization': `Bearer ${this.#tokenDeAcceso}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosPost)
        })
            .then(response => {
                if (response.ok) {
                    alert(`Post ${entrada.getId() ? 'actualizado' : 'creado'} correctamente.`);
                    location.href = "http://127.0.0.1:5500/bloggerlist.html";
                } else {
                    throw new Error(`No se pudo ${entrada.getId() ? 'actualizar' : 'crear'} el post`);
                }
            })
            .catch(error => console.error('Error:', error));
    }

}