# PMS_WEB_BACKEND# PMS Backend
This is a nodejs based service to work as backend for PMS App  
# to install packages
npm install
or
yarn install

# build and run
cp .env.example  .env
### To compile the typescript code in watch mode
npm run start:dev
or 
yarn start:dev
### To build
npm run build
or 
yarn build
### To run(set the same in intellij for debugging)
npm run start
or 
yarn start

# Run all the staff or command in the container

npx prisma db push

### for migrations

npx prisma migrate dev --name <name_of_the_migration>

### for getting the database schema to the schema.prisma

npx prisma db pull