import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import {notFound , errorHandler } from './middleware/errorMiddleware.js'

dotenv.config();

connectDB();

const app = express();


app.get('/' , (req,res)  => {
  res.send('api is working')
})

app.use('/api/products', productRoutes);

app.use(notFound)

app.use(errorHandler)


const port = process.env.PORT || 5000;
app.listen(port , console.log(`server is on ${process.env.Node_ENV} 5000`))