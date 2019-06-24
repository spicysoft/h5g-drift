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
    }

    update() {
        
    }
}

