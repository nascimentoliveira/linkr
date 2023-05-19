![created date - linkr](https://img.shields.io/date/1672628400?color=007ec6&label=created%20at&style=flat-square)
![license - linkr](https://img.shields.io/github/license/nascimentoliveira/linkr?color=007ec6&style=flat-square)
![last commit - linkr](https://img.shields.io/github/last-commit/nascimentoliveira/linkr?color=007ec6&style=flat-square)
![repo size - linkr](https://img.shields.io/github/repo-size/nascimentoliveira/linkr?color=007ec6&style=flat-square)
![files - linkr](https://img.shields.io/github/directory-file-count/nascimentoliveira/linkr?color=007ec6&style=flat-square)
![language - linkr](https://img.shields.io/github/languages/top/nascimentoliveira/linkr?color=007ec6&style=flat-square)
![stars - linkr](https://img.shields.io/github/stars/nascimentoliveira/linkr?color=007ec6&style=flat-square)
![forks - linkr](https://img.shields.io/github/forks/nascimentoliveira/linkr?color=007ec6&style=flat-square)

# Linkr - Rede Social de Compartilhamento de Links

O Linkr é uma rede social que permite aos usuários compartilhar e descobrir links interessantes. Com o Linkr, os usuários podem criar posts contendo links para páginas de interesse e interagir com o conteúdo de outros usuários. A aplicação oferece recursos como seguir outros usuários, curtir e comentar em posts, visualizar posts com determinadas hashtags de interesse e acessar um feed personalizado com os posts dos outros usuários seguidos.

> O código-fonte do back-end da aplicação está hospedado no GitHub em: [Linkr Back-end](https://github.com/nascimentoliveira/linkr-api)

> Linkr atualmente pode ser experimentado em: [Linkr Live Demo](https://nascimentoliveira-linkr.vercel.app)
>  
>> *A primeira requisição ao Live Demo pode levar um pouco mais de tempo para carregar. Isso ocorre porque os servidores são ativados conforme necessário e podem levar alguns instantes para iniciar!*

## Funcionalidades Principais

- **Compartilhamento de links:** Os usuários podem criar posts contendo links que desejam compartilhar com a comunidade. Cada post inclui uma descrição opcional para fornecer contexto.

- **Seguir Usuários:** Os usuários podem seguir outros usuários para acompanhar suas atividades na plataforma. Ao seguir um usuário, seus posts serão exibidos no feed do usuário seguidor.

- **Curtir e Comentar Posts:** Os usuários têm a opção de curtir e comentar em posts para interagir com o conteúdo compartilhado. Isso permite que os usuários expressem suas opiniões e iniciem conversas em torno dos links compartilhados.

- **Filtragem por Hashtags:** Os usuários podem seguir hashtags relacionadas aos seus interesses. Ao seguir uma hashtag, os posts que a utilizam serão exibidos no feed do usuário seguidor, permitindo uma descoberta mais fácil de conteúdo relevante.

- **Acesso aos Posts de Outros Usuários:** Os usuários podem visualizar os posts de outros usuários ao acessar seus perfis. Isso permite uma exploração mais aprofundada dos links compartilhados por um usuário específico.

- **Feed Personalizado:** O feed principal exibe os posts das pessoas que o usuário segue. Essa funcionalidade garante que o usuário tenha acesso rápido às atualizações mais recentes dos usuários que segue.


## Como Usar

1. Após iniciar a aplicação Linkr, você será direcionado para a página inicial. Se você já tem uma conta, faça login usando suas credenciais. Caso contrário, clique em `First time? Create an account!` para criar uma nova conta.

2. Após o login, você verá o feed principal com os posts das pessoas que você segue. Role a página para baixo para ver mais posts. 

3. Para a criação de post, insira a URL do link que deseja compartilhar no campo `http://...`. Você também pode adicionar uma descrição opcional para fornecer contexto sobre o link compartilhado.

4. Após preencher os campos, clique em `Publish` para publicar o novo post. O post será exibido no feed principal e poderá ser visualizado por outros usuários.

5. Você pode interagir de diferentes maneiras:

    - Clicar no botão de `Like` para indicar que você gostou do post.
    - Comentar no post, clicando no ícone de balão de diálogo e digitando seu comentário na caixa de texto.
    - Clicar no nome de usuário do autor do post para acessar o perfil dele e ver outros posts que ele compartilhou.
    - Se você for o autor do post, poderá editar ou excluir o post clicando nos botões correspondentes no canto superior direito do post.

6. Para seguir outros usuários, acesse o perfil do usuário clicando no nome dele no post. No perfil, você encontrará o botão `Follow`. Ao seguir um usuário, os posts dele serão exibidos em seu feed principal.

7. Você também pode visualizar posts com hashtags de seu interesse. Para isso, clique em uma hashtag em um post para ver outros posts relacionados.

8. Para encontrar outros usuários, utilize a barra de pesquisa localizada no canto central superior da página. Digite o nome do usuário que você deseja encontrar. Os resultados da pesquisa serão exibidos, e você pode clicar em um usuário para acessar o perfil dele.

Para visualizar seus posts e informações do seu perfil, clique no seu nome em algum post seu ou pesquise seu nome de usuário na barra de pesquisa localizada no canto central superior da página.

Explore a aplicação, descubra novos links, siga usuários interessantes e interaja com a comunidade do Linkr!


## Tecnologias Utilizadas

Linkr foi desenvolvido utilizando as seguintes tecnologias:

- Linguagem de Programação: [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference).
- Banco de Dados: [PostgreSQL](https://www.postgresql.org/about/).
- Front-end
    - [React](https://react.dev/learn): Biblioteca JavaScript de código aberto para a construção de interfaces de usuário.
    - [Axios](https://axios-http.com/ptbr/docs/intro): Biblioteca JavaScript para realizar requisições HTTP.
    - [Styled Components](https://styled-components.com/): Biblioteca para escrever estilos CSS de forma dinâmica em componentes React.
    - [React Dom](https://www.npmjs.com/package/react-dom): Biblioteca para renderização de componentes React no navegador.
    - [Sweet Alert](https://sweetalert2.github.io/): Biblioteca JavaScript para exibir belas caixas de diálogo modais.
    - [React Toastify](https://fkhadra.github.io/react-toastify/introduction): Biblioteca para exibir notificações e mensagens de toast na aplicação.
    - [React Tagify](https://yaireo.github.io/tagify/): Biblioteca para criar tags e facilitar a entrada de dados relacionados a tags.
    - [React Modal](https://reactcommunity.org/react-modal/): Biblioteca para criação e exibição de modais na aplicação.
    - [React Infinite Scroller](https://www.npmjs.com/package/react-infinite-scroller): Biblioteca para implementar rolagem infinita em páginas longas.
    - [React Loader Spinner](https://mhnpd.github.io/react-loader-spinner/): Biblioteca para exibir indicadores de carregamento de componentes na página.
- Back-end
    - [Node.js](https://nodejs.org/en/about): Plataforma de desenvolvimento JavaScript assíncrona baseada no motor V8 do Chrome.
    - [Express](https://expressjs.com/pt-br/): Framework web rápido e minimalista para Node.js.
    - [Dotenv](https://www.npmjs.com/package/dotenv): Pacote para carregar variáveis de ambiente a partir de um arquivo .env.
    - [Bcrypt](https://www.npmjs.com/package/bcrypt): Biblioteca para criptografia de senhas.
    - [Joi](https://joi.dev/): Biblioteca para validação de dados.
    - [JWT](https://www.npmjs.com/package/jsonwebtoken): Biblioteca para geração e validação de tokens de autenticação.
    - [Url Metadata](https://www.npmjs.com/package/url-metadata): Módulo para extrair metadados de uma URL, como título, descrição e imagem.

Essas tecnologias foram escolhidas para proporcionar uma experiência de desenvolvimento moderna, eficiente e escalável.

## Instalação
1. Clone o repositório do projeto:
    ```bash
    git clone https://github.com/nascimentoliveira/linkr.git
    ```

2. Acesse o diretório do projeto.
   ```bash
   cd linkr
   ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente:  
    Antes de executar a aplicação, é necessário configurar as variáveis de ambiente corretamente. Siga os passos abaixo:
    -  Renomeie o arquivo `.env.example` para `.env`.

        ```bash
        mv .env.example .env
        ```

    - Abra o arquivo `.env` em um editor de texto.
    - Procure a variável `APP_API_BASE_URL` e defina-a com a URL base da sua API. Exemplo:  

        ```bash
        APP_API_BASE_URL=http://localhost:8000/api
        ```

    - Verifique se existem outras variáveis de ambiente necessárias para o funcionamento da aplicação e defina-as de acordo com a sua configuração.

    - Salve o arquivo `.env`.
    
    > ⚠️ *Certifique-se de não compartilhar o arquivo `.env` contendo informações sensíveis, como senhas, chaves de API ou tokens de acesso. Mantenha-o seguro e fora do controle de versão do seu repositório.*

    Após configurar as variáveis de ambiente, a aplicação estará pronta para ser executada.

5. Execute o projeto:
    ```bash
    npm start
    ```
6. A aplicação ficará disponível em:
    ```bash
    http://localhost:3000
    ```

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu computador:  
-   Node.js (versão 14 ou superior)
-   NPM (versão 7 ou superior)


## Contribuição

Se você deseja contribuir para o projeto, siga os passos abaixo:

1. Faça um `fork` do repositório.
2. Crie uma nova `branch` com a sua contribuição: 
    ```bash
    git checkout -b <sua-contribuicao>
    ```
3. Faça as suas modificações  no código.
4. Faça `commit` das suas alterações:
    ```bash
    git commit -m "Sua contribuição"
    ```
5. Envie as alterações para o repositório remoto: .
    ```bash
    git push origin <sua-contribuicao>
    ```
6. Abra um `pull request` no repositório original, descrevendo as modificações realizadas.

Se te ajudei de alguma forma, ficarei feliz em saber. Se possível:  
⭐️ dê uma estrela para este projeto; e   
🪲 Encontre e relate `issues`

## Licença

Este projeto é licenciado sob a licença [MIT](https://choosealicense.com/licenses/mit/). Consulte o arquivo LICENSE para obter mais informações.

Disponibilizado por [Thiago Oliveira](https://www.linkedin.com/in/nascimentoliveira/).