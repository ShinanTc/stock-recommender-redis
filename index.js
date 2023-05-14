import { startServer } from './src/config/server/server-config.js';
import middlewares from './src/middlewares/utils/middlewares.js';
import dotenv from 'dotenv';

const app = express();

// for getting env variables
dotenv.config();

// calling all the essential middlewares
app.use(middlewares);

// entry to all routes
// app.use('/', routeIndex);

// for listening
startServer(app);