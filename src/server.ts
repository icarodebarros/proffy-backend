import express from 'express';

const app = express();

app.get('/test', (request, response) => {
    return response.send('Server ON');
});

app.listen(3333);