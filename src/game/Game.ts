// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_WIDTH_PER_H = 1/32;
const PLAYER_HEIGHT_PER_H = 1/24;
const PLAYER_SPEED_PER_H = 1/120;

const ROAD_WIDTH_PER_H = 1/3;

const COIN_RADIUS_PER_H = 1/48;
const ITEM_RADIUS_PER_H = 1/32;
const ITEM_LIMIT_FRAME = 60 * 10;

const SAVE_KEY_BESTSCORE = "drift-bestScore";

const BACK_COLOR = 0x108090;    // index.htmlで設定
const ROAD_COLOR = 0x405060;
const FONT_COLOR = 0xffffff;
const FONT_COLOR2 = 0xffffff;
const PLAYER_COLOR = 0xffffff;
const COIN_COLOR   = 0xfff000;

class Game {

    static loadSceneGamePlay() {
        new Player( 0, 0 );
        new Wave();
        new StartMessage();
        new Score();
    }
}
