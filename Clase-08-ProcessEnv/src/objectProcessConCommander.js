import { Command } from 'commander';

const program = new Command();//Inicializamos un nuevo comando de commander

program //option(el comando / flag, DESCRIPCION, VALOR POR DEFAULT)
    .option('-d','Variable para debug',false) //un flag con el caracter d
    .option('-p <port>, "Puerto del servidor', 8080) 
    .option('--mode <mode>, "Modo de trabajo', 'production') //<mode> es el argumento a colocar
    //para requiredOption el tercer argumento es un mensaje de error
    .requiredOption('--user <user>', "Username de usuario admin", "No se ha declarado un usuario")
    .option('-l, --letters [letters...]', 'specify letters');
    ;

program.parse(); //parse se utiliza para cerrar la configuración de comandos

var opts = program.opts();
console.log(`Options: ${JSON.stringify(opts,null,2)}`);

console.log(`Otras opts: ${program.args}`)
