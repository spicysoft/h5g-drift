// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;

    lastPx:number;
    lastPy:number;

    constructor() {
        super();
        Wave.hardRate = 0;

        this.lastPx = 0;
        this.lastPy = 0;
        const x = 0;
        const y = this.lastPy - Util.h(0.5);
        new Road( this.lastPx, this.lastPy,  x, y );
        this.lastPx = x;
        this.lastPy = y;
    }

    update() {
        while( this.lastPy > Player.I.y - Util.h(0.75) ){
            const x = Util.w(randF(0.1, +0.5)) * (this.lastPx >= 0 ? -1 : +1);
            const y = this.lastPy - Util.h(0.75);
            new Road( this.lastPx, this.lastPy,  x, y );
            this.lastPx = x;
            this.lastPy = y;
        }
    }
}

