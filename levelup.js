var levelUp = {

    ///** @param {Creep} levelup **/
    run: function(levelup) {

        console.log('Hybrids: ' + hybrids.length);
        //console.log('hybrid onder 10');
        if(Game.rooms['sim'].controller.level == 1) {
            //console.log('controller lvl 1');
            var newName = 'Hybrid' + Game.time;
            //console.log('Spawning new hybrid: ' + newName);
            if(bodyCostStage1 <= AvailCap) {
                Game.spawns['Spawn1'].spawnCreep(stage1, newName, 
                    {memory: {role: 'hybrid'}});
            } else {
                console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
            }
        } else if(Game.rooms['sim'].controller.level == 2) {
            //console.log('controller lvl 2');
            var newName = 'BigHybrid' + Game.time;
            if(extensions.length == 0) {
                //console.log('extension 0');
                if(bodyCostStage1 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage1, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 1) {
                //console.log('extension 1');
                if(bodyCostStage2 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage2, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 2) {
                //console.log('extension 2');
                if(bodyCostStage3 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage3, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 3) {
                if(bodyCostStage4 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage4, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 4) {
                if(bodyCostStage4 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage4, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 5) {
                if(bodyCostStage5 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage5, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            }
        }

	}
};

module.exports = levelUp;