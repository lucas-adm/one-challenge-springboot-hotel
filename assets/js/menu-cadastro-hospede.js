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

import { validacaoBemSucedida, dataNascimentoValue, telefoneValue } from "./menu-modal-validations.js";

const nextModalIdReserva = document.querySelector('#nextModalIdReserve');
const nome = document.querySelector('#mNome');
const sobrenome = document.querySelector('#mSobrenome');
const nacionalidade = document.querySelector('#mNacionalidade');
const persist = document.querySelector('#dbPersist');

let idReservaNextModal;

const urlId = "https://apirest-hotel.up.railway.app/reservas";
//Recuperando a última reserva no banco de dados
fetch(urlId)
    .then(response => response.json())
    .then(dado => {

        const proximoIdReserva = dado;
        nextModalIdReserva.value = proximoIdReserva;
        idReservaNextModal = nextModalIdReserva.value;

    })
    .catch(error => {

        failed.classList.add('active');
        errorMsg.textContent = `${error}, server off`;

    })

//Cadastrar Hospede
persist.addEventListener('click', async () => {
    //Validação vem do tratamento das informações do modal
    if (!validacaoBemSucedida) {
        return;
    }

    try {
        const resposta = await fetch("https://apirest-hotel.up.railway.app/hospedes", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "reservaId": idReservaNextModal,
                "nome": nome.value,
                "sobrenome": sobrenome.value,
                "dataNascimento": dataNascimentoValue,
                "nacionalidade": nacionalidade.value,
                "telefone": telefoneValue
            })
        });

        if (resposta.ok) {
            // console.log('Resposta bem-sucedida:', resposta);
            location.reload(); //Limpar tudo

        } else {

            failed.classList.add('active');
            errorMsg.textContent = resposta.status;
        }

    } catch (error) {

        failed.classList.add('active');
        errorMsg.textContent = `${error}, server off`;

    }
})



