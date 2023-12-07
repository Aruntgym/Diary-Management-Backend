import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { memoryRouter } from "./Routes/memories.js";
import { userRouter } from "./Routes/user.js";
import { isAuthenticated } from "./Authentication/userAuth.js";
dotenv.config();

const PORT = process.env.PORT

// initiating a server
const app = express();
// configuring env variables 
//middle wares
app.use(express.json());
app.use(cors())
//application middlewares
app.use("/memories",isAuthenticated, memoryRouter);
app.use("/user",userRouter );

// listen a server
app.listen(PORT, ()=>console.log(`Server started in localhost:${PORT}`))