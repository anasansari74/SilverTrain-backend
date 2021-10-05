# Welcome to the backend of the silver-train app

# How to deploy/run this repo

- Run ` npm i `
- Create your ` .env ` with:
    - PostgreSQL database url
    - PostgreSQL shadow database url
    - PORT=4000
    - FRONTEND_URL=http://localhost:3000
    - JWT_SECRET="Your JWT secret key"
- Run ` npx prisma migrate dev ` to compile your DB
- Run ` npx prisma db seed --preview-feature ` to seed train rides and dummy users data
- Run ` npm start ` to start server
