# Testing different scenarios of TypeORM

## Prerequsite

We use docker to run a PostgreSQL instance for the test.

```sh
docker run --name typeorm-postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=typeormpractice -p 5432:5432 -d postgres
```

## Run

Steps to run this project:

1. Run `yarn` command
2. Setup database settings inside `data-source.ts` file
3. Run `pwd={your db password} yarn start` command

Cases:
* [partial updates](src/cases/partial-update.ts)
* [many to many](src/cases/many-to-many.ts)
