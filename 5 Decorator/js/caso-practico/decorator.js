// Clase Principal No se modifica nunca
class ClientComponent {
    constructor(url) {
        this.url = url;
    }

    async getData() {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
    }
}

//decorator principal que es un envoltorio, nunca será utilizada, se utilizarán clases que hereden de esta
class ClientDecorator {
    constructor(clientComponent) {
        this.clientComponent = clientComponent;
    }

    async getData() {
        return await this.clientComponent.getData();
    }
}

// Decoradores envoltorios

//decorator 1
class UpperCaseClientDecorator extends ClientDecorator {

    async getData() {
        const data = await super.getData();
        return data.map(photo => {
            photo.title = photo.title.toUpperCase();
            return photo;
        });
    }
}

//decorator 2
class HtmlCaseClientDecorator extends ClientDecorator {

    async getData() {
        const data = await super.getData();
        return data.map(photo => {
            photo.title = `<h1>${photo.title}</h1>`;
            photo.thumbnail = `<img src="${photo.thumbnailUrl}"/>`;
            return photo;
        });
    }
}

// Execute

// IEF Funcion Ejecutada Inmediatamente
( async (url)=> {

    const client = new ClientComponent(url);
    // const data = await client.getData();
    // console.log({data});

    const upperClient = new UpperCaseClientDecorator(client);
    // const data2 = await upperClient.getData();
    // console.log({data2});

    const htmlClient = new HtmlCaseClientDecorator(upperClient);
    const data3 = await htmlClient.getData();
    // console.log({data3});
    // divContent1.innerHTML = data3.map(photo => (`${photo.title} ${photo.thumbnail}`)); // Esta era mi manera, pero la del prof era mejor con reduce
    divContent1.innerHTML = data3.reduce((ac, photo) => (`${ac} ${photo.title} ${photo.thumbnail}`), "");

    const htmlClient2 = new HtmlCaseClientDecorator(client);
    const data4 = await htmlClient2.getData();
    divContent2.innerHTML = data4.reduce((ac, photo) => (`${ac} ${photo.title} ${photo.thumbnail}`), "");

})("https://jsonplaceholder.typicode.com/photos");

