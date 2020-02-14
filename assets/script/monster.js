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
        maxJumpHeight: {
            default: 0,
            type: cc.Integer,
            displayName: '弹跳最大高度'
        },
        minJumpHeight: {
            default: 0,
            type: cc.Integer,
            displayName: '弹跳最小高度'
        },
        maxJumpTime: {
            default: 0,
            type: cc.Float,
            displayName: '弹跳最大时间'
        },
        minJumpTime: {
            default: 0,
            type: cc.Float,
            displayName: '弹跳最短时间'
        },
        maxJumpSpeed: {
            default: 0,
            type: cc.Integer,
            displayName: '弹跳最大速度'
        },
        minJumpSpeed: {
            default: 0,
            type: cc.Integer,
            displayName: '弹跳最小速度'
        },
    },

    jump() {
        let jumpTime = this.maxJumpTime + Math.random() * (this.maxJumpTime - this.minJumpTime);
        let jumpHeight = this.minJumpHeight + Math.random() * (this.maxJumpHeight - this.minJumpHeight);
        let jumpUp = cc.moveBy(jumpTime, cc.v2(0, jumpHeight)).easing(cc.easeCubicActionOut());
        let jumpDown = cc.moveBy(jumpTime, cc.v2(0, -jumpHeight)).easing(cc.easeCubicActionIn());
        this.node.runAction(cc.repeatForever(cc.sequence(jumpUp, jumpDown)));
    },

    onLoad() {
        //随机弹跳效果
        this.jump();
        this.leftFlag = Math.random() > 0.5;
        this.speed = this.minJumpSpeed + Math.random() * (this.maxJumpSpeed - this.minJumpSpeed);
    },

    start () {

    },

    update(dt) {
        //check消除
        if (false) {
            this.node.destroy();
        }
        this.node.x += (this.leftFlag ? -1 : 1) * dt * this.speed;
        if (this.node.x > this.node.parent.width / 2) {
            this.leftFlag = !this.leftFlag;
            this.node.x = this.node.parent.width / 2;
        } else if (this.node.x < -this.node.parent.width / 2) {
            this.leftFlag = !this.leftFlag;
            this.node.x = -this.node.parent.width / 2;
        }
    },

    onCollisionEnter(other, self) {
        if (other.node.name === 'man') {
            this.node.parent.getComponent('game').gameover();
        } else {
            this.node.parent.getComponent('game').monsterCreateInterval -= 0.1;
            this.node.destroy();
        }
    },
});
