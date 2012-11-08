
/*initialise stats*/
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
stats.domElement.style.display = "none";
document.body.appendChild( stats.domElement );
/*end stats*/

//debug
var debug = new function(){
    var parent = this;
    //ping - get latency
    this.lastTime = 0;
    this.latency = 0;
    this.pong = function(data){
        var now = new Date().getTime();
        console.log("Latency:"+(now-parent.lastTime)+"ms");
        parent.latency = now-parent.lastTime;
    };
    socket.on('pong',this.pong);
    this.ping = function(){
        this.lastTime = new Date().getTime();
        socket.emit('ping',1);
    };
    //other stuff
    this.stats = false;

};
/*dat.gui*/
var gui = new dat.GUI();
gui.close();
var gPing = gui.addFolder('Ping');
gPing.add(debug, 'ping');
gPing.add(debug, 'latency').listen();
gui.add(debug, 'stats').onChange(function(value){
	stats.domElement.style.display = (value)?"block":"none";
});
gui.add(game.scenes[6], 'time').listen();//game time