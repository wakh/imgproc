import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Connected!');
});

app.use('/api', routes);

app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
