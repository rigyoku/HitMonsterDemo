// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bullet: {
            default: null,
            displayName: '子弹',
            type: cc.Prefab
        },
        time: {
            default: null,
            displayName: '时间',
            type: cc.Label
        },
        monster: {
            default: null,
            displayName: '怪兽',
            type: cc.Prefab
        },
        maxLengthFromMan: {
            default: 0,
            displayName: '怪兽生成最大距离',
            type: cc.Integer
        },
        minLengthFromMan: {
            default: 0,
            displayName: '怪兽生成最短距离',
            type: cc.Integer
        },
        monsterCreateInterval: {
            default: 0,
            displayName: '怪兽生成间隔',
            type: cc.Float
        }
    },

    createBullet(bulletLeft, x, y) {
        let bullet = cc.instantiate(this.bullet);
        let bulletScript = bullet.getComponent('bullet');
        let bulletSprite = bulletLeft ? bulletScript.leftBullet : bulletScript.rightBullet;
        bullet.getComponent(cc.Sprite).spriteFrame = bulletSprite;
        bulletScript.setLeftFlag(bulletLeft);
        // 保留一定距离
        bullet.setPosition(bulletLeft ? x - 60 : x + 60, y + 20);
        this.node.addChild(bullet);
    },

    start () {

    },

    onLoad() {
        window.Score = 0;
        this.liveTime = 0;
        this.status = 0;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    update(dt) {
        if (false) {
            return;
        }
        this.liveTime += dt;
        if (this.liveTime > this.status * this.monsterCreateInterval) {
            this.status += 2;
            this.createMonster();
        }
        this.time.string = parseFloat(this.liveTime).toFixed(1);
    },

    createMonster() {
        let monster = cc.instantiate(this.monster);
        let man = this.node.getChildByName('man');
        let leftFlag = Math.random() > 0.5;
        let x = this.minLengthFromMan + Math.random() * (this.maxLengthFromMan - this.minLengthFromMan);
        if (leftFlag && man.x - 50 > -this.node.width / 2) {
            x = man.x - x;
        } else {
            x += man.x;
        }
        monster.setPosition(x, 0);
        this.node.addChild(monster)
    },

    gameover() {
        window.Score = this.time.string;
        cc.director.loadScene('GameOver');
    }
});
