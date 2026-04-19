import { renderizarCards } from "./card.js";


// Chaves do Banco de Dados
const _supabase = supabase.createClient('https://mwipirlrtzcmxdjbfhvh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13aXBpcmxydHpjbXhkamJmaHZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDM4ODYsImV4cCI6MjA5MjExOTg4Nn0.5mz3v8-cxHyoxyaMpb13dhZy_fw7LV-05TgZkIUQqB8');

export async function carregarProjetos() {
    const { data, error } = await _supabase.from('projects').select('*');
    
    if (error) {
        console.error('Erro ao carregar projetos:', error);
    } else {
        renderizarCards(data, true);
    }
}

// Inicia o carregamento ao carregar o script
carregarProjetos();

window._supabase = _supabase;
window.renderizarCards = renderizarCards;
window.carregarProjetos = carregarProjetos
