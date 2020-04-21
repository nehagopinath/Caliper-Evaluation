/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

module.exports.info = 'Updating gradients of the workers.';

const helper = require('./helper');

let txIndex = 0;
let gradients = [[ 2.85279741e-13,3.11415286e-12,-9.13212804e-13,3.35422494e-13, 1.80471444e-13,7.59314597e-13,-2.29160043e-12,-6.96012545e-13, 2.32668710e-12,2.75032454e-13,8.89940111e-13,1.54948079e-12, 2.13876445e-12,2.28860149e-12,-8.13460183e-13,2.29622623e-12,-1.52954994e-12,9.31200714e-13,-6.57695096e-13,-2.71254024e-12, 3.54937519e-12,1.80410662e-12,7.47514758e-13,2.19721956e-12, 1.75927508e-12,8.43874977e-13,8.78353007e-13,9.57950676e-13, 4.36453963e-13,8.65312434e-13,-2.49511081e-12,2.85672282e-12, 1.28021796e-12,1.07018085e-12,-5.64553681e-14,-2.68509785e-12, 1.80310578e-12,2.79869301e-12,-2.37077752e-12,1.94066077e-12, 5.87918621e-13,-1.86308849e-12,-3.08130831e-13,1.21942321e-12, 1.30512387e-13,1.56423282e-12,-1.69365275e-12,2.97982072e-12, -9.17071875e-13,-1.61404158e-12,2.07800747e-12,4.16149941e-12, 3.66425939e-12,-3.17488003e-12,-1.47855042e-12,1.66159245e-12, -1.00659109e-12,-1.67972257e-12,-1.86323563e-12,-3.23045535e-12, 7.87974098e-13,1.37299096e-13,1.44423340e-12,-7.73668779e-13, 2.52675629e-12,8.98294844e-13,2.74600914e-12,-2.40811622e-13, 1.56211154e-12,-7.22770759e-13,1.83066656e-12,1.22499961e-13, 2.12304303e-12,-1.59146321e-12,-3.55299403e-12,-9.53936551e-13, -8.49568529e-13,-1.77164944e-12,2.54223044e-12,3.18855503e-12, 1.24200367e-12,-1.05758675e-12,-4.11362947e-13,2.20932583e-12, 2.75976776e-12,-2.01287326e-12,2.41455080e-12,1.24888339e-12, 9.83421929e-13,-1.93382134e-12,6.86264327e-13,-2.17673918e-12, -1.01776592e-12,-2.19534023e-12,-6.70493579e-13,2.67493533e-12, -9.97827277e-13,-2.59975696e-14,-3.38159191e-12,2.99255705e-12, -5.52375917e-13]];
let bc, contx, limitIndex;

module.exports.init = async function(blockchain, context, args) {
    bc = blockchain;
    contx = context;
    limitIndex = args.assets;

    await helper.createInitialGradients(bc, contx, limitIndex);

    return Promise.resolve();

};

module.exports.run = function() {
    txIndex++;
    let modelNumber = 'Client' + contx.clientIdx + '_MODEL' + txIndex.toString();
    let newValue = gradients[Math.floor(Math.random() * gradients.length)];

    let args = {
        chaincodeFunction: 'sendGradients',
        chaincodeArguments: [modelNumber, newValue.toString()]
    };

    if (txIndex === limitIndex) {
        txIndex = 0;
    }

    return bc.invokeSmartContract(contx, 'model', 'v1', args, 60);
};

module.exports.end = async function() {
    return Promise.resolve();
};
