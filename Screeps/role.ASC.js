module.exports = {
    //正在补充
    run:function(){
        var targets = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(target){
            if(creep.attack(target)==ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }
        else{
            creep.suicide();
        }
    }
};