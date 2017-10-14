/*:
@plugindesc This plugin can add size to event so it can become large event. also add extra trigger coordinate.
<EST_EVENT_SIZE_AND_TRIGGERS>
@author Estriole

@help
 ■ Information      ╒══════════════════════════╛
 EST - Event Size And Trigger
 Version: 1.5
 By Estriole Edited by Dahlys
 File name: EST_Event_Size_And_Trigger.js

 ■ Introduction     ╒══════════════════════════╛
    This script can give Size to event. Event size is not passable by player. the size adding method
 also have lots of freedom. for example we can add 2 tiles up, 1 tiles left, 1 tiles rigth.
 There's also extra trigger feature. which add another coordinate where we can activate that event.
 you could also make every event size can activate the event.

 ■ Features         ╒══════════════════════════╛
 - Event Size (LARGE EVENT !!!)
 - Extra Fix Size => fixed coordinate on map where you want to become size
 - Extra Dynamic Size => dynamic coordinate on map based on event xy where you want to become size
 - Extra Fix Trigger => fixed coordinate on map where you can activate the event.
 - Extra Dynamic Trigger => dynamic coordinate on map based on event xy where you can activate the event.

 ■ Changelog       ╒══════════════════════════╛
   v1.0 2015.11.02           Initial Release
   v1.1 2015.11.09           - more code tweak...
                             - added temporary compatibility patch with Galenmereth MouseSystem Ex
                             hopefully in his next update he add the feature i requested so i don't
                             need overwrite and just use alias.
                             - improved code to make it flow with EST - BUILD AND DECOR EX plugin
   v1.2 2015.11.10           - changed compatibility patch for Galenmereth MouseSystem Ex.
                             since he add the feature i requested... i can use alias now.
   v1.3 2015.11.10           - fix compatibility patch for Galenmereth MouseSystem Ex.
                             which will crash if that script not installed.
                             - fix dependency to Yanfly Core.
                             (i create the plugins with Yanfly Core active. and didn't realize it fix MV bugs)
                             now it should be ok without yanfly core. (i advise still using his core though
                             it have many other bugfixes)
   v1.4 2015.12.27           - fix compatibility patch for Galenmereth MouseSystem Ex to work with newest version
   v1.5 2017.10.12           - Dahlys fixed event-large event and large event-large event collision bug.

 ■ Plugin Download ╒══════════════════════════╛
  https://www.dropbox.com/s/nn8ls35s9mkr9ag/EST_Event_Size_And_Trigger.js?dl=0  

 ■ How to use       ╒══════════════════════════╛
 1) Give Event Size:
      place COMMENT tag on event page:
        <event_size: top left right down>
        example
        <event_size: 2 2 2 0>

        will add size 2 tiles up, 2 tiles left, 2 tiles right.
          XXXXX
          XXXXX
          xxOxx     x = size, O = event position

 2) beside above method you can Add Extra Size in case you have different shape of event graphic beside
 rectangular... there's two method. first is FIXED coordinate. second is DYNAMIC coordinate;
    -> Fixed Coordinate (static coordinate):
    give comment tag

          <extra_fix_size: [x1,y1]; [x2,y2]; [x3,y3]; [x4,y4];.......>
   
    every coordinate (array) MUST be separated by ;
    example:
    <extra_fix_size: [10,4]; [3,5]; [2,1]; [3,4]>
    will add extra size on coordinate above.

    -> Dynamic Coordinate (array) (based on event position. example event x +10, etc):
    give comment tag

          <extra_dynamic_size: [x1,y1]; [x2,y2]; [x3,y3]; [x4,y4];.......>

    every coordinate (array) MUST be separated by ;
    example:
    <extra_dynamic_size: [1,3]; [-1,4]; [1,2]; [3,4]>
    will add extra sizes in coordinate event x + dynamic size above...

 3) we can make every event SIZE can also trigger the event...
 give comment tag <size_trigger>

 4) number 3 not enough... ??? you can also add Extra Fix Trigger and Extra Dynamic Trigger
   -> Fixed Coordinate (static coordinate):
    give comment tag

         <extra_fix_trigger: [x1,y1]; [x2,y2]; [x3,y3]; [x4,y4];.......>
   
    every coordinate (array) MUST be separated by ;
    example:
    <extra_fix_trigger: [10,4]; [3,5]; [2,1]; [3,4]>
    will make we can trigger that event in 10, 4 coordinate, etc.

    -> Dynamic Coordinate (array) (based on event position. example event x +10, etc):
    give comment tag
          
          <extra_dynamic_trigger: [x1,y1]; [x2,y2]; [x3,y3]; [x4,y4];.......>
    
    every coordinate (array) MUST be separated by ;
    example:
    <extra_dynamic_trigger: [1,3]; [-1,4]; [1,2]; [3,4]>
    will make we can trigger that event in  EVENT x & y position + coordinate above.
 
 ■ Dependencies     ╒══════════════════════════╛
 None

 ■ Compatibility    ╒══════════════════════════╛
 I'm new in JS... and MV is new engine... so i cannot say for sure. 
 but it should be compatible with most things. 

 ■ Parameters       ╒══════════════════════════╛
 None

 ■ License          ╒══════════════════════════╛
 Free to use in all project (except the one containing pornography)
 as long as i credited (ESTRIOLE). 

 ■ Support          ╒══════════════════════════╛
 While I'm flattered and I'm glad that people have been sharing and 
 asking support for scripts in other RPG Maker communities, I would 
 like to ask that you please avoid posting my scripts outside of where 
 I frequent because it would make finding support and fixing bugs 
 difficult for both of you and me.
   
 If you're ever looking for support, I can be reached at the following:
 [ http://forums.rpgmakerweb.com/ ]
 pm me : estriole

 ■ Author's Notes   ╒══════════════════════════╛
 This is part of the EST - DECOR AND BUILD SERIES.
*/

