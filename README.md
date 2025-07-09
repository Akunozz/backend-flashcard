# API - Sistema de Flashcards

## Rotas de Usuários

### Criar usuário
`POST /users`
```
{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "password": "senha",
  "role": "PROFESSOR" ou "STUDENT"
}
```

### Login
`POST /users/login`
```
{
  "email": "email@exemplo.com",
  "password": "senha",
  "role": "PROFESSOR" ou "STUDENT"
}
```

## Rotas de Turmas

### Criar turma
`POST /turmas`
```
{
  "title": "Nome da turma",
  "description": "Descrição opcional",
  "professorId": "id_do_professor"
}
```

### Buscar turma por ID
`GET /turmas/:id`

### Listar todas as turmas
`GET /turmas`

### Adicionar aluno à turma
`POST /turmas/:id/alunos`
```
{
  "studentId": "id_do_aluno"
}
```

## Rotas dos Cards

### Criar card
`POST /cards`
```
{
  "front": "Frente do card",
  "back": "Verso do card",
  "deckId": 1,
  "imageUrl": "url_opcional"
}
```

### Listar todos os cards
`GET /cards`

### Buscar card por ID
`GET /cards/:id`

### Atualizar card
`PATCH /cards/:id`
```
{
  "front": "Nova frente",
  "back": "Novo verso",
  "imageUrl": "nova_url"
}
```

### Deletar card
`DELETE /cards/:id`

## Rotas de Decks

### Criar deck
`POST /decks`
```
{
  "title": "Título do deck",
  "description": "Descrição opcional",
  "turmaId": 1
}
```

### Listar todos os decks
`GET /decks`

### Buscar deck por ID
`GET /decks/:id`

### Buscar deck pela turma
`GET /decks/turma/:turmaId`

### Atualizar deck
`PATCH /decks/:id`
```
{
  "title": "Novo título",
  "description": "Nova descrição"
}
```

### Deletar deck
`DELETE /decks/:id`

## Rotas de DeckSession

### Obter todas as cartas de um deck
`GET /deck-sessions/decks/:deckId/cards`

### Criar sessão de estudo e reviews em lote
`POST /deck-sessions`
```json
{
  "studentId": "id_do_aluno",
  "deckId": 1,
  "reviews": [
    { "cardId": 1, "result": "CORRECT" },
    { "cardId": 2, "result": "INCORRECT" }
  ]
}
```

## Rotas de Review

### Listar todos os reviews
`GET /reviews`

### Buscar review por ID
`GET /reviews/:id`