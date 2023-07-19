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

export const getCurrencyValue = async (currency) => {
  let values = await getForex()
  const { dolar_intercambio, euro, uf, utm } = values
  switch (currency) {
    case 'peso':
      return 1;
    case 'dolar_intercambio':
      return 1 / parseFloat(dolar_intercambio.valor);
    case 'euro':
      return 1 / parseFloat(euro.valor);
    case 'uf':
      return 1 / parseFloat(uf.valor);
    case 'utm':
      return 1 / parseFloat(utm.valor);
    default:
      return null;
  }
}







