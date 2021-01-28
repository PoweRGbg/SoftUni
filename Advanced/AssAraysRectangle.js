function rectangle(width, height, color) {
    const rect = {};
    rect.width = Number(width);
    rect.height = Number(height);
    rect.color = color;
    rect.calcArea = function () {
        return width * height;
    }
    return rect;
}

let rect = rectangle(4, -13, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());