class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
        console.log("NEW LISTA NEGOCIAÇÕES");
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

}