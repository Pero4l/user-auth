const express = require("express");

const app = express();

const authRouter = require("./router/auth.route")


app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send("Welcome to My User Auth API");
})

app.use("/auth", authRouter)


app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});
