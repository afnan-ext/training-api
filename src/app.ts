import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const path = require("path");
// import User from './db/users.js'
// import { verifyToken } from './utils/verifyToken.js';
import dotenv from "dotenv";
import authRoute from "./routes/users.route";
import cors from 'cors'

// import { getOtp, verifyOtp } from './controllers/userController.js';

// import categoryRoute from './routes/category.route.js';

const app = express();
app.use(cors());

// configure .env file
dotenv.config();

mongoose
  .connect(
    "mongodb+srv://ext-db:QWej2AmVRBitUFl9@cluster0.q8c0ehp.mongodb.net/training?retryWrites=true&w=majority",
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    }
  )
  .then(() => console.log("DB connection success!"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", authRoute);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({ message: "Page not found!" });
});

//disable cors
// app.get('/', function(req, res) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//   // res.setHeader('Access-Control-Allow-Credentials', true); // If needed

//   res.send('cors problem fixed:)');
// });
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};


// error handler
app.use((err: any, req: any, res: any, next: any) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({ message: "bad request!" });
});

// app.listen(3000, () => console.log("Server stated at port 3000"));
app.listen(process.env.PORT || 1060, function(){
  console.log("Express server listening on port %d in %s mode", app.settings.env);
});
