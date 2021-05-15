function down(x, y, speed, localX, localY) {
    y += -0.01 * speed;
    return [x, y, localX, localY, initForDown];
}

function up(x, y, speed, localX, localY) {
    y += 0.01 * speed;
    return [x, y, localX, localY, initForUp];
}

function left(x, y, speed, localX, localY) {
    x += 0.01 * speed;
    return [x, y, localX, localY, initForLeft];
}

function right(x, y, speed, localX, localY) {
    x += -0.01 * speed;
    return [x, y, localX, localY, initForRight];
}

function parabola(x, y, speed, localX, localY) {
    var oldX = x - localX;
    var oldY = y - localY;
    localX += 0.001;
    localY = -200 * localX * localX;
    x = oldX + localX * speed;
    y = oldY + localY * speed;
    return [x, y, localX, localY, initForDown];
}