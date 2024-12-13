
setTimeout(() => {
    console.log('in the timeout');
    clearTimeout(interval);
}, 3000)

const interval = setInterval(() => {
    console.log('in the interval');
}, 1000)

console.log(__dirname);
console.log(__filename);

console.log(document.querySelector);