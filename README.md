# ORM-Sequelize
### Projeto desenvolvido como forma de estudo junto a plataforma Alura.

Criar tabela Pessoas:
```
npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string
```

Realizar a migração:
```
npx sequelize-cli db:migrate
```