function showServerPort(port){
    let result = `Running server in %mode% mode on port ${port}`;
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() === 'production') {
        return result.replace('%mode%', 'production');
    } else {
        return result.replace('%mode%', 'development');
    }
}

//Warning: Korrekt setzen!!
//start from Webstrom configuration with npm
const rootPath = './13a_logging/01_Intro/register-server';

//start with bash-terminal with command: node server.js
//const rootPath = '.';
const registrationFile = rootPath+'/data/registration.json';


/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT brackets!
 */
module.exports = {
    showServerPort,
    rootPath,
    registrationFile
}