var EST = EST || {};
EST.Event_Size = EST.Event_Size || {};
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		DAHLYS ADDITION: ADD VARIABLES TO EST EVENT SIZE AND TRIGGER
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	var _Game_Event_initialize = Game_Event.prototype.initialize;
	Game_Event.prototype.initialize = function(mapId, eventId) {
		_Game_Event_initialize.call(this, mapId, eventId);
		this._isLargeEvent = false;
		this._largeEventTop = 0;		
		this._largeEventLeft = 0;
		this._largeEventRight = 0;
		this._largeEventDown = 0;
	};

	Game_Event.prototype.isLargeEvent = function() {
		if (this._isLargeEvent === undefined) Game_Event.prototype.initialize.call(this, mapId, eventId);
		return this._isLargeEvent;
	};

	Game_Event.prototype.largeEventTop = function() {
		if (this._largeEventTop === undefined) Game_Event.prototype.initialize.call(this, mapId, eventId);
		return this._largeEventTop;
	};

	Game_Event.prototype.largeEventLeft = function() {
		if (this._largeEventLeft === undefined) Game_Event.prototype.initialize.call(this, mapId, eventId);
		return this._largeEventLeft;
	};

	Game_Event.prototype.largeEventRight = function() {
		if (this._largeEventRight === undefined) Game_Event.prototype.initialize.call(this, mapId, eventId);
		return this._largeEventRight;
	};

	Game_Event.prototype.largeEventDown = function() {
		if (this._largeEventDown === undefined) Game_Event.prototype.initialize.call(this, mapId, eventId);
		return this._largeEventDown;
	};

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		BACK TO ORIGINAL
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
// alias method. this will create variable in game system to store the resaved map events
var est_event_size_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  est_event_size_Game_System_initialize.call(this);
  this._est_custom_passage_map = {};
};

