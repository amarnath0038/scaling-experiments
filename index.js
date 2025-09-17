import express from "express";

export const app = express();

app.get("/", (req, res) => {
        res.send("Hi there!");
    });

    app.get("/pid", (req, res) => {
        res.send(`Process ID: ${process.pid}`);
    })

    app.get("/api/:n", (req, res) => {
        let n = parseInt(req.params.n);
        if (n > 5000000000) {
            n = 5000000000
        }
        let cnt = 0;
        for (let i = 0; i < n; i++){
            cnt += i
        }
        console.log(`Final count: ${cnt}`);
        console.log(`Process ID: ${process.pid}`);
    })