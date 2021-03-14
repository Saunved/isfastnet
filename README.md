Built on top of [this Stack Overflow answer](https://stackoverflow.com/a/21372151/6513036).


## Version 2
**Breaking change** 

A default export has been added now to ensure that the package can be integrated smoothly when using it with ES6 imports. Example 3 has been added to indicate the same


## Examples
### In the browser
```html
<script type="module">
    import isFastNet from 'https://cdn.jsdelivr.net/npm/isfastnet'
    isFastNet((value) => {
    let speed = value ? 'fast':'slow';
    console.log('Internet is ' + speed);
})
```

### As an ES6 import
```html
<script>
import isFastNet from 'isFastNet'
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

### With verbose option
```html
<script type="module">
    import isFastNet from 'https://cdn.jsdelivr.net/npm/isfastnet'
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

### Using with nuxt.js
Do a normal ES6 import
```js
import isFastNet from 'isFastNet'
```
Add isfastnet to the transpile option in nuxt.config.js
```js
...
build: {
    transpile: ['isfastnet']
}
...
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
image:  "http://www.google.com/images/phd/px.gif", //  optional, url of the tiny image to load, keep this on a CDN
allowEarlyExit: true, // optional, if the first request takes greater than threshold*3 ms then the function exits with false
verbose: false  // optional, if set, it returns an object with all calculated latency data. Overrides allowEarlyExit option (See Example "With verbose option" for usage)
})

```