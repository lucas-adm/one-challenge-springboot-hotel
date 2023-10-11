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

document.addEventListener('scriptsLoaded', () => {

    let validacaoBemSucedida = false;

    // Ações do Segundo Modal
    const modalInputs = document.querySelectorAll('.modalInput');
    const persist = document.querySelector('#dbPersist');

    let dataNascimentoValue, telefoneValue,
        idDoHospedeClicado, idReservaDoHospedeClicado, nomeDoHospedeClicado, sobrenomeDoHospedeClicado;

    const nomeDoHospede = document.querySelector('#mNome');
    const sobrenomeDoHospede = document.querySelector('#mSobrenome');
    const nacionalidade = document.querySelector('#mNacionalidade');

    const modal = document.querySelector('.modalContainer');
    const xMark = document.querySelector('#closeModal')
    const putButton = document.querySelectorAll('#put');
    const id = document.querySelector('#mIdGuest');
    const idReserva = document.querySelector('#mIdReserve');

    putButton.forEach(buttons => {
        buttons.addEventListener('click', () => {

            modal.classList.add('active');

            idDoHospedeClicado = buttons.getAttribute('data-hospede-id');
            id.value = idDoHospedeClicado;

            idReservaDoHospedeClicado = buttons.getAttribute('data-reserva-id');
            idReserva.value = idReservaDoHospedeClicado;

            nomeDoHospedeClicado = buttons.getAttribute('data-hospede-nome');
            nomeDoHospede.value = nomeDoHospedeClicado;

            sobrenomeDoHospedeClicado = buttons.getAttribute('data-hospede-sobrenome');
            sobrenomeDoHospede.value = sobrenomeDoHospedeClicado;

            dataNascimentoValue = buttons.getAttribute('data-hospede-nascimento');
            dataNascimento.value = dataNascimentoValue;

            nacionalidade.value = buttons.getAttribute('data-hospede-nacionalidade');

            telefoneValue = buttons.getAttribute('data-hospede-telefone');
            telefone.value = telefoneValue;

        })
    })

    xMark.addEventListener('click', () => {

        modal.classList.remove('active');

    })

    persist.addEventListener('click', function () {

        let camposValidados = true;

        modalInputs.forEach(function (input) {

            if (!input.checkValidity()) {
                camposValidados = false;
            }

        });

        calculaIdade();

        if (dataNascimento.style.color != 'var(--blue)') {
            console.log("Data inválida");
            validacaoBemSucedida = false;
            return;
        }

        formataTel();

        if (telefone.value.length != 14) {
            console.log("Números inválidos");
            telefone.style.color = 'red';
            validacaoBemSucedida = false;
            return;
        }

        if (camposValidados) {

            validacaoBemSucedida = true;

            modal.classList.remove('active');


        } else {

            validacaoBemSucedida = false;
            console.log("Campos inválidos");
        }

    })

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

    //Enviar os dados do put para o banco de dados:
    persist.addEventListener('click', async () => {

        if (!validacaoBemSucedida) {
            return;
        }

        try {

            const response = await fetch("https://oraclene-hotel.onrender.com/hospedes", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": idDoHospedeClicado,
                    "nome": nomeDoHospede.value,
                    "sobrenome": sobrenomeDoHospede.value,
                    "dataNascimento": dataNascimentoValue,
                    "nacionalidade": nacionalidade.value,
                    "telefone": telefoneValue
                })
            });

            if (response.ok) {

                console.log('Resposta bem sucedida:', response)
                location.reload();//atualiza pagina

            } else {

                failed.classList.add('active');
                errorMsg.textContent = `${response.status}, server off`;

            }

        } catch (error) {

            failed.classList.add('active');
            errorMsg.textContent = `${error}, server off`;

        }
    })

});