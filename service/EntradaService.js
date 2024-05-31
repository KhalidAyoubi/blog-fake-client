import { Entrada } from "../model/Entrada.js";

export class EntradaService {
    async getEntradas() {
        const blogId = "3231631406467359623";
        let info = localStorage.getItem('authInfo') ? JSON.parse(localStorage.getItem('authInfo')) : null;
        let tokenDeAcceso = info ? info['access_token'] : '';

        let url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;

        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenDeAcceso}`,
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
                    console.log("Entrada objecte:",entrada);
                    return entrada;
                });
            });
    }
}