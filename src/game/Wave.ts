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

        this.lastPx = Util.h(START_X_PER_H);
        this.lastPy = Util.h(START_Y_PER_H);
        
        const range = Util.h(1);
        const rotation = (this.turnLeft ? +45 : -45);
        const radius = Util.h(ROAD_RADIUS_PER_H);
        this.newRoad( range, rotation, radius );
    }

    update() {
        while( this.lastPy > Player.I.y - Util.h(1.2) ){
            const range = Util.h( randF(Util.lerp( 0.85, 0.42, Wave.hardRate), 2.0) );  // 2.0まで。長過ぎるとスマホで表示がバグる
            let rotation = 40;
            if( Wave.hardRate >= 1 && randI(0,3)==0 ) rotation = 20;
            rotation = rotation * (this.turnLeft ? +1 : -1);
            const radius = Util.h(ROAD_RADIUS_PER_H) * randF( Util.lerp( 1, 0.58, Wave.hardRate), 1 );
            this.newRoad( range, rotation, radius, randBool() );

            Wave.hardRate = Util.clamp( -(this.lastPy - Util.h(START_Y_PER_H)) / Util.h(40), 0, 1 );
        }
    }

    newRoad( range:number, rotation:number, radius:number, coin:boolean=false ){
        const angle = rotation * (Math.PI/180);
        const ux =  Math.sin( angle );
        const uy = -Math.cos( angle );
        const x = this.lastPx + ux * range;
        const y = this.lastPy + uy * range;
        new Road( this.lastPx, this.lastPy, x, y, radius, rotation );

        if( coin ){
            const space = Util.h(1/6);
            const count = Math.floor( range*0.5 / space );
            let cx = this.lastPx + ux * range * 0.25;
            let cy = this.lastPy + uy * range * 0.25;

            const offset = radius * randF(-0.8, +0.8) * Wave.hardRate;
            cx +=  Math.sin( angle + Math.PI/2 ) * offset;
            cy += -Math.cos( angle + Math.PI/2 ) * offset;

            for( let i=0 ; i<count ; i++ ){
                new Coin( cx, cy );
                cx += ux * space;
                cy += uy * space;
            }
        }

        this.lastPx = x;
        this.lastPy = y;
        this.turnLeft = !this.turnLeft;
    }
}

