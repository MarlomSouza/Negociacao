class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento);
    }


    template(model) {
        return `<table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th onclick="negociacaoController.ordena('data')"><i class="fa fa-fw fa-sort"></i> DATA</th>
                <th onclick="negociacaoController.ordena('quantidade')"><i class="fa fa-fw fa-sort"></i> QUANTIDADE</th>
                <th onclick="negociacaoController.ordena('valor')"><i class="fa fa-fw fa-sort"></i> VALOR</th>
                <th onclick="negociacaoController.ordena('volume')"><i class="fa fa-fw fa-sort"></i> VOLUME</th>
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
            ${model.negociacoes.reduce((valor, n) => valor + n.obterVolume(), 0)} 
        </td>
        </tfoot>
    </table>`;
    }
}

