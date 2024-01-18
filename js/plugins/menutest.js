var parameters = PluginManager.parameters('menutest');

Game_Interpreter.prototype.setupPhone = function() {
  Input.keyMapper[69] = "chat";
};

var Scene_Map_updateScene = Scene_Map.prototype.updateScene 
Scene_Map.prototype.updateScene = function() {
Scene_Map_updateScene.call(this) 
    if (!SceneManager.isSceneChanging()) {
        this.updateCallChat() 
    }
};

Scene_Map.prototype.updateCallChat = function() {
  if ( Input.isTriggered("chat") ) {    
    SceneManager.push(Scene_MenuCustom); 
  };
};

function Scene_MenuCustom() {
    this.initialize.apply(this, arguments);
}

//=============================================================================
// ** Scene_Menu
//-----------------------------------------------------------------------------
// The scene class of the menu screen.
//=============================================================================
// * Object Initialization
//=============================================================================

Scene_MenuCustom.prototype = Object.create(Scene_Base.prototype);
Scene_MenuCustom.prototype.constructor = Scene_MenuCustom;

Scene_MenuCustom.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};  

Scene_MenuCustom.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
}

//=============================================================================
// * Create
//=============================================================================
Scene_MenuCustom.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createQuestWindows();
};

Scene_MenuCustom.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
};

Scene_MenuCustom.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
};

Scene_MenuCustom.prototype.createQuestWindows = function() {
    // Create Quest Header Window
    this._questHeaderWindow = new Window_testing()
    this.addChild(this._questHeaderWindow);
    this._questTypesWindows = new Window_OmoriQuestType();
    this._questTypesWindows.y = this._questHeaderWindow.y + this._questHeaderWindow.height + 2;
    this._questTypesWindows.setHandler('ok', this.onQuestTypesOk.bind(this));
    this._questTypesWindows.setHandler('cancel', this.popScene.bind(this));
    this.addChild(this._questTypesWindows);
};

Scene_MenuCustom.prototype.onQuestTypesOk = function() {
    this._questListWindow.select(0);
    this._questListWindow.activate();
  };

Scene_MenuCustom.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
  };

//=============================================================================
// ** Window_testing
//-----------------------------------------------------------------------------
// This window displays the quest list header.
//=============================================================================
function Window_testing() { this.initialize.apply(this, arguments); }
Window_testing.prototype = Object.create(Window_Base.prototype);
Window_testing.prototype.constructor = Window_testing;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_testing.prototype.initialize = function() {
  // Super Call
  Window_Base.prototype.initialize.call(this, 12, 12, this.windowWidth(), this.windowHeight());
  // // Close Window
  // this.openness = 0;
  // Draw Contents
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_testing.prototype.standardPadding = function() { return 0; };
Window_testing.prototype.windowWidth = function() { return 164; };
Window_testing.prototype.windowHeight = function() { return 44; };
//=============================================================================
// * Refresh
//=============================================================================
Window_testing.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // Draw Header
  this.contents.drawText(LanguageManager.getPluginText('phone', 'header'), 0, -6, this.contents.width, this.contents.height, 'center');
};

//=============================================================================
// ** Window_OmoriQuestTypes
//-----------------------------------------------------------------------------
// This window displays quest types (Completed, Incomplete).
//=============================================================================
function Window_OmoriQuestType() { this.initialize.apply(this, arguments); }
Window_OmoriQuestType.prototype = Object.create(Window_Command.prototype);
Window_OmoriQuestType.prototype.constructor = Window_OmoriQuestType;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriQuestType.prototype.initialize = function() {
    this.clearCommandList();
    Window_Command.prototype.initialize.call(this, 12, 0, 0, 0);
    this.activate();
    this.select(0);
};
//=============================================================================
// * Settings
//=============================================================================
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriQuestType.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoriQuestType.prototype.standardPadding = function() { return 8; };
Window_OmoriQuestType.prototype.customCursorRectTextXOffset = function() { return 35; };
Window_OmoriQuestType.prototype.customCursorRectXOffset = function() { return 10;  };
Window_OmoriQuestType.prototype.lineHeight = function() { return 28; };
Window_OmoriQuestType.prototype.standardFontSize = function() { return 24; };

Window_OmoriQuestType.prototype.makeCommandList = function() {
  if ($gameVariables.value(2017) >= 3) {this.addCommand('CURRITO'); this.addCommand('SOPHIA'); this.addCommand('XAVIER');}
  else {if ($gameVariables.value(2017) >= 2)  {this.addCommand('CURRITO'); this.addCommand('SOPHIA');} 
  else {if ($gameVariables.value(2017) >= 1)  {this.addCommand('CURRITO');}}}

  };
//=============================================================================
// * Process Cursor Move
//=============================================================================
Window_OmoriQuestType.prototype.processCursorMove = function() {
    // If a message is displaying
    if ($gameMessage.isBusy()) { return;};
    // Run Original Function
    Window_Command.prototype.processCursorMove.call(this);
  };

//=============================================================================
// * Process Handling
//=============================================================================
Window_OmoriQuestType.prototype.processHandling = function() {
    // If a message is displaying
    if ($gameMessage.isBusy()) { return;};
    // Run Original Function
    Window_Command.prototype.processHandling.call(this);
  };
  //=============================================================================
  // * Update Custom Cursor Rect Sprite
  //=============================================================================
  Window_OmoriQuestType.prototype.updateCustomCursorRectSprite = function(sprite, index) {
    // Set Sprite
    sprite = this._customCursorRectSprite;
    // If Custom Rect Sprite Exists
    if (sprite && $gameMessage.isBusy()) {
      // Set Sprite Tone Color
      sprite.setColorTone([-80, -80, -80, 255]);
      // Set Sprite active flag
      sprite._active = false;
      return;
    };
    // Run Original Function
    Window_Command.prototype.updateCustomCursorRectSprite.call(this, sprite, index);
  };