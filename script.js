
// Variáveis globais
let currentWizardStep = 1;
let attributes = {
    might: 0,
    mind: 0,
    mettle: 0
};
let characterData = {
    name: '',
    race: '',
    size: '',
    description: ''
};
const maxPoints = 4;
const maxAttributeValue = 2;

// Dados carregados dos CSV
let randomNames = [];
let randomRaces = [];
let randomSizes = [];
let randomDescriptions = [];
let menuItems = [];
let systemConfig = {};

// Função para carregar dados dos arquivos CSV
async function loadCSVData() {
    try {
        // Carregar nomes aleatórios
        const namesResponse = await fetch('POISE_Data_Nomes_Aleatorios.csv');
        const namesText = await namesResponse.text();
        randomNames = parseCSV(namesText).map(row => row.Nome);

        // Carregar raças
        const racesResponse = await fetch('POISE_Data_Racas.csv');
        const racesText = await racesResponse.text();
        const racesData = parseCSV(racesText);
        randomRaces = racesData.map(row => ({
            value: row.Valor,
            label: row.Nome
        }));

        // Carregar tamanhos
        const sizesResponse = await fetch('POISE_Data_Tamanhos.csv');
        const sizesText = await sizesResponse.text();
        const sizesData = parseCSV(sizesText);
        randomSizes = sizesData.map(row => ({
            value: row.Valor,
            label: row.Nome
        }));

        // Carregar descrições aleatórias
        const descriptionsResponse = await fetch('POISE_Data_Descricoes_Aleatorias.csv');
        const descriptionsText = await descriptionsResponse.text();
        const descriptionsData = parseCSV(descriptionsText);
        randomDescriptions = descriptionsData.map(row => row.Descrição);

        // Carregar itens do menu
        const menuResponse = await fetch('POISE_Data_Menu_Lateral.csv');
        const menuText = await menuResponse.text();
        menuItems = parseCSV(menuText);

        // Carregar configurações do sistema
        const configResponse = await fetch('POISE_Data_Configuracoes_Sistema.csv');
        const configText = await configResponse.text();
        const configData = parseCSV(configText);
        systemConfig = {};
        configData.forEach(row => {
            systemConfig[row.Configuração] = row.Valor;
        });

        // Atualizar interface com dados carregados
        updateMenuItems();
        updateRaceOptions();
        updateSizeOptions();
        
        console.log('✅ Dados CSV carregados com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados CSV:', error);
        // Usar dados padrão em caso de erro
        loadDefaultData();
    }
}

// Função para fazer parse de CSV
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            data.push(row);
        }
    }
    
    return data;
}

