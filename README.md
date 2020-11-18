Built on top of [this Stack Overflow answer](https://stackoverflow.com/a/21372151/6513036).

## Example 1
```html
<script src="https://cdn.jsdelivr.net/npm/isfastnet"></script>
<script>
    isFastNet((value) => {
        // If value is true, internet is fast
        let speed = value ? 'fast':'slow';
        console.log('Internet is ' + speed);
    })
</script>
```

## Example 2 (Verbose)
```html
<script src="https://cdn.jsdelivr.net/npm/isfastnet"></script>
<script>
    isFastNet((data) => {
        /**
        * data = {
        *   "isFast": Boolean,
        *   "averageLatency": Number,
        *   "threshold": Number,
        *   "latencyReadings": [Number]
        * } 
        */
        console.log('Received latency data: ' + JSON.stringify(data));
    }, { verbose: true })
</script>
```

## Usage
```js
isFastNet((value) => {
    if(value){
        // Internet is fast
    }
    else{
        // Internet is slow
    }
}, { 
timesToTest: 5, // optional, number of times to load the image default is 5
threshold: 200, // optional, threshold in ms after which internet speed is considered slow
image:  "http://www.google.com/images/phd/px.gif", //  optional, url of the tiny image to load
allowEarlyExit: true, // optional, if the first request takes greater than threshold*3 ms then the function exits with false
verbose: false  // optional, if set, it returns an object with all calculated latency data. Overrides allowEarlyExit option (See Example #2 for usage)
})

```