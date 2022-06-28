# Roles-API
🎯 Project API with role control | TDD, Typescript, Jest, Prisma, RepositoryPattern

## Topics

- The project
- Main technologies used
- Applied knowledge
- Headaches
- How execute

## 🎉 The project

The Project is a simple with access control based in roles. I used this project to fix knowledge that I have recently acquired. Among the main concepts applied: Test Driven Development, RepositoryPattern, Typescript and many others that I will be pleased to show you

## 🥊 Main technologies used

- Node
- Express
- Prisma
- Jest and Supertest
- Typescript
- Postgresql

## 📌 Applied knowledge

- Test Driven Development
- RepositoryPattern
- Custom Error Handling
- Multiple Environments
- Decoupled structure

## 🤕 Headaches

During the development of the project, as some concepts were still new, I had some headaches, but after searching forums and reusing knowledge I managed to find solutions, but they may not be the best. If you who see this repository know where this little project can improve, don't hesitate! Your help is most welcome.

## 📜 How execute

```bash
# Clone repository
$ git clone <https://github.com/VictorLima2003/Roles-API.git>

# Install dependencies
$ npm install
```
Create the files: __.env.development__, __.env.test__, __.env.production__ and fill them with the example template, contained in the file __.env.example__. ATTENTION: The application's DB's work with Postgresql. If you prefer to use another one for testing, for example, please check the Prisma documentation. I didn't find much flexibility in working with different DB's in different environments 😞

```bash
# Execute migrations
$ npm run migrate:dev
$ npm run migrate:test
$ npm run migrate:prod

# To raise the development server
$ npm run dev

# To perform the tests
$ npm run test
```

Obrigado!
