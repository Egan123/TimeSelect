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
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        _this.listStartDay.itemRenderer = SelectItemRender;
        _this.listEndDay.itemRenderer = SelectItemRender;
        _this.listStartTime.itemRenderer = SelectItemRender;
        _this.listEndTime.itemRenderer = SelectItemRender;
        _this.startDayScroll = new ScorllSelect(_this.scoolStartDay, _this.groupStartDay, _this.listStartDay, 31);
        _this.endDayScroll = new ScorllSelect(_this.scoolEndDay, _this.groupEndDay, _this.listEndDay, 31);
        _this.startTimeScroll = new ScorllSelect(_this.scoolStartTime, _this.groupStartTime, _this.listStartTime, 24);
        _this.endTimeScroll = new ScorllSelect(_this.scoolEndTime, _this.groupEndTime, _this.listEndTime, 24);
        _this.initDayData(_this.startDayScroll, "2018-12-31 12:51:21");
        _this.initTimeData(_this.startTimeScroll);
        _this.initDayData(_this.endDayScroll, "2018-12-31 12:51:21");
        _this.initTimeData(_this.endTimeScroll);
        return _this;
    }
    MainView.prototype.initTimeData = function (scroll) {
        if (!scroll.selectData) {
            scroll.selectData = [];
            scroll.addEmptyData(2);
            for (var i = 0; i < scroll.totalCount; i++) {
                var dayData = new SelectItemData();
                dayData.itemIndex = i;
                var time = i < 10 ? ("0" + i + ":00") : (i + ":00");
                dayData.text = time;
                dayData.data = time + ":00";
                scroll.selectData.push(dayData);
            }
            scroll.addEmptyData(2);
            scroll.updateInitIndex(2);
            scroll.updateDataSelect();
        }
    };
    MainView.prototype.initDayData = function (scroll, endTime) {
        if (!scroll.selectData) {
            scroll.selectData = [];
            endTime = endTime.replace(/\-/g, "/"); //ios不支持"2016-06-07 12:51:21"格式
            var endDate = new Date(endTime).getTime();
            scroll.addEmptyData(2);
            for (var i = 0; i < scroll.totalCount; i++) {
                var dayData = new SelectItemData();
                var dayTime = endDate - i * 24 * 60 * 60 * 1000;
                var date = new Date(dayTime);
                var dayMonth = date.getMonth() + 1;
                var dayDate = date.getDate();
                dayData.itemIndex = i;
                dayData.text = dayMonth + "月" + dayDate + "日";
                dayData.data = date.getFullYear() + "-" + (dayMonth < 10 ? "0" + dayMonth : dayMonth) + "-" + (dayDate < 10 ? "0" + dayDate : dayDate);
                scroll.selectData.push(dayData);
            }
            scroll.addEmptyData(2);
            scroll.updateInitIndex(1);
            scroll.updateDataSelect();
        }
    };
    return MainView;
}(skins.MainViewPanel));
__reflect(MainView.prototype, "MainView");
var ScorllSelect = (function () {
    function ScorllSelect(scrollS, groupS, listS, totalCount) {
        this.startV = 5;
        this.spaceV = 40 + 32;
        this.selectIndex = 0;
        this.totalCount = 3;
        this.selectData = null;
        this._scroll = scrollS;
        this._group = groupS;
        this._list = listS;
        this.totalCount = totalCount;
        this.listDataArr = new eui.ArrayCollection();
        this._list.dataProvider = this.listDataArr;
        this._scroll.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        this._scroll.addEventListener(eui.UIEvent.CHANGE_END, this.onChangeEnd, this);
    }
    ScorllSelect.prototype.onChangeEnd = function (e) {
        this.updateDayScroll(true);
    };
    ScorllSelect.prototype.onChange = function (e) {
        this.updateDayScroll();
        this.updateDataSelect();
    };
    ScorllSelect.prototype.updateDayScroll = function (end) {
        if (end === void 0) { end = false; }
        var curScrollV = this._group.scrollV;
        var minScorllV = this.startV;
        var maxScorllV = this.startV + (this.totalCount - 1) * this.spaceV;
        var endScorllV = 0;
        if (curScrollV < minScorllV) {
            this.selectIndex = 0;
            endScorllV = minScorllV;
        }
        else if (curScrollV > maxScorllV) {
            this.selectIndex = this.totalCount - 1;
            endScorllV = maxScorllV;
        }
        else {
            for (var i = 0; i < this.totalCount; i++) {
                var limitScrollV = this.startV + i * this.spaceV;
                if (limitScrollV - curScrollV <= this.spaceV / 2) {
                    endScorllV = limitScrollV;
                    this.selectIndex = i;
                }
            }
        }
        if (end) {
            var self_1 = this;
            egret.Tween.get(this._group)
                .to({ scrollV: endScorllV }, 200)
                .call(function () { self_1.updateDataSelect(); });
        }
    };
    ScorllSelect.prototype.updateDataSelect = function () {
        for (var i = 0; i < this.selectData.length; i++) {
            var dayData = this.selectData[i];
            dayData.itemSIndex = this.selectIndex;
        }
        this.listDataArr.removeAll();
        for (var i = 0; i < this.selectData.length; i++) {
            this.listDataArr.addItem(this.selectData[i]);
        }
    };
    ScorllSelect.prototype.updateInitIndex = function (index) {
        this._group.scrollV = this.startV + index * this.spaceV;
        this.updateDayScroll();
        this.selectIndex = index;
    };
    ScorllSelect.prototype.addEmptyData = function (count) {
        for (var i = 0; i < count; i++) {
            var dayData = new SelectItemData();
            dayData.itemIndex = -1;
            dayData.itemSIndex = 1;
            dayData.text = "";
            this.selectData.push(dayData);
        }
    };
    ScorllSelect.prototype.getCurSeletData = function () {
        var backStr = "";
        for (var i = 0; i < this.selectData.length; i++) {
            if (this.selectData[i].itemIndex == this.selectIndex) {
                backStr = this.selectData[i].data;
                break;
            }
        }
        return backStr;
    };
    ScorllSelect.prototype.getCurSelectText = function () {
        var backStr = "";
        for (var i = 0; i < this.selectData.length; i++) {
            if (this.selectData[i].itemIndex == this.selectIndex) {
                backStr = this.selectData[i].text;
                break;
            }
        }
        return backStr;
    };
    return ScorllSelect;
}());
__reflect(ScorllSelect.prototype, "ScorllSelect");
var SelectItemData = (function () {
    function SelectItemData() {
    }
    return SelectItemData;
}());
__reflect(SelectItemData.prototype, "SelectItemData");
//# sourceMappingURL=MainView.js.map