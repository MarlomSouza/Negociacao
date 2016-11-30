class NegociacoesView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(model) {
        return `<table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>

        <tbody>
        </tbody>
        ${model.negociacoes.map(n => {
                return `
                    <tr> 
                        <td>${DataHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.obterVolume()}</td>
                    </tr>
                    `
            }).join('')}
        <tfoot>
        <td colspan="3" style="text-align:right">Total</td>
        <td>
            ${model.negociacoes.reduce((valor, n) =>  valor + n.obterVolume(), 0)} 
        </td>
        </tfoot>
    </table>`;
    }

    update(model) {
        this._elemento.innerHTML = this._template(model);
    }
}

