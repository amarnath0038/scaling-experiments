// Takes approx 1.1 secs(which was 7 with single process)  

import cluster from "cluster";
import os from "os";

const N = 1_000_000_000_0;
const CPU_CNT = os.cpus().length;

 if (cluster.isPrimary){
    console.log(`Primary ${process.pid} is running. Splitting work across ${CPU_CNT} workers`);
    let finalSum = 0;
    let workersDone = 0;
    const chunkSize = Math.floor(N/CPU_CNT);
    const startTime = Date.now();
    for (let i = 0; i < CPU_CNT; i++){
        const start = i*chunkSize + 1;
        const end = (i === CPU_CNT) ? N : (i + 1)*chunkSize;

        const worker = cluster.fork();
        worker.send({start,end});

        worker.on("message", (msg) => {
            finalSum += msg.partialSum;
            workersDone++;

            if (workersDone === CPU_CNT) {
                const endTime = Date.now();
                console.log(`Time taken with clustering: ${(endTime - startTime)/1000} seconds`)
                console.log(`Final sum up to ${N} = ${finalSum}`);
                process.exit(0);
            }
        });
    }  
 } else {
  process.on("message", ({ start, end }) => {
    let partialSum = 0;
    for (let i = start; i <= end; i++) {
      partialSum += i;
    }
    process.send({ partialSum });
    process.exit(0); 
  });
}

