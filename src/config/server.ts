import express, { Express, NextFunction, Request, Response } from 'express';
import { Env } from './env.config';

export class Server {
    public app: Express;
    private serverListen: any;
    public static readonly port: number = Env.PORT;
    public static readonly host: string = Env.HOST;
    public static readonly baseUrl: string = `http://${Server.host}:${Server.port}`;

    constructor() {
        this.app = express();

        this.middlewares();

        this.routes();
    }

    private middlewares() {
        // ENABLE CROSS ORIGINS
        this.app.use(
            (request: Request, response: Response, next: NextFunction) => {
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader(
                    'Access-Control-Allow-Methods',
                    'GET, POST, PUT, DELETE'
                );
                response.setHeader(
                    'Access-Control-Allow-Headers',
                    'Content-Type, Authorization'
                );
                next();
            }
        );

        // READING AND PARSING THE BODY
        this.app.use(express.json());
    }

    private routes() {
        this.app.get(
            '/api/v1/health',
            (request: Request, response: Response) => {
                response
                    .status(200)
                    .json({ message: '🤖 -->> Server is up and running' });
            }
        );
    }

    public listen() {
        this.serverListen = this.app.listen(Server.port, () => {
            console.log('🤖 -->> Server on port:', Server.port);
        });
    }

    public close() {
        console.log('👋 -->> Server closed');
        this.serverListen.close();
    }
}
