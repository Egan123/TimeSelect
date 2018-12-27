
module skins{
	export class MainViewPanel extends eui.Component {
		
	public groupSelectData:eui.Group;
	public scoolStartDay:eui.Scroller;
	public groupStartDay:eui.Group;
	public listStartDay:eui.List;
	public scoolStartTime:eui.Scroller;
	public groupStartTime:eui.Group;
	public listStartTime:eui.List;
	public scoolEndDay:eui.Scroller;
	public groupEndDay:eui.Group;
	public listEndDay:eui.List;
	public scoolEndTime:eui.Scroller;
	public groupEndTime:eui.Group;
	public listEndTime:eui.List;

		public constructor() {
			super();
			this.skinName = 'MainViewPanelSkin';
		}
		public addOnClick( callback, thisObj ):void {

		}
		public removeOnClick( callback, thisObj ):void {

		}
		public addOnChange( callback, thisObj ):void {
		this.listStartDay.addEventListener( egret.TouchEvent.CHANGE, callback, thisObj );
		this.listStartTime.addEventListener( egret.TouchEvent.CHANGE, callback, thisObj );
		this.listEndDay.addEventListener( egret.TouchEvent.CHANGE, callback, thisObj );
		this.listEndTime.addEventListener( egret.TouchEvent.CHANGE, callback, thisObj );

		}
		public removeOnChange( callback, thisObj ):void {
		this.listStartDay.removeEventListener( egret.TouchEvent.CHANGE, callback, thisObj );
		this.listStartTime.removeEventListener( egret.TouchEvent.CHANGE, callback, thisObj );
		this.listEndDay.removeEventListener( egret.TouchEvent.CHANGE, callback, thisObj );
		this.listEndTime.removeEventListener( egret.TouchEvent.CHANGE, callback, thisObj );

		}
	}
}
module skins{
	export class SelectItemRender extends eui.ItemRenderer {
		
	public labText:eui.Label;

		public constructor() {
			super();
			this.skinName = 'SelectItemRenderSkin';
		}
		public addOnClick( callback, thisObj ):void {

		}
		public removeOnClick( callback, thisObj ):void {

		}
		public addOnChange( callback, thisObj ):void {

		}
		public removeOnChange( callback, thisObj ):void {

		}
	}
}