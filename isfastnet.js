function isFastNet(callback, options = {}){

    let _options = {
        timesToTest: 5, // more cycles = better results but takes longer
        threshold: 200, // in ms
        image:  "https://www.google.com/images/phd/px.gif",
        allowEarlyExit: true
    }

    Object.assign(_options, options);

    // let testImage = _options.image;

    let arrTimes = [];
    let i = 0; // start
    let dummyImage = new Image();
    let isDismissed = false;
    
    testLatency(function(avg){
        callback((avg <= _options.threshold)) // returns true if fast internet and false if slow internet
    });
    
    /** test and average time took to download image from server, called recursively timesToTest times */
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
        /** calculate average of array items then callback */
        let sum = arrTimes.reduce(function(a, b) { return a + b; });
        let avg = sum / arrTimes.length;
        if(!isDismissed){
            cb(avg);
        }
      }
    }
}   