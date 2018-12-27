var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var skins;
(function (skins) {
    var MainViewPanel = (function (_super) {
        __extends(MainViewPanel, _super);
        function MainViewPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = 'MainViewPanelSkin';
            return _this;
        }
        MainViewPanel.prototype.addOnClick = function (callback, thisObj) {
        };
        MainViewPanel.prototype.removeOnClick = function (callback, thisObj) {
        };
        MainViewPanel.prototype.addOnChange = function (callback, thisObj) {
            this.listStartDay.addEventListener(egret.TouchEvent.CHANGE, callback, thisObj);
            this.listStartTime.addEventListener(egret.TouchEvent.CHANGE, callback, thisObj);
            this.listEndDay.addEventListener(egret.TouchEvent.CHANGE, callback, thisObj);
            this.listEndTime.addEventListener(egret.TouchEvent.CHANGE, callback, thisObj);
        };
        MainViewPanel.prototype.removeOnChange = function (callback, thisObj) {
            this.listStartDay.removeEventListener(egret.TouchEvent.CHANGE, callback, thisObj);
            this.listStartTime.removeEventListener(egret.TouchEvent.CHANGE, callback, thisObj);
            this.listEndDay.removeEventListener(egret.TouchEvent.CHANGE, callback, thisObj);
            this.listEndTime.removeEventListener(egret.TouchEvent.CHANGE, callback, thisObj);
        };
        return MainViewPanel;
    }(eui.Component));
    skins.MainViewPanel = MainViewPanel;
    __reflect(MainViewPanel.prototype, "skins.MainViewPanel");
})(skins || (skins = {}));
(function (skins) {
    var SelectItemRender = (function (_super) {
        __extends(SelectItemRender, _super);
        function SelectItemRender() {
            var _this = _super.call(this) || this;
            _this.skinName = 'SelectItemRenderSkin';
            return _this;
        }
        SelectItemRender.prototype.addOnClick = function (callback, thisObj) {
        };
        SelectItemRender.prototype.removeOnClick = function (callback, thisObj) {
        };
        SelectItemRender.prototype.addOnChange = function (callback, thisObj) {
        };
        SelectItemRender.prototype.removeOnChange = function (callback, thisObj) {
        };
        return SelectItemRender;
    }(eui.ItemRenderer));
    skins.SelectItemRender = SelectItemRender;
    __reflect(SelectItemRender.prototype, "skins.SelectItemRender");
})(skins || (skins = {}));
//# sourceMappingURL=ExampleEUISkinMergin.js.map