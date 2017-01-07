/**
 * Created by Administrator on 2017/1/3.
 */
/**
 * funciton：让函数减速行驶
 * @param obj 需要移动的节点
 * @param target 移动到地点
 * @param speed  移动的速度的变化率
 */
function slowAnimate(obj,target,speed){
    clearInterval(obj.timer)
    obj.timer=setInterval(function () {
        var leader=obj.offsetLeft;
        var step=(target-leader)/speed;
        step=step>0?Math.ceil(step):Math.floor(step);
        var leader=leader+step;
        obj.style.left=leader+'px';
        if(target===leader){
            clearInterval(obj.timer);
        }
    },15)
}


/**
 * function：匀速动画
 */

function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 10;
        step = leader < target ? step : -step;
        if (Math.abs(target - leader) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        }
    }, 15);
}
/***
 * 注意：不能修改背景颜色
 * @param obj
 * @param json
 * @param fn
 */

//把 任意对象 的 任意数值属性 改变为 任意的目标值
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {//opacity要特殊处理
                //opacity没有单位 参与运算自动转换成数值 所以不用parsetInt
                //取值范围 0-1 0.1 0.33 33 为了让以前的计算公式生效 要扩大100倍
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;//opacity没有单位
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//层级不需要渐变 直接设置即可
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}
//全部属性都到达目标值才能清空
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
