import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Router, type Request, type Response } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
const app = express();

// TODO: Define route to serve index.html

app.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../../client/index.html'));
  });
  

export default router;
