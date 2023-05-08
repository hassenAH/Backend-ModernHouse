import express from 'express';
import mongoose from "mongoose";
import { errorHandler, notFoundError } from './middlewares/error-handler.js';
import morgan from 'morgan';
import cors from "cors";
import multer,{diskStorage} from "multer";
import RequestRoute from './routes/Request.js';

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userRoutes from './routes/user.js';
import cart from './routes/ComandeRoutes.js';
import WishList from './routes/WishlistRoute.js';
import product from './routes/ProductRoutes.js';
import Livraison from './routes/LivreurRoute.js';
import PaymentRoutes from './routes/PaymentRoutes.js';
import RatingsRoute from './routes/RatingsRoute.js';
import ReclamationRoute from './routes/ReclamationRoute.js';
import PromoRoute from './routes/PromoRoute.js';
import PositionRoutes from './routes/PositionRoute.js';
import fs from "fs";

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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/glb/:filename', (req, res) => {
  // Load the GLB file using fs
  const filename = req.params.filename
  const filen = 'uploads/'+filename
  fs.readFile(filen, (err, data) => {
    if (err) throw err;

    // Set the response headers to indicate that this is a GLB file
    res.setHeader('Content-Type', 'model/gltf-binary');
    res.setHeader('Content-Disposition', 'attachment; filename="file.glb"');

    // Send the GLB file data in the response
    res.send(data);
  });
});
mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`connected to ${databaseName}`);
  })
  .catch((err) => {
    console.log(err);
  });
app.set('view engine', 'ejs');
app.get('/login', (req, res) => {
  res.render('../login')
})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false)
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })
app.post('/upload', upload.single('file'), (req, res) => {
  // req.file contains the uploaded file
  const fileName = req.file.originalname
  const filePath = req.file.path
  console.log(`File uploaded: ${fileName} at ${filePath}`)

  // Send a response back to the client
  res.send({ message: 'File uploaded successfully.' })
})
app.use("/image",express.static("uploads/"));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/img",express.static("public/images"));
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

// ? Register the session router


app.use('/Promo',PromoRoute);
app.use('/user',userRoutes);
app.use('/payment',PaymentRoutes);
app.use('/Ratings',RatingsRoute);
app.use('/commande',cart);
app.use('/produit',product);
app.use('/wishlist',WishList);
app.use('/position',PositionRoutes)
app.use('/Reclam',ReclamationRoute);
app.use('/Request',RequestRoute);

app.use('/livraison',Livraison);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });


process.on('TypeError:', (reason, promise) => {
  console.log('TypeError at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})