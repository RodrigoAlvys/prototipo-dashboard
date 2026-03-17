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
            if (!response.ok) throw new Error("Falha na API");
            this.posts = await response.json();
            return this.posts;
        } catch (error) {
            console.error("Erro ao listar postagens:", error); 
            return [];
        }
    }
}

// Classe baseada no seu diagrama UML para gerenciar Comentários
class CommentService {
    constructor() {
        this.comments = [];
    }

    // Busca os 20 comentários mais recentes de uma postagem
    async fetchCommentsByPost(postId) {
        try {
            // O documento pede para listar ao clicar na postagem
            const response = await fetch(`${BASE_URL}/comments?postId=${postId}&_limit=20`);
            if (!response.ok) throw new Error("Falha na API");
            this.comments = await response.json();
            return this.comments;
        } catch (error) {
            console.error("Erro ao listar comentários:", error); 
            return [];
        }
    }
}

// Exemplo de como usar as funções juntas
async function carregarDashboard() {
    const postService = new PostService();
    const commentService = new CommentService();

    // 1. Lista os posts (Requisito 3.1)
    const posts = await postService.fetchRecentPosts();
    console.log("=== DASHBOARD: 20 POSTS ===", posts);

    // 2. Simula clicar no primeiro post para ver comentários (Requisito 3.3)
    if (posts.length > 0) {
        const comentarios = await commentService.fetchCommentsByPost(posts[0].id);
        console.log(`=== COMENTÁRIOS DO POST ${posts[0].id} ===`, comentarios);
    }
}

carregarDashboard();
}

menu();
