import Express from 'express';

const app = Express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('App running : http://localhost:3000');
});