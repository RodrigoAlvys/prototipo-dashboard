const BASE_URL = "https://jsonplaceholder.typicode.com";


class UserService {
    constructor() {
        this.users = [];
    }
    // Como a API separa usuários de posts, precisamos buscar os usuários também
    async fetchUsers() {
        if (this.users.length > 0) return this.users; // Retorna do cache se já buscou
        try {
            const res = await fetch(`${BASE_URL}/users`);
            this.users = await res.json();
            return this.users;
        } catch (e) {
            console.error("Erro ao buscar usuários", e);
            return [];
        }
    }
    getUserById(id) {
        return this.users.find(u => u.id === id) || { name: 'Desconhecido', username: 'unk', email: 'N/A' };
    }
}

class PostService {
    constructor() {
        this.posts = [];
    }
    async fetchRecentPosts() {
        if (this.posts.length > 0) return this.posts; // Retorna do cache
        try {
            const response = await fetch(`${BASE_URL}/posts?_limit=20`);
            if (!response.ok) throw new Error("Falha ao acessar a API");
            this.posts = await response.json();
            return this.posts;
        } catch (error) {
            console.error("Erro na listagem de posts:", error.message);
            return [];
        }
    }
    filterPosts(authorId, titleQuery, keyword) {
        return this.posts.filter(post => {
            const matchAuthor = authorId ? post.userId === authorId : true;
            const matchTitle = titleQuery ? post.title.toLowerCase().includes(titleQuery.toLowerCase()) : true;
            const matchKey = keyword ? post.body.toLowerCase().includes(keyword.toLowerCase()) : true;
            return matchAuthor && matchTitle && matchKey;
        });
    }
}

class CommentService {
    constructor() {
        this.comments = [];
    }
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
}

// Instanciando os serviços
const userManager = new UserService();
const postManager = new PostService();
const commentManager = new CommentService();


const mainContent = document.getElementById('main-content');

// Tela 1: Dashboard Principal
async function showMain(filterText = "") {
    mainContent.innerHTML = `<p style="text-align:center; margin-top: 2rem;"><i class="fas fa-spinner fa-spin"></i> Carregando dados da API...</p>`;
    
    await userManager.fetchUsers();
    await postManager.fetchRecentPosts();

    // Se o usuário digitou algo, filtra por título ou conteúdo
    let postsToRender = postManager.posts;
    if (filterText) {
        postsToRender = postManager.filterPosts(null, filterText, filterText);
    }

    let html = `<div class="main-feed" id="main-page">`;
    
    if (postsToRender.length === 0) {
        html += `<p style="text-align:center;">Nenhum post encontrado na busca.</p>`;
    }

    postsToRender.forEach(post => {
        const author = userManager.getUserById(post.userId);
        html += `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-title">${post.title}</div>
                <div class="post-meta">
                    <i class="fas fa-pen-fancy" style="color:#7d93ff;"></i>
                    <span class="author-link" data-author-id="${author.id}">${author.name}</span>
                    <span style="color:#6b7bb8;">· @${author.username || author.name.toLowerCase().replace(' ', '')}</span>
                </div>
                <div class="post-excerpt">
                    ${post.body.substring(0, 150)}... <span style="color:#5f7cff;">ler mais</span>
                </div>
            </div>
        `;
    });
    html += `<div class="back-home-hint"><i class="fas fa-arrow-up"></i> clique no autor → perfil | clique no card → post</div></div>`;
    mainContent.innerHTML = html;
}

