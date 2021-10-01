var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
				var sources = creep.room.find(FIND_SOURCES);
				for (var j = 0; j < sources.length; j++)
				{
					// var spawnPos = creep.room.find(FIND_STRUCTURES, {
					// 	filter: (structure) => {
					// 		return (structure.structureType == STRUCTURE_SPAWN)
					// 	}
					// });
					let spawnPos = creep.room.find(FIND_MY_SPAWNS);
					console.log('Spawn Position: ' + spawnPos);
					if(creep.pos != spawnPos) {
						creep.moveTo(spawnPos, {visualizePathStyle: {stroke: '#ffaa00'}});
					} else {
						var chemin = creep.pos.findPathTo(sources[j].pos);
						for (var i = 0; i < chemin.length; i++) 
						{
							creep.room.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
						}
					}
				}
			}
	    }
	    else {
			var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
			var sources = creep.room.find(FIND_SOURCES);
			if(droppedEnergy) {
				if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(droppedEnergy[0].pos, {visualizePathStyle: {stroke: '#ffaa00'}});
				}
			} 
            else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;