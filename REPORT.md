# REPORT

## Estrutura do Projeto

```text
src/
├── components/          # Todos os componentes  da aplicação
│   └── specific/        # Componentes que não são reutilizáveis
├── contexts/            # Gerenciamento de estado global (`gameContext`)
├── hooks/               # Nossos Hooks customizados
│   └── api/             # Abstração de todas as chamadas HTTP
├── pages/               # Páginas com rotas
├── services/            # Configuração base da API (Fetch e WebSocket)
└── utils/               # Helpers para interagir com o localStorage do navegador
```

*   **`components/`**: Aqui focamos na separação de responsabilidades, ou seja, cada componente tem uma função bem clara.
*   **`contexts/`**: Gerenciamento do estado global do jogador e do espectador.
*   **`hooks/api/`**: É o coração da nossa comunicação. Nenhum componente faz um `fetch` direto, eles apenas consomem esses hooks.
*   **`pages/`**: Componentes orquestradores que possuem rotas e montam os componentes filhos.

## Decisões de Arquitetura e UI

Uma das nossas várias decisões (explicitamente definidas em `INTERNAL_DOCS.md`) foi o uso de **CSS Modules**.
Escolhemos não usar libs como Tailwind, Material UI ou Ant Design pois queríamos utilizar nossos conhecimentos prévios em CSS.
O **CSS Modules** em vez do CSS puro foi uma decisão pensada em escalabilidade para evitar os conflitos de estilo que poderiam surgir facilmente.

Para a comunicação com o backend, isolamos tudo em **Services** e **Hooks**.
A ideia era evitar que um componente visual ficasse carregado com tratamentos de erro,
estados de carregamento e parsing de JSON. 

O maior destaque aqui foi a implementação do **useFetch**, que foi fortemente inspirado pelo React Query.
Nós decidimos escrever nossa própria versão para entender o que acontece por debaixo dos panos e,
novamente, para evitar a utilização de muitas libs.
Ele gerencia o estado de `isLoading`, `error` e `data` e também implementa uma lógica específica para mutações (POST/PUT).

## O Tabuleiro e o Fluxo de Partidas

O maior desafio foi a renderização do tabuleiro 5x5.
Nós pegamos o estado do jogo (matriz), renderizamos vários componentes `Cell` e
cada um apenas reage ao estado passado pelo componente pai (`Board`).

No fluxo de partidas, focamos em UX, criando uma rota dedicada para a **Criação de Partida**,
onde o usuário pode escolher entre jogar contra outro jogador ou contra o **Bot Aleatório**. 

Nós também desenhamos o fluxo para que, ao criar ou assistir uma partida, o espectador seja registrado automaticamente.
