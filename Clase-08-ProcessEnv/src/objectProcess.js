/**
 * Ejecutamos "node ./src/objectProcess.js"
 * Imprime por consola los dos argumentos por default
 * Path de node y Path del archivo  principal que estamos ejecutando
 * console.log(process.argv);
*/

/**
 * Ejecutamos "node ./src/objectProcess.js a 2 -a"
 * Imprimirá [ 'a', '2', '-a' ]
*/

/**
 * Ejecutamos "node ./src/objectProcess.js"
 * Imprimirá []
*/

/**
 * Ejecutamos "node ./src/objectProcess.js --mode development"
 * Imprimirá ['--mode', 'development']
*/
console.log(process.argv.slice(2));




