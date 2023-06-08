// Array de cidades disponíveis
const cidades = [
    'Belo Horizonte',
    'Contagem',
    'Uberlândia',
    'Juiz de Fora',
    'Ribeirão das Neves',
    'Betim',
    'Montes Claros',
    'Uberaba',
    'Governador Valadares',
    'Santa Luzia',
    'Ipatinga',
    'Sete Lagoas',
    'Divinópolis',
    'Poços de Caldas',
    'Ibirité'
]

// Matriz de distâncias entre as cidades
const matrizDistancias = [
    [0, 19, 536, 261, 34, 30, 425, 475, 317, 24, 218, 75, 151, 462, 21],
    [19, 0, 523, 270, 27, 17, 418, 462, 334, 41, 235, 66, 139, 449, 19],
    [536, 523, 0, 785, 547, 506, 627, 106, 851, 558, 751, 596, 458, 474, 524],
    [261, 271, 787, 0, 286, 280, 678, 726, 454, 284, 426, 325, 322, 460, 268],
    [33, 28, 552, 291, 0, 46, 398, 491, 334, 33, 235, 46, 168, 478, 44],
    [29, 17, 506, 279, 41, 0, 433, 445, 345, 52, 245, 80, 121, 434, 22],
    [425, 415, 627, 677, 399, 432, 0, 648, 535, 433, 523, 360, 554, 865, 430],
    [476, 463, 106, 726, 488, 446, 648, 0, 791, 498, 692, 521, 398, 368, 465],
    [322, 336, 857, 455, 339, 351, 534, 796, 0, 313, 102, 380, 473, 783, 340],
    [25, 39, 561, 284, 33, 54, 429, 500, 310, 0, 210, 70, 176, 487, 43],
    [223, 236, 758, 428, 240, 251, 525, 697, 103, 214, 0, 281, 373, 684, 240],
    [75, 63, 597, 325, 47, 80, 360, 520, 377, 73, 277, 0, 202, 513, 78],
    [117, 104, 458, 322, 129, 87, 520, 397, 433, 140, 333, 168, 0, 390, 106],
    [462, 449, 474, 458, 473, 434, 865, 366, 777, 484, 677, 512, 390, 0, 450],
    [21, 19, 525, 267, 39, 22, 430, 464, 336, 43, 236, 77, 140, 451, 0]
]

// Função para calcular a rota aproximada
function calcularRota() {
    const cidadeInicialIndex = document.getElementById('cidadeInicial').value
    const loaderRota = document.getElementById('loaderRota')
    const loaderDistancia = document.getElementById('loaderDistancia')
    const rotaElement = document.getElementById('rota')
    const distanciaTotalElement = document.getElementById('distanciaTotal')

    // Exibir o loader e ocultar os resultados anteriores
    loaderRota.style.display = 'block'
    loaderDistancia.style.display = 'block'
    rotaElement.textContent = ''
    distanciaTotalElement.textContent = ''

    // Simular um atraso de 3 segundos para exibir o loader
    setTimeout(() => {
        const rota = encontrarMelhorRota(cidadeInicialIndex)

        // Exibir a rota e a distância total
        rotaElement.textContent = rota.join(' -> ')
        const distanciaTotal = calcularDistanciaTotal(rota)
        distanciaTotalElement.textContent = distanciaTotal + ' KM'

        // Ocultar o loader após exibir os resultados
        loaderRota.style.display = 'none'
        loaderDistancia.style.display = 'none'
    }, 3000)
}

// Função para encontrar a melhor rota visitando todas as cidades
function encontrarMelhorRota(cidadeInicialIndex) {
    const numCidades = cidades.length
    const visitado = Array(numCidades).fill(false)
    const rota = []
    let cidadeAtualIndex = cidadeInicialIndex

    visitado[cidadeAtualIndex] = true
    rota.push(cidades[cidadeAtualIndex])

    while (rota.length < numCidades) {
        let proximaCidadeIndex = null
        let menorDistancia = Infinity

        for (let i = 0; i < matrizDistancias[cidadeAtualIndex].length; i++) {
            if (
                i !== cidadeAtualIndex &&
                !visitado[i] &&
                matrizDistancias[cidadeAtualIndex][i] < menorDistancia
            ) {
                proximaCidadeIndex = i
                menorDistancia = matrizDistancias[cidadeAtualIndex][i]
            }
        }

        cidadeAtualIndex = proximaCidadeIndex
        visitado[cidadeAtualIndex] = true
        rota.push(cidades[cidadeAtualIndex])
    }

    rota.push(cidades[cidadeInicialIndex])

    return rota
}

// Função para calcular a distância total da rota
function calcularDistanciaTotal(rota) {
    let distanciaTotal = 0

    for (let i = 0; i < rota.length - 1; i++) {
        const cidadeAtualIndex = cidades.indexOf(rota[i])
        const proximaCidadeIndex = cidades.indexOf(rota[i + 1])
        distanciaTotal += matrizDistancias[cidadeAtualIndex][proximaCidadeIndex]
    }

    return distanciaTotal
}

// Popula o select de cidades com as opções disponíveis
function popularSelectCidades() {
    const cidadeInicialSelect = document.getElementById('cidadeInicial')

    for (let i = 0; i < cidades.length; i++) {
        const option = document.createElement('option')
        option.value = i
        option.text = cidades[i]

        cidadeInicialSelect.appendChild(option)
    }
}

// Chama a função para popular o select de cidades
popularSelectCidades()
