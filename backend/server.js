import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = process.env.PORT || 5000;
dotenv.config();
mongoose.connect(process.env.MONGODB_URL ||'mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true});


app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
app.use('/api/users', userRouter);
app.use('/api/products',productRouter);
