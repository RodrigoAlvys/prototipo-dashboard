# 🚀 SocialDash · Dashboard Social

O **SocialDash** é um protótipo de dashboard corporativo focado na centralização de postagens, comentários e perfis de usuários. O sistema visa melhorar a comunicação interna, permitindo que os funcionários visualizem informações relevantes de forma rápida e intuitiva.

---

## 📋 Sobre o Projeto

Este projeto utiliza a API **JSONPlaceHolder** para simular um ambiente real de troca de informações através de uma arquitetura baseada em dados.

### 🛠️ Funcionalidades (Dentro do Escopo)
* **Dashboard Principal**: Visualização das primeiras **20 postagens** mais recentes.
* **Central de Comentários**: Exibição dos **20 comentários** vinculados a uma postagem ao selecioná-la.
* **Perfis de Usuários**: Acesso à tela de perfil do autor ao clicar em seu nome.
* **Sistema de Filtros**: Busca dinâmica de postagens por autor, título ou palavras-chave.

### 🚫 Fora do Escopo
* Conforme definido no documento de visão, as funcionalidades de **Criar, Editar ou Deletar** postagens e comentários não fazem parte deste protótipo.
* Telas de autenticação e notificações em tempo real também não foram implementadas nesta versão.

---

## 💻 Requisitos Técnicos

O desenvolvimento seguiu rigorosos critérios técnicos para garantir qualidade e performance:

* **Linguagens**: HTML5, CSS3 e JavaScript.
* **Padrão de Arquitetura**: **MVC (Model-View-Controller)** para separação de responsabilidades.
* **Performance**: Filtros com delay inferior a **3 segundos** e listagens carregando em menos de **2 segundos**.
* **Resiliência**: Implementação de tratamento de erros (`try/catch`) para evitar que falhas na API interrompam o uso do sistema.

---

## 🏗️ Arquitetura de Dados (UML)

O sistema foi modelado com as seguintes classes de serviço baseadas no diagrama de classes oficial:

* **PostService**: Responsável pelo `fetch` das postagens e aplicação dos filtros de busca.
* **CommentService**: Gerencia a recuperação e filtragem dos comentários por postagem.
* **UserService**: Centraliza os dados dos perfis dos funcionários.

---

## Linnk
[Dashboar](https://rodrigoalvys.github.io/prototipo-dashboard/)

## 👥 Equipe de Desenvolvimento

* **Davi & Luiz Arthur**: Lógica de Integração com API, Classes de Serviço e Filtros.
* **Arthur & Enrico**: Interface do Usuário (UI), Layout e Estilização (HTML/CSS).
* **Lucas**: Slides
* **Rodrigo**: Documentação e coordenação do grupo
