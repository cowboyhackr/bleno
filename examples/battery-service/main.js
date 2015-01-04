var bleno = require('bleno'),
  BatteryService = require('./battery-service');
  
var primaryService = new BatteryService();

bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);

    if (state === 'poweredOn') {
        bleno.startAdvertising('Battery', [primaryService.uuid]);
        console.log("call to startAdvertising...")
    } else {
        bleno.stopAdvertising();
        console.log("call to stopAdvertising...")
    }
});

bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([primaryService]);
    }
});