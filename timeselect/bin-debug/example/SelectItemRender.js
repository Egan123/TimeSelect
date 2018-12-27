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
var SelectItemRender = (function (_super) {
    __extends(SelectItemRender, _super);
    function SelectItemRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectItemRender.prototype.childrenCreated = function () {
    };
    SelectItemRender.prototype.dataChanged = function () {
        var fontSize = 32;
        var labelColor = 0x931717;
        if (this.data.itemIndex == this.data.itemSIndex) {
            fontSize = 32;
            labelColor = 0x931717;
        }
        else if (Math.abs(this.data.itemIndex - this.data.itemSIndex) == 1) {
            fontSize = 28;
            labelColor = 0x9d573c;
        }
        else {
            fontSize = 24;
            labelColor = 0x9d573c;
        }
        this.labText.size = fontSize;
        this.labText.textColor = labelColor;
    };
    return SelectItemRender;
}(skins.SelectItemRender));
__reflect(SelectItemRender.prototype, "SelectItemRender");
//# sourceMappingURL=SelectItemRender.js.map