var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var creepPos = creep.pos;
        var sources = creep.room.find(FIND_SOURCES);

	    if(creepPos != sources[0]) {
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

	}

};

module.exports = roleMiner;