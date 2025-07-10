const http = require('http');
const app = require('./app');

const server = http.createServer(app);

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), () => {
    console.log(`Serveur démarré sur le port ${app.get('port')}`);
});