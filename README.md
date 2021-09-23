# ORM-Sequelize
### Projeto desenvolvido como forma de estudo junto a plataforma Alura.

<details>
<summary>Comando úteis</summary>

Criar tabela Pessoas:
```
npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string
```

Realizar a migration:
```
npx sequelize-cli db:migrate
```

Criar seeds:
```
npx sequelize-cli seed:generate --name demo-pessoa
```

Inserir seeds:
```
npx sequelize-cli db:seed:all
```

Desfazer a ultima migrations:
```
npx sequelize-cli db:migrate:undo
```

Desfazer uma migration especifica:
```
db:migrate:undo --name [data-hora]-create-[nome-da-tabela].js
```

Desfazer o ultimo seed feito:
```
npx sequelize db:seed:undo
```

Desfazer seeds de uma tabela específica:
```
npx sequelize-cli db:seed:undo --seed nome-do-arquivo
```

Desfazer todos os seeds feitos:
```
npx sequelize-cli db:seed:undo:all
```

</details>

---
---

# Requisitos do projeto

[x]    O cliente não gostaria que registros importantes do sistema, como as Pessoas, sejam apagados definitivamente do banco de dados.

[x]    Para deixar a interface mais limpa, o cliente gostaria que na lista de Pessoas, por padrão, fossem exibidos somente os usuários ativos.

[x]    Foram percebidas algumas falhas de validação dos formulários por parte do front-end, o que resultou em dados de email inválidos no banco. É desejável que essa validação não seja responsabilidade exclusiva do front.

[x]    É importante poder consultar todas as matrículas confirmadas referentes a estudante X de forma rápida.

[]    O cliente gostaria de poder consultar as turmas abertas por intervalo de data, para não receber informações desnecessárias (como turmas antigas).

[]    O cliente quer poder consultar as matrículas por turma e saber quais delas estão lotadas, para organizar melhor as matrículas.

[]    O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, todas as matrículas relativas a este estudante automaticamente passassem a constar como “canceladas”.
