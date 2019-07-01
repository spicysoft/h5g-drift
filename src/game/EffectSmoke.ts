// Liberapp 2019 - Tahiti Katagai
// スモークエフェクト

class EffectSmoke extends GameObject{

    vx:number;
    vy:number;

    constructor( x:number, y:number, vx:number, vy:number, radius:number ) {
        super();

        this.setShape(x, y, radius);
        this.vx = vx;
        this.vy = vy;
    }

    setShape(x:number, y:number, radius:number){
        let shape:egret.Shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }else
            shape.graphics.clear();

        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill( 0xf0f0f0 );
        shape.graphics.drawCircle( 0, 0, radius );
        shape.graphics.endFill();
        shape.alpha = 0.5 + randF(-0.1, +0.1);
    }

    update() {
        this.display.x += this.vx;
        this.display.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;

        this.display.scaleX -= 1/32;
        this.display.scaleY = this.display.scaleX;

        this.display.alpha -= 0.5/30;
        if( this.display.alpha < 0.01 ){
            this.destroy();
        }
    }
}
