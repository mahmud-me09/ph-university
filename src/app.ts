import express, {
  Request,
  Response,
} from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import {globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app = express();

// middlewares
app.use(express.json());
app.use(cors());



// routes
app.use('/api/v1', router);

// testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// error handling middleware: must define at the bottom.
app.use(globalErrorHandler);
app.use(notFound);

export default app;
