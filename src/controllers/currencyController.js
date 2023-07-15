import { getForex, getCurrencyValue } from "../utils/forex.js";

export const convertAmount = async (_, res) => {
  const { amount, inputTo, inputForm } = _.body
  const { dolar_intercambio, euro, uf, utm } = await getForex();
  let result;
  console.log(inputForm)
  // Obtener los valores de las monedas de origen y destino
  const fromCurrency = await getCurrencyValue(inputForm);
  const toCurrency = await getCurrencyValue(inputTo);
  console.log(fromCurrency, toCurrency)
  if (fromCurrency && toCurrency) {
    result = ((amount / fromCurrency) * parseFloat(toCurrency)).toFixed(2);
  } else {
    return res.status(400).json({ error: 'Moneda no válida' });
  }

  return res.json({ result, fromCurrency, toCurrency });
}