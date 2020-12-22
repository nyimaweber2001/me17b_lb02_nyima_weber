/*
Thema: Event logging auf dem Server
Einfacher Server, um Ereignisse (verursacht durch Client-Anfragen) zu loggen
und die Log-Files für die spätere Analyse zu verwenden.
 */

'use strict';

/* --------- Vendor Modules ---------------------- */
//Middleware for handling and routing requests
let express = require("express");
let app     = express();

//Reading data out of the request body
let bodyParser = require("body-parser");

//create unique id's
const { v4: uuidv4 } = require('uuid');

//Handle CORS Requests
const cors = require("cors");
let corsOptions = {
    origin: "http://localhost:63342"
};
app.use(cors(corsOptions));


//logging package
const winston = require('./config/Logger');

//determine client-browser (i.e. Chorme, Safari)
const useragent = require('express-useragent');
app.use(useragent.express());

//Anfrage IP-Adresse des Clients
const requestIp = require('request-ip');
app.use(requestIp.mw({ attributeName : 'clientIp' }))

//Speicherung der registrierten Benutzer
const UserRepository = require('./UserRepository');
//Validierungsregeln
const Validation = require('./ValidationService');
//Server-Konfiguration
const ServerConfig = require('./config/ServerConfig');

//starting server on port 3000
const port = process.env.PORT || 3000;
//listen to requests
const server = app.listen(port);
//show on which port server runs
console.log(ServerConfig.showServerPort(port));
server.timeout = 1000 * 60 * 2; // 2 minutes


// necessary for posting data
// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


//test uuid
app.get('/test1', (req, res) => {
    const id = uuidv4();
   let ip = req.clientIp;
    console.log(ip);
    winston.logger.log({
        level: 'info',
        message: `user agent: from ${ip}`
    });
    res.status(200).send(`generated Id: ${id}`);
});


/*  1. Writing to file
    https://stackabuse.com/reading-and-writing-json-files-with-node-js/
 */
app.post('/register', (req, res) => {
    const HTTP_STATUS_NO_ACCEPTABLE = 406;
    //Daten des Posts-Requests auslesen und zusätzlich eine User-id erzeugen
    let userObj = {
        "id": uuidv4(),
        "username": req.body.user.username,
        "email": req.body.user.email,
        "password": req.body.user.password
    }

    let ua = req.useragent;
    let ip = req.clientIp;
    let clientData = {
        ip_address: ip,
        browser: ua.browser,
        version: ua.version,
        os: ua.os,
        platform: ua.platform,
        source: ua.source
    }

    winston.logger.log({
        level: 'info',
        message: `client-browser: ${JSON.stringify(clientData)} `
    });

    let result = Validation.validateUser(userObj);
    if (result.isNotValid) {
        winston.logger.error(result.msg);
        res.status(HTTP_STATUS_NO_ACCEPTABLE).send(result.msg);
    } else {
        //Speicherung des neuen Benutzers
        let userRepo = new UserRepository(ServerConfig.registrationFile);
        userRepo.read()
            .then((data) => {
                //log data for analysis
                console.log(userObj);
                data.push(userObj);
                return data;
            })
            .then(data => userRepo.save(data))
            .catch(error => {
                console.error(error);
            });
        res.status(201).send(`User ${userObj.username} inserted!`);
    }
});

