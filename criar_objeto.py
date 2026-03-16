import json

posts = []

def criar_post():
    print("\n--- Criar novo Post ---")
    userId = int(input("userId: "))
    id_post = int(input("id: "))
    title = input("title: ")
    body = input("body: ")
    post = {
        "userId": userId,
        "id": id_post,
        "title": title,
        "body": body
    }
    posts.append(post)
    print("Post criado com sucesso!\n")

def listar_posts():
    print("\n--- Lista de Posts ---")
    if not posts:
        print("Nenhum post criado.")
        return
    for post in posts:
        print(json.dumps(post, indent=4, ensure_ascii=False))
        print()

def menu():
    while True:
        print("1 - Criar post")
        print("2 - Listar posts")
        print("3 - Sair")
        escolha = input("Escolha: ")
        if escolha == "1":
            criar_post()
        elif escolha == "2":
            listar_posts()
        elif escolha == "3":
            break
        else:
            print("Opção inválida.\n")

menu()