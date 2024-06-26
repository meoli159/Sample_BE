import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
// import { DBConnect } from './models/configs/DBConnect.js';
import { routes } from './routes/v1/index.js';

export const app = express();

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', process.env.REACT_URL);
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(cors({ origin: process.env.REACT_URL, credentials: true }));

//router
// app.get('/', 'Hello World');
app.use('/api/v1', routes);

//run database connect
import './models/configs/DBConnect.js';
