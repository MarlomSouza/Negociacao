class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesDiv')),
            'adiciona', 'esvazia');

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

        negociacaoService.obterListaNegociacaoSemana((erro, negociacao) => {
          this._importacao(erro, negociacao);
        });

        negociacaoService.obterListaNegociacaoSemanaAnterior((erro, negociacao) => {
             this._importacao(erro, negociacao);
        });

        negociacaoService.obterListaNegociacaoSemanaRetrasada((erro, negociacao) => {
         this._importacao(erro, negociacao);
        });

    };

    _importacao(erro, negociacao) {
        if (erro) {
            console.log('erro', erro);
            return;
        }
        negociacao.forEach(n => this._listaNegociacoes.adiciona(n));
        this._mensagem.texto = "Importado com sucesso";
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