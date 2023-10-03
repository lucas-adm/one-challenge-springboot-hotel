const todayTxt = document.querySelector('.dayTxt');

const dataAtual = new Date();
const dia = dataAtual.getDate(); // Obtém o dia do mês
const mes = dataAtual.getMonth() + 1; // Obtém o mês (janeiro é 0, fevereiro é 1, etc.)
const ano = dataAtual.getFullYear(); // Obtém o ano

todayTxt.textContent = `${dia}/${mes}/${ano}`