
import os from "os";
import cluster from "cluster";
import { app } from "./index.js";

const CPU_CNT = os.cpus().length;
const PORT = 3000;

if (cluster.isPrimary) {

    console.log(`No of CPUs: ${CPU_CNT}.`);
    console.log(`Process ${process.pid} started.`);


    for (let i = 0; i < CPU_CNT; i++) {
        cluster.fork();
        console.log("Worker forked")
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`)
    })
} else {

    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} is listening on ${PORT}`);
    })
    
}