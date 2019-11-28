function getRandom(value=1) {
    return Math.random() * value;
}

function distance(point1, point2) {
    let dx = point1.x - point2.x;
    let dy = point1.y - point2.y;
    return Math.sqrt(
        dx * dx + dy * dy
    );
}