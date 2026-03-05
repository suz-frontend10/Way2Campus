// dijkstra.js

function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const visited = new Set();

    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }

    distances[start] = 0;

    while (true) {
        let closestNode = null;

        for (let node in distances) {
            if (!visited.has(node)) {
                if (closestNode === null || distances[node] < distances[closestNode]) {
                    closestNode = node;
                }
            }
        }

        if (closestNode === null) break;
        if (closestNode === end) break;

        visited.add(closestNode);

        for (let neighbor in graph[closestNode]) {
            let newDistance = distances[closestNode] + graph[closestNode][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = closestNode;
            }
        }
    }

    const path = [];
    let current = end;

    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    return {
        path,
        distance: distances[end]
    };
}

module.exports = dijkstra;