// new method. this will check event size exist in [x,y] or not.
// smart search which will recognize if it's OWN size
Game_CharacterBase.prototype.check_events_size = function(x,y) {	
  $gameSystem._est_custom_passage_map[$gameMap._mapId] = $gameSystem._est_custom_passage_map[$gameMap._mapId] || {};
  var size_data = $gameSystem._est_custom_passage_map[$gameMap._mapId];  
  chkarray = JSON.stringify([x,y]);
    for (var evId in size_data)
    {
      if (this._eventId === undefined) var chkownsize = false;
      if (this._eventId != undefined) var chkownsize = (JSON.stringify(this._eventId) == evId);
      if (size_data[evId].indexOf(chkarray) >= 0 && !chkownsize) return true;
    }
  return false;
};

// alias method to check does [x,y] is having size.
var est_event_size_Game_CharacterBase_isCollidedWithEvents = Game_CharacterBase.prototype.isCollidedWithEvents;
Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
  var chk = est_event_size_Game_Event_isCollidedWithEvents.call(this, x, y);
  var chk2 = this.check_events_size(x,y);
  return chk || chk2;
};

//if yanfly core not imported... put the bugfix here.
var Yanfly = Yanfly || {};
if(!Yanfly.Core)
{
  Game_Event.prototype.isCollidedWithEvents = function(x, y) {
    var events = $gameMap.eventsXyNt(x, y).filter(function(ev) {
      return ev.isNormalPriority();
   });
   if (events.length <= 0) return false;
   return this.isNormalPriority();
  };
}
// alias method to check does [x,y] is having size... Game_Event overwriting it's super function
// so i cannot just alias Game_CharacterBase since it will be overwritten by code in Game_Event
var est_event_size_Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents
Game_Event.prototype.isCollidedWithEvents = function(x, y) {
  var chk = est_event_size_Game_CharacterBase_isCollidedWithEvents.call(this, x, y);
  var chk2 = this.check_events_size(x,y);
  var chk3 = this.isCollidedWithSelf(x,y);
  return (chk || chk2) && !chk3;
};

// New method to check if the event size is hitting self coordinate
Game_Event.prototype.isCollidedWithSelf = function(x, y) {
    var events = $gameMap.eventsXyNt(x, y);
    chk = true;
    events.forEach(function(ev){
      if(ev._eventId != this._eventId) chk = false;
    },this);
    return chk;
};

// new method to block passability in certain map, [x,y] and make the key as event id.
Game_Map.prototype.block_passability = function(mapId, evId, x, y) {
  var passage_map = $gameSystem._est_custom_passage_map;
  passage_map[mapId] = passage_map[mapId] || {};
  passage_map[mapId][evId] = passage_map[mapId][evId] || [];
  passage_map[mapId][evId].push(JSON.stringify([x,y]));
};

// delete all passability blocking created by block_passability based on key as event id, 
Game_Map.prototype.open_passability = function(mapId, evId) {
  var passage_map = $gameSystem._est_custom_passage_map;
  passage_map[mapId] = passage_map[mapId] || {};
  passage_map[mapId][evId] = [];
};

// new method to add size to event. size can customized based on
// how many tiles up, how many tiles left, how many tiles right, how many tiles down.
// and it will form a rectangle.
Game_Event.prototype.add_size = function(mapId, evId, top, left, right, down) {
  if (top < 1 && left < 1 && right < 1 && down < 1) return;
  //DAHLYS ADDITION: if size added, self switch isLargeEvent is turned on
  this._isLargeEvent = true;
  var event_x = this.x;
  var event_y = this.y;
  if (top>0) 
    for (var i = 1;i <= top; i++) 
      $gameMap.block_passability(mapId, evId, event_x, event_y - i);
  if (down>0) 
    for (var i = 1; i <= down; i++) 
      $gameMap.block_passability(mapId, evId, event_x, event_y + i);  
  if (left>0)
  {
    for (var i = 1; i <= left; i++) 
      $gameMap.block_passability(mapId, evId, event_x - i, event_y);
    if (top>0)
      for (var i = 1; i <= left; i++) for (var j = 1; j <= top; j++) 
        $gameMap.block_passability(mapId, evId, event_x - i, event_y - j);
    if (down>0)
      for (var i = 1; i <= left; i++) for (var j = 1; j <= down; j++) 
        $gameMap.block_passability(mapId, evId, event_x - i, event_y + j);
  }

  if (right>0)
  {
    for (var i = 1; i <= right; i++) 
      $gameMap.block_passability(mapId, evId, event_x + i, event_y);
    if (top>0)
      for (var i = 1; i <= right; i++) for (var j = 1; j <= top; j++) 
        $gameMap.block_passability(mapId, evId, event_x + i, event_y - j);
    if (down>0)
      for (var i = 1; i <= right; i++) for (var j = 1; j <= down; j++) 
        $gameMap.block_passability(mapId, evId, event_x + i, event_y + j);
  }
};

