//ModulePattern
var ConnectionFactory = (function ConnectionFactory() {

    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';

    var connection = null;
    var close;

    return class ConnectionFactory {

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
                    if (!connection) {
                        connection = event.target.result;
                        //MONKEY PATCHING

                        //1ª Way to do it with binding 
                        close = connection.close.bind(connection);

                        // 2º way to do it
                        // close = connection.close
                        connection.close = function () {
                            throw new Error('Não pode fechar essa conexão dessa maneira');
                        }
                    }

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

        static closeConnection() {
            if (connection) {
                //1ª Way to do it with binding
                close();
                // 2º way to do it
                // Reflect.apply(close, connection, []);
                connection = null;
                console.log('conexão fechada!');
            }
        }

    }
})();