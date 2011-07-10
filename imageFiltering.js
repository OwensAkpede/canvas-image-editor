function ImageFiltering() {
     
    if (this instanceof Window) {
        return;
    }

    this.onprogress=null
    this.onready=null
    this.onerror=null
    this.onload=null



    var variables = {
        resolve : new Function(),
        reject : new Function(),
        class: this,
        canv: document.createElement('canvas'),
        img: arguments[0].src,
        renderingSpeed: 3000,
        quality:typeof arguments[0].quality == "number"?arguments[0].quality:1,
        imageType:typeof arguments[0].imageType == "string"?arguments[0].imageType:"image/jpeg",
        output:typeof arguments[0].output == "string"?arguments[0].output.toUpperCase():null,
        effect:typeof arguments[0].filter == "string"?arguments[0].filter.toUpperCase().replace(/[^a-z0-9]/ig,'').replace(/\d/g,"_$&"):null,
        effectIntensity:typeof arguments[0].filterIntensity == "number"?arguments[0].filterIntensity:50,
        size:typeof arguments[0].size === "number"?arguments[0].size:null,
        coords:(arguments[0].filterCoords instanceof Array)&&arguments[0].filterCoords.length===4?arguments[0].filterCoords:null,
        paints_0: [
            [211, 183, 43, 255], // x
            [134, 180, 34, 255], // x

            [198, 116, 20, 255], //x
            [221, 153, 64, 255], //x
            [58, 72, 117, 255], //x
            [51, 56, 85, 255], //x
            [196, 186, 185, 255], //black

            [46, 37, 32, 255], //x
            [199, 171, 167, 255], //x
            [239, 198, 110, 255], //x
            [220, 165, 64, 255], //x
            [233, 194, 110, 255], //x
            [249, 230, 213, 255], //x
            [50, 45, 42, 255], //x
            [137, 14, 89, 255], //x
            [199, 171, 167, 255], //x
            [199, 171, 167, 255], //x
            [199, 171, 167, 255], //x
            [199, 171, 167, 255], //x

            [92, 92, 92, 255], //black
            [34, 34, 34, 255], //black
            [0, 0, 0, 255], //black

            [232, 236, 244, 255], //white
            [255, 255, 255, 255], //white

            [231, 51, 51, 255], //red
            [51, 88, 231, 255], //blue
            [97, 231, 51, 255], //green
            [220, 224, 50, 255], //yellow
            [224, 50, 222, 255], //pink
            [224, 156, 50, 255], //orange
            [50, 218, 224, 255], //purple
        ],
        paints_1: [
            // [from,to,stringth]
            [
                [0, 0, 0, 255],
                [38, 54, 68, 255]
            ],
            [
                [255, 255, 255, 255],
                [219, 231, 242, 255]
            ]
        ],

        RGBQuery: {
            LRange: function (data, compel, n) {
                !n ? n = 0 : n;
                return (
                    (data[0] >= compel[0] - n && compel[0] >= data[0]) &&
                    (data[1] >= compel[1] - n && compel[1] >= data[1]) &&
                    (data[2] >= compel[2] - n && compel[2] >= data[2]) &&
                    (data[3] >= compel[3] - n && compel[3] >= data[3])
                )
            },
            RRange: function (data, compel, n) {
                !n ? n = 0 : n;
                return (
                    (compel[0] + n >= data[0] && data[0] >= compel[0]) &&
                    (compel[1] + n >= data[1] && data[1] >= compel[1]) &&
                    (compel[2] + n >= data[2] && data[2] >= compel[2]) &&
                    (compel[3] + n >= data[3] && data[3] >= compel[3])
                )
            },
            LRRange: function (data, compel, n) {
                !n ? n = 0 : n;
                return ((
                    (data[0] >= compel[0] - n && compel[0] >= data[0]) &&
                    (data[1] >= compel[1] - n && compel[1] >= data[1]) &&
                    (data[2] >= compel[2] - n && compel[2] >= data[2]) &&
                    (data[3] >= compel[3] - n && compel[3] >= data[3])
                ) || (
                    (compel[0] + n >= data[0] && data[0] >= compel[0]) &&
                    (compel[1] + n >= data[1] && data[1] >= compel[1]) &&
                    (compel[2] + n >= data[2] && data[2] >= compel[2]) &&
                    (compel[3] + n >= data[3] && data[3] >= compel[3])
                ))
            }
        },

        RGBCondition: {
            LRRange: function () {
                if (variables.RGBQuery.LRRange(arguments[0], arguments[1], arguments[2])) {
                    return arguments[0]
                }
            }
        },
        callDelay : function(){
            a=arguments;
            setTimeout(function() {
                    if ((a[0] = variables.class["on"+a[0]]) instanceof Function) {
                    a[0](a[1])
                }
                }, 0);
        },
        call:function(){
                    if ((arguments[0] = variables.class["on"+arguments[0]]) instanceof Function) {
                        arguments[0](arguments[1])
                }
        }
    }

    if (typeof variables.img === "string") {
        variables.img=new Image();
        variables.img.src=arguments[0].src
    }else{
        return variables.callDelay('error',"invalid source> src: <Path, Url, HTMLImageElement, Blob, Bitmap>")
    }

    // this.done=new Promise(function(){variables.resolve=arguments[0];variables.reject=arguments[1]})
    // console.log(variables.RGBCondition.LRRange([87, 87, 87,255],[20, 20, 20,255], 80));
    // console.log(variables.RGBQuery.LRRange([87, 87, 87,255],[80, 80, 80,255], 50));


    // variables.img.style.zoom = variables.canv.style.zoom = 0.2
    document.body.appendChild(variables.img)
    document.body.appendChild(variables.canv)




    function onready() {
        // var r =null// 180 * 1.4
        // var r =180 * 1.4
        if (arguments[0] instanceof Event) {
            if (!variables.size) {
                variables.canv.width = variables.img.naturalHeight //= variables.img.width-20
                variables.canv.height = variables.img.naturalWidth //= variables.img.height-20
            }else{
                variables.img.width = variables.canv.width = ((variables.img.naturalWidth + variables.img.naturalHeight) / variables.img.naturalHeight) * (variables.size / 2)
                variables.img.height = variables.canv.height = ((variables.img.naturalWidth  + variables.img.naturalHeight ) / variables.img.naturalWidth ) * (variables.size / 2)
            }
            // console.dir(variables.img);
            // console.log(variables.img.width,variables.img.height);
    
    
    if (!variables.coords) {
        variables.coords=[0,0,variables.canv.width,variables.canv.height]
    }
    
    variables.width = variables.canv.width;
    variables.height = variables.canv.height;
    
    variables.canv = variables.canv.getContext('2d');
    variables.canv.drawImage(variables.img, 0, 0, variables.width, variables.height)
    
    var gb_var = {
        imgdata: variables.canv.getImageData(0, 0, variables.width, variables.height),
        pr: [-255, -255, -255, -255],
        nx: [-255, -255, -255, -255],
        i: 0,
        cpw: 0,
        cph: 0
    };
}else{
      var gb_var=arguments[0]
      arguments[1].__proto__=variables
      variables = arguments[1]
}


        gb_var.EffectFilter=new IMAGEStriping.Effect(gb_var)

        variables.call('load')
        if (gb_var.EffectFilter.hasOwnProperty(variables.effect)) {
            requestAnimationFrame(ProcessImage(gb_var))
        //   requestAnimationFrame(function(){ProcessImage(gb_var)()})
        }else{
        variables.call('progress',100)
        ProcessImageComplete(gb_var)
        }
    }

    function ProcessImage(gb_var) {
        return function () {
            if (gb_var.i >= gb_var.imgdata.data.length) {
                ProcessImageComplete(gb_var,true)
                return
            };
            if (gb_var.cpw === gb_var.imgdata.width) {
                gb_var.cpw = 0;
                gb_var.cph += 1;
            }
            new IMAGEStriping(gb_var).default()
            variables.call('progress',Math.min((gb_var.i*100)/gb_var.imgdata.data.length,100))
            requestAnimationFrame(arguments.callee)
        }
    }

function ProcessImageComplete(gb_var,clearRect) {
    if (clearRect) {
        variables.canv.clearRect(0,0,variables.width,variables.height)
        variables.canv.putImageData(gb_var.imgdata,0,0)
    }

    if (variables.output==="CANVAS") {
        variables.call('ready',variables.canv)
    }else if (variables.output==="IMAGEDATE") {
        variables.call('ready',gb_var.imgdata)
    }else if (variables.output==="DATAURL") {
        variables.call('ready',variables.canv.canvas.toDataURL(variables.imageType,variables.quality))
    }else if (variables.output==="BLOB") {
        // variables.call('ready',variables.canv.canvas.toDataURL(variables.imageType||"image/jpeg",variables.quality||1))
    }
}

    function sameRGB(pr, data, mv) {
        if (!mv) {
            mv = 120
        }

        if (
            (pr[0] > data[0] ? data[0] + mv >= pr[0] : pr[0] + mv >= data[0]) &&
            (pr[1] > data[1] ? data[1] + mv >= pr[1] : pr[1] + mv >= data[1]) &&
            (pr[2] > data[2] ? data[2] + mv >= pr[2] : pr[2] + mv >= data[2]) &&
            (pr[3] > data[3] ? data[3] + mv >= pr[3] : pr[3] + mv >= data[3])
        ) {
            return true
        } else {
            return false
        }
    }

    function IMAGEStriping(gb_var) {
        this.test = function () {
            for (var _i = 0; _i < variables.renderingSpeed; _i++) {
                if (gb_var.i >= gb_var.imgdata.data.length) {
                    // variables.canv.clearRect(0,0,variables.canv.width,variables.canv.height)
                    // variables.canv.putImageData(gb_var.imgdata,0,0)
                    return
                };
                gb_var.pr = [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]]
                if (
                    true ||
                    (gb_var.pr[0] > gb_var.imgdata.data[gb_var.i] ? gb_var.imgdata.data[gb_var.i] + variables.effectIntensity >= gb_var.pr[0] : gb_var.pr[0] + variables.effectIntensity >= gb_var.imgdata.data[gb_var.i]) &&
                    (gb_var.pr[1] > gb_var.imgdata.data[gb_var.i + 1] ? gb_var.imgdata.data[gb_var.i + 1] + variables.effectIntensity >= gb_var.pr[1] : gb_var.pr[1] + variables.effectIntensity >= gb_var.imgdata.data[gb_var.i + 1]) &&
                    (gb_var.pr[2] > gb_var.imgdata.data[gb_var.i + 2] ? gb_var.imgdata.data[gb_var.i + 2] + variables.effectIntensity >= gb_var.pr[2] : gb_var.pr[2] + variables.effectIntensity >= gb_var.imgdata.data[gb_var.i + 2]) &&
                    (gb_var.pr[3] > gb_var.imgdata.data[gb_var.i + 3] ? gb_var.imgdata.data[gb_var.i + 3] + variables.effectIntensity >= gb_var.pr[3] : gb_var.pr[3] + variables.effectIntensity >= gb_var.imgdata.data[gb_var.i + 3])
                ) {

                    variables.paints_0.forEach(function () {
                        if (sameRGB(gb_var.pr, arguments[0], variables.effectIntensity)) {
                            gb_var.pr = arguments[0]
                        }
                    });

                    gb_var.imgdata.data[gb_var.i] = gb_var.pr[0],
                        gb_var.imgdata.data[gb_var.i + 1] = gb_var.pr[1],
                        gb_var.imgdata.data[gb_var.i + 2] = gb_var.pr[2],
                        gb_var.imgdata.data[gb_var.i + 3] = gb_var.pr[3];

                } else {
                    gb_var.pr = [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]];
                }
                // new IMAGEStriping.Effect(gb_var).Untitled_0()
                // new IMAGEStriping.Effect(gb_var).HRPainting()
                // new IMAGEStriping.Effect(gb_var).HRPainting("smooth")
                variables.canv.fillStyle = `rgba(${gb_var.imgdata.data[gb_var.i]},${gb_var.imgdata.data[gb_var.i+1]},${gb_var.imgdata.data[gb_var.i+2]},${gb_var.imgdata.data[gb_var.i+3]})`;
                variables.canv.fillRect(gb_var.cpw, gb_var.cph, 1, 1);
                gb_var.cpw += 1
                if (gb_var.cpw === gb_var.imgdata.width) gb_var.cpw = 0, gb_var.cph += 1;
                gb_var.i += 4
            }
        }

        this.default = function () {
            for (var _i = 0; _i < variables.renderingSpeed; _i++) {
                if (gb_var.i >= gb_var.imgdata.data.length) {
                    return
                };

                if (
                    (gb_var.cpw>=variables.coords[0]&&gb_var.cph>=variables.coords[1])
                    &&
                    (gb_var.cpw<=variables.coords[2]+variables.coords[0]&&gb_var.cph<=variables.coords[3]+variables.coords[1])
                    ) {
                        gb_var.EffectFilter[variables.effect]()
                        // new IMAGEStriping.Effect(gb_var).Untitled_2()
                          // new IMAGEStriping.Effect(gb_var).Untitled_1()
                         // new IMAGEStriping.Effect(gb_var).Untitled_0()
                        // new IMAGEStriping.Effect(gb_var).HRPainting()
                       // new IMAGEStriping.Effect(gb_var).HRPainting("smooth")
                      // new IMAGEStriping.Effect(gb_var).OilPaints()
                    }
                    
                variables.canv.fillStyle = `rgba(${gb_var.imgdata.data[gb_var.i]},${gb_var.imgdata.data[gb_var.i+1]},${gb_var.imgdata.data[gb_var.i+2]},${gb_var.imgdata.data[gb_var.i+3]})`;
                variables.canv.fillRect(gb_var.cpw, gb_var.cph, 1, 1);
                gb_var.cpw += 1
                if (gb_var.cpw === gb_var.imgdata.width) gb_var.cpw = 0, gb_var.cph += 1;
                gb_var.i += 4;
            }
        }

    }

    IMAGEStriping.Effect = function (gb_var) {
        this.HRPAINTING = function () {
            if (sameRGB(gb_var.pr, [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], variables.effectIntensity)) {
                if (arguments[0] === "smooth") {
                    variables.paints_0.forEach(function () {
                        if (sameRGB(gb_var.pr, arguments[0], variables.effectIntensity)) {
                            gb_var.pr = arguments[0]
                        }
                    });
                }
                gb_var.imgdata.data[gb_var.i] = gb_var.pr[0],
                    gb_var.imgdata.data[gb_var.i + 1] = gb_var.pr[1],
                    gb_var.imgdata.data[gb_var.i + 2] = gb_var.pr[2],
                    gb_var.imgdata.data[gb_var.i + 3] = gb_var.pr[3];

            } else {
                gb_var.pr = [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]];
            }
        }

        this.SMOOTHHRPAINTING = function(){
            gb_var.EffectFilter.HRPAINTING('smooth')
        }

        this.OILPAINTS = function () {
            variables.paints_0.forEach(function () {
                if (sameRGB([gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], arguments[0], variables.effectIntensity)) {
                    gb_var.imgdata.data[gb_var.i] = arguments[0][0],
                        gb_var.imgdata.data[gb_var.i + 1] = arguments[0][1],
                        gb_var.imgdata.data[gb_var.i + 2] = arguments[0][2],
                        gb_var.imgdata.data[gb_var.i + 3] = arguments[0][3];
                }
            });
        }

        this.UNTITLED_0 = function () {
            variables.paints_0.forEach(function () {
                if (variables.RGBQuery.LRRange(arguments[0], [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], variables.effectIntensity)) {
                    gb_var.imgdata.data[gb_var.i] = arguments[0][0],
                        gb_var.imgdata.data[gb_var.i + 1] = arguments[0][1],
                        gb_var.imgdata.data[gb_var.i + 2] = arguments[0][2],
                        gb_var.imgdata.data[gb_var.i + 3] = arguments[0][3];
                }
            });
        }

        this.UNTITLED_1 = function () {
            variables.paints_1.forEach(function () {
                if (variables.RGBCondition.LRRange(arguments[0][0], [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], arguments[0][2] || variables.effectIntensity)) {
                    gb_var.imgdata.data[gb_var.i] = arguments[0][1][0],
                        gb_var.imgdata.data[gb_var.i + 1] = arguments[0][1][1],
                        gb_var.imgdata.data[gb_var.i + 2] = arguments[0][1][2],
                        gb_var.imgdata.data[gb_var.i + 3] = arguments[0][1][3];
                }
            });
        }

        this.UNTITLED_2 = function () {
                    gb_var.imgdata.data[gb_var.i] = gb_var.imgdata.data[gb_var.i] + variables.effectIntensity,
                        gb_var.imgdata.data[gb_var.i + 1] = gb_var.imgdata.data[gb_var.i+1] - variables.effectIntensity,
                        gb_var.imgdata.data[gb_var.i + 2] = gb_var.imgdata.data[gb_var.i+2] - variables.effectIntensity;
        }
    }
    variables.img.onload = onready;

    // console.log(sameRGB([80, 20, 0,1],[0, 0 ,0,1]));
}