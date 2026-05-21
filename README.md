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
- Visualizar relatórios semanais gerados a partir dos registros do usuário

O app combina **registro manual + análise de dados + integração com APIs externas**, proporcionando uma visão mais completa do bem-estar do usuário.

---

## Funcionalidades

### 📔 Diário de Humor

- Registrar humor diário
- Visualizar histórico de registros
- Editar registros existentes
- Excluir registros

---

### 📋 Hábitos Diários

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
- Recomendação personalizada gerada por IA com base no humor do usuário
- Relatório semanal vindo do Oracle APEX
- Resumo dos hábitos mais recentes

---

### 🎵 Integração com Spotify

- Visualização das músicas mais ouvidas
- Integração com API externa
- Exibição de dados reais do usuário

---

### 🤖 Integração com IA

- Integração com modelo de IA via API GROQ
- Geração de recomendações emocionais personalizadas
- Análise do humor mais recente do usuário
- Exibição dinâmica de mensagens contextualizadas

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

## 🔔 Notificações

O aplicativo possui sistema de notificações locais integrado ao fluxo da aplicação.

### Cenário implementado

Ao registrar um novo humor no diário emocional, o usuário recebe uma notificação automática informando que o relatório semanal foi atualizado.

### Objetivo

A funcionalidade foi desenvolvida para incentivar o acompanhamento contínuo do bem-estar emocional e direcionar o usuário para visualizar seus dados atualizados na tela inicial.

---

## 🛠️ Tecnologias utilizadas

### Frontend (Mobile)

- React Native
- Expo
- TypeScript
- Expo Router
- TanStack Query (React Query)
- Expo Notifications
- EAS Build
- Firebase App Distribution

### Backend

- Java (Spring Boot)
- API REST
- JPA / Hibernate

### Integrações

- Spotify API
- Oracle APEX (RESTful Services)
- GROQ API (Inteligência Artificial)

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

O aplicativo pode ser executado através de:

- Android Emulator
- Expo Go
- APK gerado via EAS Build
- Expo Development Build

> Observação:
> Devido às limitações do Expo Go no SDK 54, funcionalidades relacionadas ao `expo-notifications`
> podem apresentar restrições durante o desenvolvimento.
> Para testes completos das notificações, recomenda-se utilizar o APK gerado via EAS Build
> ou um Development Build.

---

## 🎥 Demonstração

**Link do vídeo:**

[Clique aqui para assistir o vídeo](https://youtu.be/PTu3aQWIFqg)

---

## 📦 APK / Instalação

O aplicativo Android foi gerado utilizando EAS Build.

### APK para instalação

[Instalar aplicativo via Firebase App Distribution](https://appdistribution.firebase.google.com/testerapps/1:580942290003:android:6c241401046006ffe1baa6/releases/7nrtcbnq4ma5g?utm_source=firebase-console)

---

## Build Android

O projeto utiliza EAS Build para geração do APK Android.

Para gerar um novo build:

```bash
npx eas build --platform android
```

---

## ⚠️ Observação sobre a API

A API backend está hospedada no plano gratuito do **Render**.  
Por isso, após um período sem uso, o serviço pode entrar em modo de inatividade.

Quando isso acontece, a **primeira requisição pode demorar alguns segundos até a API “acordar”**.  
Depois desse tempo inicial, o funcionamento volta ao normal.

Se o app demorar um pouco no primeiro acesso, basta aguardar alguns instantes.

---
