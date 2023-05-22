const pcv = (grafo) => {
    const n = Object.keys(grafo).length
    let caminhoMinimo = null
    let distanciaMinima = Infinity

    const permuta = (arr, inicio) => {
        if (inicio === n - 1) {
            const dist = caclulaDistanciaCaminho(arr, grafo)
            if (dist < distanciaMinima) {
                distanciaMinima = dist
                caminhoMinimo = arr.slice()
            }
        } else {
            for (let i = inicio; i < n; i++) {
                ;[arr[inicio], arr[i]] = [arr[i], arr[inicio]]
                permuta(arr, inicio + 1)
                ;[arr[inicio], arr[i]] = [arr[i], arr[inicio]]
            }
        }
    }

    const caclulaDistanciaCaminho = (caminho, grafo) => {
        let dist = 0
        for (let i = 0; i < n - 1; i++) {
            dist += grafo[caminho[i]][caminho[i + 1]]
        }
        dist += grafo[caminho[n - 1]][caminho[0]]
        return dist
    }

    permuta(Object.keys(grafo), 0)

    return { caminho: caminhoMinimo, distancia: distanciaMinima }
}

const grafo = {
    A: { B: 1, C: 3, E: 4 },
    B: { A: 1, C: 3, D: 1 },
    C: { A: 3, B: 3, D: 6, E: 2 },
    D: { B: 1, C: 6, E: 7 },
    E: { A: 4, C: 2, D: 7 }
}

const result = pcv(grafo)
const caminho = result.caminho
const distancia = result.distancia

const caminhoMinimo = pcv(grafo).caminho

console.log(caminhoMinimo)
console.log(distancia)
