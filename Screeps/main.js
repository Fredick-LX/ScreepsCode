var roleHarvester = require('role.HSC');
var roleUpgrader = require('role.USC');
var roleBuilder = require('role.BSC');
var roleRepairer = require('role.RSC');
var roleTowerControl = require('role.TSC');
var roleCreepNumberControl= require('role.CNC');

module.exports.loop = function () {
    
    roleCreepNumberControl.run();
    roleTowerControl.run();
    
    var Is_on_Attacking = Game.spawns["Main"].room.find(FIND_HOSTILE_CREEPS);
    if(Is_on_Attacking.length>0){
        Game.notify("hostile creeps engaged");
        if(Is_on_Attacking.length>7){
            Game.notify("in Safemode");
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'H') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'U') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'B'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role =='R'){
            roleRepairer.run(creep);
        }
    }
}
