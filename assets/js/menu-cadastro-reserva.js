//Preparando para exceptions
const failed = document.querySelector('#modal-error-container');
const closeFail = document.querySelector('#close-modal-error');
const ok = document.querySelector('#ok-button');
let errorMsg = document.querySelector('#modal-error-msg')

closeFail.addEventListener('click', () => {
    failed.classList.remove('active');
})

ok.addEventListener('click', () => {
    failed.classList.remove('active');
})

import { validacaoBemSucedida, dataInicioValue, dataFimValue, valorReservaValue, pagamento } from "./menu-modal-validations.js";

const mIdReserva = document.querySelector('#mIdReserve');
const botaoProximo = document.querySelector('#btnToNext');

export let idReserva; 

const urlId = "http://localhost:8080/reservas";
//Recuperando a última reserva no banco de dados
fetch(urlId)
    .then(response => response.json())
    .then(dado => {

        const proximoId = dado;
        mIdReserva.value = proximoId;
        idReserva = mIdReserva.value;

    })

    .catch(error => {

        failed.classList.add('active');
        errorMsg.textContent = `${error}, server off`;

    })

// Enviando para o banco de dados
botaoProximo.addEventListener('click', async () => {
    //Validação vem do tratamento das informações do modal
    if (!validacaoBemSucedida) {
        return;
    }

    try {
        const resposta = await fetch("http://localhost:8080/reservas", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dataCheckIn: dataInicioValue,
                dataCheckOut: dataFimValue,
                valorReserva: valorReservaValue,
                pagamento: pagamento.value,
            })
        });

        if (resposta.ok) {

            // console.log('Resposta bem-sucedida:', resposta);

        } else {
            console.error('Erro na resposta:', resposta.status);

            failed.classList.add('active');
            errorMsg.textContent = resposta.status;
        }
        
    } catch (error) {

        failed.classList.add('active');
        errorMsg.textContent = `${error}, server off`;

    }
});