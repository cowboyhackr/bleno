var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

var BatteryLevelCharacteristic = function() {
  BatteryLevelCharacteristic.super_.call(this, {
      uuid: '2A19',
      properties: ['read', 'write'],
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
    var receivedData = data.readUInt8(0);
    console.log('processing write request')
    console.log(receivedData);
  }
  callback(this.RESULT_SUCCESS);
};

module.exports = BatteryLevelCharacteristic;