// Tela 2: Perfil do Usuário
async function showProfile(userId) {
    mainContent.innerHTML = `<p style="text-align:center; margin-top: 2rem;"><i class="fas fa-spinner fa-spin"></i> Carregando perfil...</p>`;
    
    const user = userManager.getUserById(userId);
    // Usando o filtro do Davi para pegar só os posts desse autor
    const userPosts = postManager.filterPosts(userId, null, null);

    let html = `<div class="profile-page" id="profile-page">
        <div class="user-info-card">
            <div class="user-avatar"><i class="fas fa-user-astronaut"></i></div>
            <div class="user-details">
                <h2>${user.name}</h2>
                <p><i class="far fa-id-card"></i> @${user.username || 'user'} · ${user.email}</p>
                <p style="font-size:1rem; color:#a7b6f0;">Membro da rede SocialDash</p>
            </div>
        </div>
        <h3 style="margin-bottom:1.2rem; display:flex; gap:0.5rem;"><i class="fas fa-edit"></i> Posts de ${user.name}</h3>
        <div class="profile-posts-grid">`;

    if (userPosts.length === 0) {
        html += `<p style="color:#8895cf;">Nenhum post publicado ainda.</p>`;
    } else {
        userPosts.forEach(post => {
            html += `
                <div class="post-card" data-post-id="${post.id}">
                    <div class="post-title">${post.title}</div>
                    <div class="post-meta"><i class="fas fa-user-circle"></i> <span>${user.name}</span></div>
                    <div class="post-excerpt">${post.body.substring(0, 120)}... <span style="color:#aab9ff;">ver completo</span></div>
                </div>
            `;
        });
    }
    html += `</div><div class="back-home-hint"><i class="fas fa-home"></i> clique em qualquer post para ver comentários</div></div>`;
    mainContent.innerHTML = html;
}

// Tela 3: Post Completo e Comentários
async function showPost(postId) {
    mainContent.innerHTML = `<p style="text-align:center; margin-top: 2rem;"><i class="fas fa-spinner fa-spin"></i> Carregando post e comentários...</p>`;
    
    const post = postManager.posts.find(p => p.id === postId);
    if (!post) return showMain();
    
    const author = userManager.getUserById(post.userId);
    // Chamando a API de comentários do Davi!
    const comments = await commentManager.fetchCommentsByPost(postId);

    let html = `<div class="post-page" id="post-page">
        <div class="user-info-card" style="cursor:pointer;" data-author-id="${author.id}" id="post-author-header">
            <div class="user-avatar"><i class="fas fa-user-astronaut"></i></div>
            <div class="user-details">
                <h2>${author.name} <span style="font-size:1.2rem; color:#b3c2ff;">@${author.username || 'user'}</span></h2>
                <p><i class="far fa-envelope"></i> ${author.email}</p>
                <p style="color:#b5c5ff; margin-top:0.3rem;">clique aqui para ver o perfil ⇧</p>
            </div>
        </div>
        <div class="post-card" style="margin-top:1.5rem;">
            <div class="post-title">${post.title}</div>
            <div class="post-excerpt" style="font-size:1.1rem; white-space: pre-line;">${post.body}</div>
            <div style="margin-top:1rem; color:#6c86d9;"><i class="far fa-comment"></i> ${comments.length} comentário(s)</div>
        </div>
        <div class="comments-section"><h3><i class="fas fa-comments"></i> Comentários</h3>`;

    if (comments.length === 0) {
        html += `<p style="color:#98a9e0; background: #1c1c38; border-radius: 2rem; padding: 1.5rem;">Nenhum comentário.</p>`;
    } else {
        comments.forEach(c => {
            html += `
                <div class="comment-item">
                    <div class="comment-author">
                        <i class="fas fa-user-circle"></i>
                        <span>${c.name.substring(0, 20)}...</span>
                        <span style="color:#6a79b0;">${c.email}</span>
                    </div>
                    <div style="color:#ccd6ff; padding-left:1rem;">${c.body}</div>
                </div>
            `;
        });
    }
    html += `</div><div class="back-home-hint"><i class="fas fa-undo-alt"></i> clique no autor do post para voltar ao perfil</div></div>`;
    mainContent.innerHTML = html;
}


// Inicia o app mostrando a tela principal
showMain();

// Navegação ao clicar nos cards
mainContent.addEventListener('click', (e) => {
    const authorElement = e.target.closest('.author-link') || e.target.closest('#post-author-header');
    if (authorElement && authorElement.dataset.authorId) {
        e.preventDefault();
        e.stopPropagation();
        showProfile(parseInt(authorElement.dataset.authorId));
        return;
    }

    const postCard = e.target.closest('.post-card');
    if (postCard && postCard.dataset.postId) {
        showPost(parseInt(postCard.dataset.postId));
        return;
    }
});

// Voltar para Home
document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('global-filter').value = ''; // Limpa a busca
    showMain();
});

// Ativando o Filtro de Busca 
const filterInput = document.getElementById('global-filter');
filterInput.removeAttribute('readonly'); 
filterInput.placeholder = "Pesquisar posts...";

// Cada vez que digitar algo, ele filtra os posts!
filterInput.addEventListener('input', (e) => {
    const query = e.target.value;
    showMain(query);
});