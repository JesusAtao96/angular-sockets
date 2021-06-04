import * as express from 'express';
import { environment } from '../../environments/environment';

export default class Server {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = environment.port;
  }

  start(callback: () => void) {
    this.app.listen(this.port, callback);
  }
}
