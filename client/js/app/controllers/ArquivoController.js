class ArquivoController {
    constructor() {
        this._inputDados = document.querySelector('.dados-arquivo');
        
    }

    envia() {
        console.log(this._inputDados.value);
        let dados = ArquivoHelper.TextToFile(this._inputDados.value);
        let arquivo = new Arquivo(...dados);
        console.log('Arquivo',arquivo);
        console.log('Nome',arquivo.nome);
        console.log('Nome',arquivo.tamanho);
        console.log('Nome',arquivo.tipo);

        this._limpaFormulario();
    }

    _limpaFormulario(){
        this._inputDados.value = '';
        this._inputDados.focus();
    }

}