// Função para carregar dados padrão (fallback)
function loadDefaultData() {
    randomNames = [
        "Aria", "Thorne", "Kael", "Lyra", "Gareth", "Nyx", "Zara", "Finn", "Maya", "Raven",
        "Orion", "Sage", "Blade", "Luna", "Drake", "Iris", "Kai", "Storm", "Echo", "Phoenix",
        "Shadow", "Crystal", "Wolf", "Star", "Frost", "Ember", "River", "Sky", "Dawn", "Night"
    ];

    randomRaces = [
        { value: "humano", label: "Humano" },
        { value: "elfo", label: "Elfo" },
        { value: "anao", label: "Anão" },
        { value: "orc", label: "Orc" },
        { value: "halfling", label: "Halfling" }
    ];

    randomSizes = [
        { value: "pequeno", label: "Pequeno" },
        { value: "medio", label: "Médio" },
        { value: "grande", label: "Grande" }
    ];

    randomDescriptions = [
        "Um aventureiro experiente com cicatrizes de batalhas passadas. Olhos determinados e postura confiante.",
        "Misterioso e reservado, prefere observar antes de agir. Movimentos graciosos e voz suave.",
        "Carismático e extrovertido, sempre tem uma história para contar. Sorriso contagiante e energia contagiante.",
        "Sábio e contemplativo, busca conhecimento acima de tudo. Olhar penetrante e palavras escolhidas com cuidado.",
        "Feroz e impetuoso, age primeiro e pensa depois. Presença intimidante e força bruta.",
        "Ágil e astuto, especialista em se mover nas sombras. Olhos atentos e reflexos rápidos.",
        "Nobre e elegante, carrega-se com dignidade real. Postura ereta e maneiras refinadas.",
        "Selvagem e livre, conectado com a natureza. Cabelos desalinhados e espírito indomável.",
        "Misterioso e enigmático, origem desconhecida. Aura de mistério e segredos ocultos.",
        "Valente e leal, sempre protege os amigos. Coração nobre e coragem inabalável."
    ];

    menuItems = [
        { Item: 'Sobre o Sistema', Descrição: 'Informações sobre o sistema POISE, regras e mecânicas', Status: 'Em desenvolvimento', Prioridade: 'Alta' },
        { Item: 'FAQ', Descrição: 'Perguntas frequentes sobre o sistema e criação de personagens', Status: 'Em desenvolvimento', Prioridade: 'Média' },
        { Item: 'Links Úteis', Descrição: 'Links para recursos externos, fóruns e comunidades', Status: 'Em desenvolvimento', Prioridade: 'Baixa' },
        { Item: 'Configurações', Descrição: 'Configurações do sistema, temas e preferências', Status: 'Em desenvolvimento', Prioridade: 'Baixa' }
    ];

    systemConfig = {
        'Pontos_Máximos_Atributos': '4',
        'Valor_Máximo_Atributo': '2',
        'Limite_Nome_Caracteres': '50',
        'Limite_Descrição_Caracteres': '500',
        'Tema_Padrão': 'Escuro',
        'Idioma_Padrão': 'Português'
    };

    updateMenuItems();
    updateRaceOptions();
    updateSizeOptions();
}

// Função para atualizar itens do menu lateral
function updateMenuItems() {
    const sidebar = document.getElementById('sidebar');
    const menuContainer = sidebar.querySelector('.menu-items') || sidebar;
    
    // Limpar itens existentes (exceto o título)
    const existingItems = sidebar.querySelectorAll('.menu-item:not(.menu-title)');
    existingItems.forEach(item => item.remove());
    
    // Adicionar novos itens
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.textContent = item.Item;
        menuItem.title = item.Descrição;
        menuItem.onclick = () => handleMenuItemClick(item);
        sidebar.appendChild(menuItem);
    });
}

// Função para atualizar opções de raça
function updateRaceOptions() {
    const raceSelect = document.getElementById('characterRace');
    if (raceSelect) {
        // Limpar opções existentes (exceto a primeira)
        raceSelect.innerHTML = '<option value="">Selecione uma raça</option>';
        
        // Adicionar novas opções
        randomRaces.forEach(race => {
            const option = document.createElement('option');
            option.value = race.value;
            option.textContent = race.label;
            raceSelect.appendChild(option);
        });
    }
}

// Função para atualizar opções de tamanho
function updateSizeOptions() {
    const sizeSelect = document.getElementById('characterSize');
    if (sizeSelect) {
        // Limpar opções existentes (exceto a primeira)
        sizeSelect.innerHTML = '<option value="">Selecione o tamanho</option>';
        
        // Adicionar novas opções
        randomSizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size.value;
            option.textContent = size.label;
            sizeSelect.appendChild(option);
        });
    }
}

// Função para lidar com cliques nos itens do menu
function handleMenuItemClick(item) {
    alert(`${item.Item}\n\n${item.Descrição}\n\nStatus: ${item.Status}\nPrioridade: ${item.Prioridade}`);
}

// Função para alternar menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('open');
    }
});

// Função para carregar personagem
function loadCharacter() {
    alert('Funcionalidade de carregar personagem em desenvolvimento!');
}

