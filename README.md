# 📱 EmotiWave

Aplicativo mobile desenvolvido com foco em **bem-estar digital**, permitindo que o usuário registre seu humor, acompanhe seus hábitos diários e visualize dados analíticos sobre sua rotina.

---

## Integrantes

- Jhonatta Lima Sandes de Oliveira – RM 560277
- Lucas José Lima – RM 561160
- Rangel Bernardi Jordão – RM 560547

## Sobre o projeto

O **EmotiWave** foi desenvolvido com o objetivo de ajudar o usuário a:

- Registrar como está se sentindo ao longo do tempo
- Acompanhar sua rotina diária através de hábitos
- Obter insights sobre seu comportamento emocional
- Visualizar relatórios semanais baseados em dados reais

O app combina **registro manual + análise de dados + integração com APIs externas**, proporcionando uma visão mais completa do bem-estar do usuário.

---

## Funcionalidades

### Diário de Humor

- Registrar humor diário
- Visualizar histórico de registros
- Editar registros existentes
- Excluir registros

---

### Hábitos Diários

- Registro de hábitos fixos:
  - Sono
  - Água
  - Exercício
  - Estudo
- Controle de valores com limites mínimos e máximos
- Edição e exclusão de registros
- Histórico completo de hábitos

---

### 🏠 Tela Inicial

- Exibição do humor atual
- Evolução do humor na semana
- Recomendação personalizada com base no último registro
- Relatório semanal vindo do Oracle APEX
- Resumo dos hábitos mais recentes

---

### 🎵 Integração com Spotify

- Visualização das músicas mais ouvidas
- Integração com API externa
- Exibição de dados reais do usuário

---

### 📈 Relatório Semanal (Oracle APEX)

- Consumo de API REST do Oracle APEX
- Exibição de:
  - Humor predominante
  - Média de humor
  - Total de registros

---

### 🔐 Autenticação

- Login com autenticação via token (JWT)
- Proteção de rotas
- Controle de sessão do usuário

---

## 🛠️ Tecnologias utilizadas

### Frontend (Mobile)

- React Native
- Expo
- TypeScript
- Expo Router
- TanStack Query (React Query)

### Backend

- Java (Spring Boot)
- API REST
- JPA / Hibernate

### Integrações

- Spotify API
- Oracle APEX (RESTful Services)

---

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/rangelbjordao/sprint-mobile.git
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar o projeto

```bash
npx expo start
```

### 4. Executar no dispositivo

- Android Studio (emulador)
- Expo Go (celular)

---

## 🎥 Demonstração

**Link do vídeo:**

[Clique aqui para assitir o vídeo](https://www.youtube.com/watch?v=6fomWbJG6BE)

---

## ⚠️ Observação sobre a API

A API backend está hospedada no plano gratuito do **Render**.  
Por isso, após um período sem uso, o serviço pode entrar em modo de inatividade.

Quando isso acontece, a **primeira requisição pode demorar alguns segundos até a API “acordar”**.  
Depois desse tempo inicial, o funcionamento volta ao normal.

Se o app demorar um pouco no primeiro acesso, basta aguardar alguns instantes.

---
