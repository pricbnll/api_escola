document.getElementById("cursoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const nome = document.getElementById("nome").value;
    const duracaoHoras = parseInt(document.getElementById("duracao").value);

    const curso = {
        nome: nome,
        duracao_horas: duracaoHoras
    };

    // Envia os dados do curso para o servidor
    fetch('http://localhost:3000/cursos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(curso)
    })
    .then(async response => {
        if (!response.ok) {
            const responseData =  await response.json()
            throw new Error(responseData.messagem || 'Erro ao cadastrar curso');
        }
        alert('Curso cadastrado com sucesso!');
    })
    .catch(error => {
     
        alert(error.message);
    });
});