// Função para criar personagem (mostrar wizard)
function createCharacter() {
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('wizardScreen').style.display = 'block';
    showWizardStep(1);
}

// Função para voltar à tela principal
function showMainScreen() {
    document.getElementById('wizardScreen').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'flex';
    
    // Reset dados
    resetWizardData();
}

// Função para resetar dados do wizard
function resetWizardData() {
    currentWizardStep = 1;
    attributes = { might: 0, mind: 0, mettle: 0 };
    characterData = { name: '', race: '', size: '', description: '' };
    
    // Reset inputs
    document.getElementById('characterName').value = '';
    document.getElementById('characterRace').value = '';
    document.getElementById('characterSize').value = '';
    document.getElementById('characterDescription').value = '';
    document.getElementById('descriptionCounter').textContent = '0';
    
    // Reset atributos
    document.getElementById('mightValue').textContent = '0';
    document.getElementById('mindValue').textContent = '0';
    document.getElementById('mettleValue').textContent = '0';
    
    updateRemainingPoints();
    updateAttributeNodes();
    updateNextButton();
    updateStepIndicator();
}

// Função para mostrar uma etapa específica do wizard
function showWizardStep(step) {
    // Esconder todas as telas
    document.querySelectorAll('.wizard-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Mostrar a tela atual
    document.getElementById(`wizardStep${step}`).style.display = 'block';
    
    currentWizardStep = step;
    updateStepIndicator();
    
    // Atualizar botões baseado na etapa
    if (step === 1) {
        updateCharacterFormValidation();
    } else if (step === 2) {
        updateNextButton();
    }
}

// Função para atualizar indicador de etapas
function updateStepIndicator() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentWizardStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentWizardStep) {
            step.classList.add('active');
        }
    });
}

// Função para próximo passo do wizard
function nextWizardStep() {
    if (currentWizardStep === 1) {
        // Validar dados do personagem
        if (!validateCharacterData()) {
            return;
        }
        showWizardStep(2);
    } else if (currentWizardStep === 2) {
        // Validar atributos
        const totalPoints = Object.values(attributes).reduce((sum, val) => sum + val, 0);
        if (totalPoints !== maxPoints) {
            alert('Você deve distribuir todos os 4 pontos antes de prosseguir!');
            return;
        }
        showWizardStep(3);
    }
}

// Função para passo anterior do wizard
function previousWizardStep() {
    if (currentWizardStep > 1) {
        showWizardStep(currentWizardStep - 1);
    }
}

// Função para finalizar wizard
function finishWizard() {
    alert('Personagem criado com sucesso!\n\n' +
          `Nome: ${characterData.name}\n` +
          `Raça: ${characterData.race}\n` +
          `Tamanho: ${characterData.size}\n` +
          `Descrição: ${characterData.description}\n\n` +
          `Atributos:\n` +
          `Might: ${attributes.might}\n` +
          `Mind: ${attributes.mind}\n` +
          `Mettle: ${attributes.mettle}`);
    
    showMainScreen();
}

// Função para validar dados do personagem
function validateCharacterData() {
    const name = document.getElementById('characterName').value.trim();
    const race = document.getElementById('characterRace').value;
    const size = document.getElementById('characterSize').value;
    
    if (!name) {
        alert('Por favor, insira o nome do personagem!');
        return false;
    }
    
    if (!race) {
        alert('Por favor, selecione uma raça!');
        return false;
    }
    
    if (!size) {
        alert('Por favor, selecione um tamanho!');
        return false;
    }
    
    // Salvar dados
    characterData.name = name;
    characterData.race = race;
    characterData.size = size;
    characterData.description = document.getElementById('characterDescription').value.trim();
    
    return true;
}

// Função para atualizar validação do formulário de personagem
function updateCharacterFormValidation() {
    const name = document.getElementById('characterName').value.trim();
    const race = document.getElementById('characterRace').value;
    const size = document.getElementById('characterSize').value;
    const nextBtn = document.getElementById('nextStepBtn');
    
    if (name && race && size) {
        nextBtn.disabled = false;
        nextBtn.classList.add('enabled');
    } else {
        nextBtn.disabled = true;
        nextBtn.classList.remove('enabled');
    }
}

