//Logger Package winston
//Doku und Beispiel siehe https://www.npmjs.com/package/winston

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label } = format;

//Server-Konfiguration
const ServerConfig = require('./ServerConfig');


/* Aufgabe 2 - Logger erstellen
a. Erzeugen Sie einen Logger, welche Ereignisse auf den Stufen "info" (Default) und "error" in getrennte
Dateien infos.log resp. fehler.log im Verzeichnis logs festhalten.
b. Das Logformat soll aus einem "label", Zeitstempel und im einfachen Format sein.
 */
//???


/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT brackets!
 */
module.exports = {
   logger
}
