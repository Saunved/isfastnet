function isFastNet(callback, options = {}){

    let _options = {
        timesToTest: 5,
        threshold: 200,
        image:  "https://www.google.com/images/phd/px.gif",
        allowEarlyExit: true,
        verbose: false
    }

    Object.assign(_options, options);

    //If verbose option is set, force allowEarlyExit to be false
    if(_options.verbose) {
      _options.allowEarlyExit = false;
    }

    let arrTimes = [];
    let i = 0;
    let dummyImage = new Image();
    let isDismissed = false;
    
    testLatency(function(avgInfo){
      if (_options.verbose) {
        avgInfo["isFast"] = (avgInfo.averageLatency <= _options.threshold)
        callback(avgInfo); 
      } else {
        callback((avgInfo <= _options.threshold))
      }
    });
    
    // Recursively get average latency
    function testLatency(cb) {

    if(_options.allowEarlyExit){
        setTimeout(() => {
            if(i===0){
            i=_options.timesToTest;
            isDismissed = true;
            cb(_options.threshold*3+1)
        }
        }, _options.threshold*3)
    }

      let startTime = new Date().getTime();
      if (i < _options.timesToTest-1) {
        dummyImage.src = _options.image + '?t=' + startTime;
        dummyImage.onload = function() {
          let endTime = new Date().getTime();
          let timeTaken = endTime-startTime;
          arrTimes[i] = timeTaken;
            testLatency(cb);
            i++;
        };
      } else {
        /** calculate average */
        let sum = arrTimes.reduce(function(a, b) { return a + b; });
        let avg = sum / arrTimes.length;
        if(!isDismissed){
          if(_options.verbose) {
            let objectToReturn = {
              "averageLatency": avg,
              "threshold": _options.threshold,
              "latencyReadings": arrTimes
            }
            cb(objectToReturn);
          } else {
            cb(avg);
          }
        }
      }
    }
}   