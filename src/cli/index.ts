#! /usr/bin/env node

import { createAdminCommand } from './commands/CreateCustomerAdministratorCommand'
import { program } from './program'

async function main() {
  const option = program.createOption(
    'create:admin',
    'Created a new super administrator for toth application'
  )

  await program.addOption(option).addCommand(createAdminCommand).parseAsync(process.argv)

  program.showHelpAfterError()
}

main()
