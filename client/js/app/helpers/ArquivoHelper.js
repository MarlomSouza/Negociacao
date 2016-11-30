class ArquivoHelper {

    constructor() {
        throw new Error("Esta classe não pode ser instanciada!");
    }

    static TextToFile(text) {
        return text.split('/').map((item) => item.toUpperCase());
    }
}