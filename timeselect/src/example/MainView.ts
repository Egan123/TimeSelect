class MainView extends skins.MainViewPanel {
	private startDayScroll: ScorllSelect;
	private endDayScroll: ScorllSelect;
	private startTimeScroll: ScorllSelect;
	private endTimeScroll: ScorllSelect;

	public constructor() {
		super();

		this.listStartDay.itemRenderer = SelectItemRender;
		this.listEndDay.itemRenderer = SelectItemRender;
		this.listStartTime.itemRenderer = SelectItemRender;
		this.listEndTime.itemRenderer = SelectItemRender;

		this.startDayScroll = new ScorllSelect(this.scoolStartDay, this.groupStartDay, this.listStartDay, 31);
		this.endDayScroll = new ScorllSelect(this.scoolEndDay, this.groupEndDay, this.listEndDay, 31);
		this.startTimeScroll = new ScorllSelect(this.scoolStartTime, this.groupStartTime, this.listStartTime, 24);
		this.endTimeScroll = new ScorllSelect(this.scoolEndTime, this.groupEndTime, this.listEndTime, 24);

		this.initDayData(this.startDayScroll, "2018-12-31 12:51:21");
		this.initTimeData(this.startTimeScroll);
		this.initDayData(this.endDayScroll, "2018-12-31 12:51:21");
		this.initTimeData(this.endTimeScroll);
	}

	public initTimeData(scroll: ScorllSelect): void {
            if (!scroll.selectData) {
                scroll.selectData = [];
                scroll.addEmptyData(2);
                for (let i = 0; i < scroll.totalCount; i++) {
                    let dayData: SelectItemData = new SelectItemData();
                    dayData.itemIndex = i;
                    let time: string = i < 10 ? ("0" + i + ":00") : (i + ":00");
                    dayData.text = time;
                    dayData.data = time + ":00";

                    scroll.selectData.push(dayData);
                }
                scroll.addEmptyData(2);

                scroll.updateInitIndex(2);
                scroll.updateDataSelect();
            }
        }

	public initDayData(scroll: ScorllSelect, endTime: string): void {
            if (!scroll.selectData) {
                scroll.selectData = [];
                endTime = endTime.replace(/\-/g, "/");//ios不支持"2016-06-07 12:51:21"格式
                let endDate = new Date(endTime).getTime();
                scroll.addEmptyData(2);
                for (let i = 0; i < scroll.totalCount; i++) {
                    let dayData: SelectItemData = new SelectItemData();
                    let dayTime: number = endDate - i * 24 * 60 * 60 * 1000;
                    let date: Date = new Date(dayTime);
                    let dayMonth: number = date.getMonth() + 1;
                    let dayDate: number = date.getDate();
                    dayData.itemIndex = i;
                    dayData.text = dayMonth + "月" + dayDate + "日";
                    dayData.data = date.getFullYear() + "-" + (dayMonth < 10 ? "0" + dayMonth : dayMonth) + "-" + (dayDate < 10 ? "0" + dayDate : dayDate);

                    scroll.selectData.push(dayData);
                }
                scroll.addEmptyData(2);

                scroll.updateInitIndex(1);
                scroll.updateDataSelect();
            }
        }
}

class ScorllSelect {
	private startV: number = 5;
	private spaceV: number = 40 + 32;
	private selectIndex: number = 0;
	private _scroll: eui.Scroller;
	private _group: eui.Group;
	private _list: eui.List;
	private listDataArr: eui.ArrayCollection;

	public totalCount = 3;
	public selectData: SelectItemData[] = null;

	public constructor(scrollS: eui.Scroller, groupS: eui.Group, listS: eui.List, totalCount: number) {
		this._scroll = scrollS;
		this._group = groupS;
		this._list = listS;
		this.totalCount = totalCount;

		this.listDataArr = new eui.ArrayCollection();
		this._list.dataProvider = this.listDataArr;
		this._scroll.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
		this._scroll.addEventListener(eui.UIEvent.CHANGE_END, this.onChangeEnd, this);
	}

	private onChangeEnd(e: eui.UIEvent): void {
		this.updateDayScroll(true);
	}

	private onChange(e: eui.UIEvent): void {
		this.updateDayScroll();
		this.updateDataSelect();
	}

	private updateDayScroll(end: boolean = false) {
		let curScrollV: number = this._group.scrollV;
		let minScorllV: number = this.startV;
		let maxScorllV: number = this.startV + (this.totalCount - 1) * this.spaceV;
		let endScorllV: number = 0;
		if (curScrollV < minScorllV) {
			this.selectIndex = 0;
			endScorllV = minScorllV;
		}
		else if (curScrollV > maxScorllV) {
			this.selectIndex = this.totalCount - 1;
			endScorllV = maxScorllV;
		}
		else {
			for (let i = 0; i < this.totalCount; i++) {
				let limitScrollV: number = this.startV + i * this.spaceV;
				if (limitScrollV - curScrollV <= this.spaceV / 2) {
					endScorllV = limitScrollV;
					this.selectIndex = i;
				}
			}
		}

		if (end) {
			let self = this;
			egret.Tween.get(this._group)
				.to({ scrollV: endScorllV }, 200)
				.call(function () { self.updateDataSelect(); });
		}
	}

	public updateDataSelect(): void {
		for (let i = 0; i < this.selectData.length; i++) {
			let dayData: SelectItemData = this.selectData[i];
			dayData.itemSIndex = this.selectIndex;
		}

		this.listDataArr.removeAll();
		for (let i = 0; i < this.selectData.length; i++) {
			this.listDataArr.addItem(this.selectData[i]);
		}
	}

	public updateInitIndex(index: number): void {
		this._group.scrollV = this.startV + index * this.spaceV;
		this.updateDayScroll();
		this.selectIndex = index;
	}

	public addEmptyData(count: number): void {
		for (let i = 0; i < count; i++) {
			let dayData: SelectItemData = new SelectItemData();
			dayData.itemIndex = -1;
			dayData.itemSIndex = 1;
			dayData.text = "";
			this.selectData.push(dayData);
		}
	}

	public getCurSeletData(): string {
		let backStr: string = "";
		for (let i = 0; i < this.selectData.length; i++) {
			if (this.selectData[i].itemIndex == this.selectIndex) {
				backStr = this.selectData[i].data;
				break;
			}
		}

		return backStr;
	}

	public getCurSelectText(): string {
		let backStr: string = "";
		for (let i = 0; i < this.selectData.length; i++) {
			if (this.selectData[i].itemIndex == this.selectIndex) {
				backStr = this.selectData[i].text;
				break;
			}
		}

		return backStr;
	}
}

class SelectItemData {
	public text: string;
	public itemIndex: number;
	public itemSIndex: number;
	public data: string;
}