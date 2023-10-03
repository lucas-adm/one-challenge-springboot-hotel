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

    const firstInputs = document.querySelectorAll('.modalInput');
    const persist = document.querySelector('#save');

    const idReserva = document.querySelector('#mIdReserve');
    const pagamento = document.querySelector('#mPay');
    let idDaReservaClicada, dataInicioValue, dataFimValue, valorReservaValue;

    //Permite validar o modal antes de qualquer função ser acionada
    let validacaoBemSucedida = false

    const modal = document.querySelector('.modalContainer');
    const xMark = document.querySelector('#closeModal')

    const putButton = document.querySelectorAll('#put');

    //Dispersando botões para edição
    putButton.forEach(buttons => {
        buttons.addEventListener('click', () => {

            modal.classList.add('active');

            idDaReservaClicada = buttons.getAttribute('data-reserva-id');
            idReserva.value = idDaReservaClicada;

            dataInicioValue = buttons.getAttribute('data-reserva-checkin');
            dataInicioInput.value = dataInicioValue;

            dataFimValue = buttons.getAttribute('data-reserva-checkout');
            dataFimInput.value = dataFimValue;

            valorReservaValue = buttons.getAttribute('data-reserva-valor');
            valorReserva.value = valorReservaValue;

            pagamento.value = buttons.getAttribute('data-reserva-pagamento');

        })

    });

    //Fechando modal
    xMark.addEventListener('click', () => {
        modal.classList.remove('active');
    })


    //Validando o modal antes de persistir no db;
    persist.addEventListener('click', function () {

        //readonly msm required é aceito vazio pelo navegador
        if (valorReservaValue == "") {

            console.log("Campo #mValor é obrigatório.");
            validacaoBemSucedida = false;
            return;

        }

        let camposValidados = true;

        firstInputs.forEach(function (input) {

            if (!input.checkValidity()) {

                // camposValidados = false; 
                //Como o input já está sendo carregado com valor, ele nunca será falso;

            }
        });

        if (camposValidados) {

            firstInputs.forEach(function (input) {
                input.value = "";
            });

            modal.classList.remove('active');

            validacaoBemSucedida = true;

        } else {

            console.log("Campos inválidos");

            validacaoBemSucedida = false;
        }

    })

    //Calculando diaria da reserva
    const dataInicioInput = document.querySelector('#mCheckIn');
    const dataFimInput = document.querySelector('#mCheckOut');
    let labels = document.querySelectorAll('.modalDate');

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

            valorReserva.value = diferencaEmDias * 50;

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


    //Enviando atualização ao banco de dados
    persist.addEventListener('click', async () => {

        if (!validacaoBemSucedida) {
            return;
        }

        try {
            const resposta = await fetch("http://localhost:8080/reservas", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": idDaReservaClicada,
                    "dataCheckIn": dataInicioValue,
                    "dataCheckOut": dataFimValue,
                    "valorReserva": valorReservaValue,
                    "pagamento": pagamento.value
                })
            });

            if (resposta.ok) {
                console.log('Resposta bem-sucedida:', resposta);
                location.reload(); //recarrega a página
            } else {

                failed.classList.add('active');
                errorMsg.textContent = `${resposta.status}, Erro na resposta`;

            }

        } catch (error) {

            failed.classList.add('active');
            errorMsg.textContent = `${error}, server off`;

        }

    })

});