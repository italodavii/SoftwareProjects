document.addEventListener('DOMContentLoaded', () => {
    // 1. INICIALIZAÇÃO
    atualizarContadores();
    filtrarProjetos('finalizado'); 

    // 2. EVENTOS DO MODAL
    const modal = document.getElementById("description-modal");

    document.querySelectorAll('.show-more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.project-card');
            if (!card) return;

            // Extração de dados (Data Attributes)
            const dados = {
                title: card.dataset.title || "Sem título",
                description: card.dataset.description || "",
                tech: card.dataset.tech || "",
                image: card.dataset.image || "",
                link: card.dataset.link || "#"
            };

            openModal(dados);
        });
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});

// FUNÇÕES PRINCIPAIS
function openModal(dados) {
    const modal = document.getElementById("description-modal");
    
    // Preenchimento seguro (verifica se o elemento existe antes de atribuir)
    if(document.getElementById("modal-title")) document.getElementById("modal-title").textContent = dados.title;
    if(document.getElementById("modal-description")) document.getElementById("modal-description").textContent = dados.description;
    if(document.getElementById("modal-description-tec")) document.getElementById("modal-description-tec").textContent = dados.tech;
    if(document.getElementById("modal-image")) document.getElementById("modal-image").src = dados.image;
    if(document.getElementById("modal-link")) document.getElementById("modal-link").href = dados.link;

    modal.classList.add("active");
}

function closeModal() {
    const modal = document.getElementById("description-modal");
    modal.classList.remove("active");
}

function filtrarProjetos(tipo) {
    // 1. Gerenciar botões
    document.querySelectorAll('.filtro').forEach(btn => {
        btn.classList.toggle('ativo', btn.dataset.tipo === tipo);
    });

    // 2. Filtrar cards com display: flex 
    document.querySelectorAll('.project-card').forEach(projeto => {
        projeto.style.display = (projeto.dataset.tipo === tipo) ? 'flex' : 'none';
    });
}

function atualizarContadores() {
    const finalizados = document.querySelectorAll('.project-card[data-tipo="finalizado"]').length;
    const desenvolvimento = document.querySelectorAll('.project-card[data-tipo="desenvolvimento"]').length;

    const elFinalizado = document.getElementById('qtd-finalizado');
    const elDesenvolvimento = document.getElementById('qtd-desenvolvimento');

    if (elFinalizado) elFinalizado.textContent = finalizados;
    if (elDesenvolvimento) elDesenvolvimento.textContent = desenvolvimento;
}