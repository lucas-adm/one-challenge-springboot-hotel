//Preparando modal delete
const confirmDelete = document.querySelector('#modal-delete-container');
const closeDelete = document.querySelector('#close-modal-delete');
const deleteMsg = document.querySelector('#modal-delete-msg');
const dltBtn = document.querySelector('#delete-button');

//Preparando para exceptions
const failed = document.querySelector('#modal-error-container');
const closeFail = document.querySelector('#close-modal-error');
const ok = document.querySelector('#ok-button');
const errorMsg = document.querySelector('#modal-error-msg')

closeFail.addEventListener('click', () => {
    failed.classList.remove('active');
})

ok.addEventListener('click', () => {
    failed.classList.remove('active');
})

document.addEventListener('scriptsLoaded', () => {

    let reservaId, reservaValor, trashIcon;

    async function esperarPelaDecisao() {
        return new Promise((resolve) => {

            // Abrir o modal
            confirmDelete.classList.add('active');

            //Confirmando o delete  
            deleteMsg.textContent = `Excluir o a reserva de id:${reservaId} no valor de: R$${reservaValor},00?`

            // Evento do botão dltBtn
            dltBtn.addEventListener('click', () => {
                resolve('delete');
            });

            // Evento do botão closeDelete
            closeDelete.addEventListener('click', () => {
                resolve('cancel');
            });
        });
    }

    // Uso da função esperarPelaDecisao
    async function decidir() {
        try {
            const acaoEscolhida = await esperarPelaDecisao();

            if (acaoEscolhida === 'delete') {

                confirmDelete.classList.remove('active');

                /// Fazer uma solicitação de exclusão para o servidor
                fetch(`https://apirest-hotel.up.railway.app/reservas/${reservaId}`, {
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
                            errorMsg.textContent = `Há um hóspede nessa reserva`;
                        }
                    })
                    .catch(error => {
                        failed.classList.add('active');
                        errorMsg.textContent = `${error}, server off`;
                    });

            } else if (acaoEscolhida === 'cancel') {

                confirmDelete.classList.remove('active');

            }
        } catch (error) {
            console.log('Error');
        }
    }

    const deleteButtons = document.querySelectorAll('#delete');

    deleteButtons.forEach(icon => {
        icon.addEventListener('click', () => {

            //Acessando os valores da reserva guardados no elemento na hora da criação
            reservaId = icon.getAttribute('data-reserva-id');
            reservaValor = icon.getAttribute('data-reserva-valor');
            trashIcon = icon;

            decidir();

        })
    })

});
