class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesDiv')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(),
            new MensagemView($('#mensagemDiv')),
            'texto');
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegocio());
        this._mensagem.texto = "Adicionado com sucesso";
        this._limpaFormulario();
    }

    importaNegociacao() {
        let negociacaoService = new NegociacaoService();
        Promise.all([
            negociacaoService.obterListaNegociacaoSemana(),
            negociacaoService.obterListaNegociacaoSemanaAnterior(),
            negociacaoService.obterListaNegociacaoSemanaRetrasada()
        ]).then(negociacoes => {
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(n => this._listaNegociacoes.adiciona(n));
            this._mensagem.texto = "Importado com sucesso";
        }
            ).catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {
        console.log(coluna);
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    apaga() {
        this._listaNegociacoes.esvazia(this._listaNegociacoes);
        this._mensagem.texto = "Itens removido";
    }

    _criaNegocio() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }


}