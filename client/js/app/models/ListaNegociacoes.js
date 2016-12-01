class ListaNegociacoes {

    constructor(executavel) {
        this._negociacoes = [];
        this._executavel = executavel;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._executavel(this);
    }

    esvazia() {
        this._negociacoes = [];
        this._executavel(this);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }



}