class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){//Validar dentro da propria class
            if(this[i] == undefined || this[i]== '' || this[i] == null){
                return false
            }
        } //Pode se usado tanto para arrays quanto para objetos
        return true //Caso você tenha feito o cadastro de todas as informações corretas, ele vai cadastrar a despesa
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)//Para o primeiro valor ser 0 se não existir um primeiro valor
        }
    }

    getProximoId(){//Para não sobrepor a despesa cadastrada
        let proximoId = localStorage.getItem('id')//Null  --  Recuperar dados
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))//Aqui temos o item que queremos colocar em localstorage(despesa) e o item(d)
       
        localStorage.setItem('id', id)
    }                                                     //comunicação via JSON

      recuperarTodosRegistros(){

        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')
        //Recuperar todas as despesas cadastradas em localStorage
  
        for (let i = 1; i <=id; i++){//"i=1" pois os registros começam em 1
                                    //"i <=id " checar se o valor é menor que o id que estamos recuperando
          //Recuperar despesas
          let despesa = JSON.parse(localStorage.getItem(i))//para converter de string para um objeto literal

          //Ver a poissibilidade de haver índices que foram pulados-removidos
          //nesses casos nós vamos pular esses índices
            
          if (despesa === null){
            continue//Ele vai pular o null e continuar com o array, retirando qualquer despesa que for excluida
          }
        
          despesa.id = i
          despesas.push(despesa)//Para conter as despesas dentro do localStorage
        }

        return despesas
    }

    pesquisar(despesa){

        let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()
		console.log(despesasFiltradas);
		console.log(despesa)

		//ano
		if(despesa.ano != ''){
			console.log("filtro de ano");
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
			
		//mes
		if(despesa.mes != ''){
			console.log("filtro de mes");
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//dia
		if(despesa.dia != ''){
			console.log("filtro de dia");
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//tipo
		if(despesa.tipo != ''){
			console.log("filtro de tipo");
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//descricao
		if(despesa.descricao != ''){
			console.log("filtro de descricao");
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//valor
		if(despesa.valor != ''){
			console.log("filtro de valor");
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		
		return despesasFiltradas

	}

    remover(id){
        localStorage.removeItem(id)
    }

}

    

let bd = new Bd()



function cadastrarDespesa(){
    let ano = document.getElementById('ano')//Seleção dos elementos na página
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(//Receber esses dados no constructor
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
        
    )
    if(despesa.validarDados()){
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal-titulo-div').className = 'modal-header text-sucess'

        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById('modal_conteudo').className = 'modal-body'

        document.getElementById('modal-button').innerHTML = 'Confirmar'
        document.getElementById('modal-button').className = 'btn btn-success'

        bd.gravar(despesa)
        
        //dialogo de sucesso
        $('#modalRegistraDespesa').modal('show')
        

    } else{ 

        
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal-titulo-div').className = 'modal-header text-danger'

        document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatorios que não foram preenchidos. <br> Verifique se está faltando alguma informação!'
        document.getElementById('modal_conteudo').className = 'modal-body'

        document.getElementById('modal-button').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal-button').className = 'btn btn-danger'
        $('#modalRegistraDespesa').modal('show')
    }

    // Adiciona um event listener ao botão com o ID 'modal-button'
    document.getElementById('modal-button').addEventListener('click', function() { // Adiciona um listener para o evento 'click' ao botão.
    // Quando o botão é clicado, a função anônima fornecida será executada.

    // Seleciona todos os elementos <input> e <select> dentro do formulário com o ID 'form'
    let inputs = document.querySelectorAll('#form input, #form select'); // document.querySelectorAll('#form input, #form select') retorna uma NodeList de todos os elementos <input> e <select> que são descendentes do elemento com o ID 'form'. 
    //Este seletor CSS seleciona todos os campos de entrada e listas suspensas no formulário.
    
    // Itera sobre cada elemento da NodeList 'inputs'
    inputs.forEach(function(input) { // O método forEach é usado para executar uma função fornecida uma vez para cada elemento da NodeList. 
    //Aqui, para cada elemento 'input' na NodeList 'inputs', a função fornecida será executada.
    
    // Define o valor do elemento como uma string vazia, limpando o campo
    input.value = ''; // Define input.value como uma string vazia. 
    //Isso limpa o valor do campo de entrada, redefinindo-o para um estado vazio.
    });
});
    

    }

    function carregaListaDespesas(despesas = Array(), filtro = false){//Irá carregar somente quando for carregada a pagina de consulta
    
        if(despesas.length == 0 && filtro == false){

            despesas = bd.recuperarTodosRegistros()

    }

    //Seleção do tbody
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ""

    //Percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d){
        
    //criando a linha <tr>
    let linha = listaDespesas.insertRow()

    //Criar as colunas <td>
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` //representa o conteudo dentro da celula
    

        //ajustar o tipo

    switch(d.tipo){
        case '1': d.tipo = 'Alimentação'
        break
        case '2': d.tipo = 'Educação'
        break
        case '3': d.tipo = 'Lazer'
        break
        case '4': d.tipo = 'Saúde'
        break
        case '5': d.tipo = 'Transporte'
        break
    }   

    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor

    //criar botão de exclusão
    let btn = document.createElement("button")
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fas fa-times"></i>'
    btn.id = `id_despesa_${d.id}` //Acessando o atrinuto id do objeto despesa e assiciando no botão
    btn.onclick = function(){

        let id = this.id.replace('id_despesa_', '')

        bd.remover(id)

        window.location.reload()

    }
    linha.insertCell(4).append(btn)//Criar um botão ao lado para a exclusão das linhas de despesas

    })  

    // Calcular o total das despesas
    let totalDespesas = despesas.reduce((total, d) => total + parseFloat(d.valor), 0).toFixed(2); // Somar os valores das despesas

    // Exibir o total no elemento HTML
    document.getElementById('totalDespesas').innerHTML = `<strong>Total:</strong> R$ ${totalDespesas}`; // Exibir o total formatado
}



function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)//Receber esses dados no constructor

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
}