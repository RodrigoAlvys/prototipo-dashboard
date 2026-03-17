const BASE_URL = "https://jsonplaceholder.typicode.com";

// Classe baseada no seu diagrama UML para gerenciar Postagens
class PostService {
    constructor() {
        this.posts = [];
    }

    // Busca as 20 postagens mais recentes para o Dashboard
    async fetchRecentPosts() {
        try {
            const response = await fetch(`${BASE_URL}/posts?_limit=20`);
            if (!response.ok) throw new Error("Falha ao acessar a API");
            this.posts = await response.json();
            return this.posts;
        } catch (error) {
            //Caso a API falhe, não quebra o sistema
            console.error("Erro na listagem de posts:", error.message);
            return [];
        }
    }

    // Requisito 3.1.2: Filtros de autor, título e palavra-chave
    filterPosts(authorId, titleQuery, keyword) {
        return this.posts.filter(post => {
            const matchAuthor = authorId ? post.userId == authorId : true;
            const matchTitle = titleQuery ? post.title.toLowerCase().includes(titleQuery.toLowerCase()) : true;
            const matchKey = keyword ? post.body.toLowerCase().includes(keyword.toLowerCase()) : true;
            return matchAuthor && matchTitle && matchKey;
        });
    }
}

// Classe baseada no diagrama UML para gerenciar Comentários
class CommentService {
    constructor() {
        this.comments = [];
    }

    // Busca os 20 comentários mais recentes de uma postagem
    async fetchCommentsByPost(postId) {
        try {
            const response = await fetch(`${BASE_URL}/comments?postId=${postId}&_limit=20`);
            if (!response.ok) throw new Error("Falha ao buscar comentários");
            this.comments = await response.json();
            return this.comments;
        } catch (error) {
            console.error("Erro na listagem de comentários:", error.message);
            return [];
        }
    }

    // Critério de Aceite 3.3.1: Filtro por nome e palavras chaves
    filterComments(nameQuery, keyword) {
        return this.comments.filter(comment => {
            const matchName = nameQuery ? comment.name.toLowerCase().includes(nameQuery.toLowerCase()) : true;
            const matchKey = keyword ? comment.body.toLowerCase().includes(keyword.toLowerCase()) : true;
            return matchName && matchKey;
        });
    }
}

// Lógica de execução do sistema

async function initDashboard() {
    const postManager = new PostService();
    const commentManager = new CommentService();

    console.log("--- CARREGANDO DASHBOARD SOCIAL ---");

    // 1. Executa a Listagem de Posts (Requisito 3.1)
    const allPosts = await postManager.fetchRecentPosts();
    console.log(`Sucesso: ${allPosts.length} posts carregados.`);

    // 2. Exemplo de Filtro (Requisito 3.1.2)
    // Vamos filtrar posts que tenham a palavra "qui" no título
    const filteredPosts = postManager.filterPosts(null, "qui", null);
    console.log("Posts filtrados (título contém 'qui'):", filteredPosts);

    // 3. Executa a Listagem de Comentários (Requisito 3.3)
    // Simulando o clique no primeiro post da lista
    if (allPosts.length > 0) {
        const postId = allPosts[0].id;
        const comments = await commentManager.fetchCommentsByPost(postId);
        console.log(`Comentários do Post ID ${postId}:`, comments);
        
        // Exemplo de Filtro de Comentário (Requisito 3.3.1)
        const filteredComments = commentManager.filterComments("id", null);
        console.log("Comentários filtrados (nome contém 'id'):", filteredComments);
    }
}

// Inicia o processo
initDashboard();
