import { UserController } from './../../controllers/user.controller';
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    UserController.getAllUsers().then(_res => {            
        res.status(200).json(_res);
    }).catch(_rej => {
        res.status(500).json({ error: _rej });
    });
});

router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    UserController.getUser(parseInt(id)).then(_res => {            
        res.status(200).json(_res);
    }).catch(_rej => {
        res.status(500).json({ error: _rej });
    });
});

router.post("/", (req: Request, res: Response) => {
    UserController.create(req?.body).then(_res => {            
        res.status(200).json(_res);
    }).catch(_rej => {
        res.status(500).json({ error: _rej });
    });
});

router.put("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    UserController.update(parseInt(id), req?.body).then(_res => {            
        res.status(200).json(_res);
    }).catch(_rej => {
        res.status(500).json({ error: _rej });
    });
});

router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    UserController.delete(parseInt(id)).then(_res => {            
        res.status(200).json(_res);
    }).catch(_rej => {
        res.status(500).json({ error: _rej });
    });
});

export default router;