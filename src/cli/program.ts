import { Command } from 'commander'
import { textSync } from 'figlet'

const program = new Command()

console.log(textSync('Toth Manager'))

program
  .version('1.0.0')
  .description('Toth application is make for added all knowledge in node js with typescript.')

export { program }
