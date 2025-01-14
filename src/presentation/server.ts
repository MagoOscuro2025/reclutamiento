import express, { NextFunction, Router,Response,Request } from 'express';
import path from 'path';
// import cors from 'cors';
// import { envs } from '../config';

interface Options {
  port: number;
  host: string;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly host: string;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, host, routes, public_path = 'public' } = options;
    this.port = port;
    this.host = host;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    process.env.TZ = 'America/Guatemala';

    // Ruta para obtener la hora del servidor
    this.app.get('/time', (req, res) => {
      const serverTime = new Date().toString();
      res.send(`La hora del servidor es: ${serverTime}`);
    });

    //* Middlewares
    this.app.use(express.json()); // Parse application/json
    this.app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(path.join(__dirname, this.publicPath)));

    //* Routes
    this.app.use(this.routes);

    //* SPA: Manejo de rutas que no empiezan con "api"
    this.app.get('*', (req, res) => {
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
      res.sendFile(indexPath);
    });

    //* Iniciar servidor
    this.app.listen(this.port, this.host, () => {
      console.log(`Server running on http://${this.host}:${this.port}`);
    });
  }
}
