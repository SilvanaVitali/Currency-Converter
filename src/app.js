import express from 'express'
import currencyRoutes from './routes/currency.routes.js'
import { create } from 'express-handlebars'
import path from 'path'
import moment from 'moment/moment.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const hbs = create({
  helpers: {
    formatDate(date){
      return moment(date).format('YYYY-MM-DD')
    }
  }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.resolve('src/views'))

app.use('/', currencyRoutes)

app.all('*', (_, res) => {
  res.status(404).send('404 - Route Not Found')
})

export default app