class Particle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.initFunction = initForDown;
        this.init(this.initFunction);
    }

    init() {
        [this.x, this.y] = this.initFunction(this.x, this.y);
        this.speed = Math.random() + 0.5;
        this.localX = 0;
        this.localY = 0;
    }

    move(trajectoryFunction) {
        [this.x, this.y, this.localX, this.localY, this.initFunction] = trajectoryFunction(this.x, this.y, this.speed, this.localX, this.localY);

        if (this.x > 1.1 || this.x < -1 || this.y < -1 || this.y > 1) {
            this.init();
            return;
        }
    }
}