import express from 'express';
import mongoose from "mongoose";
import { errorHandler, notFoundError } from './middlewares/error-handler.js';
import morgan from 'morgan';
import cors from "cors";
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userRoutes from './routes/user.js';
import cart from './routes/ComandeRoutes.js';

import product from './routes/ProductRoutes.js';

const options ={
  definition: {
    openapi : '3.0.0',
    info :{
      title :'Modern house Project ',
      version : '1.0.0'
    },
    servers:[
      {
        url: 'http://localhost:9090/'
      }
    ]
  },
  apis: ["./Routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options)




const app=express();
const port=process.env.PORT || 9090;
const databaseName = "Modern-house";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`connected to ${databaseName}`);
  })
  .catch((err) => {
    console.log(err);
  });


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/img",express.static("public/images"));
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use('/user',userRoutes);
app.use('/commande',cart);
app.use('/produit',product);



app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  

