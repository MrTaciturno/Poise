#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para criar arquivo XLSX com dados do sistema POISE
Gera planilhas organizadas com todos os dados para fácil manutenção
"""

import pandas as pd
from datetime import datetime

def create_poise_data_xlsx():
    """Cria arquivo XLSX com todos os dados do sistema POISE"""
    
    # Dados dos nomes aleatórios
    names_data = {
        'Nome': [
            "Aria", "Thorne", "Kael", "Lyra", "Gareth", "Nyx", "Zara", "Finn", "Maya", "Raven",
            "Orion", "Sage", "Blade", "Luna", "Drake", "Iris", "Kai", "Storm", "Echo", "Phoenix",
            "Shadow", "Crystal", "Wolf", "Star", "Frost", "Ember", "River", "Sky", "Dawn", "Night"
        ],
        'Gênero': ['F', 'M', 'M', 'F', 'M', 'F', 'F', 'M', 'F', 'F',
                   'M', 'F', 'M', 'F', 'M', 'F', 'M', 'M', 'F', 'F',
                   'M', 'F', 'M', 'F', 'M', 'F', 'M', 'F', 'F', 'F'],
        'Origem': ['Fantasia', 'Fantasia', 'Fantasia', 'Fantasia', 'Medieval', 'Fantasia', 
                   'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia',
                   'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia',
                   'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia',
                   'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia', 'Fantasia']
    }
    
    # Dados das raças
    races_data = {
        'Valor': ['humano', 'elfo', 'anao', 'orc', 'halfling'],
        'Nome': ['Humano', 'Elfo', 'Anão', 'Orc', 'Halfling'],
        'Descrição': [
            'Adaptável e versátil, os humanos são conhecidos por sua determinação e ambição.',
            'Elegantes e longevos, os elfos têm uma conexão natural com a magia e a natureza.',
            'Resistentes e habilidosos, os anões são mestres da metalurgia e da engenharia.',
            'Ferozes e fortes, os orcs são guerreiros naturais com grande força física.',
            'Pequenos e ágeis, os halflings são conhecidos por sua sorte e destreza.'
        ],
        'Bônus_Atributo': ['+1 em qualquer', '+2 Mind', '+2 Might', '+2 Might', '+2 Mettle'],
        'Tamanho_Preferido': ['Médio', 'Médio', 'Pequeno', 'Grande', 'Pequeno']
    }
    
    # Dados dos tamanhos
    sizes_data = {
        'Valor': ['pequeno', 'medio', 'grande'],
        'Nome': ['Pequeno', 'Médio', 'Grande'],
        'Descrição': [
            'Personagens pequenos são ágeis e difíceis de acertar, mas têm menos força física.',
            'O tamanho médio é o padrão para a maioria das raças, oferecendo equilíbrio.',
            'Personagens grandes são mais fortes e intimidantes, mas menos ágeis.'
        ],
        'Modificador_Combate': ['+1 evasão', '0', '-1 evasão'],
        'Modificador_Força': ['-1', '0', '+1']
    }
    
    # Dados das descrições aleatórias
    descriptions_data = {
        'Descrição': [
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
        ],
        'Personalidade': [
            'Determinado', 'Reservado', 'Extrovertido', 'Sábio', 'Impetuoso',
            'Astuto', 'Elegante', 'Selvagem', 'Enigmático', 'Leal'
        ],
        'Estilo_Combate': [
            'Experiente', 'Observador', 'Carismático', 'Estratégico', 'Agressivo',
            'Furtivo', 'Nobre', 'Instintivo', 'Misterioso', 'Protetor'
        ]
    }
    
    # Dados dos atributos
    attributes_data = {
        'Atributo': ['Might', 'Mind', 'Mettle'],
        'Valor_JavaScript': ['might', 'mind', 'mettle'],
        'Descrição': [
            'Força física e resistência. Afeta dano físico, capacidade de carga e resistência a ferimentos.',
            'Inteligência e conhecimento. Afeta magia, habilidades técnicas e capacidade de resolver problemas.',
            'Coragem e determinação. Afeta resistência mental, liderança e capacidade de superar medos.'
        ],
        'Habilidades_Relacionadas': [
            'Combate corpo a corpo, Atletismo, Sobrevivência',
            'Magia, Percepção, Conhecimento',
            'Liderança, Intimidação, Resistência mental'
        ],
        'Cor_Interface': ['#e74c3c', '#3498db', '#f39c12']
    }
    
    # Dados do menu lateral
    menu_data = {
        'Item': ['Sobre o Sistema', 'FAQ', 'Links Úteis', 'Configurações'],
        'Descrição': [
            'Informações sobre o sistema POISE, regras e mecânicas',
            'Perguntas frequentes sobre o sistema e criação de personagens',
            'Links para recursos externos, fóruns e comunidades',
            'Configurações do sistema, temas e preferências'
        ],
        'Status': ['Em desenvolvimento', 'Em desenvolvimento', 'Em desenvolvimento', 'Em desenvolvimento'],
        'Prioridade': ['Alta', 'Média', 'Baixa', 'Baixa']
    }
    
    # Dados de configurações do sistema
    system_config_data = {
        'Configuração': [
            'Pontos_Máximos_Atributos',
            'Valor_Máximo_Atributo',
            'Limite_Nome_Caracteres',
            'Limite_Descrição_Caracteres',
            'Tema_Padrão',
            'Idioma_Padrão'
        ],
        'Valor': ['4', '2', '50', '500', 'Escuro', 'Português'],
        'Descrição': [
            'Número máximo de pontos para distribuir entre atributos',
            'Valor máximo que um atributo pode ter',
            'Limite de caracteres para o nome do personagem',
            'Limite de caracteres para a descrição do personagem',
            'Tema visual padrão da interface',
            'Idioma padrão do sistema'
        ]
    }
    
    # Criar DataFrames
    df_names = pd.DataFrame(names_data)
    df_races = pd.DataFrame(races_data)
    df_sizes = pd.DataFrame(sizes_data)
    df_descriptions = pd.DataFrame(descriptions_data)
    df_attributes = pd.DataFrame(attributes_data)
    df_menu = pd.DataFrame(menu_data)
    df_system_config = pd.DataFrame(system_config_data)
    
    # Criar arquivo XLSX
    filename = f'POISE_Data_{datetime.now().strftime("%Y%m%d_%H%M%S")}.xlsx'
    
    with pd.ExcelWriter(filename, engine='openpyxl') as writer:
        # Escrever cada planilha
        df_names.to_excel(writer, sheet_name='Nomes_Aleatórios', index=False)
        df_races.to_excel(writer, sheet_name='Raças', index=False)
        df_sizes.to_excel(writer, sheet_name='Tamanhos', index=False)
        df_descriptions.to_excel(writer, sheet_name='Descrições_Aleatórias', index=False)
        df_attributes.to_excel(writer, sheet_name='Atributos', index=False)
        df_menu.to_excel(writer, sheet_name='Menu_Lateral', index=False)
        df_system_config.to_excel(writer, sheet_name='Configurações_Sistema', index=False)
        
        # Adicionar planilha de instruções
        instructions_data = {
            'Planilha': [
                'Nomes_Aleatórios',
                'Raças', 
                'Tamanhos',
                'Descrições_Aleatórias',
                'Atributos',
                'Menu_Lateral',
                'Configurações_Sistema'
            ],
            'Descrição': [
                'Nomes para o botão Random. Adicione novos nomes na coluna "Nome".',
                'Raças disponíveis no sistema. Modifique valores e descrições conforme necessário.',
                'Tamanhos de personagem. Ajuste modificadores de combate e força.',
                'Descrições para o botão Random. Adicione novas descrições com personalidade.',
                'Atributos do sistema (Might, Mind, Mettle). Não altere os valores JavaScript.',
                'Itens do menu lateral. Adicione novos itens conforme necessário.',
                'Configurações gerais do sistema. Ajuste valores conforme necessário.'
            ],
            'Colunas_Importantes': [
                'Nome, Gênero, Origem',
                'Valor, Nome, Descrição, Bônus_Atributo',
                'Valor, Nome, Descrição, Modificador_Combate',
                'Descrição, Personalidade, Estilo_Combate',
                'Atributo, Valor_JavaScript, Descrição',
                'Item, Descrição, Status, Prioridade',
                'Configuração, Valor, Descrição'
            ]
        }
        
        df_instructions = pd.DataFrame(instructions_data)
        df_instructions.to_excel(writer, sheet_name='Instruções', index=False)
    
    print(f"✅ Arquivo XLSX criado com sucesso: {filename}")
    print("\n📋 Planilhas incluídas:")
    print("   • Nomes_Aleatórios - 30 nomes para o botão Random")
    print("   • Raças - 5 raças com descrições e bônus")
    print("   • Tamanhos - 3 tamanhos com modificadores")
    print("   • Descrições_Aleatórias - 10 descrições de personagens")
    print("   • Atributos - 3 atributos principais do sistema")
    print("   • Menu_Lateral - Itens do menu lateral")
    print("   • Configurações_Sistema - Configurações gerais")
    print("   • Instruções - Guia de uso das planilhas")
    
    print(f"\n💡 Para usar os dados:")
    print("   1. Abra o arquivo {filename}")
    print("   2. Modifique os dados conforme necessário")
    print("   3. Adicione novos itens nas planilhas")
    print("   4. Use os dados para atualizar o código JavaScript")
    
    return filename

if __name__ == "__main__":
    try:
        create_poise_data_xlsx()
    except ImportError:
        print("❌ Erro: Biblioteca 'pandas' não encontrada.")
        print("💡 Para instalar: pip install pandas openpyxl")
    except Exception as e:
        print(f"❌ Erro ao criar arquivo: {e}") 