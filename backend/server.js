import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
const app = express();
const port = process.env.PORT || 5000;
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
