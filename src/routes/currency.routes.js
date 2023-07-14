import { Router } from 'express'
import { getCurrencies, getForex } from '../controllers/currencyController.js'
const router = Router()

router.get('/', async (_, res) => {
  const objetos = await getForex() 
  res.render('index', { objetos })
})

router.get('/index', getCurrencies)
router.get('/forex', getForex)

export default router