// Função para alterar atributos
function changeAttribute(attributeName, change) {
    const currentValue = attributes[attributeName];
    const newValue = currentValue + change;
    const totalPoints = Object.values(attributes).reduce((sum, val) => sum + val, 0);
    
    // Verificar limites
    if (newValue < 0 || newValue > maxAttributeValue) {
        return;
    }
    
    // Verificar se há pontos suficientes para aumentar
    if (change > 0 && totalPoints >= maxPoints) {
        return;
    }
    
    // Atualizar o valor
    attributes[attributeName] = newValue;
    
    // Atualizar a interface
    document.getElementById(attributeName + 'Value').textContent = newValue;
    updateRemainingPoints();
    updateAttributeNodes();
    updateNextButton();
}

// Função para atualizar pontos restantes
function updateRemainingPoints() {
    const totalUsed = Object.values(attributes).reduce((sum, val) => sum + val, 0);
    const remaining = maxPoints - totalUsed;
    document.getElementById('remainingPoints').textContent = remaining;
    
    // Atualizar cor dos pontos restantes
    const pointsDisplay = document.getElementById('remainingPoints');
    if (remaining === 0) {
        pointsDisplay.style.color = '#27ae60';
    } else if (remaining <= 1) {
        pointsDisplay.style.color = '#f39c12';
    } else {
        pointsDisplay.style.color = '#74b9ff';
    }
}

// Função para atualizar aparência dos nós de atributos
function updateAttributeNodes() {
    Object.keys(attributes).forEach(attr => {
        const node = document.querySelector(`[data-attribute="${attr}"]`);
        const value = attributes[attr];
        
        // Remover classes antigas
        node.classList.remove('level-0', 'level-1', 'level-2');
        
        // Adicionar nova classe baseada no valor
        node.classList.add(`level-${value}`);
        
        // Atualizar botões
        const decreaseBtn = node.querySelector('.decrease');
        const increaseBtn = node.querySelector('.increase');
        
        decreaseBtn.disabled = value <= 0;
        
        const totalPoints = Object.values(attributes).reduce((sum, val) => sum + val, 0);
        increaseBtn.disabled = value >= maxAttributeValue || totalPoints >= maxPoints;
    });
}

// Função para atualizar botão de próximo passo
function updateNextButton() {
    const totalPoints = Object.values(attributes).reduce((sum, val) => sum + val, 0);
    const nextBtn = document.getElementById('nextStepBtn');
    
    if (totalPoints === maxPoints) {
        nextBtn.disabled = false;
        nextBtn.classList.add('enabled');
    } else {
        nextBtn.disabled = true;
        nextBtn.classList.remove('enabled');
    }
}

// Função para atualizar contador de caracteres
function updateDescriptionCounter() {
    const textarea = document.getElementById('characterDescription');
    const counter = document.getElementById('descriptionCounter');
    const length = textarea.value.length;
    counter.textContent = length;
    
    if (length > 450) {
        counter.style.color = '#e74c3c';
    } else if (length > 400) {
        counter.style.color = '#f39c12';
    } else {
        counter.style.color = '#74b9ff';
    }
}

// Fechar menu com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('sidebar').classList.remove('open');
    }
});

