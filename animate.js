/**
 * Created by Administrator on 2017/1/3.
 */
/**
 * funciton���ú���������ʻ
 * @param obj ��Ҫ�ƶ��Ľڵ�
 * @param target �ƶ����ص�
 * @param speed  �ƶ����ٶȵı仯��
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
 * function�����ٶ���
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
 * ע�⣺�����޸ı�����ɫ
 * @param obj
 * @param json
 * @param fn
 */

//�� ������� �� ������ֵ���� �ı�Ϊ �����Ŀ��ֵ
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {//opacityҪ���⴦��
                //opacityû�е�λ ���������Զ�ת������ֵ ���Բ���parsetInt
                //ȡֵ��Χ 0-1 0.1 0.33 33 Ϊ������ǰ�ļ��㹫ʽ��Ч Ҫ����100��
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;//opacityû�е�λ
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//�㼶����Ҫ���� ֱ�����ü���
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
//ȫ�����Զ�����Ŀ��ֵ�������
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
