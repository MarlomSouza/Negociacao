class DataHelper {

    constructor(){
        throw new Error("Não pode ser instanciada")
    }

    static textoParaData(texto) {
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${(data.getMonth() + 1)}/${ data.getFullYear()}`;
    }

}