// Inicializar interface
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados dos CSV
    loadCSVData().then(() => {
        updateRemainingPoints();
        updateAttributeNodes();
        updateNextButton();
        updateCharacterFormValidation();
        
        // Adicionar event listeners para validação em tempo real
        document.getElementById('characterName').addEventListener('input', updateCharacterFormValidation);
        document.getElementById('characterRace').addEventListener('change', updateCharacterFormValidation);
        document.getElementById('characterSize').addEventListener('change', updateCharacterFormValidation);
        document.getElementById('characterDescription').addEventListener('input', updateDescriptionCounter);
    }).catch(() => {
        // Em caso de erro, usar dados padrão
        updateRemainingPoints();
        updateAttributeNodes();
        updateNextButton();
        updateCharacterFormValidation();
        
        // Adicionar event listeners para validação em tempo real
        document.getElementById('characterName').addEventListener('input', updateCharacterFormValidation);
        document.getElementById('characterRace').addEventListener('change', updateCharacterFormValidation);
        document.getElementById('characterSize').addEventListener('change', updateCharacterFormValidation);
        document.getElementById('characterDescription').addEventListener('input', updateDescriptionCounter);
    });
});

// Função para randomizar dados do personagem
function randomizeCharacterData() {
    // Verificar se os dados foram carregados
    if (randomNames.length === 0 || randomRaces.length === 0 || randomSizes.length === 0 || randomDescriptions.length === 0) {
        alert('Dados ainda não foram carregados. Aguarde um momento e tente novamente.');
        return;
    }

    // Gerar nome aleatório
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    
    // Gerar raça aleatória
    const randomRace = randomRaces[Math.floor(Math.random() * randomRaces.length)];
    
    // Gerar tamanho aleatório
    const randomSize = randomSizes[Math.floor(Math.random() * randomSizes.length)];
    
    // Gerar descrição aleatória
    const randomDescription = randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];
    
    // Preencher os campos
    document.getElementById('characterName').value = randomName;
    document.getElementById('characterRace').value = randomRace.value;
    document.getElementById('characterSize').value = randomSize.value;
    document.getElementById('characterDescription').value = randomDescription;
    
    // Atualizar contador de caracteres
    updateDescriptionCounter();
    
    // Atualizar validação
    updateCharacterFormValidation();
    
    // Salvar dados
    characterData.name = randomName;
    characterData.race = randomRace.value;
    characterData.size = randomSize.value;
    characterData.description = randomDescription;
    
    // Efeito visual de confirmação
    const randomBtn = document.querySelector('.random-btn');
    randomBtn.style.background = 'rgba(39, 174, 96, 0.3)';
    randomBtn.style.borderColor = '#27ae60';
    randomBtn.textContent = '✅ Gerado!';
    
    setTimeout(() => {
        randomBtn.style.background = '';
        randomBtn.style.borderColor = '';
        randomBtn.innerHTML = '🎲 Random';
    }, 1500);
}

// Função para recarregar dados CSV
async function reloadCSVData() {
    try {
        await loadCSVData();
        alert('✅ Dados CSV recarregados com sucesso!');
    } catch (error) {
        alert('❌ Erro ao recarregar dados CSV. Usando dados padrão.');
        loadDefaultData();
    }
}

// Função para mostrar informações do sistema
function showSystemInfo() {
    const info = `Sistema POISE v1.0\n\n` +
                `Configurações:\n` +
                `• Pontos Máximos: ${systemConfig['Pontos_Máximos_Atributos'] || '4'}\n` +
                `• Valor Máximo Atributo: ${systemConfig['Valor_Máximo_Atributo'] || '2'}\n` +
                `• Limite Nome: ${systemConfig['Limite_Nome_Caracteres'] || '50'} caracteres\n` +
                `• Limite Descrição: ${systemConfig['Limite_Descrição_Caracteres'] || '500'} caracteres\n` +
                `• Tema: ${systemConfig['Tema_Padrão'] || 'Escuro'}\n` +
                `• Idioma: ${systemConfig['Idioma_Padrão'] || 'Português'}\n\n` +
                `Dados Carregados:\n` +
                `• Nomes: ${randomNames.length}\n` +
                `• Raças: ${randomRaces.length}\n` +
                `• Tamanhos: ${randomSizes.length}\n` +
                `• Descrições: ${randomDescriptions.length}\n` +
                `• Itens do Menu: ${menuItems.length}`;
    
    alert(info);
}
