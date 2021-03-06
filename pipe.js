function Pipe() {
    // Variables:
    this.spacing = 175;
    this.top = random(height / 6, 3 / 4 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6;
    this.highlight = false;

    this.hits = function(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    this.show = function() {
        push();
        fill(114, 190, 67);
        if (this.highlight) {
            fill(200, 0, 0);
        }
        // Teava/Obstacolul de sus
        rect(this.x, 0, this.w, this.top);

        // Teava/Obstaculul de jos
        rect(this.x, height - this.bottom, this.w, this.bottom);

        // "Capacul" la teava/obstacolul de sus
        rect(this.x - 10, this.top - 40, this.w + 20, 40); //draw top pipe cap

        // "Capacul la teava/obtacolul de jos"
        rect(this.x - 10, height - this.bottom, this.w + 20, 40); //draw bottom pipe cap
        pop();
    }

    this.update = function() {
        this.x -= this.speed;
    }

    this.offscreen = function() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
}