// Liberapp 2019 - Tahiti Katagai
// プレイヤー

class Player extends GameObject{

    static I:Player = null;

    get x():number { return this.display.x; }
    get y():number { return this.display.y; }
    set x( x:number ){ this.display.x = x; }
    set y( y:number ){ this.display.y = y; }
    
    sizeW:number;
    sizeH:number;
    radius:number;
    color:number;
    vx:number;
    vy:number;
    big:number;

    button:Button;
    state:()=>void = this.stateNone;

    constructor( x:number, y:number ) {
        super();

        Player.I = this;
        this.sizeW = Util.h(PLAYER_WIDTH_PER_H);
        this.sizeH = Util.h(PLAYER_HEIGHT_PER_H);
        this.radius = this.sizeW/2;
        this.color = PLAYER_COLOR;
        this.vx = 0;
        this.vy = 0;
        this.setDisplay( x, y );

        Camera2D.x = 0;
        this.scrollCamera( 1 );

        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.button.destroy();
        Player.I = null;
    }

    setDisplay( x:number, y:number ){
        let shape:egret.Shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }else
            shape.graphics.clear();

        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill( this.color );
        shape.graphics.drawRect( -0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
        shape.graphics.endFill();
    }

    update(){
        this.state();
    }

    scrollCamera( lerp:number = 1/8 ){
        Camera2D.x = this.x - Util.w(0.5);
        Camera2D.x = this.y - Util.h(0.5);
        Camera2D.rotation = this.display.rotation;
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
    }

    setStateRun(){
        this.state = this.stateRun;
    }
    stateRun() {

    }

    setStateMiss(){
        if( this.state == this.stateMiss )
            return;
        new GameOver();
        this.state = this.stateMiss;
    }
    stateMiss(){
    }
}
