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
    rotation:number;

    // 接触判定要 単位ベクトルと長さ
    uvx:number;
    uvy:number;
    length:number;

    shapes:egret.Shape[] = [];

    constructor( px0:number, py0:number, px1:number, py1:number, radius:number, rotation:number ){
        super();

        Road.roads.push(this);

        this.px0 = px0;
        this.py0 = py0;
        this.px1 = px1;
        this.py1 = py1;
        this.radius = radius;
        this.rotation = rotation;

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
        this.shapes.forEach( shape =>{ shape.parent.removeChild( shape ); });
    }

    setDisplay(){
        // 大きな図形を描こうとするとスマホで表示がバグる（PC上では正常に動くが）
        // let shape = this.display as egret.Shape;
        // if( this.display == null ){
        //     this.display = shape = new egret.Shape();
        //     GameObject.gameDisplay.addChildAt(this.display, 0);
        // }else
        //     shape.graphics.clear();
        
        // shape.graphics.lineStyle(this.radius*2, ROAD_COLOR);
        // shape.graphics.moveTo(this.px0, this.py0);
        // shape.graphics.lineTo((this.px0 + this.px1)/2, (this.py0 + this.py1)/2);
        // shape.graphics.lineTo(this.px1, this.py1);

        // 図形を分割して、２つのShapeで描画
        this.shapes[0] = new egret.Shape();
        this.shapes[1] = new egret.Shape();
        GameObject.gameDisplay.addChildAt(this.shapes[0], 0);
        GameObject.gameDisplay.addChildAt(this.shapes[1], 0);

        const w = this.length;
        const h = this.radius * 2;
        this.shapes[0].graphics.beginFill(ROAD_COLOR);
        this.shapes[0].graphics.drawCircle( -0.5*this.length, 0, this.radius);
        this.shapes[0].graphics.drawRect( -w/2, -h/2, w/2, h );
        this.shapes[0].graphics.endFill();
        this.shapes[0].x = (this.px0 + this.px1)/2;
        this.shapes[0].y = (this.py0 + this.py1)/2;
        this.shapes[0].rotation = 90+this.rotation;

        this.shapes[1].graphics.beginFill(ROAD_COLOR);
        this.shapes[1].graphics.drawRect(    0, -h/2, w/2, h );
        this.shapes[1].graphics.drawCircle( +0.5*this.length, 0, this.radius);
        this.shapes[1].graphics.endFill();
        this.shapes[1].x = (this.px0 + this.px1)/2;
        this.shapes[1].y = (this.py0 + this.py1)/2;
        this.shapes[1].rotation = 90+this.rotation;
    }

    update(){
        if( this.py1 - this.radius > Camera2D.y + Util.h(0.5) ){
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
                // 接触判定
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

