# 📖 Manual de Sobrevivência e Contribuição

> **⚠️ AVISO: DOCUMENTAÇÃO DE USO ESTRITAMENTE INTERNO**
> 
> Este documento foi desenhado exclusivamente para o alinhamento da nossa equipe.
O foco aqui é didática extrema, nivelamento técnico e padronização absoluta.
Ele foi estruturado deliberadamente dessa forma para guiar nossos passos de forma segura e à prova de falhas,
não como um guia rápido tradicional de open-source.

---

## 1. Configuração Inicial

Antes de escrever sua primeira linha de código, você precisa preparar o terreno.

### 1.1. Dependências do Projeto

Clone o repositório e instale as munições do projeto. No seu terminal, rode:
```bash
npm install # ou somente npm i
```
Isso vai baixar todas as bibliotecas necessárias para a aplicação rodar. Se der erro aqui, **não avance**.

### 1.2. Extensões do VS Code

Abra o seu VS Code e instale estas extensões.
Elas são a sua primeira linha de defesa contra bugs invisíveis e horas de depuração frustrantes:

* **Prettier:** Um formatador de código. Ele vai te ajudar a escrever código de forma consistente, padronizada e legível.
* **ESLint:** Ele vai te avisar em tempo real se você cometer algum erro fatal no React (como criar um loop infinito ou colocar um Hook no lugar errado). Se o ESLint gritar, obedeça.
* **Auto Rename Tag:** Mudou uma tag de `<div>` para `<section>`? Ele muda a de fechamento dela automaticamente. Evita que o layout quebre por tags abertas.
* **Code Spell Checker (Opcional):** Um corretor ortográfico para código. Ele sublinha palavras em inglês/português escritas erradas. Isso evita que a aplicação quebre porque alguém digitou `funtion` em vez de `function` ou errou o nome de uma variável.

### 1.3. Apoio com IA (GitHub Copilot)

Nós vamos usar o GitHub Copilot para ajudar a codar mais rápido e entender erros mais facilmente direto no VS Code,
evitando a necessidade de usar outros chats ou ferramentas externas.

