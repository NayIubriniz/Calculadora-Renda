// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
    let despesas = JSON.parse(localStorage.getItem('despesas')) || [];

    function adicionarReceita(valor, descricao) {
        receitas.push({ valor, descricao });
        localStorage.setItem('receitas', JSON.stringify(receitas));
        atualizarResultados();
    }

    function adicionarDespesa(valor, descricao) {
        despesas.push({ valor, descricao });
        localStorage.setItem('despesas', JSON.stringify(despesas));
        atualizarResultados();
    }

    function totalReceitas() {
        return receitas.reduce((total, item) => total + item.valor, 0);
    }

    function totalDespesas() {
        return despesas.reduce((total, item) => total + item.valor, 0);
    }

    function saldoFinal() {
        return totalReceitas() - totalDespesas();
    }

    function atualizarResultados() {
        document.getElementById('total-receitas').innerText = totalReceitas().toFixed(2);
        document.getElementById('total-despesas').innerText = totalDespesas().toFixed(2);
        document.getElementById('saldo-final').innerText = saldoFinal().toFixed(2);

        const listaReceitas = document.getElementById('lista-receitas');
        listaReceitas.innerHTML = '';
        receitas.forEach(item => {
            const option = document.createElement('option');
            option.textContent = `${item.descricao}: R$ ${item.valor.toFixed(2)}`;
            listaReceitas.appendChild(option);
        });

        const listaDespesas = document.getElementById('lista-despesas');
        listaDespesas.innerHTML = '';
        despesas.forEach(item => {
            const option = document.createElement('option');
            option.textContent = `${item.descricao}: R$ ${item.valor.toFixed(2)}`;
            listaDespesas.appendChild(option);
        });
    }

    function carregarDados() {
        receitas = JSON.parse(localStorage.getItem('receitas')) || [];
        despesas = JSON.parse(localStorage.getItem('despesas')) || [];
        atualizarResultados();
    }

    document.getElementById('adicionar-receita').addEventListener('click', () => {
        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value);
        if (descricao && !isNaN(valor) && valor > 0) {
            adicionarReceita(valor, descricao);
            document.getElementById('descricao').value = '';
            document.getElementById('valor').value = '';
        } else {
            alert('Por favor, insira uma descrição válida e um valor positivo.');
        }
    });

    document.getElementById('adicionar-despesa').addEventListener('click', () => {
        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value);
        if (descricao && !isNaN(valor) && valor > 0) {
            adicionarDespesa(valor, descricao);
            document.getElementById('descricao').value = '';
            document.getElementById('valor').value = '';
        } else {
            alert('Por favor, insira uma descrição válida e um valor positivo.');
        }
    });

    carregarDados();
});
