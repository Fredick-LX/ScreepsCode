module.exports = {
    run: function() {
        var HBody=[MOVE,WORK,CARRY,MOVE];
        var UBody=[MOVE,WORK,CARRY,MOVE];
        var BBody=[MOVE,WORK,CARRY,MOVE];
        var RBody=[MOVE,WORK,CARRY,MOVE];
        
        var HSN=2;var USN=1;var BSN=0;var RSN=0;
        var Hs = _.filter(Game.creeps, (creep) => creep.memory.role == 'H');
        if(Hs.length < HSN) {
            var newName = 'H' + Game.time;
            Game.spawns['Main'].spawnCreep(HBody, newName, {memory: {role: 'H'}}); 
            console.log("spawn harvester:"+newName);
        }
        var Us = _.filter(Game.creeps, (creep) => creep.memory.role == 'U');
        if(Us.length < USN) {
            var newName = 'U' + Game.time;
            Game.spawns['Main'].spawnCreep(UBody, newName, {memory: {role: 'U'}});
            console.log("spawn upgrader:"+newName);
        }
        var Bs = _.filter(Game.creeps, (creep) => creep.memory.role == 'B');
        if(Bs.length < BSN) {
            var newName = 'B' + Game.time;
            Game.spawns['Main'].spawnCreep(BBody, newName, {memory: {role: 'B'}});  
            console.log("spawn builder:"+newName);
        }

        var Rs = _.filter(Game.creeps, (creep) => creep.memory.role == 'R');
        if(Rs.length < RSN) {
            var newName = 'R' + Game.time;
            Game.spawns['Main'].spawnCreep(RBody, newName, {memory: {role: 'R'}});  
            console.log("spawn repairer:"+newName);
        }
        if(Game.spawns['Main'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Main'].spawning.name];
        }
      
        if(Game.time%100==0){
            console.log("H:"+Hs.length+"\nU:"+Us.length+"\nB:"+Bs.length+"\nR:"+Rs.length);
        }
      
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
};