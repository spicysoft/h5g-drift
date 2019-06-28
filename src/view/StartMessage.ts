// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト

class StartMessage extends GameObject{

    texts:egret.TextField[] = [];
    
    constructor() {
        super();

        this.texts[0] = Util.newTextField("ドリフト", Util.width / 12, FONT_COLOR, 0.5, 0.2, true, false);
        this.texts[1] = Util.newTextField("タッチ中は右へドリフト", Util.width / 19, FONT_COLOR, 0.5, 0.3, true, false);
        this.texts[2] = Util.newTextField("華麗に決めろ！", Util.width / 19, FONT_COLOR, 0.5, 0.35, true, false);
        this.texts.forEach( text =>{ GameObject.baseDisplay.addChild( text ); });

        GameObject.baseDisplay.once(egret.TouchEvent.TOUCH_TAP, this.tap, this);
    }

    onDestroy(){
        this.texts.forEach( text =>{ GameObject.baseDisplay.removeChild( text ); });
        this.texts = null;
    }

    update() {}

    tap(e:egret.TouchEvent){
        Player.I.setStateRun();
        this.destroy();
    }
}
