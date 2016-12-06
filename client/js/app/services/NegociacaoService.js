class NegociacaoService {

    constructor() {
        this.http = new HttpService();
    }

    obterListaNegociacaoSemana() {
        return this._obterListaNegociacao('negociacoes/semana');
    }

    obterListaNegociacaoSemanaAnterior() {
        return this._obterListaNegociacao('negociacoes/anterior');
    }

    obterListaNegociacaoSemanaRetrasada() {
        return this._obterListaNegociacao('negociacoes/retrasada');
    }

    _obterListaNegociacao(url) {
        return new Promise((resolve, reject) => {
            this.http.get(url)
                .then(negociacao => resolve(negociacao.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => {
                    console.log(erro);
                    reject(`Não foi possivel obter as negociações de URL: ${url}`)
                });
        });
    }
}