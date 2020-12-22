let express = require("express");
let app     = express();
const port = process.env.PORT || 3000;

const server = app.listen(port);
console.log(`Running at Port ${port}`);
server.timeout = 1000 * 60 * 2; // 2 minutes


/*
Aufgabe 1
a) Erstellen Sie ein Array mit 10 Einträgen von aktuellen Musikbands, der von diesem
Server aufgerufen werden kann.
b) Die URL muss http://localhost:3000/musicbands lauten
c) Aus der List von 1a soll per Zufall eine Musikband zurückgegeben werden (HTTP Response)
d) Fügen Sie die korrekten Headers ein, damit CORS Requests beantworten werden.
 */


app.use(function (req, res, next) {
    //Lösung 1d
    res.header('Content-Type', 'application/json');
    next();
});


//Lösung 1a

app.get('Lösung 1b', (req, res) => {
//Lösung 1c
})

