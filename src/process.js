import { Command } from "commander";

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del server', 9090)
    .option('--persist <mode>', 'Modo de persistencia', "mongodb")
    .option('--mode <mode>', 'Modo de trabajo', 'prueba')
    .option('-u <user>', 'Usuario que va utilizar la app', "No se declaro ningun usuario")

program.parse()

export default program;