/**
 * BaseClass， 抽象出 矩形和圆形
 * CircleRect本质是一个等边矩形的外接圆, 所以增加了radius属性
 */
const SQRT_2 = Math.sqrt(2);
/**
 * @class Rect 矩形
 * @constructor
 */
export class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * @class CircleRect 等边矩形的外接圆, 本质也是一个盒子，只是通过css显示出圆形
 * @constructor
 */
export class CircleRect extends Rect {
    //方形的外接圆半径是 width/2 * √￣2
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.radius = Math.ceil(width / 2 * SQRT_2);
    }
}
