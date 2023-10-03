//Permite o validar o modal antes de qualquer função ser acionada
export let validacaoBemSucedida = false

const btnRegister = document.querySelector('#register');

const firstModal = document.querySelector('.modalContainer');
const firstXmark = document.querySelector('#closeModal');
const firstInputs = document.querySelectorAll('.firstModalInput');
const inputReadOnly = document.querySelector('#mValor');
const btnToNext = document.querySelector('#btnToNext');

export const pagamento = document.querySelector('#mPay')
export let dataInicioValue, dataFimValue, valorReservaValue;

// Ações do Primeiro Modal
btnRegister.addEventListener('click', function () {

    firstModal.classList.add('active');

})


firstXmark.addEventListener('click', function () {
    dataInicioInput.value = '', dataFimInput.value = '', valorReserva.value = '';
    firstModal.classList.remove('active')
})

//Botao para ir para o modal de Hospede, caso validação ok
btnToNext.addEventListener('click', function () {

    //readonly msm required é aceito vazio pelo navegador
    if (inputReadOnly.value.trim() == "") {

        console.log("Campo #mValor é obrigatório.");
        validacaoBemSucedida = false;
        return;

    }

    let camposValidados = true;

    firstInputs.forEach(function (input) {

        if (!input.checkValidity()) {

            camposValidados = false;

            validacaoBemSucedida = false;

        }
    });

    if (camposValidados) {

        firstInputs.forEach(function (input) {
            input.value = "";
        });

        firstModal.classList.remove('active');
        secondModal.classList.add('active');

        validacaoBemSucedida = true;

    } else {
        console.log("Campos inválidos");

        validacaoBemSucedida = false;
    }

})

//Calculando diaria da reserva
const dataInicioInput = document.querySelector('#mCheckIn');
const dataFimInput = document.querySelector('#mCheckOut');
let labels = document.querySelectorAll('.firstModalDate');

const valorReserva = document.querySelector('#mValor');

function calcularDiaria() {

    let dataInicio = new Date(dataInicioInput.value);
    let dataFim = new Date(dataFimInput.value);

    if (!isNaN(dataInicio) && !isNaN(dataFim) && dataInicio < dataFim) {

        //mantendo o valor padrão do css
        labels.forEach(function (labels) {
            labels.style.color = '';
        })

        let diferencaEmMs = dataFim - dataInicio;
        let diferencaEmDias = Math.floor(diferencaEmMs / (1000 * 60 * 60 * 24));

        valorReserva.value = diferencaEmDias * 50;//50 reais por noite

        //armazenando os valores antes deles serem dropados
        dataInicioValue = dataInicioInput.value;
        dataFimValue = dataFimInput.value;
        valorReservaValue = valorReserva.value;

    } else {
        //Indicando erro ao usuários
        labels.forEach(function (labels) {
            labels.style.color = 'red';
        })

        valorReserva.value = "";
        return;
    }
} //Escutando cada mudança no input do tipo do date para aplicar a regra de negócio
dataFimInput.addEventListener('change', calcularDiaria);
dataInicioInput.addEventListener('change', calcularDiaria);

// ====================================================================================================
// Ações do Segundo Modal
const secondModal = document.querySelector('.nextModalContainer');
const secondXmark = document.querySelector('#closeNextModal');
const secondInputs = document.querySelectorAll('.secondModalInput');
const save = document.querySelector('#dbPersist');

export let dataNascimentoValue, telefoneValue = '';

save.addEventListener('click', function () {

    let camposValidados = true;

    secondInputs.forEach(function (input) {

        if (!input.checkValidity()) {
            camposValidados = false;
        }

    });

    if (dataNascimento.style.color != 'var(--blue)') {
        // console.log("Data inválida");
        validacaoBemSucedida = false;
        return;
    }

    formataTel();

    if (telefone.value.length != 14) {
        // console.log("Números inválidos");
        telefone.style.color = 'red';
        validacaoBemSucedida = false;
        return;
    }

    if (camposValidados) {

        secondModal.classList.remove('active');

        secondXmark.style.display = '';

        validacaoBemSucedida = true;


    } else {

        validacaoBemSucedida = false;
        console.log("Campos inválidos");
    }

})

//Fechando Modal
secondXmark.addEventListener('click', function () {
    secondModal.classList.remove('active');
})

//

const dataNascimento = document.querySelector('#mNascimento');
//Verificando se o cliente é maior de 18 anos
function calculaIdade() {

    // Obtém a data atual
    const dataAtual = new Date();

    let dataInformada = new Date(dataNascimento.value);
    dataInformada.setFullYear(dataInformada.getFullYear()); // pega todas as inforamações do dia(todas msm)
    let dataInformadaFormatada = dataInformada.toISOString().slice(0, 10); //Formata para YYYY-MM-DD

    let anoMax = new Date(dataAtual);
    anoMax.setFullYear(dataAtual.getFullYear() - 18); //Subtrai 18 anos da data atual
    let anoMaxF = anoMax.toISOString().slice(0, 10); //Formata para YYYY-MM-DD

    let anoMin = new Date(dataAtual);
    anoMin.setFullYear(dataAtual.getFullYear() - 90); //Subtrai 90 anos da data atual
    let anoMinF = anoMin.toISOString().slice(0, 10); //Formata para YYYY-MM-DD

    if (dataInformadaFormatada <= anoMaxF && dataInformadaFormatada >= anoMinF) {

        dataNascimento.style.color = 'var(--blue)';
        dataNascimentoValue = dataInformadaFormatada;

    } else {

        dataNascimento.style.color = 'red';

    }

}
dataNascimento.addEventListener('change', calculaIdade);

//

const telefone = document.querySelector('#mTel');
//Formatando o telefone do cliente;
function formataTel() {

    let numeroDigitado = telefone.value;

    // /pattern/, /g -> global
    // \D -> não numérico, \w -> alfanumerico, \s -> espaço em branco 
    numeroDigitado = numeroDigitado.replace(/\D/g, '');

    const numeroLimitado = numeroDigitado.slice(0, 11); //input limitado a 11 caracteres digitaveis

    let numeroFormatado = `${numeroLimitado.slice(0, 2)}`;

    if (numeroLimitado.length > 2) {
        numeroFormatado += ` ${numeroLimitado.slice(2, 3)}`;
    }

    if (numeroLimitado.length > 3) {
        numeroFormatado += ` ${numeroLimitado.slice(3, 7)}`;
    }

    if (numeroLimitado.length > 7) {
        numeroFormatado += `-${numeroLimitado.slice(7)}`;
    }

    telefone.value = numeroFormatado;
    telefoneValue = numeroFormatado;

    if (telefone.value.length == 14) {
        telefone.style.color = 'var(--blue)';
    } else {
        telefone.style.color = '';
    }

}
telefone.addEventListener('input', formataTel);
