//Preparando modal delete
const confirmDelete = document.querySelector('#modal-delete-container');
const closeDelete = document.querySelector('#close-modal-delete');
const deleteMsg = document.querySelector('#modal-delete-msg');
const dltBtn = document.querySelector('#delete-button');

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

    async function esperarPelaDecisao() {
        return new Promise((resolve) => {

            //Abre o modal
            confirmDelete.classList.add('active');

            //Confirmar o delete
            deleteMsg.textContent = `Excluir o hóspede de id:${hospedeId} chamado: ${hospedeNome} ${hospedeSobrenome}?`;

            dltBtn.addEventListener('click', () => {
                resolve('delete');
            })

            closeDelete.addEventListener('click', () => {
                resolve('cancel');
            })
        })
    }

    async function decidir() {
        try {

            const acaoEscolhida = await esperarPelaDecisao();

            if (acaoEscolhida === 'delete') {

                confirmDelete.classList.remove('active');

                fetch(`http://localhost:8080/hospedes/${hospedeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            //Remove o closest elemento desta tag, no caso é a própria
                            trashIcon.closest('tr').remove();
                        } else {
                            failed.classList.add('active');
                            errorMsg.textContent = `${response.status}`;
                        }
                    })
                    .catch(error => {
                        failed.classList.add('active');
                        errorMsg.textContent = `${error}, server off`;
                    });
            }

            else if (acaoEscolhida === 'cancel') {
                confirmDelete.classList.remove('active');
            }

        } catch (error) {

            console.log("Error");

        }
    }


    const deleteButtons = document.querySelectorAll('#delete');

    let hospedeId, hospedeNome, hospedeSobrenome, trashIcon;

    //Realizando o delete
    deleteButtons.forEach(icon => {
        icon.addEventListener('click', () => {

            //Acessando os valores do hospede guardado no elemento na hora da criação
            hospedeId = icon.getAttribute('data-hospede-id');
            hospedeNome = icon.getAttribute('data-hospede-nome');
            hospedeSobrenome = icon.getAttribute('data-hospede-sobrenome');
            trashIcon = icon;

            decidir();

        })

    })

});
