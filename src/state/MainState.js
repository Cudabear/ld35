MainState = function(){ }

MainState.prototype = {
    level: null,
    cursorKeys: null,

    preload: function(){
        console.log('preload main state');
    },

    create: function(){
        //remove this line if not using lighting effects
        //game.plugins.add(Phaser.Plugin.PhaserIlluminated);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 100;
        game.physics.p2.setImpactEvents(true);
        game.time.advancedTiming = true;
        
        var bmd = game.add.bitmapData(8, 8);
        bmd.context.fillStyle = '#FFFFFF';
        bmd.context.fillRect(0, 0, 8, 8);
        bmd.dirty = true;
        game.cache.addBitmapData('dot', bmd);

        var bmdCrateTest = game.add.bitmapData(64, 64);
        bmdCrateTest.context.fillStyle = "#FFFFFF";
        bmdCrateTest.context.fillRect(0, 0, 64, 64);
        bmdCrateTest.dirty = true;
        game.cache.addBitmapData('blockTest', bmdCrateTest);

        //just draw all the water on one bmd across the whole world
        var bmdWater = game.add.bitmapData(10000, game.height);
        bmdWater.context.fillStyle = "rgba(0, 0, 255, 0.5)";
        bmdWater.dirty = true;
        game.cache.addBitmapData('water', bmdWater);
        var waterSprite = game.add.sprite(0, 0, bmdWater);

        var bmdLeverTest = game.add.bitmapData(48, 64);
        bmdLeverTest.context.fillStyle = "#FFFF00";
        bmdLeverTest.context.fillRect(0, 0, 48, 64);
        bmdLeverTest.dirty = true;
        game.cache.addBitmapData('leverTest', bmdLeverTest);

        var bmdPlatformTest = game.add.bitmapData(32, 32);
        bmdPlatformTest.context.fillStyle = "#FFFFFF";
        bmdPlatformTest.context.fillRect(0, 0, 32, 32);
        bmdPlatformTest.dirty = true;
        game.cache.addBitmapData('platformTest', bmdPlatformTest);

        var bmdPlateTest = game.add.bitmapData(48, 16);
        bmdPlateTest.context.fillStyle = "#FFFFFF";
        bmdPlateTest.context.fillRect(0, 0, 48, 16);
        bmdPlateTest.dirty = true;
        game.cache.addBitmapData('plateTest', bmdPlateTest);

        this.level = new Level();
        this.cursorKeys = game.input.keyboard.createCursorKeys();


        
    },

    update: function(){
        this.level.update();
    },

    render: function(){
        game.debug.text(game.time.fps || '--', 2, 14, '#00ff00');
    }
}