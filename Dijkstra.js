function dijkstra(grafo, inicio) {
    const custos = {}
    const visitados = {}
    const fila = new PriorityQueue()

    for (let vertice in grafo) {
        custos[vertice] = Infinity
    }

    custos[inicio] = 0
    fila.enqueue(inicio, 0)

    while (!fila.isEmpty()) {
        const { element: verticeAtual, priority: custoAtual } = fila.dequeue()
        visitados[verticeAtual] = true

        for (let adjacente in grafo[verticeAtual]) {
            const custo = custoAtual + grafo[verticeAtual][adjacente]

            if (custo < custos[adjacente]) {
                custos[adjacente] = custo
                if (!visitados[adjacente]) {
                    fila.enqueue(adjacente, custo)
                }
            }
        }
    }

    return custos
}

class PriorityQueue {
    constructor() {
        this.elements = []
    }

    enqueue(element, priority) {
        const item = { element, priority }
        let added = false

        for (let i = 0; i < this.elements.length; i++) {
            if (item.priority < this.elements[i].priority) {
                this.elements.splice(i, 0, item)
                added = true
                break
            }
        }

        if (!added) {
            this.elements.push(item)
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            throw 'Empty queue'
        }
        return this.elements.shift()
    }

    isEmpty() {
        return this.elements.length === 0
    }
}

const grafo = {
    A: { B: 8, C: 5, D: 3 },
    B: { E: 8, F: 6 },
    C: { E: 4, F: 8, G: 7 },
    D: { F: 9, G: 11 },
    E: { H: 6, I: 9 },
    F: { H: 10, I: 12 },
    G: { I: 3 },
    H: { J: 7 },
    I: { J: 5 },
    J: {}
}

const inicio = 'A'
const custos = dijkstra(grafo, inicio)
console.log(custos)
