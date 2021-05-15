function initForDown(x, y) {
    x = 2 * Math.random() - 1;
    y = 1;

    return [x, y];
}

function initForUp(x, y) {
    x = 2 * Math.random() - 1;
    y = -1;

    return [x, y];
}

function initForLeft(x, y) {
    x = -1;
    y = 2 * Math.random() - 1;

    return [x, y];
}

function initForRight(x, y) {
    x = 1;
    y = 2 * Math.random() - 1;

    return [x, y];
}