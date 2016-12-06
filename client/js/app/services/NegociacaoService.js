class NegociacaoService {

    obterListaNegociacaoSemana(cb) {
        return this._obterListaNegociacao('negociacoes/semana', cb);
    }

    obterListaNegociacaoSemanaAnterior(cb) {
        return this._obterListaNegociacao('negociacoes/anterior', cb);
    }
    obterListaNegociacaoSemanaRetrasada(cb) {
        return this._obterListaNegociacao('negociacoes/retrasada', cb);
    }

    _obterListaNegociacao(semana, cb) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', semana);

        xhr.onreadystatechange = (status) => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                }
                else {
                    cb(xhr.responseText, null);
                }
            }
        };
        xhr.send();
    }
}