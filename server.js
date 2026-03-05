const express = require("express");
const cors = require("cors");

const graph = require("./graph");
const dijkstra = require("./dijkstra");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/getPath", (req, res) => {
    const { currentLocation, destination } = req.body;

    if (!currentLocation || !destination) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const result = dijkstra(graph, currentLocation, destination);

    res.json({
        from: currentLocation,
        to: destination,
        path: result.path,
        distance: result.distance,
        time: Math.ceil(result.distance / 70)
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