// new method to read comment tag <event_size: xxxxxx>
Game_Event.prototype.get_event_size = function() {
  var size = null;
  var comment = "";
  if(!this.page()) return size;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 108)   comment += cmd.parameters[0] + "\n";
    if(cmd.code == 408)   comment += cmd.parameters[0] + "\n";
  }
  if(comment.match(/<event_size:\s*((.|\n|\r)*?)>/im)) var size = comment.match(/<event_size:\s*((.|\n|\r)*?)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+)/);
  return size;
};

// new method to set all event size and trigger
Game_Event.prototype.set_event_size_and_trigger = function() {
  if (!this.page()) return;
  var size = this.get_event_size();
  var ex_fix_size = this.getExtraFixSize();
  var ex_dyna_size = this.getExtraDynamicSize();
  $gameMap.open_passability($gameMap._mapId, this._eventId);
  if (size){	  
  var top = size[0] ? Number(size[0]) : 0;
  var left = size[1] ? Number(size[1]) : 0;
  var right = size[2] ? Number(size[2]) : 0;
  var down = size[3] ? Number(size[3]) : 0;
	//DAHLYS ADDITION: store size into new event self variables
	this._largeEventTop = top;
	this._largeEventLeft = left;
	this._largeEventRight = right;
	this._largeEventDown = down;
  this.add_size($gameMap._mapId, this._eventId, top, left, right, down);
  }
  if (JSON.stringify(ex_fix_size)!="[]")
    for(var xfsize of ex_fix_size)
      $gameMap.block_passability($gameMap._mapId, this._eventId, xfsize[0], xfsize[1]);
  if (JSON.stringify(ex_dyna_size)!="[]")
    for(var xdsize of ex_dyna_size)
      $gameMap.block_passability($gameMap._mapId, this._eventId, this.x + xdsize[0], this.y + xdsize[1]);
};

// alias method to make when the page is setup. set all the size and trigger
var est_event_size_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings
Game_Event.prototype.setupPageSettings = function() {
  est_event_size_Game_Event_setupPageSettings.call(this);
  this.set_event_size_and_trigger();
};

// alias method to make when event move it will reapply size. (the size will move too)
var est_event_size_Game_Event_moveStraight = Game_Event.prototype.moveStraight
Game_Event.prototype.moveStraight = function(d) {
  est_event_size_Game_Event_moveStraight.call(this,d);
  this.set_event_size_and_trigger();  
};

// alias method to make when event move diagonally it will reapply size. (the size will move too)
var est_event_size_Game_Event_moveDiagonally = Game_Event.prototype.moveDiagonally
Game_Event.prototype.moveDiagonally = function(horz, vert) {
  est_event_size_Game_Event_moveDiagonally.call(this,horz,vert);
  this.set_event_size_and_trigger();    
};

// alias method to make when event jump it will reapply size. (the size will move too)
var est_event_size_Game_Event_jump = Game_Event.prototype.jump
Game_Event.prototype.jump = function(xPlus, yPlus) {
  est_event_size_Game_Event_jump.call(this,xPlus,yPlus);
  this.set_event_size_and_trigger();    
};

