import { makeCreateAdministratorAction } from '../factories/CreateAdministratorActionFactory'
import { program } from '../program'

const createAdminCommand = program
  .createCommand('create:admin')
  .description('Added arguments separate by space')
  .argument('<firstname>', 'Administrator firstname')
  .argument('<lastname>', 'Administrator lastname')
  .argument('<email>', 'Email is required for created a new admin')
  .argument('<username>', 'Username is required for created a new admin')
  .argument('<password>', 'Password must be 6 characters.')
  .action(async (firstname, lastname, email, username, password) => {
    const name = firstname.concat(' ', lastname)

    const createAdmin = await makeCreateAdministratorAction().execute({
      name,
      email,
      username,
      password,
    })

    if (!createAdmin) {
      console.log(
        'Can not possible create administrator for arguments is invalid, please try again'
      )
    }

    console.log('Your administrator account has been created.')
  })

export { createAdminCommand }
