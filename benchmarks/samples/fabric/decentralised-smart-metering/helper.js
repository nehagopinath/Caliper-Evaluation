
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

//model size - varying the number of samples from 100 to 400 and number of features and centres from 2 to 4 in makeblobs and changing the batch size from 32 to 256
let modelNames = ['weightMatrix1'];
let features = ['0.10572406, 0.91595082 ,0.35016653, 0.02093526 ,0.67601366 ,0.72042311,0.207757,0.92903684,0.22563185,0.53090442,0.30456452,0.24825099,0.5821079,0.03619469,0.67627776,0.15567882,0.00551343,0.472628270.88015614,0.78040512,0.29532854,0.34534527,0.88018854,0.54359622,0.46012367,0.50252878,0.37520822,0.82200858,0.66034508,0.81774636,0.05895416,0.64508442,0.45470569,0.3707541,0.80369881,0.75710213,0.89981797,0.05040452,0.12840006,0.00945613,0.98824923,0.49733622,0.21568003,0.54749908,0.85927285,0.59634861,0.12291062,0.7923277,0.35962883,0.84785433,0.29170562,0.59664034,0.33987524,0.75342239,0.5363834,0.52126503,0.82512304,0.8439661,0.99125642,0.80308125,0.14177082,0.09097848,0.35605293,0.89164305,0.86704903,0.62706087,0.98526968,0.30126965,0.04859672,0.92852027,0.83359824,0.47758515,0.63976957,0.81684871,0.1097653,0.92613015,0.0977296,0.68145566,0.82296057,0.9073856,0.34812287,0.12781503,0.51144535,0.88640231,0.2570124,0.7835450,0.65370131,0.06096928,0.37486846,0.29172594,0.06985576,0.07656962,0.25201382,0.53105139,0.904251,0.2850229,0.00934305,0.21019013,0.16675499,0.93558772,0.0511242'];
let modelNumber;
let txIndex = 0;

module.exports.createWeightMatrix = async function (bc, contx, limIndex) {

    while (txIndex < limIndex) {
        txIndex++;
        modelNumber = 'Client' + contx.clientIdx + '_MODEL' + txIndex.toString();
        let modelName = modelNames[Math.floor(Math.random() * modelNames.length)];
        let feature = features[Math.floor(Math.random() * features.length)];

        let myArgs = {
            chaincodeFunction: 'addModel',
            chaincodeArguments: [modelNumber, modelName.toString(), feature.toString()]
        };

        await bc.invokeSmartContract(contx, 'model', 'v1', myArgs, 30);
    }

};

module.exports.createInitialGradients = async function (bc, contx, limIndex) {

    while (txIndex < limIndex) {
        txIndex++;
        modelNumber = 'Client' + contx.clientIdx + '_MODEL' + txIndex.toString();
        let modelName = 'gradients';
        let gradientValue = [0,0,0,0,0];

        let myArgs = {
            chaincodeFunction: 'addInitialGradientsTest',
            chaincodeArguments: [modelNumber, modelName, gradientValue.toString()]
        };

        await bc.invokeSmartContract(contx, 'model', 'v1', myArgs, 30);
    }

};
