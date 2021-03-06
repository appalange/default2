import Variable from './variables';

var hybrids = _.filter(Game.creeps, (creep) => creep.memory.role == 'hybrid');

var stage1 = [WORK,WORK,MOVE,CARRY];
var stage2 = [WORK,WORK,MOVE,MOVE,CARRY];
var stage3 = [WORK,WORK,WORK,MOVE,CARRY];
var stage4 = [WORK,WORK,WORK,MOVE,MOVE,CARRY];
var stage5 = [WORK,WORK,WORK,WORK,MOVE,MOVE,CARRY];
const bodyCostStage1 = _.sum(stage1, b => BODYPART_COST[b]);
const bodyCostStage2 = _.sum(stage2, b => BODYPART_COST[b]);
const bodyCostStage3 = _.sum(stage3, b => BODYPART_COST[b]);
const bodyCostStage4 = _.sum(stage4, b => BODYPART_COST[b]);
const bodyCostStage5 = _.sum(stage5, b => BODYPART_COST[b]);
// console.log('bodyCostStage1 = ' +bodyCostStage1);
// console.log('bodyCostStage2 = ' +bodyCostStage2);
// console.log('bodyCostStage3 = ' +bodyCostStage3);
// console.log('bodyCostStage4 = ' +bodyCostStage4);
// console.log('bodyCostStage5 = ' +bodyCostStage5);


var AvailCap = Variable.energyCapacityAvailable;
var Avail = Variable.energyAvailable;

function levelUp() {

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
    } else if(Game.rooms['sim'].controller.level >= 2) {
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

};

module.exports = levelUp;