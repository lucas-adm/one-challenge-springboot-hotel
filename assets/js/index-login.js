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

const form = document.querySelector('#form');
const nome = document.querySelector('#iName');
const senha = document.querySelector('#iPassword');

//Fazendo requisições POST para o banco analisasr
form.addEventListener('submit', async (event) => {

    //como é necessário validar o form, devemos prevenir/evitar o default do botao submit
    event.preventDefault();

    try {

        const response = await fetch('https://one-challenge-springboot-hotel.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nome": nome.value,
                "senha": senha.value
            })
        });

        if (response.ok) {

            window.location.href = 'home-menu.html';

        } else {

            failed.classList.add('active');
            errorMsg.textContent = "Nome ou senha inexistente";

        }

    } catch (error) {

        failed.classList.add('active');
        errorMsg.textContent = `${error}, server off`;

    }

});