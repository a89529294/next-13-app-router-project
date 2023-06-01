# README

## setting up postgresql & prisma

1. Create a postgresql db on railway.
2. Copy connection url and paste it in `.env` file as `DATABASE_URL`
3. Run `npx prisma init`
4. Open `prisma/schema.prisma` and create some models.
5. Run `npx prisma migrate dev`.
6. Run above command every time you modify your schema.
7. Create `/lib/db.ts` and create a cached `new PrismaClient()`.
8. Create a `prisma/seed.ts`.
9. Copy the content in `tsconfig.json` and paste it in a new file `tsconfig-seed.json` with one diff, `"module": "CommonJS",`.
10. Add below to package.json, `-r tsconfig-paths/register` tells `ts-node` to understand our path alias, `--transpileOnly` skips type checking. `json
    "prisma": {
    "seed": "ts-node -P tsconfig-seed.json -r tsconfig-paths/register --transpileOnly prisma/seed.ts"
    },

`
11. Run`npx prisma db seed`to seed db.
12. Run`npx prisma studio`to see the db content.
13.`npx prisma migrate reset` to reset db and run seed file.
