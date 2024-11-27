document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form-sorteador').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio do formulário

        // Obter e validar o número máximo
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo); // Garantir que é um número inteiro

        if (isNaN(numeroMaximo) || numeroMaximo < 1 || numeroMaximo > 99) {
            alert("Por favor, insira um número inteiro entre 1 e 99.");
            return;
        }

        // Gerar o número aleatório
        let numeroAleatorio = Math.random() * numeroMaximo;
        numeroAleatorio = Math.floor(numeroAleatorio + 1); // Arredondar para o inteiro mais próximo

        // Atualizar o DOM com o resultado
        document.getElementById('resultado-valor').innerText = numeroAleatorio;
        document.querySelector('.resultado').style.display = 'block'; // Exibir o resultado
    });
});
