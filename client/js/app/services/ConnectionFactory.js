var stores = ['negociacoes'];
var version = 4;
var dbName = 'aluraframe';
var connection = null;

class ConnectionFactory {

    constructor() {
        throw new Error('Não pode ser instanciada');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = event => {
                ConnectionFactor._createStores(event.target.result);
            };

            openRequest.onsuccess = event => {
                if(!connection)
                    connection = event.target.result;
                
                resolve(connection);
            };

            openRequest.onerror = event => {
                console.log("DEU RUIM NA CONEXAO")
                reject(event.target.result);
            };
        });
    }

    static _createStores(connection) {
        stores.forEach(stores => {
            if (connection.objectStoreNames.contains(stores)) {
                connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, { autoIncrement: true });

        });
    }

}