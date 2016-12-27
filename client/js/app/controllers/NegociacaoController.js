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

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(listaNegociacao => listaNegociacao.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => console.log(erro));
    }

    adiciona(event) {
        event.preventDefault();
        ConnectionFactory
            .getConnection()
            .then(connection => {
                let negociacao = this._criaNegocio();

                new NegociacaoDao(connection)
                    .adiciona(negociacao).then(() => {
                        this._listaNegociacoes.adiciona(this._criaNegocio());
                        this._mensagem.texto = "Adicionado com sucesso";
                        this._limpaFormulario();

                    }).catch(erro => {
                        console.log(erro);
                        this._mensagem.texto = erro;
                    })
            });
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
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodo())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia(this._listaNegociacoes);
            });

        
    }

    _criaNegocio() {
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            parseFloat(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }


}