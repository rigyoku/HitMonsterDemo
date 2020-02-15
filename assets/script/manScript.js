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
        runSpeed: {
            default: 0,
            displayName: '跑动速度',
            type: cc.Integer
        },
        jumpHight: {
            default: 0,
            displayName: '跳跃高度',
            type: cc.Integer
        },
        jumpTime: {
            default: 0,
            displayName: '跳跃用时',
            type: cc.Float
        },
        leftImg: {
            default: null,
            displayName: '面朝左',
            type: cc.Asset
        },
        rightImg: {
            default: null,
            displayName: '面朝右',
            type: cc.Asset
        }
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:{
                this.left = true;
                this.right = false;
                this.node.getComponent(cc.Sprite).spriteFrame = this.leftImg;
                this.bulletLeft = true;
                break;
            }
            case cc.macro.KEY.d: {
                this.left = false;
                this.right = true;
                this.node.getComponent(cc.Sprite).spriteFrame = this.rightImg;
                this.bulletLeft = false;
                break;
            }
            case cc.macro.KEY.j: {
                this.shot();
                break;
            }
            case cc.macro.KEY.w: {
                this.jump();
            }
        }
    },

    shot() {
        this.node.parent.getComponent('game').createBullet(this.bulletLeft, this.node.x, this.node.y);
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a: {
                this.left = false;
                break;
            }
            case cc.macro.KEY.d: {
                this.right = false;
                break;
            }
        }
    },

    jump() {
        if (this.jumping) {
            return;
        }
        this.jumping = true;
        let jumpUp = cc.moveBy(this.jumpTime, cc.v2(0, this.jumpHight)).easing(cc.easeCubicActionOut());
        let jumpdown = cc.moveBy(this.jumpTime, cc.v2(0, -this.jumpHight)).easing(cc.easeCubicActionIn());
        this.node.runAction(cc.sequence(jumpUp, jumpdown, cc.callFunc(function () {
            this.jumping = false;
        }, this)));
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start() {
        
    },

    update(dt) {
        let length = 0;
        if(this.left) {
            length = -1 * this.runSpeed * dt;
        } else if(this.right) {
            length = this.runSpeed * dt;
        }
        if (this.node.x > this.node.parent.width / 2) {
            return this.node.x = this.node.parent.width / 2;
        } else if (this.node.x < -this.node.parent.width / 2 + 50) {
            return this.node.x = -this.node.parent.width / 2 + 50;
        }
        this.node.x += length;
    },
});
