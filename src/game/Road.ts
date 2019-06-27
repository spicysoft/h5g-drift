// Liberapp 2019 - Tahiti Katagai
// 道

class Road extends GameObject{

    static roads:Road[] = [];

    // 始点と終点
    px0:number;
    py0:number;
    px1:number;
    py1:number;

    // 接触判定要 単位ベクトルと長さ
    uvx:number;
    uvy:number;
    length:number;

    constructor( px0:number, py0:number, px1:number, py1:number ){
        super();

        Road.roads.push(this);

        this.px0 = px0;
        this.py0 = py0;
        this.px1 = px1;
        this.py1 = py1;

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
        
        shape.graphics.lineStyle(Util.w(0.5), ROAD_COLOR);
        shape.graphics.moveTo(this.px0, this.py0);
        shape.graphics.lineTo(this.px1, this.py1);
    }

    update(){
        // if( this.py1 > Camera2D.y + Util.h(0.5) ){
        //     this.destroy();
        //     Score.I.addPoint(1);
        // }
    }
}

