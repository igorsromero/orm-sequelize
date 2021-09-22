# ORM-Sequelize
### Projeto desenvolvido como forma de estudo junto a plataforma Alura.

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