// comment tag grabber for extra event fix size
Game_Event.prototype.getExtraFixSize = function() {
  var container = [];
  var size = null;
  var comment = "";
  if(!this.page()) return container;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 108)   comment += cmd.parameters[0] + "\n";
    if(cmd.code == 408)   comment += cmd.parameters[0] + "\n";
  }
  if(comment.match(/<extra_fix_size:\s*((.|\n|\r)*?)>/im)) 
  {
    var size = comment.match(/<extra_fix_size:\s*((.|\n|\r)*?)>/im)[1].split(/;/);
    for (var fs of size) {
      try{ container.push(JSON.parse(fs));}
      catch(err){}; 
      //so if you do some mistake like double ; or ending with ;.. it will be fine
    }
  }
  return container;
};

// comment tag grabber for extra event dynamic size
Game_Event.prototype.getExtraDynamicSize = function() {
  var container = [];
  var size = null;
  var comment = "";
  if(!this.page()) return container;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 108)   comment += cmd.parameters[0] + "\n";
    if(cmd.code == 408)   comment += cmd.parameters[0] + "\n";
  }
  if(comment.match(/<extra_dynamic_size:\s*((.|\n|\r)*?)>/im)) 
  {
    var size = comment.match(/<extra_dynamic_size:\s*((.|\n|\r)*?)>/im)[1].split(/;/);
    for (var fs of size) {
      try{ container.push(JSON.parse(fs));}
      catch(err){}; //so if you do some mistake like double ; or ending with ;.. it will be fine
    }
  }
  return container;
};

// DAHLYS EDIT, IMPROVED EFFICIENCY USING THIS SELF VARIABLES
var est_event_size_Game_Event_canPass = Game_Event.prototype.canPass
Game_Event.prototype.canPass = function(x, y, d) {
	if (d === 2) {			
			var canPassCheck = this._largeEventDown;
		} else if (d === 4) {
			var canPassCheck = this._largeEventLeft;
		} else if (d === 6) {
			var canPassCheck = this._largeEventRight;
		} else if (d === 8) {
			var canPassCheck = this._largeEventTop;
		} else {
			var canPassCheck = 0;
		}
		//move front of this event forward by event size
		for (var i = 0; i < canPassCheck; i++) {
			x = $gameMap.roundXWithDirection(x, d);
			y = $gameMap.roundYWithDirection(y, d);	
		}
		//check default canPass tile in front
		var chk1 = est_event_size_Game_Event_canPass.call(this, x, y, d);
		//move to tile in front and check if there's a large event there
		x = $gameMap.roundXWithDirection(x, d);
		y = $gameMap.roundYWithDirection(y, d);	
		var chk2 = this.check_events_size(x, y);
		return chk1 && !chk2;
};

//  ============================== trigger part ===============================

// notetag to getExtraFixTrigger 
Game_Event.prototype.getExtraFixTrigger = function() {
  var container = [];
  var size = null;
  var comment = "";
  if(!this.page()) return container;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 108)   comment += cmd.parameters[0] + "\n";
    if(cmd.code == 408)   comment += cmd.parameters[0] + "\n";
  }
  if(comment.match(/<extra_fix_trigger:\s*((.|\n|\r)*?)>/im)) 
  {
    var size = comment.match(/<extra_fix_trigger:\s*((.|\n|\r)*?)>/im)[1].split(/;/);
    for (var fs of size) {
      try{ container.push(JSON.parse(fs));}
      catch(err){}; 
      //so if you do some mistake like double ; or ending with ;.. it will be fine
    }
  }
  return container;
};


