var util = require('util'),
  os = require('os'),
  PythonShell = require('python-shell'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  gpio = require("pi-gpio"),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic,
  ShinySettings = require('./shiny');



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
  //console.log("in write");
  if (offset) {
    //console.log("in write - offset");
    callback(this.RESULT_ATTR_NOT_LONG);
  }

  else {
 
        var command = data.toString('ascii');
    //console.log('command');
    console.log(command);

    if(command === "0"){
      console.log("stop");


           stop();

    }
    else if(command === "2"){
      console.log("command left");


           gpio.open(16, "output", function(err) { 
            // if(err){
            //   console.log(err);
            // }       
            gpio.write(16, 0, function() {           
                console.log("set pin 16 high");
             
              gpio.open(18, "output", function(err) { 
                // if(err){
                //   console.log(err);
                // }       
                gpio.write(18, 1, function() {            
                    console.log("set pin 18 low");
                                    
                    gpio.open(13, "output", function(err) { 
                          // if(err){
                          //   console.log(err);
                          // }       
                          gpio.write(13, 1, function() {            
                              console.log("set pin 13 high");
                              gpio.open(15, "output", function(err) { 
                                  // if(err){
                                  //   console.log(err);
                                  // }       
                                  gpio.write(15, 0, function() {            
                                      console.log("set pin 15 low");
                                      setTimeout(stop(),500);                         
                                  });
                                });                     
                          });
                        });
                });
              }); 
            });
          });
            


    }else if(command === "1"){
      console.log("command right");
      
            gpio.open(16, "output", function(err) { 
            // if(err){
            //   console.log(err);
            // }      
            gpio.write(16, 1, function() {           
                console.log("set pin 16 high");

              gpio.open(18, "output", function(err) { 
                // if(err){
                //   console.log(err);
                // }     
                gpio.write(18, 0, function() {            
                    console.log("set pin 18 low");
                                        
                    gpio.open(13, "output", function(err) { 
                          // if(err){
                          //   console.log(err);
                          // }      
                          gpio.write(13, 0, function() {            
                              console.log("set pin 13 high");
                              gpio.open(15, "output", function(err) { 
                                  // if(err){
                                  //   console.log(err);
                                  // }       
                                  gpio.write(15, 1, function() {            
                                      console.log("set pin 15 low");
                                                 
                                  });
                                });                     
                          });
                        });
                });
              }); 
            });
          });
    }
    else if(command === "4"){
      console.log("forward");

          gpio.open(16, "output", function(err) { 
            // if(err){
            //   console.log(err);
            // }      
            gpio.write(16, 1, function() {           
                console.log("set pin 16 high");
           
              gpio.open(18, "output", function(err) { 
                // if(err){
                //   console.log(err);
                // }      
                gpio.write(18, 0, function() {            
                    console.log("set pin 18 low");
                                        
                    gpio.open(13, "output", function(err) { 
                          // if(err){
                          //   console.log(err);
                          // }       
                          gpio.write(13, 1, function() {            
                              console.log("set pin 13 high");
                              gpio.open(15, "output", function(err) { 
                                  // if(err){
                                  //   console.log(err);
                                  // }       
                                  gpio.write(15, 0, function() {            
                                      console.log("set pin 15 low");
                                                          
                                  });
                                });                     
                          });
                        });
                });
              }); 
            });
          });

    }
    else if(command === "3"){
      console.log("back");

          gpio.open(16, "output", function(err) { 
            // if(err){
            //   console.log(err);
            // }      
            gpio.write(16, 0, function() {           
                console.log("set pin 16 low");
             
              gpio.open(18, "output", function(err) { 
                // if(err){
                //   console.log(err);
                // }      
                gpio.write(18, 1, function() {            
                    console.log("set pin 18 high");
                                    
                    gpio.open(13, "output", function(err) { 
                          // if(err){
                          //   console.log(err);
                          // }      
                          gpio.write(13, 0, function() {            
                              console.log("set pin 13 low");
                              gpio.open(15, "output", function(err) { 
                                  // if(err){
                                  //   console.log(err);
                                  // }      
                                  gpio.write(15, 1, function() {            
                                      console.log("set pin 15 high");
                                  
                                                
                                  });
                                });                     
                          });
                        });
                });
              }); 
            });
      

      });
    }
  }
  callback(this.RESULT_SUCCESS);
};

function stop(){

           gpio.open(16, "output", function(err) { 
            // if(err){
            //   console.log(err);
            // }      
            gpio.write(16, 0, function() {           
                console.log("set pin 16 high");
           
              gpio.open(18, "output", function(err) { 
                // if(err){
                //   console.log(err);
                // }     
                gpio.write(18, 0, function() {            
                    console.log("set pin 18 low");
                                       
                    gpio.open(13, "output", function(err) { 
                          // if(err){
                          //   console.log(err);
                          // }       
                          gpio.write(13, 0, function() {            
                              console.log("set pin 13 high");
                              gpio.open(15, "output", function(err) { 
                                  // if(err){
                                  //   console.log(err);
                                  // }       
                                  gpio.write(15, 0, function() {            
                                      console.log("set pin 15 low");
                                                     
                                  });
                                });                     
                          });
                        });
                });
              }); 
            });
          });
}

function setMotorDirection(direction) {
    console.log('Setting: ' + direction);    

          var pin16 = 0;
          var pin18 = 0;
          var pin22 = 0;

          if(direction === 'forward'){
            pin16 = 1;
            pin18 = 0;
            pin22 = 1;
          }else if (direction == 'reverse'){
            pin16 = 1;
            pin18 = 0;
            pin22 = 1;
          }

          gpio.open(16, "output", function(err) { 
            if(err){
              console.log(err);
            }       // Open pin 16 for output
            gpio.write(16, pin16, function() {            // Set pin 16 high (1)
                console.log("set pin 16 " + pin16);
              //gpio.close(16);                        // Close pin 16
              //18
              gpio.open(18, "output", function(err) { 
                if(err){
                  console.log(err);
                }       // Open pin 18 for output
                gpio.write(18, pin18, function() {            // Set pin 18 low (0)
                    console.log("set pin 18 " + pin18);
                  //gpio.close(18);                        // Close pin 18
                    gpio.open(22, "output", function(err) { 
                          if(err){
                            console.log(err);
                          }       // Open pin 22 for output
                          gpio.write(22, pin22, function() {            // Set pin 22 high (1)
                              console.log("set pin 22 " + pin22);
                            //gpio.close(22);                        // Close pin 22
                          });
                        });
                });
              }); 
            });
          });
}

BatteryLevelCharacteristic.prototype.onNotify = function() {
  console.log('NotifyOnlyCharacteristic on notify');
};

module.exports = BatteryLevelCharacteristic;
