"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
async function main() {
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)('combined'));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.get('/users', async (req, res) => {
        try {
            const users = await prisma.users.findMany({
                where: {
                    status: 1,
                }
            });
            res.status(200).json(users);
        }
        catch (e) {
            res.status(500).json({ error: e });
        }
    });
    app.get('/users/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const users = await prisma.users.findUnique({
                where: {
                    id: Number(id),
                    status: 1,
                },
            });
            res.status(200).json(users);
        }
        catch (e) {
            res.status(500).json({ error: e });
        }
    });
    app.post('/users', async (req, res) => {
        try {
            const { username, password, email, created_at } = req.body;
            const newBlogPost = await prisma.users.create({
                data: {
                    username,
                    password,
                    email,
                    created_at
                }
            });
            res.status(200).json(newBlogPost);
        }
        catch (e) {
            res.status(500).json({ error: e });
        }
    });
    app.put('/users/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { username, password, email, created_at } = req.body;
            const users = await prisma.users.update({
                where: {
                    id: Number(id),
                    status: 1,
                },
                data: {
                    username,
                    password,
                    email,
                    created_at
                }
            });
            res.status(200).json(users);
        }
        catch (e) {
            res.status(500).json({ error: e });
        }
    });
    app.delete('/users/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const users = await prisma.users.update({
                where: {
                    id: Number(id),
                },
                data: {
                    status: 0
                }
            });
            res.status(200).json(users);
        }
        catch (e) {
            res.status(500).json({ error: e });
        }
    });
    app.get('/', (req, res) => {
        return res.send('Express Typescript on Vercel');
    });
    // Catch unregistered routes
    app.all("*", (req, res) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    });
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}
main()
    .then(async () => {
    await prisma.$connect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=index.js.map