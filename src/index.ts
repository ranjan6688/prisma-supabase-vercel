import { LOGGER, LoggerController } from './../controllers/logger.controller';
import { PrismaController } from './../controllers/prisma.controller';
import { ExpressController } from './../controllers/express.controller';
// import express, { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import morgan from 'morgan';
// import bodyParser from "body-parser";
import env from 'dotenv';

env.config();

// const prisma = new PrismaClient();

// const app = express();
// const port = process.env.PORT || 8080

// async function main() {
//     app.use(express.json());
//     app.use(morgan('combined'));

//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use(bodyParser.json());

//     app.get('/users', async (req: Request, res: Response) => {

//         try {
//             const users = await prisma.users.findMany({
//                 where: {
//                     status: 1,
//                 }
//             });
//             res.status(200).json(users);
//         } catch (e) {
//             res.status(500).json({ error: e });
//         }
//     });

//     app.get('/users/:id', async (req: Request, res: Response) => {
//         try {
//             const { id } = req.params;
//             const users = await prisma.users.findUnique({
//                 where: {
//                     id: Number(id),
//                     status: 1,
//                 },
//             });
//             res.status(200).json(users);
//         } catch (e) {
//             res.status(500).json({ error: e });
//         }
//     });

//     app.post('/users', async (req: Request, res: Response) => {

//         try {
//             const { username, password, email, created_at } = req.body;
//             const newBlogPost = await prisma.users.create({
//                 data: {
//                     username,
//                     password,
//                     email,
//                     created_at
//                 }
//             });
//             res.status(200).json(newBlogPost);
//         } catch (e) {
//             res.status(500).json({ error: e });
//         }
//     });

//     app.put('/users/:id', async (req: Request, res: Response) => {
//         try {
//             const { id } = req.params;
//             const { username, password, email, created_at } = req.body;
//             const users = await prisma.users.update({
//                 where: {
//                     id: Number(id),
//                     status: 1,
//                 },
//                 data: {
//                     username,
//                     password,
//                     email,
//                     created_at
//                 }
//             });
//             res.status(200).json(users);
//         } catch (e) {
//             res.status(500).json({ error: e });
//         }
//     });

//     app.delete('/users/:id', async (req: Request, res: Response) => {
//         try {
//             const { id } = req.params;
//             const users = await prisma.users.update({
//                 where: {
//                     id: Number(id),
//                     status: 1
//                 },
//                 data: {
//                     status: 0
//                 }
//             });
//             res.status(200).json(users);
//         } catch (e) {
//             res.status(500).json({ error: e });
//         }
//     });

//     app.get('/', (req: any, res: any) => {
//         return res.send('Express Typescript on Vercel')
//     });
      

//     // Catch unregistered routes
//     app.all("*", (req: Request, res: Response) => {
//         res.status(404).json({ error: `Route ${req.originalUrl} not found` });
//     });

//     app.listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//     });
// }

// main()
//     .then(async () => {
//         await prisma.$connect();
//     })
//     .catch(async (e) => {
//         console.error(e);
//         await prisma.$disconnect();
//         process.exit(1);
//     });

LoggerController.init();
ExpressController.init();
PrismaController.init().then(() => {
    LOGGER.log('Database connected');
}).catch(async ex => {
    LOGGER.error(ex);
    await PrismaController.deinit();
});