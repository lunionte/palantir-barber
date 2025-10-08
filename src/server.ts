import express from "express";
import dotenv from "dotenv";
import { onwerAuthRoute } from "./routes/owner.auth.route";
import { errors } from "celebrate";
import { ownerRoute } from "./routes/owner.route";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth/owner", onwerAuthRoute);
app.use("/api/owner", ownerRoute);

app.use(errors());

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
