import { Router } from 'express'
import { convertAmount} from '../controllers/currencyController.js'
import { getForex } from '../utils/forex.js'
const router = Router()

router.get('/', async (_, res) => {
  const objetos = await getForex() 
  res.render('index', { objetos })
})

router.post('/getConvert', convertAmount)

export default router