# **Protótipo: Dashboard Social**

**Como** CEO da empresa, **gostaria** de centralizar as postagens, comentários e perfis de usuários da empresa, **dessa forma**, melhorando a comunicação entre os funcionários da empresa.

# **1\. ESCOPO**

## **1.1 Dentro Do Escopo**

* Mostrar postagens  
* Mostrar comentários  
* Mostrar perfis  
* Tela principal  
* Tela de postagem  
* Tela de perfil

## **1.2 Fora Do Escopo**

* Criar/editar/deletar postagens  
* Criar/editar/deletar de comentários  
* Criar/editar/deletar de perfis  
* Tela de autenticação  
* Notificação em tempo real

# **2\. REQUISITOS TÉCNICOS**

* O projeto deve ser escrito em javascript, html e css  
* Usar *API RESTful* para pegar os dados  
* Usar *JSONPlaceHolder* para testar os sistema com dados falsos  
* Usar o padrão *Model-View-Controller* (MVC)  
* Resiliência a erros relacionados a API

	

# **3\. ESTÓRIA DE USUÁRIO**

## **3.1. Funcionário: Visualizar Postagens**

**Como** funcionário, **gostaria** de olhar as postagens mais recentes ao entrar no sistema, **através** de uma lista dessas postagens no dashboard. 

### 3.1.1. Critério De Aceite

* Mostrar as primeiras 20 postagens mais recentes  
* Atualizar as postagens ao reiniciar o site  
* Caso a API falhe não quebre o site  
* Filtrar as postagens através do autor, título e palavra chave

### 3.1.2. Requisitos

| Requisitos funcionais | Requisitos não funcionais |
| :---- | :---- |
| Listar 20 postagens mais recentes | suportar até 80 postagens na listagem |
| Listar 20 postagens mais recentes com filtro de autor, título e palavras chaves | Resistência a erro caso API não esteja disponível |
| Sempre mostrar dados atualizados da API | Resistência a erro caso API demore para responder |
|  | Filtro deve ter o delay \<3s |
|  | A listagem deve ter o delay \<2s |

## **3.2 Funcionário: Postagens de Perfil**

**Como** Funcionário, **gostaria** de ver todas as postagens de um perfil, **ao** clicar no nome desse perfil na postagem

### 3.2.1. Critério De Aceite

* Ir para tela de perfil ao clicar no nome do autor da postagem  
* listar todos os postagens começando pelos mais recentes  
* Atualizar as postagens ao reiniciar o site  
* Caso a API falhe não quebre o site  
* Filtrar postagens do perfil através do título e palavras chaves

### 3.2.2 Requisitos

| Requisitos funcionais | Requisitos não funcionais |
| :---- | :---- |
| Listar 20 postagens recentes do perfil | suportar até 80 postagens na listagem |
| listar 20 postagens recentes com filtro de título e palavras chaves | Resistência a erro caso API não esteja disponível |
| Sempre mostrar dados atualizados da API | Resistência a erro caso API demore para responder |
|  | Filtro deve ter o delay \<3s |
|  | A listagem deve ter o delay \<2s |

## **3.3. Funcionário: Visualizar Comentários**

**Como** funcionário, **gostaria** de visualizar os comentários da postagem, **ao** clicar nessa mesma postagem.

### 3.3.1. Critério De Aceite

* Ir para a tela da postagem ao clicar na postagem  
* listar os comentários mais recentes  
* Atualizar os comentários ao reiniciar o site  
* Caso a API falhe não quebre o site  
* Filtrar comentários através do nome e palavras chaves

### 3.3.2. Requisitos

| Requisitos funcionais | Requisitos não funcionais |
| :---- | :---- |
| Listar 20 comentários mais recentes | Suportar até 80 comentários |
| Listar 20 comentários mais recentes com filtro de nome e palavras chaves | Resistência a erro caso API não esteja disponível |
| Sempre mostrar dados atualizados da API | Resistência a erro caso API demore para responder |
|  | Filtro deve ter o delay \<3s |
|  | A listagem deve ter o delay \<2s |

