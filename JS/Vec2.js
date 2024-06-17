class Vec2
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    copy()
    {
        return new Vec2(this.x, this.y);
    }
    assign(rhs) {
        if (rhs instanceof Vec2) {
          this.x = rhs.x;
          this.y = rhs.y;
        } else {
          throw new TypeError('rhs must be an instance of Vec2');
        }
        return this;
      }
    assignScalar(num) {
        this.x = num;
        this.y = num;
        return this;
    }
    add(rhs) {
        if (rhs instanceof Vec2) {
            return new Vec2(this.x + rhs.x, this.y + rhs.y);
        } else {
            throw new TypeError('rhs must be an instance of Vec2');
        }
    }
    addScalar(num) {
        return new Vec2(this.x + num, this.y + num);
    }
    negate(rhs) {
        if (rhs instanceof Vec2) {
            return new Vec2(this.x - rhs.x, this.y - rhs.y);
        } else {
            throw new TypeError('rhs must be an instance of Vec2');
        }
    }
    negateScalar(num) {
        return new Vec2(this.x - num, this.y - num);
    }
    multiply(rhs) {
        if (rhs instanceof Vec2) {
            return (this.x * rhs.y) - (this.y * rhs.x);
        } else {
            throw new TypeError('rhs must be an instance of Vec2');
        }
    }
    multiplyScalar(num) {
        return new Vec2(this.x * num, this.y * num);
    }
    addEqual(rhs) {
        if (rhs instanceof Vec2) {
            this.x += rhs.x;
            this.y += rhs.y;
        } else {
            throw new TypeError('rhs must be an instance of Vec2');
        }
    }
    addEqualScalar(num) {
        this.x += num;
        this.y += num;
    }

    negateEqual(rhs) {
        if (rhs instanceof Vec2) {
            this.x -= rhs.x;
            this.y -= rhs.y;
        } else {
            throw new TypeError('rhs must be an instance of Vec2');
        }
    }
    negateEqualScalar(num) {
        this.x -= num;
        this.y -= num;
    }

    equals(rhs){
        if (rhs instanceof Vec2) {
            return this.x == rhs.x && this.y == rhs.y;
        } else {
            throw new TypeError('rhs must be an instance of Vec2');
        }
    }
    equalsScalar(num)
    {
        return this.x == num && this.y == num;
    }
    notEquals(rhs){
        if (rhs instanceof Vec2) {
            return this.x != rhs.x || this.y != rhs.y;
        } else {
            throw new TypeError('rhs must be an instance of Vec2');
        }
    }
    notEqualsScalar(num)
    {
        return this.x != num && this.y != num;
    }
    toString() {
        return `Vec2(${this.x}, ${this.y})`;
    }
}