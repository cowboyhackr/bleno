var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  gpio = require("pi-gpio"),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

var BatteryLevelCharacteristic = function() {
  BatteryLevelCharacteristic.super_.call(this, {
      uuid: '2A19',
      properties: ['read', 'write', 'notify'],
      descriptors: [
        new Descriptor({
            uuid: '2901',
            value: 'Battery level between 0 and 100 percent'
        }),
        new Descriptor({
            uuid: '2904',
            value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00 ]) // maybe 12 0xC unsigned 8 bit
        })
      ]
  });
};

util.inherits(BatteryLevelCharacteristic, Characteristic);

BatteryLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {

  console.log("in read");
  if (os.platform() === 'darwin') {
    exec('pmset -g batt', function (error, stdout, stderr) {

      var data = stdout.toString();
      // data - 'Now drawing from \'Battery Power\'\n -InternalBattery-0\t95%; discharging; 4:11 remaining\n'
      var percent = data.split('\t')[1].split(';')[0];
      console.log(percent);
      percent = parseInt(percent, 10);
      callback(this.RESULT_SUCCESS, new Buffer([percent]));

    });
  } else {
    // return hardcoded value
    console.log("reading...")
    callback(this.RESULT_SUCCESS, new Buffer([98]));

  }
};

BatteryLevelCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log("in write");
  if (offset) {
    console.log("in write - offset");
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  //else if (data.length !== 1) {
   // console.log("data length !== 1");
    //console.log(JSON.stringify(data));
    //callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  //}
  else {
    // console.log(JSON.stringify(data));
    // console.log('processing write request');
    // var receivedData = data.readUInt8(0);
    // console.log(typeof data);
    // console.log(data.toString('ascii'));
    
    // console.log(receivedData);
    // console.log(typeof receivedData);

    var command = data.toString('ascii');
    console.log('command');
    console.log(command);

    if(command === 1){
      console.log("forward");

    }else if(command == 2){
      console.log("back");
    }
    lse if(command == 3){
      console.log("left");
    }
    lse if(command == 4){
      console.log("right");
    }
    //working below

    // gpio.open(16, "output", function(err) { 
    //   if(err){
    //     console.log(err);
    //   }       // Open pin 16 for output
    //   gpio.write(16, 1, function() {            // Set pin 16 high (1)
    //     gpio.close(16);                        // Close pin 16
    // });

    gpio.read(16, function(err, value) {
    if(err) throw err;
    console.log(value);    // The current state of the pin
});
});
  }
  callback(this.RESULT_SUCCESS);
};

BatteryLevelCharacteristic.prototype.onNotify = function() {
  console.log('NotifyOnlyCharacteristic on notify');
};

module.exports = BatteryLevelCharacteristic;
