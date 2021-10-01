var roleWarrior = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        var enemySpawn = creep.room.find(FIND_HOSTILE_SPAWNS);
        var enemyConstruction = creep.room.find(FIND_HOSTILE_CONSTRUCTION_SITES);


        if(_(Game.creeps).filter( { memory: { role: 'warrior' } } ) > 9) {
            if(enemies.length > 0) {
                if(creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemies[0], {visualizePathStyle: {stroke: '#ff0000'}});
                }
            } else if(enemySpawn.length > 0) {
                if(creep.attack(enemySpawn[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemySpawn[0], {visualizePathStyle: {stroke: '#ff0000'}});
                }
            } else if(enemyConstruction.length > 0) {
                if(creep.attack(enemyConstruction[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemyConstruction[0], {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        }

        // var attacker = _(Game.creeps).filter( { memory: { role: 'warrior' } } );
        // var creepy = _(Game.creeps);
        // //console.log('TEST attacker: ' + attacker);
        // //var enemies= attacker.room.find(FIND_HOSTILE_CREEPS);
        // var enemies = attacker;
        // console.log('Enemies: ' + enemies);
        // console.log('Creepy: ' + creepy);
        // if(enemies.length > 0) {

        //     attacker.moveTo(enemies[0]);
        //     attacker.attack(enemies[0]);

        // }

    }

};

module.exports = roleWarrior;
