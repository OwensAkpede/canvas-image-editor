# canvas image editor


```js
new ImageEditor({
    //source
    src: URL || HTMLImageElement || Blob || File,
    canvas: HTMLCanvasElement,
    rendering_quality: String,

    //image
    image_type: String,
    output_type: String,
    output_quality: Number,
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
    enable_transition: Boolean
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
  \<any\>
  ```js
URL || HTMLImageElement || Blob || File
  ```

## canvas
  this option defineds the canvas element which holds the context
  \<Element\>
  ```js
HTMLCanvasElement
  ```

## rendering_quality
  this option defineds the smoothness of the image. default value is "medium"
  
  \<String\>
  ```js
"low" || "medium" || "high"
  ```

## image_type
  this option defineds the mime-type of which the image would be coverted to. default value is "image/jpeg"
  \<String\>
  ```js
"image/jpeg" || "image/png"
  ```

## output_type
  this option defineds how the image would be presented when ready
  \<String\>
  ```js
"dataURL" || "blob"
  ```

## output_quality
  this option defineds the image quality. default value is "1"
  \<Number\>
  ```js
 0 || 0.1 || 0.2 || 0.3 || 0.4 || 0.5 || 0.6 || 0.7 || 0.8 || 0.9 || 1
  ```

## size
  this option defineds the size of the image. default value uses the image default size
  \<Number\>
  ```js
 Number
  ```

## filter_style
  this option defineds the filter style or rather, the effect.
  [here for list of supported style](#listoffilters)
  \<String\>

  ```js
 String
  ```

## filter_coords
  this option defineds the coordinates for which the filter style would take effect
  \<Array\>
  ```js
[x, y, width, height]
  ```

## filter_intensity
  this option defineds the strength filter style. default value is "50"
  \<Number\>
  ```js
 Number < 100
  ```

## filter_overlay
  this option defineds whether the provious effect(filter_style) should be merged or erased. true would merge while false would erased. default value is "true"
  \<Boolean\>
  ```js
 true || false
  ```

## onload
  this option defineds the function which would be fired when the process starts
  \<Function\>
  ```js
Function
  ```

## onprogress
  this option defineds the function which would be fired when the process is in progress
  \<Function\>
  ```js
function(progress) {
  console.log(progress)
}
  ```

## onready
  this option defineds the function which would be fired when the process starts
  \<Function\>
  ```js
function(data) {
  console.log(data)
}
  ```

## onerror
  this option defineds the function which would be fired when the process starts
  \<Function\>
  ```js
function(message) {
  console.log(message)
}
  ```

## enable_transition
  ` useful if the canvas would be visible for users `

  this option defineds whether an animated transition should be shown. default value is "false"
  \<Boolean\>
  ```js
 true || false
  ```

# list_of_filters
 - hr_painting
 - smooth_hr_painting
 - oil_paints
 - untitled_0
 - untitled_1
 - untitled_2
