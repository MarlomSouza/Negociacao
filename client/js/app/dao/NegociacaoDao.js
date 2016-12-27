class NegociacaoDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            var request = this._connection.transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = event => {
                resolve();
            };

            request.onerror = event => {
                console.log('deu ruim: ', event);
                reject(event);
            };
        })
    }

    listaTodos() {
        return new Promise((resolve, reject) => {

            let cursor = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = event => {
                let atual = event.target.result;

                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                }
                else {
                    resolve(negociacoes)

                }
            };

            cursor.onerror = event => {
                reject(event);
                console.log('Não foi possivel carregar os dados!', event);
            };
        });
    }

    apagaTodo() {
        return new Promise((resolve, reject) => {

            let request = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = event => { resolve("Negociações apagadas!") };

            request.onerror = event => { reject("Não foi possivel apagar as negociações!") };
        });
    }

}