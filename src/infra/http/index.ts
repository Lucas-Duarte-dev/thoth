import { app } from './server'
import dotenv from 'dotenv'

dotenv.config()
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running in http://localhost:${process.env.PORT || 3000}`)
})
