// graph.js

const graph = {
    "Library": {
        "CSE Block": 150,
        "Admin Block": 200
    },
    "CSE Block": {
        "Library": 150,
        "Admin Block": 120
    },
    "Admin Block": {
        "CSE Block": 120,
        "Auditorium": 150
    },
    "Auditorium": {
        "Admin Block": 150
    }
};

module.exports = graph;
