// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;

    lastPx:number;
    lastPy:number;
    turnLeft:boolean = false;

    constructor() {
        super();
        Wave.hardRate = 0;

        this.lastPx = 0;
        this.lastPy = 0;
        
        const range = Util.h(1);
        const angle = (this.turnLeft ? +45 : -45) * (Math.PI/180);
        const radius = Util.h(ROAD_RADIUS_PER_H);
        this.newRoad( range, angle, radius );
    }

    update() {
        while( this.lastPy > Player.I.y - Util.h(1.2) ){
            const range = Util.h( randF(Util.lerp( 1, 0.5, Wave.hardRate), 1.5) );
            const angle = (this.turnLeft ? +40 : -40) * (Math.PI/180);
            const radius = Util.h(ROAD_RADIUS_PER_H) * randF( Util.lerp( 1, 0.5, Wave.hardRate), 1 );

            this.newRoad( range, angle, radius, true );
            Wave.hardRate = Util.clamp( -this.lastPy / (Util.height * 20), 0, 1 );
        }
    }

    newRoad( range:number, angle:number, radius:number, coin:boolean=false ){
        const ux =  Math.sin( angle );
        const uy = -Math.cos( angle );
        const x = this.lastPx + ux * range;
        const y = this.lastPy + uy * range;
        new Road( this.lastPx, this.lastPy, x, y, radius );

        if( coin ){
            new Coin( this.lastPx + ux * range /2, this.lastPy + uy * range/2 );
        }

        this.lastPx = x;
        this.lastPy = y;
        this.turnLeft = !this.turnLeft;
    }
}

