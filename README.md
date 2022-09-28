# canvas image editor


```js
new ImageEditor({
    //source
    src: URL || HTMLImageElement || Blob || File,
    canvas: HTMLCanvasElement,

    //image
    quality: Number,
    image_type: String,
    output: String,
    size: Number,

    //filter
    filter_coords: Array,
    filter_intensity: Number,
    filter_style: String,
    filter_overlay: Boolean,

    //Events
    onload: Function,
    onprogress: Function,
    onerror: Function,
    onready: Function,

    //settings
    disable_transition: Boolean
}).then(function (arguments: {
    addEfect: Function,
    updateImage: Function,
    getDataURL: Function,
    getBlob: Function
}) {

    arguments[0].addEfect({
        filter_coords: Array,
        filter_intensity: Number,
        filter_style: String,
        filter_overlay: Boolean
    }).progress(log).then(log).catch(log);

    arguments[0].updateImage(src: URL || HTMLImageElement || Blob || File).then(log);

    arguments[0].getDataURL().then(log);

    arguments[0].getBlob().then(log);
});
```

# options
## src
  this option defineds the image source
  ```js
URL || HTMLImageElement || Blob || File
  ```

## filter_coords
  this option defineds the coordinates for which the filter style would take effect
  ```js
[x, y, width, height]
  ```

