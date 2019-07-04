// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_WIDTH_PER_H = 1/20 * 0.85;
const PLAYER_HEIGHT_PER_H = 1/16 * 0.85;
const PLAYER_MIN_SPEED_PER_H = 1/110 * 0.85;
const PLAYER_MAX_SPEED_PER_H = 1/75 * 0.85;
const START_X_PER_H = 0;
const START_Y_PER_H = 0;

const ROAD_RADIUS_PER_H = 1/3 * 0.85;

const COIN_RADIUS_PER_H = 1/48 * 0.85;

const SAVE_KEY_BESTSCORE = "drift-bestScore";

const BACK_COLOR = 0x108090;    // index.htmlで設定
const ROAD_COLOR = 0x405060;
const FONT_COLOR = 0xffffff;
const FONT_COLOR2 = 0xffffff;
const PLAYER_COLOR = 0xc060e0;
const COIN_COLOR   = 0xfff000;

class Game {

    static loadSceneGamePlay() {
        new Player( Util.h(START_X_PER_H), Util.h(START_Y_PER_H) );
        new Wave();
        new StartMessage();
        new Score();
    }
}
