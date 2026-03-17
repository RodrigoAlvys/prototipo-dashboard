const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let posts = [];
function perguntar(pergunta, callback) {
    rl.question(pergunta, resposta => callback(resposta));
}

function criar_post() {
    console.log("\n--- Criar novo Post ---");
    perguntar("userId: ", userId => {
        perguntar("id: ", id_post => {
            perguntar("title: ", title => {
                perguntar("body: ", body => {
                    let post = {
                        userId: parseInt(userId),
                        id: parseInt(id_post),
                        title: title,
                        body: body
                    };
                    posts.push(post);
                    console.log("Post criado com sucesso!\n");
                    menu();
                });
            });
        });
    });
}

function listar_posts() {
    console.log("\nLista de Posts");
    if (posts.length === 0) {
        console.log("Nenhum post criado.");
    } else {
        for (let post of posts) {
            console.log(JSON.stringify(post, null, 4));
            console.log();
        }
    }
    menu();
}

function menu() {
    console.log("1 - Criar post");
    console.log("2 - Listar posts");
    console.log("3 - Sair");
    perguntar("Escolha: ", escolha => {
        if (escolha === "1") {
            criar_post();
        } else if (escolha === "2") {
            listar_posts();
        } else if (escolha === "3") {
            rl.close();
        } else {
            console.log("Opção inválida.\n");
            menu();
        }
    });
}

menu();