# PostgreSQL example using Supabase

This example shows you how to connect to a PostgreSQL database on [Supabase](https://supabase.com/) using Prisma, and use [Prisma Client](https://www.prisma.io/client) in a TypeScript script to read and write data. Finally, it includes a Dockerfile so that
this example can be deployed to Railway.

## How to use

Install npm dependencies:

```
npm install
```

### 2. Set up Supabase connection variables

Create a `.env` file at the root of your folder. Copy and update the following environment variables in the `.env` file:

```sh
touch .env
```

```sh
# .env
DATABASE_URL="YOUR SUPABASE DATABASE URL"
```

### Create the database schema

Run the following command to apply the necesarry sql schema to your database:

```
npm run db:push
```

You should see the following output:

```
Your database is now in sync with your schema.
```

### Seed the database with test data

```
npm run db:seed
```

### 3. Run the script

To run the script `script.ts`, run the following command:

```bash
npm run dev
```

As a next step, explore the `script.ts` file to see how to use Prisma Client to read and write data in the database.

### 4. Deploy on Railway

Import this git repo into Railway and deploy it.
The Dockerfile will be automatically detected and used to build/deploy the project.

Note that this probably just crash loops when deployed until you disable ssl on
the database connection.

Edit your DATABASE_URL in railway by adding `?sslmode=disable` and observe that it starts working.
