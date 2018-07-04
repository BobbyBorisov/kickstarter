const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);
console.log('Build directory removed.');

const campaignPath = path.resolve(__dirname,'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source,1).contracts;
console.log('Compiling contract.');

fs.ensureDirSync(buildPath);
console.log('Build directory created.');

for(let contract in output){
  fs.outputJsonSync(
    path.resolve(buildPath,contract.replace(':', '')+'.json'),
    output[contract]
  );
  console.log(contract.replace(':', '') + ' exported to json file.');
}

console.log('Done!');
