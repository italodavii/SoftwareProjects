let projetosOriginal = []; // Essa lista NUNCA muda. Ela guarda tudo o que veio do banco.

export function renderizarCards(projetos, isFirstLoad = false) {
    // Se for a primeira vez que carregamos do Supabase, guardamos na "Fonte da Verdade"
    if (isFirstLoad) {
        projetosOriginal = projetos;
        atualizarContadores();
    }
    
    const lista = document.getElementById("lista-projetos");
    if (!lista) return;
    lista.innerHTML = ""; 

    projetos.forEach(proj => {
        // Altere esta parte no seu forEach:
const cardHTML = `
    <div class="col">
        <div class="card h-100 shadow-sm"> <img src="${proj.image_url}" class="card-img-top" alt="${proj.title}" style="height: 180px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${proj.title}</h5>
                <p class="card-text card-text-limit">${proj.description}</p>
                <button class="btn btn-outline-primary mt-auto" onclick="detalhesCard(${proj.id})">Detalhes</button>
            </div>
        </div>
    </div>
`;
        lista.innerHTML += cardHTML;
    });
}

// MODAL - Agora ele busca sempre no 'projetosOriginal' para nunca dar erro
window.detalhesCard = (id) => {
    const projeto = projetosOriginal.find(proj => proj.id === id);
    
    if (projeto) {
        document.getElementById("modalTitulo").textContent = projeto.title;
        document.getElementById("modal-desc").textContent = projeto.description;
        document.getElementById("modal-img").src = projeto.image_url;
        document.getElementById("modal-link").href = projeto.link_url;
        if (projeto.tech) {
            const techHTML = projeto.tech.split(',').map(t => 
                `<span class="badge rounded-pill bg-secondary text-white me-1 mb-1">${t.trim()}</span>`
            ).join('');

            document.getElementById("modal-tech").innerHTML = techHTML;
        }
    }

    const modal = new bootstrap.Modal(document.getElementById("modalProjeto"));
    modal.show();
}

// FILTRAR - A lógica que você precisava
window.filtrarProjetos = (categoria) => {
    let listaFiltrada;

    if (categoria === 'todos') {
        listaFiltrada = projetosOriginal;
    } else {
        listaFiltrada = projetosOriginal.filter(proj => 
            (proj.tipo && proj.tipo.toLowerCase() === categoria.toLowerCase()) ||
            (proj.category && proj.category === categoria)
        );
    }
    
    renderizarCards(listaFiltrada, false);
    
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim().toLowerCase() === categoria.toLowerCase()) {
            btn.classList.add('active');
        }
    });
};

// CONTADORES   
function atualizarContadores() {
    // Total
    document.getElementById("count-todos").textContent = projetosOriginal.length;

    // Filtrar por tipo (ajuste o nome 'Finalizado' e 'Desenvolvimento' conforme seu banco)
    const finalizados = projetosOriginal.filter(p => p.tipo === 'finalizado').length;
    const emDesenv = projetosOriginal.filter(p => p.tipo === 'desenvolvimento').length;

    document.getElementById("count-finalizado").textContent = finalizados;
    document.getElementById("count-desenv").textContent = emDesenv;
}
