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
        bulletSpeed: {
            default: 0,
            displayName: '子弹速度',
            type: cc.Integer
        },
        leftBullet: {
            default: null,
            displayName: '子弹朝左',
            type: cc.Asset
        },
        rightBullet: {
            default: null,
            displayName: '子弹朝右',
            type: cc.Asset
        }
    },

    setLeftFlag(flag) {
        this.bulletLeft = flag;
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update(dt) {
        this.node.x += dt * (this.bulletLeft ? -1 : 1) * this.bulletSpeed;
        if (this.node.x > this.node.parent.width / 2) {
            this.node.destroy();
        } else if (this.node.x < -this.node.parent.width / 2 + 50) {
            this.node.destroy();
        }
    },
});
