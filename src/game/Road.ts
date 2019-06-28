// Liberapp 2019 - Tahiti Katagai
// 道

class Road extends GameObject{

    static roads:Road[] = [];

    // 始点と終点
    px0:number;
    py0:number;
    px1:number;
    py1:number;
    radius:number;

    // 接触判定要 単位ベクトルと長さ
    uvx:number;
    uvy:number;
    length:number;

    constructor( px0:number, py0:number, px1:number, py1:number, radius:number ){
        super();

        Road.roads.push(this);

        this.px0 = px0;
        this.py0 = py0;
        this.px1 = px1;
        this.py1 = py1;
        this.radius = radius;

        this.uvx = px1 - px0;
        this.uvy = py1 - py0;
        this.length = Math.sqrt( this.uvx**2 + this.uvy**2 );
        const normalizer = 1 / this.length;
        this.uvx *= normalizer;
        this.uvy *= normalizer;

        this.setDisplay();
    }

    onDestroy(){
        Road.roads = Road.roads.filter( obj => obj != this );
    }

    setDisplay(){
        let shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChildAt(this.display, 0);
        }else
            shape.graphics.clear();
        
        shape.graphics.lineStyle(this.radius*2, ROAD_COLOR);
        shape.graphics.moveTo(this.px0, this.py0);
        shape.graphics.lineTo(this.px1, this.py1);
    }

    update(){
        if( this.py1 > Camera2D.y + Util.h(0.8) ){
            this.destroy();
            Score.I.addPoint(1);
        }
    }

    public static checkOnRoad( x:number, y:number ):boolean{
        for( let i=0 ; i<Road.roads.length ; i++ ){
            let road = Road.roads[i];
            if( road.py0 + road.radius > y && road.py1-road.radius < y ){
                // 最近点
                let dx = x - road.px0;
                let dy = y - road.py0;
                let dot = dx*road.uvx + dy*road.uvy;
                dot = Util.clamp( dot, 0, road.length );
                let npx = road.px0 + road.uvx * dot;
                let npy = road.py0 + road.uvy * dot;
                // 接触判定と反射
                dx = x - npx;
                dy = y - npy;
                let l = dx**2 + dy**2;
                if( l <= road.radius**2 ){
                    return true;
                }
            }
        }
        return false;
    }
}

