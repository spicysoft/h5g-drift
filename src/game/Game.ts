// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_WIDTH_PER_H = 1/20;
const PLAYER_HEIGHT_PER_H = 1/16;
const PLAYER_MIN_SPEED_PER_H = 1/120;
const PLAYER_MAX_SPEED_PER_H = 1/75;

const ROAD_RADIUS_PER_H = 1/3;
const ROAD_STRIPE_W_PER_H = 1/24;
const ROAD_STRIPE_L_PER_H = 1/8;

const COIN_RADIUS_PER_H = 1/48;
const ITEM_RADIUS_PER_H = 1/32;
const ITEM_LIMIT_FRAME = 60 * 10;

const SAVE_KEY_BESTSCORE = "drift-bestScore";

const BACK_COLOR = 0x108090;    // index.htmlで設定
const ROAD_COLOR = 0x405060;
const ROAD_COLOR2 = 0xc0d0e0;
const FONT_COLOR = 0xffffff;
const FONT_COLOR2 = 0xffffff;
const PLAYER_COLOR = 0xe06060;
const COIN_COLOR   = 0xfff000;

class Game {

    static loadSceneGamePlay() {
        new Player( 0, 0 );
        new Wave();
        new StartMessage();
        new Score();
    }
}
