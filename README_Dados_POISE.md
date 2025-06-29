# 📊 Dados do Sistema POISE

Este diretório contém todos os dados do sistema POISE organizados em arquivos CSV para fácil manutenção e inclusão de novos dados.

## 📁 Arquivos Incluídos

### 🎲 **POISE_Data_Nomes_Aleatorios.csv**
- **30 nomes** para o botão Random
- Colunas: Nome, Gênero, Origem
- Adicione novos nomes na coluna "Nome"

### 🏃‍♂️ **POISE_Data_Racas.csv**
- **5 raças** com descrições e bônus
- Colunas: Valor, Nome, Descrição, Bônus_Atributo, Tamanho_Preferido
- Modifique valores e descrições conforme necessário

### 📏 **POISE_Data_Tamanhos.csv**
- **3 tamanhos** de personagem com modificadores
- Colunas: Valor, Nome, Descrição, Modificador_Combate, Modificador_Força
- Ajuste modificadores de combate e força

### 📝 **POISE_Data_Descricoes_Aleatorias.csv**
- **10 descrições** para o botão Random
- Colunas: Descrição, Personalidade, Estilo_Combate
- Adicione novas descrições com personalidade

### ⚔️ **POISE_Data_Atributos.csv**
- **3 atributos** principais do sistema (Might, Mind, Mettle)
- Colunas: Atributo, Valor_JavaScript, Descrição, Habilidades_Relacionadas, Cor_Interface
- **⚠️ Não altere os valores JavaScript**

### 🍔 **POISE_Data_Menu_Lateral.csv**
- **4 itens** do menu lateral
- Colunas: Item, Descrição, Status, Prioridade
- Adicione novos itens conforme necessário

### ⚙️ **POISE_Data_Configuracoes_Sistema.csv**
- **6 configurações** gerais do sistema
- Colunas: Configuração, Valor, Descrição
- Ajuste valores conforme necessário

## 🚀 Como Usar

### 1. **Abrir no Excel/Google Sheets**
```
1. Abra o Excel ou Google Sheets
2. Vá em Arquivo > Abrir
3. Selecione o arquivo CSV desejado
4. Os dados aparecerão organizados em colunas
```

### 2. **Editar Dados**
```
1. Modifique os valores nas células
2. Adicione novas linhas para novos itens
3. Mantenha o formato das colunas
4. Salve o arquivo
```

### 3. **Converter para JavaScript**
```
1. Copie os dados da coluna desejada
2. Cole no código JavaScript
3. Formate conforme necessário
```

## 📋 Exemplo de Conversão

### De CSV para JavaScript:

**CSV (Nomes):**
```
Nome,Gênero,Origem
Aria,F,Fantasia
Thorne,M,Fantasia
```

**JavaScript:**
```javascript
const randomNames = [
    "Aria", "Thorne"
];
```

### De CSV para JavaScript (Raças):

**CSV (Raças):**
```
Valor,Nome,Descrição
humano,Humano,Adaptável e versátil
elfo,Elfo,Elegantes e longevos
```

**JavaScript:**
```javascript
const randomRaces = [
    { value: "humano", label: "Humano" },
    { value: "elfo", label: "Elfo" }
];
```

## 🔧 Script Python (Opcional)

Se você tiver Python instalado, pode usar o script `create_data_xlsx.py` para gerar um arquivo XLSX único com todas as planilhas:

```bash
# Instalar dependências
pip install pandas openpyxl

# Executar script
python create_data_xlsx.py
```

## 📝 Dicas de Manutenção

1. **Faça backup** dos arquivos antes de editar
2. **Mantenha consistência** nos nomes das colunas
3. **Teste** as mudanças no sistema após editar
4. **Documente** novas adições
5. **Valide** os dados antes de usar

## 🎯 Próximos Passos

- [ ] Adicionar mais nomes aleatórios
- [ ] Expandir descrições de personagens
- [ ] Criar novas raças
- [ ] Adicionar habilidades específicas
- [ ] Implementar sistema de classes
- [ ] Criar dados de equipamentos

---

**💡 Dica:** Use estes arquivos como base para expandir o sistema POISE de forma organizada e consistente! 