var AutoOrthoCamera=pc.createScript("autoOrthoCamera"),PIXEL_PER_UNIT=100;AutoOrthoCamera.prototype.initialize=function(){this.app.graphicsDevice.on("resizecanvas",this.resize,this),this.resize(this.app.graphicsDevice.width,this.app.graphicsDevice.height),this.app.systems.sprite.defaultMaterial.pixelSnap=!0},AutoOrthoCamera.prototype.resize=function(t,i){this.entity.camera.orthoHeight=i/(2*PIXEL_PER_UNIT);var e=this.entity.getLocalPosition();e.y=this.entity.camera.orthoHeight,this.entity.setLocalPosition(e)};var Player=pc.createScript("player"),WALK_VEL=1500,JUMP_VEL=600;Player.prototype.initialize=function(){this.state="idle",this.direction="left",this.vel=new pc.Vec2,this.falling=!1,this.entity.collision.on("collisionstart",this._colstart,this)},Player.prototype.update=function(t){this.app.keyboard.isPressed(pc.KEY_A)||this.app.keyboard.isPressed(pc.KEY_LEFT)?this.walkLeft():this.app.keyboard.isPressed(pc.KEY_D)||this.app.keyboard.isPressed(pc.KEY_RIGHT)?this.walkRight():this.falling||"damage"==this.state||this.idle(),(this.app.keyboard.wasPressed(pc.KEY_W)||this.app.keyboard.wasPressed(pc.KEY_UP))&&this.jump(),"damage"==this.entity.sprite._currentClip.name&&(this.entity.sprite._currentClip.isPlaying||this.idle())},Player.prototype._colstart=function(t){t.other.tags.has("ground")&&(this.falling=!1,this.idle())},Player.prototype.idle=function(){"idle"!==this.state&&(this.entity.sprite.play("idle"),this.state="idle")},Player.prototype.jump=function(){"jump"!==this.state&&(this.entity.sprite.play("jump"),this.state="jump",this.entity.rigidbody.applyImpulse(0,JUMP_VEL,0),this.falling=!0)},Player.prototype.setDirection=function(t){this.direction=t,this.entity.sprite.flipX="right"===t},Player.prototype.walkLeft=function(){"idle"!==this.state&&"walkright"!==this.state||(this.entity.sprite.play("run"),"left"!==this.direction&&this.setDirection("left"),this.state="walkleft"),"walkleft"!==this.state||this.falling||this.entity.rigidbody.applyForce(-WALK_VEL,0,0)},Player.prototype.walkRight=function(){"idle"!==this.state&&"walkleft"!==this.state||(this.entity.sprite.play("run"),"right"!==this.direction&&this.setDirection("right"),this.state="walkright"),"walkright"!==this.state||this.falling||this.entity.rigidbody.applyForce(WALK_VEL,0,0)},Player.prototype.swap=function(t){this.state=t.state,this.direction=t.direction,this.vel=t.vel,this.falling=t.falling},Player.prototype.damage=function(){this.state="damage",this.entity.sprite.play("damage"),this.entity.rigidbody.applyImpulse(new pc.Vec3("left"==this.direction?-100:100,30,0))};var Fitcolider=pc.createScript("fitcolider");Fitcolider.prototype.initialize=function(){this.scale=this.entity.getLocalScale(),this.width=this.entity.sprite._width,this.newHalfExtents=this.entity.collision.halfExtents.clone(),this.newHalfExtents.x=this.scale.x*this.width/2,this.entity.collision.halfExtents=this.newHalfExtents},Fitcolider.prototype.update=function(t){};var Enemy=pc.createScript("enemy");Enemy.attributes.add("RIGHT_MOVE",{type:"number",default:.01}),Enemy.attributes.add("LEFT_MOVE",{type:"number",default:-.01}),Enemy.prototype.initialize=function(){this.count=0,this.change_interval=parseInt(50+20*Math.random(),10),this.movefor=Math.random()>.4?this.RIGHT_MOVE:this.LEFT_MOVE,this.entity.collision.on("collisionstart",this._colstart,this),this.isdie=!1},Enemy.prototype.update=function(t){this.isdie?this.entity.sprite._currentClip._playing||this.entity.destroy():(this.count++,this.count%this.change_interval==0&&(this.movefor=Math.random()>.4?this.RIGHT_MOVE:this.LEFT_MOVE),this.entity.translate(this.movefor,0,0),this.setDirection(this.movefor))},Enemy.prototype.setDirection=function(t){this.entity.sprite.flipX=t<0},Enemy.prototype._colstart=function(t){t.other.tags.has("player")&&(t.other.getLocalPosition().clone().sub(this.entity.getLocalPosition().clone()).y>.7?this.die():t.other.script.player.damage())},Enemy.prototype.die=function(){this.isdie=!0,this.entity.rigidbody.enabled=!1,this.entity.collision.enabled=!1,this.entity.sprite.play("death")};

//# sourceMappingURL=__game-scripts.js.map