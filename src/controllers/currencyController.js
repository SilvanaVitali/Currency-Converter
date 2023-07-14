export const getCurrencies = async (_, res) => {
  try {
    const currencies = await fetch('')
    res.status(200).json(currencies)
  } catch (error) {
    res.status(500).json({ message: 'server error' })
  }
}

export const getForex = async () => {
  try {
    const result = await fetch('https://mindicador.cl/api');
    const data = await result.json();

    // Filtra los objetos que deseas mostrar
    const objetos = {
      uf: data.uf,
      ivp: data.ivp,
      dolar: data.dolar,
      dolar_intercambio: data.dolar_intercambio,
      euro: data.euro,
      ipc: data.ipc,
      utm: data.utm,
      imacec: data.imacec,
      tpm: data.tpm,
      libra_cobre: data.libra_cobre,
      tasa_desempleo: data.tasa_desempleo,
      bitcoin: data.bitcoin
    };
    
    if(data) return objetos
  } catch (error) {
    return error.message
  }
}