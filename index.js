const app = require('./server');

let PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;

app.listen(PORT, function (err) {
if (err) return console.log(err);
console.log(`Server listening on port ${PORT}`)
});
