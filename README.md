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
GET /turmas/:id

### Listar todas as turmas
GET /turmas

### Adicionar aluno à turma
`POST /turmas/:id/alunos`
```
{
  "studentId": "id_do_aluno"
}
```