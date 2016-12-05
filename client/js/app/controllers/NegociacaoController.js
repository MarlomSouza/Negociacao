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
        let xhr = new XMLHttpRequest();

        xhr.open('Get', 'negociacoes/semana');


        xhr.onreadystatechange = (status) => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log(xhr.responseText);
                }
                else {
                    console.log('ERROR');
                }
            }
        };
        xhr.send();
    };


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