**Sua missão:**
1. Abra o VS Code e [siga essas instruções](https://code.visualstudio.com/docs/copilot/setup) para iniciar o Copilot.
2. Aprenda [como usar o Copilot](https://code.visualstudio.com/docs/copilot/getting-started).

### 1.4. Padronização de Estilo (Prettier)

Nós temos um padrão visual rígido para o código (aspas duplas, ponto e vírgula e indentação de 2 espaços).

- **Automático:** Ao salvar um arquivo no VS Code, a extensão do Prettier deve formatar tudo sozinho. Se não formatar, verifique se a extensão está ativa.

- **Manual:** Antes de fazer o seu `git push`, rode o comando `npm run format` no terminal. Isso vai garantir que todos os arquivos da pasta `src` estejam padronizados. Código fora do padrão visual será barrado no Pull Request.

## 2. Fluxo de Trabalho (O Quadro Kanban)

Para que o nosso grupo não vire uma bagunça de "quem está fazendo o quê", usaremos o [GitHub Projects](https://github.com/users/manuezi/projects/1).
O Kanban é a nossa bússola: se não está no quadro, não deve ser feito.

### 2.1. O que é Kanban?

É um sistema visual de gestão de trabalho que foca em mover tarefas do início ao fim o mais rápido possível.
O objetivo é evitar que alguém fique sobrecarregado e garantir que o projeto esteja sempre andando.

- Para saber mais: [Guia do Kanban pela Atlassian](https://www.atlassian.com/br/agile/kanban)

### 2.2. As Colunas

O quadro está dividido em 5 etapas obrigatórias.
Você só move uma tarefa para a próxima coluna quando ela estiver 100% pronta naquela fase.
Alguns fluxos podem ser atualizados de forma automática, como quando uma pull request for fechada por exemplo.

1. **Backlog (Reserva):** Aqui ficam todas as ideias e funcionalidades que poderemos fazer no futuro. Nada aqui é prioridade agora.
2. **To Do (A Fazer):** São as tarefas selecionadas para a nossa Sprint atual. Se você terminou uma tarefa, venha aqui e pegue a mais urgente que estiver atribuída a você.
3. **Doing (Em Andamento):** Você move a task para cá assim que começar a codar.
  - *Regra de Ouro:* No máximo *1 task* por pessoa aqui. Se você está fazendo duas coisas ao mesmo tempo, não está fazendo nenhuma direito.
4. **Review (Sob Inspeção):** Terminou o código? Abriu o Pull Request? Mova a task para cá. É aqui que seu código será analisado antes de chegar na main.
5. **Done (Missão Cumprida):** A tarefa só chega aqui depois que o código foi mesclado (merge) na main e está funcionando perfeitamente.

### 2.3. Checklists

Cada tarefa dentro do GitHub Projects poderá ter um checklist de sub-tarefas.

- Não ignore o checklist. Ele serve como o nosso "Critério de Aceite".
- Você só pode mover uma task de Doing para Review quando todos os itens do checklist estiverem marcados (se houver).

## 3. Movimentação no Campo (Git, Branches e Commits)

A regra número 1 do nosso batalhão é: **Ninguém faz commit direto na branch `main`.**
A regra número 2 do nosso batalhão é: **Ninguém faz commit direto na branch `main`.**
A `main` é o nosso jogo em produção, se ela quebrar, o jogo inteiro cai.

Para trabalhar sem destruir o que já está feito, usamos Branches e Commits.

### 3.1. A Diferença: Branch vs. Commit

Pense no Git como um videogame:
* **Branch (O Universo Paralelo):** É uma cópia segura do jogo original. Você cria uma branch para construir a sua funcionalidade isolado dos outros. Lá, você pode quebrar tudo e explodir o código, que a `main` continuará intacta.
* **Commit (O Save no jogo):** Dentro do seu "universo paralelo" (sua branch), você vai avançando. Fez o botão funcionar? Dá um *Commit* (salva o jogo). Colocou a cor certa? Dá outro *Commit*. Se a próxima alteração der errado, você pode voltar para o último Commit e tentar de novo.

![Exemplo de Commit e Branch](https://user-images.githubusercontent.com/21223421/111697237-fd5c4f80-883d-11eb-9506-4347ba482250.png)

### 3.2. Regras de Branch

Você pegou uma tarefa no Kanban? A primeira coisa a fazer é criar a sua branch. 
**Regra de Ouro:** 1 Task = 1 Branch. Não misture duas tarefas no mesmo lugar.

**Como nomear a sua branch:**
Use tudo em minúsculo, sem acentos ou caracteres especiais, e separe as palavras por hífen (`-`).
* Vai criar algo novo? `feat/nome-curto-da-task` (ex: `feat/tela-de-login`)
* Vai consertar um bug? `fix/nome-do-bug` (ex: `fix/botao-nao-clica`)

Os tipos de branch (`feat`, `fix` etc.) são os mesmos que usamos nos commits. Veja abaixo:

### 3.3. Conventional Commits

Commits com mensagens como *"arrumei a parada"* ou *"terminado"* não são nada claros sobre suas alterações.
Você precisa dizer **o que** fez só de bater o olho no histórico.

Nós usamos o padrão **Conventional Commits**. Cada commit deve ter um "Tipo" antes da mensagem.

**Os 6 Tipos Oficiais que vamos usar:**
1. **`feat:` (Feature / Funcionalidade):** Você adicionou algo novo no projeto.
   * *Exemplo:* `feat: adiciona componente de input no login`
2. **`fix:` (Conserto de Bug):** Você arrumou algo que estava quebrado.
   * *Exemplo:* `fix: corrige quebra de layout no celular`
3. **`refactor:` (Refatoração):** Você alterou o código para deixá-lo melhor, mas **não mudou nada no visual ou na funcionalidade** para o usuário final.
   * *Exemplo:* `refactor: simplifica a logica do loop`
4. **`style:` (Formatação de Código):** Cuidado, isso **não é para CSS**. Isso é para quando você rodou o Prettier, arrumou espaços, pontos e vírgulas, ou indentação. Código que não muda a lógica.
   * *Exemplo:* `style: formata arquivo de rotas com prettier`
5. **`docs:` (Atualização de Documentação):** Mudou algo no README ou algum arquivo que sirva como base de conhecimento sobre o projeto? Entra aqui. Qualquer outra coisa está fora.
   * *Exemplo:* `docs: adiciona guia de instalação da aplicação no README`
6. **`chore:` (Tarefas de *Manu*tenção):** Mudanças em configurações, atualização de pacotes (npm), mexer no `.gitignore`. Trabalhos "braçais" que não afetam o código do jogo em si, ou seja, tudo que não se encaixar nos outros tipos.
   * *Exemplo:* `chore: atualiza a dependencia do react-router`

**Importante:** O corpo da mensagem do commit deve começar com um verbo no presente do indicativo.
Exemplo: `"feat: adiciona validação de email"`, não `"feat: adicionei validação de email"`.
Pense como se fosse dizer a seguinte frase: "Esse commit **adiciona validação de email**".
Esse é a frase que deverá ir no seu commit.

**Importante 2:** Sinta-se livre para colocar emojis no commit ✨.

**Quando fazer o commit?**
Não espere o fim do dia para dar um commit gigante com 50 arquivos.
Terminou um componente lógico? Commit.
Terminou de aplicar o CSS nele? Commit.
Commits pequenos e focados salvam vidas na hora de encontrar onde um bug começou.

## 4. React e CSS

### 4.1. Organização de Componentes

```bash
components/
├── common/
│   ├── Button.jsx
│   ├── Button.module.css
│   ├── Input.jsx
│   ├── Input.module.css
│   └── ...
├── layout/
│   ├── Footer.jsx
│   ├── Footer.module.css
│   ├── Header.jsx
│   ├── Header.module.css
│   └── ...
pages/
├── Home.jsx
├── NotFound.jsx
└── ...
```

- **`components/`:** A grande maioria dos componentes React ficam aqui.
- **`components/common/`:** Componentes comuns que são reutilizados em várias páginas ou outros componentes maiores.
- **`components/layout/`:** Componentes mais específicos que **não** são reutilizados.
- **`pages/`:** Páginas do site.

### 4.2. Estilização: CSS Modules

Esqueça o CSS global bagunçado.
Nós usaremos **CSS Modules** para garantir que o estilo que você fez no cabeçalho não quebre o rodapé de outra pessoa.

**Como usar corretamente:**
1.  **Nomenclatura:** Os arquivos devem se chamar `NomeDoComponente.module.css`.
2.  **camelCase Sempre:** O JavaScript odeia hifens. Escreva suas classes como `minhaDiv` e não `minha-div` ou `minha_div`.
3.  **A Sintaxe na Prática:**
    ```javascript
    import styles from './MeuComponente.module.css';

    export function MeuComponente() {
      // O JS lê o "styles.minhaDiv" como se fosse um objeto
      return <div className={styles.minhaDiv}>Conteúdo</div>;
    }
    ```

**Classes Múltiplas e Condicionais (O uso do `clsx`):**
Se um elemento precisa de mais de uma classe ou muda de estilo baseado numa variável,
usar template strings nativas vira uma bagunça. Para manter a sanidade, usamos a biblioteca `clsx`:
```javascript
import styles from './Botao.module.css';
import clsx from 'clsx';

export function Botao() {
  return (
    <button className={clsx(styles.btn, styles.primario)}>
      Clique Aqui
    </button>
  );
}
```

### 4.3. O Problema com CSS Modules (componente pai estilizando componente filho)

Por conta da natureza do CSS Modules,
você **não pode** tentar forçar uma estilização num componente filho a partir do CSS do componente pai
(ex: fazer `.pai .filho { margin-top: 10px; }` não vai funcionar).

**A Tática Correta:** O Pai passa a classe como uma Prop (`className`), e o Filho aceita essa classe de fora e junta com as dele mesmo.
```javascript
// No arquivo do Pai
import styles from './Pai.module.css';
import { Filho } from './Filho';

export function Pai() {
  return <Filho className={pageStyles.margemMaior} />
}

// No arquivo do Filho (O componente que você quer estilizar):
import clsx from 'clsx';
import styles from './Filho.module.css';

export function Filho({ className, ...props }) {
  // O clsx junta o estilo base com a margem extra que o Pai mandou
  return <span className={clsx(styles.botaoPadrao, className)} {...props} />
}
```

## 5. Integração com o Backend

Fazer requisições HTTP cruas no meio do código visual é complexo de ser feito corretamente.
Para blindar o batalhão contra isso, nós temos o nosso próprio "motor" de requisições.
Você não precisa saber como o motor foi montado, você só precisa saber dirigir o carro.

### 5.1. Os Hooks Específicos para Requisições

Para cada rota do backend, existe um Hook correspondente já criado na pasta `/hooks/api`.
* Quer buscar os dados do jogador? Use o `useGetJogador()`.
* Quer listar o ranking do jogo? Use o `useGetRanking()`.

Esses hooks resolvem três problemas de uma vez só:
1. Fazem o `try/catch` para o jogo não explodir se algo der errado.
2. Gerenciam os estados de `loading` e `error` automaticamente.
3. Fazem o VS Code saber exatamente quais dados o backend está devolvendo e vai autocompletar para você.

### 5.2. Como Usar na Prática

Quando for construir a sua Página/Componente, você vai chamar o hook e extrair três coisas dele:
`data`, `isLoading` e `error`.

Veja o padrão de como a sua tela deve reagir a essas três variáveis:

```javascript
import { useGetRanking } from '../hooks/api/useRanking';
import { Spinner } from '../components/common/Spinner';
import styles from './PaginaRanking.module.css';

export function PaginaRanking() {
  // 1. Aciona o Hook da requisição desejada
  const { data, isLoading, error } = useGetRanking();

  // 2. Trata o Carregamento PRIMEIRO
  if (isLoading) return <Spinner />; // Mostra que está carregando antes de tentar ler os dados

  // 3. Trata a Falha em SEGUIDA
  if (error) {
    return <div className={styles.alertaErro}>Falha de comunicação: {error.message}</div>;
  }

  // 4. Renderiza o Sucesso (Aqui você tem certeza que "data" existe)
  return (
    <div className={styles.container}>
      <h1>Ranking do Jogo</h1>
      <ul>
        {/* Ao digitar "jogador.", o VS Code vai sugerir ".nome" e ".pontos" sozinho */}
        {data.map((jogador) => (
          <li key={jogador.id}>{jogador.nome} - {jogador.pontos}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 6. Entrega e Inspeção (O Caminho do Pull Request)

Você terminou o código, marcou o checklist no Kanban e tudo funciona na sua máquina.
Agora vem a parte mais crítica: levar o seu código do seu "universo paralelo" (branch) para a base principal (`main`).

### 6.1. O Push: Enviando para a Base Remota

Antes de qualquer coisa, você precisa enviar seus commits locais para o servidor do GitHub.
No seu terminal, dentro da sua branch, rode:
```bash
git push
```

Caso dê erro, muito provavelmente a sua branch não existe no GitHub ainda,
então você precisa informar o git para criá-la:
```bash
git push -u origin nome-da-sua-branch
```

### 6.2. Criando o Pull Request (PR)

O Pull Request (PR) é o seu pedido formal de: *"Terminei minha tarefa, podem revisar para eu colocar na main?"*.

1. Vá até o repositório no GitHub. Você verá um aviso amarelo: **"Compare & pull request"**. Clique nele.
2. **Título:** Use um nome claro. Ex: `Feat: Implementa formulário de login` (geralmente o nome da tarefa).
3. **Descrição:** Adicione `/close #<numero-da-issue>` para fechar a issue automaticamente quando o PR for mergeado.

### 6.3. Chamando a Inspeção (Reviewers)

* No menu lateral direito do seu PR, procure por **"Reviewers"**.
* **Selecione o usuário de quem vai fazer a inspeção do código.**

### 6.4. CI/CD e Vercel

Assim que você abre o PR, o GitHub aciona automaticamente os "Cães de Guarda" (nosso pipeline de CI):
* **Vercel Preview:** Ele vai tentar gerar um link de teste com o seu código. Se o build falhar, o GitHub vai mostrar um **X vermelho**.
* **Lint Check:** Ele vai conferir se você respeitou as regras do Prettier e do ESLint.

**Se aparecer um "X" vermelho:** Clique em "Details", descubra o erro, conserte no seu VS Code,
dê um novo `commit` e um novo `push`. O PR vai se atualizar sozinho.

### 6.5. O Feedback: O que fazer com os comentários?

Durante o Code Review, é possível deixar comentários em linhas específicas do código pedindo ajustes
(ex: *"Mude o nome desta variável"*, *"Use tal hook aqui"*).

* **Não abra outro PR.** * Faça os ajustes solicitados na mesma branch,
dê um novo `commit` (tipo `fix: ...` ou `refactor: ...`) e dê um novo `push`. 
* Os comentários no GitHub serão atualizados. Assim que o **"Approve"** for dado, o sinal ficará verde.

### 6.6. O Merge Final

O botão de **"Merge pull request"** só deve ser apertado quando:
1. O CI/CD estiver **Verde** (Build passou).
2. O Code Review estiver **Aprovado**.
3. Não houver conflitos com a `main`.

Após o merge, clique no botão para **deletar a sua branch** no GitHub para manter o repositório limpo.
