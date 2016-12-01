class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new ListaNegociacoes(programa => this._negociacoesView.update(programa));

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemDiv'));

        this._negociacoesView = new NegociacoesView($('#negociacoesDiv'))
        this._negociacoesView.update(this._listaNegociacoes);
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegocio());

        this._mensagem.text = "Adicionado com sucesso";
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacoes.esvazia(this._listaNegociacoes);
        this._mensagem.text = "Itens removido";
        this._mensagemView.update(this._mensagem);
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