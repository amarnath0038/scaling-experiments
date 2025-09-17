// Takes approx 7 secs

const N = 1_000_000_000_0;
console.time("single-process");
let sum = 0;
const start = Date.now();
for (let i = 0; i <= N; i ++){
    sum += i;
}
const end = Date.now();
console.log(`Time taken with single process: ${(end - start)/1000} seconds`)
console.log(`Sum of numbers upto n: ${sum}`);
