class SelectItemRender extends skins.SelectItemRender {

	protected childrenCreated(): void {

	}

	protected dataChanged(): void {
		let fontSize: number = 32;
		let labelColor: number = 0x931717;

		if (this.data.itemIndex == this.data.itemSIndex) {
			fontSize = 32;
			labelColor = 0x931717;
		} else if (Math.abs(this.data.itemIndex - this.data.itemSIndex) == 1) {
			fontSize = 28;
			labelColor = 0x9d573c;
		} else {
			fontSize = 24;
			labelColor = 0x9d573c;
		}

		this.labText.size = fontSize;
		this.labText.textColor = labelColor;
	}
}