// notetag to getExtraDynamicTrigger 
Game_Event.prototype.getExtraDynamicTrigger = function() {
  var container = [];
  var size = null;
  var comment = "";
  if(!this.page()) return container;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 108)   comment += cmd.parameters[0] + "\n";
    if(cmd.code == 408)   comment += cmd.parameters[0] + "\n";
  }
  if(comment.match(/<extra_dynamic_trigger:\s*((.|\n|\r)*?)>/im)) 
  {
    var size = comment.match(/<extra_dynamic_trigger:\s*((.|\n|\r)*?)>/im)[1].split(/;/);
    for (var fs of size) {
      try{ container.push(JSON.parse(fs));}
      catch(err){}; //so if you do some mistake like double ; or ending with ;.. it will be fine
    }
  }
  return container;
};

// notetags to mark the event size can trigger event
Game_Event.prototype.size_trigger = function() {
  var comment = "";
  if(!this.page()) return false;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 108)   comment += cmd.parameters[0] + "\n";
    if(cmd.code == 408)   comment += cmd.parameters[0] + "\n";
  }
  if(comment.match(/<size_trigger>/im)) return true;
  return false;
};

// alias method to check map event based on extra trigger
var est_event_size_Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
  est_event_size_Game_Player_startMapEvent.call(this, x, y, triggers, normal);
  var Extra_Trigger = [];
  var passage_map = [];
  $gameMap.events().forEach(function(ev){
    Extra_Trigger = [];
    passage_map = $gameSystem._est_custom_passage_map[$gameMap._mapId][ev._eventId]
    if(ev.size_trigger() && passage_map != undefined && JSON.stringify(passage_map) != []) 
      for(sz of passage_map) Extra_Trigger.push(JSON.parse(sz));
    if(JSON.stringify(ev.getExtraFixTrigger()) != []) 
      for(ft of ev.getExtraFixTrigger()) Extra_Trigger.push(ft);
    if(JSON.stringify(ev.getExtraDynamicTrigger()) != []) 
      for(ft of ev.getExtraDynamicTrigger()) Extra_Trigger.push([ev.x+ft[0],ev.x+ft[1]]);
    if(ev.isTriggerIn(triggers) && ev.isNormalPriority() === normal)
      for (var trg in Extra_Trigger)
        if (JSON.stringify(Extra_Trigger[trg]) == JSON.stringify([x,y])) 
          if(!ev._starting) ev.start();
  });
};


Game_Map.prototype.check_events_trigger = function(x, y) {  
  var Extra_Trigger = [];
  var passage_map = [];
  var event_list = [];
  $gameMap.events().forEach(function(ev){
    Extra_Trigger = [];
    passage_map = $gameSystem._est_custom_passage_map[$gameMap._mapId][ev._eventId]
    if(ev.size_trigger() && passage_map != undefined && JSON.stringify(passage_map) != []) 
      for(sz of passage_map) Extra_Trigger.push(JSON.parse(sz));
    if(JSON.stringify(ev.getExtraFixTrigger()) != []) 
      for(ft of ev.getExtraFixTrigger()) Extra_Trigger.push(ft);
    if(JSON.stringify(ev.getExtraDynamicTrigger()) != []) 
      for(ft of ev.getExtraDynamicTrigger()) Extra_Trigger.push([ev.x+ft[0],ev.x+ft[1]]);
    for (var trg in Extra_Trigger)
      if (JSON.stringify(Extra_Trigger[trg]) == JSON.stringify([x,y])) event_list.push(ev);
  });
  return event_list;
};


//PATCH FOR TDDP MOUSE SYSTEM EX
if (typeof TDDP_MouseSystemEx !== 'undefined')
{
  var est_event_size_tddp_mousesystemex_eventxy = TDDP_MouseSystemEx._eventsXy;  
  TDDP_MouseSystemEx._eventsXy = function(x, y)
  {
    var _events = est_event_size_tddp_mousesystemex_eventxy(x,y);
    var _xtrigger = $gameMap.check_events_trigger(x,y);
    _xtrigger.forEach(function(ev){
      if (_events.indexOf(ev) < 0) _events.push(ev);  
    }); // end _xtrigger foreach
    return _events;
  }
}
