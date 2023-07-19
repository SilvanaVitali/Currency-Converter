//https://mindicador.cl/


const formatAmount = (currency, amount) => {
    return total = new Intl.NumberFormat('de-DE', { style: 'currency', currency: `${currency}`, currencyDisplay: "code" }).format(amount);
}

async function getData() {
    try {
        const result = await fetch('https://mindicador.cl/api');
        const data = await result.json();
        return data
    } catch (error) {
        console.log('Error al consultar la api');
    }
}

async function getDataCurrency(currency) {
    try {
        const result = await fetch(`https://mindicador.cl/api/${currency}`);
        const { serie } = await result.json();
        return serie
    } catch (error) {
        console.log('Error al consultar la api');
    }
}

async function loadData() {
    try {
        let { uf, dolar, euro, utm } = await getData();
        document.querySelector("form").addEventListener('submit', (event) => {
            event.preventDefault();

            let amount = document.getElementById("amount").value;
            let inputFrom = document.getElementById("inputFrom").value;
            let inputTo = document.getElementById("inputTo").value;
            let conversion = document.getElementById("conversion");
            let text = document.getElementById("text");
            let toValue;
            let toDate;
            let fromValue;
            let fromDate;
            let date;

            switch (inputTo) {
                case 'CLF':
                    toValue = uf.valor;
                    toDate = new Date(uf.fecha);
                    break;
                case 'USD':
                    toValue = dolar.valor;
                    toDate = new Date(dolar.fecha);
                    break;
                case 'EUR':
                    toValue = euro.valor;
                    toDate = new Date(euro.fecha);
                    break;
                case 'UTM':
                    toValue = utm.valor;
                    toDate = new Date(utm.fecha);
                    break;
                default:
                    break;
            }

            switch (inputFrom) {
                case 'CLF':
                    fromValue = uf.valor;
                    fromDate = new Date(uf.fecha);
                    break;
                case 'USD':
                    fromValue = dolar.valor;
                    fromDate = new Date(dolar.fecha);
                    break;
                case 'EUR':
                    fromValue = euro.valor;
                    fromDate = new Date(euro.fecha);
                    break;
                case 'UTM':
                    fromValue = utm.valor;
                    fromdate = new Date(utm.fecha);
                    break;
                default:
                    break;
            }

            if (inputFrom === 'CLP' && inputTo !== 'CLP') {
                let total = formatAmount(inputTo, (amount / toValue));
                conversion.innerHTML = total;
                date = toDate;

            } else if (inputFrom !== 'CLP' && inputTo === 'CLP') {
                let total = formatAmount(inputTo, (fromValue * amount));
                conversion.innerHTML = total;
                date = fromDate;

            } else if (inputFrom !== 'CLP' && inputTo !== 'CLP') {
                let total = formatAmount(inputTo, (fromValue * amount / toValue));
                conversion.innerHTML = total;
                date = toDate;
            }
            text.innerHTML = `${amount} ${inputFrom} son equivalentes a ${total} al ${date.toLocaleDateString()}`;
        })

        document.getElementById("nDolar").innerHTML = dolar.nombre;
        document.getElementById("nEuro").innerHTML = euro.nombre;
        document.getElementById("nUf").innerHTML = uf.nombre;
        document.getElementById("nUtm").innerHTML = utm.nombre;
        document.getElementById("vDolar").innerText = formatAmount("CLP", dolar.valor);
        document.getElementById("vEuro").innerHTML = formatAmount("CLP", euro.valor);
        document.getElementById("vUf").innerHTML = formatAmount("CLP", uf.valor);
        document.getElementById("vUtm").innerHTML = formatAmount("CLP", utm.valor);
        document.getElementById("dDolar").innerHTML = new Date(dolar.fecha).toLocaleDateString();
        document.getElementById("dEuro").innerHTML = new Date(euro.fecha).toLocaleDateString();
        document.getElementById("dUf").innerHTML = new Date(uf.fecha).toLocaleDateString();
        document.getElementById("dUtm").innerHTML = new Date(utm.fecha).toLocaleDateString();


        const dataDolar = await getDataCurrency('dolar');
        const dataEuro = await getDataCurrency('euro');
        const dataUf = await getDataCurrency('uf');
        const dataUtm = await getDataCurrency('utm');

        var chartCurrency = new CanvasJS.Chart("chartContainerCurrency", {
            animationEnabled: true,
            exportEnabled: true,
            height: 300,
            title: {
                text: "Variation last 30 days"
            },
            axisY: {
                title: "Pesos"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [
                {
                    type: "spline",
                    name: "Dolar",
                    showInLegend: true,
                    dataPoints: [
                        { label: new Date(dataDolar[29].fecha).toLocaleDateString(), y: dataDolar[29].valor },
                        { label: new Date(dataDolar[28].fecha).toLocaleDateString(), y: dataDolar[28].valor },
                        { label: new Date(dataDolar[27].fecha).toLocaleDateString(), y: dataDolar[27].valor },
                        { label: new Date(dataDolar[26].fecha).toLocaleDateString(), y: dataDolar[26].valor },
                        { label: new Date(dataDolar[25].fecha).toLocaleDateString(), y: dataDolar[25].valor },
                        { label: new Date(dataDolar[24].fecha).toLocaleDateString(), y: dataDolar[24].valor },
                        { label: new Date(dataDolar[23].fecha).toLocaleDateString(), y: dataDolar[23].valor },
                        { label: new Date(dataDolar[22].fecha).toLocaleDateString(), y: dataDolar[22].valor },
                        { label: new Date(dataDolar[21].fecha).toLocaleDateString(), y: dataDolar[21].valor },
                        { label: new Date(dataDolar[20].fecha).toLocaleDateString(), y: dataDolar[20].valor },
                        { label: new Date(dataDolar[19].fecha).toLocaleDateString(), y: dataDolar[19].valor },
                        { label: new Date(dataDolar[18].fecha).toLocaleDateString(), y: dataDolar[18].valor },
                        { label: new Date(dataDolar[17].fecha).toLocaleDateString(), y: dataDolar[17].valor },
                        { label: new Date(dataDolar[16].fecha).toLocaleDateString(), y: dataDolar[16].valor },
                        { label: new Date(dataDolar[15].fecha).toLocaleDateString(), y: dataDolar[15].valor },
                        { label: new Date(dataDolar[14].fecha).toLocaleDateString(), y: dataDolar[14].valor },
                        { label: new Date(dataDolar[13].fecha).toLocaleDateString(), y: dataDolar[13].valor },
                        { label: new Date(dataDolar[12].fecha).toLocaleDateString(), y: dataDolar[12].valor },
                        { label: new Date(dataDolar[11].fecha).toLocaleDateString(), y: dataDolar[11].valor },
                        { label: new Date(dataDolar[10].fecha).toLocaleDateString(), y: dataDolar[10].valor },
                        { label: new Date(dataDolar[9].fecha).toLocaleDateString(), y: dataDolar[9].valor },
                        { label: new Date(dataDolar[8].fecha).toLocaleDateString(), y: dataDolar[8].valor },
                        { label: new Date(dataDolar[7].fecha).toLocaleDateString(), y: dataDolar[7].valor },
                        { label: new Date(dataDolar[6].fecha).toLocaleDateString(), y: dataDolar[6].valor },
                        { label: new Date(dataDolar[5].fecha).toLocaleDateString(), y: dataDolar[5].valor },
                        { label: new Date(dataDolar[4].fecha).toLocaleDateString(), y: dataDolar[4].valor },
                        { label: new Date(dataDolar[3].fecha).toLocaleDateString(), y: dataDolar[3].valor },
                        { label: new Date(dataDolar[2].fecha).toLocaleDateString(), y: dataDolar[2].valor },
                        { label: new Date(dataDolar[1].fecha).toLocaleDateString(), y: dataDolar[1].valor },
                        { label: new Date(dataDolar[0].fecha).toLocaleDateString(), y: dataDolar[0].valor }
                    ]
                },
                {
                    type: "spline",
                    name: "Euro",
                    showInLegend: true,
                    dataPoints: [
                        { label: new Date(dataEuro[29].fecha).toLocaleDateString(), y: dataEuro[29].valor },
                        { label: new Date(dataEuro[28].fecha).toLocaleDateString(), y: dataEuro[28].valor },
                        { label: new Date(dataEuro[27].fecha).toLocaleDateString(), y: dataEuro[27].valor },
                        { label: new Date(dataEuro[26].fecha).toLocaleDateString(), y: dataEuro[26].valor },
                        { label: new Date(dataEuro[25].fecha).toLocaleDateString(), y: dataEuro[25].valor },
                        { label: new Date(dataEuro[24].fecha).toLocaleDateString(), y: dataEuro[24].valor },
                        { label: new Date(dataEuro[23].fecha).toLocaleDateString(), y: dataEuro[23].valor },
                        { label: new Date(dataEuro[22].fecha).toLocaleDateString(), y: dataEuro[22].valor },
                        { label: new Date(dataEuro[21].fecha).toLocaleDateString(), y: dataEuro[21].valor },
                        { label: new Date(dataEuro[20].fecha).toLocaleDateString(), y: dataEuro[20].valor },
                        { label: new Date(dataEuro[19].fecha).toLocaleDateString(), y: dataEuro[19].valor },
                        { label: new Date(dataEuro[18].fecha).toLocaleDateString(), y: dataEuro[18].valor },
                        { label: new Date(dataEuro[17].fecha).toLocaleDateString(), y: dataEuro[17].valor },
                        { label: new Date(dataEuro[16].fecha).toLocaleDateString(), y: dataEuro[16].valor },
                        { label: new Date(dataEuro[15].fecha).toLocaleDateString(), y: dataEuro[15].valor },
                        { label: new Date(dataEuro[14].fecha).toLocaleDateString(), y: dataEuro[14].valor },
                        { label: new Date(dataEuro[13].fecha).toLocaleDateString(), y: dataEuro[13].valor },
                        { label: new Date(dataEuro[12].fecha).toLocaleDateString(), y: dataEuro[12].valor },
                        { label: new Date(dataEuro[11].fecha).toLocaleDateString(), y: dataEuro[11].valor },
                        { label: new Date(dataEuro[10].fecha).toLocaleDateString(), y: dataEuro[10].valor },
                        { label: new Date(dataEuro[9].fecha).toLocaleDateString(), y: dataEuro[9].valor },
                        { label: new Date(dataEuro[8].fecha).toLocaleDateString(), y: dataEuro[8].valor },
                        { label: new Date(dataEuro[7].fecha).toLocaleDateString(), y: dataEuro[7].valor },
                        { label: new Date(dataEuro[6].fecha).toLocaleDateString(), y: dataEuro[6].valor },
                        { label: new Date(dataEuro[5].fecha).toLocaleDateString(), y: dataEuro[5].valor },
                        { label: new Date(dataEuro[4].fecha).toLocaleDateString(), y: dataEuro[4].valor },
                        { label: new Date(dataEuro[3].fecha).toLocaleDateString(), y: dataEuro[3].valor },
                        { label: new Date(dataEuro[2].fecha).toLocaleDateString(), y: dataEuro[2].valor },
                        { label: new Date(dataEuro[1].fecha).toLocaleDateString(), y: dataEuro[1].valor },
                        { label: new Date(dataEuro[0].fecha).toLocaleDateString(), y: dataEuro[0].valor }
                    ]
                }
            ]
        });


        var chartUf = new CanvasJS.Chart("chartContainerUf", {
            animationEnabled: true,
            exportEnabled: true,
            height: 300,
            title: {
                text: "Variation UF last 30 days"
            },
            axisY: {
                title: "Pesos"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [
                {
                    type: "spline",
                    name: "UF",
                    showInLegend: true,
                    dataPoints: [
                        { label: new Date(dataUf[29].fecha).toLocaleDateString(), y: dataUf[29].valor },
                        { label: new Date(dataUf[28].fecha).toLocaleDateString(), y: dataUf[28].valor },
                        { label: new Date(dataUf[27].fecha).toLocaleDateString(), y: dataUf[27].valor },
                        { label: new Date(dataUf[26].fecha).toLocaleDateString(), y: dataUf[26].valor },
                        { label: new Date(dataUf[25].fecha).toLocaleDateString(), y: dataUf[25].valor },
                        { label: new Date(dataUf[24].fecha).toLocaleDateString(), y: dataUf[24].valor },
                        { label: new Date(dataUf[23].fecha).toLocaleDateString(), y: dataUf[23].valor },
                        { label: new Date(dataUf[22].fecha).toLocaleDateString(), y: dataUf[22].valor },
                        { label: new Date(dataUf[21].fecha).toLocaleDateString(), y: dataUf[21].valor },
                        { label: new Date(dataUf[20].fecha).toLocaleDateString(), y: dataUf[20].valor },
                        { label: new Date(dataUf[19].fecha).toLocaleDateString(), y: dataUf[19].valor },
                        { label: new Date(dataUf[18].fecha).toLocaleDateString(), y: dataUf[18].valor },
                        { label: new Date(dataUf[17].fecha).toLocaleDateString(), y: dataUf[17].valor },
                        { label: new Date(dataUf[16].fecha).toLocaleDateString(), y: dataUf[16].valor },
                        { label: new Date(dataUf[15].fecha).toLocaleDateString(), y: dataUf[15].valor },
                        { label: new Date(dataUf[14].fecha).toLocaleDateString(), y: dataUf[14].valor },
                        { label: new Date(dataUf[13].fecha).toLocaleDateString(), y: dataUf[13].valor },
                        { label: new Date(dataUf[12].fecha).toLocaleDateString(), y: dataUf[12].valor },
                        { label: new Date(dataUf[11].fecha).toLocaleDateString(), y: dataUf[11].valor },
                        { label: new Date(dataUf[10].fecha).toLocaleDateString(), y: dataUf[10].valor },
                        { label: new Date(dataUf[9].fecha).toLocaleDateString(), y: dataUf[9].valor },
                        { label: new Date(dataUf[8].fecha).toLocaleDateString(), y: dataUf[8].valor },
                        { label: new Date(dataUf[7].fecha).toLocaleDateString(), y: dataUf[7].valor },
                        { label: new Date(dataUf[6].fecha).toLocaleDateString(), y: dataUf[6].valor },
                        { label: new Date(dataUf[5].fecha).toLocaleDateString(), y: dataUf[5].valor },
                        { label: new Date(dataUf[4].fecha).toLocaleDateString(), y: dataUf[4].valor },
                        { label: new Date(dataUf[3].fecha).toLocaleDateString(), y: dataUf[3].valor },
                        { label: new Date(dataUf[2].fecha).toLocaleDateString(), y: dataUf[2].valor },
                        { label: new Date(dataUf[1].fecha).toLocaleDateString(), y: dataUf[1].valor },
                        { label: new Date(dataUf[0].fecha).toLocaleDateString(), y: dataUf[0].valor }
                    ]
                }
            ]
        });

        var chartUtm = new CanvasJS.Chart("chartContainerUtm", {
            animationEnabled: true,
            exportEnabled: true,
            height: 300,
            title: {
                text: "Variation UTM last year"
            },
            axisY: {
                title: "Pesos"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [
                {
                    type: "spline",
                    name: "UTM",
                    showInLegend: true,
                    dataPoints: [
                        { label: new Date(dataUtm[11].fecha).toLocaleDateString(), y: dataUtm[11].valor },
                        { label: new Date(dataUtm[10].fecha).toLocaleDateString(), y: dataUtm[10].valor },
                        { label: new Date(dataUtm[9].fecha).toLocaleDateString(), y: dataUtm[9].valor },
                        { label: new Date(dataUtm[8].fecha).toLocaleDateString(), y: dataUtm[8].valor },
                        { label: new Date(dataUtm[7].fecha).toLocaleDateString(), y: dataUtm[7].valor },
                        { label: new Date(dataUtm[6].fecha).toLocaleDateString(), y: dataUtm[6].valor },
                        { label: new Date(dataUtm[5].fecha).toLocaleDateString(), y: dataUtm[5].valor },
                        { label: new Date(dataUtm[4].fecha).toLocaleDateString(), y: dataUtm[4].valor },
                        { label: new Date(dataUtm[3].fecha).toLocaleDateString(), y: dataUtm[3].valor },
                        { label: new Date(dataUtm[2].fecha).toLocaleDateString(), y: dataUtm[2].valor },
                        { label: new Date(dataUtm[1].fecha).toLocaleDateString(), y: dataUtm[1].valor },
                        { label: new Date(dataUtm[0].fecha).toLocaleDateString(), y: dataUtm[0].valor }
                    ]
                }
            ]
        });

        chartCurrency.render();
        chartUf.render();
        chartUtm.render();

        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            chartCurrency.render();
            chartUf.render();
            chartUtm.render();
        }


    } catch (error) {
        console.log(error);
    }
}

loadData();












