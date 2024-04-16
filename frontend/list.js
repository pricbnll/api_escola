// Função para exibir os cursos na tela
function exibirCursos(cursos) {
    const cursosList = document.getElementById("cursosList");
    cursosList.innerHTML = ''; // Limpa a lista de cursos antes de adicionar os novos

    cursos.forEach(curso => {
        const item = document.createElement("li");
        item.textContent = `Nome: ${curso.nome}, Duração: ${curso.duracao_horas} horas`;
        cursosList.appendChild(item);
    });
}

// Função para carregar os cursos do servidor
function carregarCursos() {
    
    fetch('http://localhost:3000/cursos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar cursos');
        }
        return response.json();
    })
    .then(data => {
        exibirCursos(data); // Exibe os cursos na tela
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao carregar cursos');
    });
}

// Chama a função para carregar os cursos quando a página é carregada
window.onload = function() {
    carregarCursos();
};