var _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {	
	_Game_Event_setupPageSettings.call(this);
	this._carShown = 0;
};

Game_Event.prototype.carShown = function() {
	if (this._carShown === undefined) this.setupPageSettings.call(this);
	return this._carShown;
};
