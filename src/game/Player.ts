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
    speed:number;
    vx:number;
    vy:number;
    rd:number = 0;
    rv:number = 0;

    magnet:number;

    button:Button;
    state:()=>void = this.stateNone;

    constructor( x:number, y:number ) {
        super();

        Player.I = this;
        this.sizeW = Util.h(PLAYER_WIDTH_PER_H);
        this.sizeH = Util.h(PLAYER_HEIGHT_PER_H);
        this.radius = this.sizeW/2;
        this.color = PLAYER_COLOR;
        this.speed = Util.h( PLAYER_MIN_SPEED_PER_H );
        this.vx = 0;
        this.vy = 0;//-Util.h(PLAYER_SPEED_PER_H);
        this.setDisplay( x, y );
        this.display.rotation = -45;

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
            GameObject.gameDisplay.addChildAt(this.display, 1);
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

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
    }

    setStateRun(){
        this.state = this.stateRun;
    }
    stateRun() {
        this.rd = (this.button.touch) ? +45 : -45;
        this.rv *= 0.5;
        this.rv += Util.clamp( this.rd - this.display.rotation, -2, +2 );
        this.display.rotation += this.rv;

        this.speed = Util.lerp( Util.h( PLAYER_MIN_SPEED_PER_H ), Util.h( PLAYER_MAX_SPEED_PER_H ), Wave.hardRate );
        let vx =  Math.sin( this.display.rotation * (Math.PI/180) );
        let vy = -Math.cos( this.display.rotation * (Math.PI/180) );
        const rate = 0.98;
        this.vx *= rate;
        this.vy *= rate;
        this.vx += vx * this.speed * (1-rate);
        this.vy += vy * this.speed * (1-rate);

        this.x += this.vx;
        this.y += this.vy;
        this.scrollCamera();

        if( this.rv**2 >= 0.1**2 && randI(0,3)==0 ){
            new EffectSmoke( this.x, this.y+randF(0, this.sizeH), vx*randF(-9,1), vy*randF(-9,1), this.sizeW * randF(0.4, 0.9) );
        }

        if( !Road.checkOnRoad( this.x, this.y ) ){
            this.setStateMiss();
        }
    }

    scrollCamera( lerp:number = 1/16 ){
        Camera2D.x = this.x;
        Camera2D.y = this.y;
        Camera2D.localX = Util.w(0.5);
        Camera2D.localY = Util.h(0.75);
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
