function ImageEditor() {
    var _this = {}

    if (_this instanceof Window) {
        return;
    }

    _this.onprogress = arguments[0].onprogress
    _this.onready = arguments[0].onready
    _this.onerror = arguments[0].onerror
    _this.onload = arguments[0].onload

    var variables = {
        resolve: new Function(),
        reject: new Function(),
        class: _this,
        canv: arguments[0].canvas instanceof HTMLCanvasElement ? arguments[0].canvas : document.createElement('canvas'),
        img: arguments[0].src,
        disable_transition: arguments[0].disable_transition || null,
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
        callDelay: function () {
            a = arguments;
            requestAnimationFrame(function () {
                if (a[0] instanceof Array) {
                    a[0] = variables.class["on" + a[0]]
                }
                if (a[0] instanceof Function) {
                    a[0](a[1])
                }
            });
        },
        call: function () {
            if (arguments[0] instanceof Array) {
                arguments[0] = variables.class["on" + arguments[0]]
            }
            if (arguments[0] instanceof Function) {

                arguments[0](arguments[1])
            }
        },
        toValidOption: function () {
            if (!(arguments[0] instanceof Object)) {
                return {};
            }
            return {
                renderingSpeed: 1000,
                quality: typeof arguments[0].quality == "number" ? arguments[0].quality : 1,
                imageType: typeof arguments[0].image_type == "string" ? arguments[0].image_type : "image/jpeg",
                output: typeof arguments[0].output == "string" ? arguments[0].output.toUpperCase() : null,
                effect: typeof arguments[0].filter_style == "string" ? arguments[0].filter_style.toUpperCase().replace(/[^a-z0-9]/ig, '').replace(/\d/g, "_$&") : arguments[0].filter_style===-1?variables.options.effect:null,
                effectIntensity: typeof arguments[0].filter_intensity == "number" ? arguments[0].filter_intensity : 50,
                size: typeof arguments[0].size === "number" ? arguments[0].size : null,
                coords: (arguments[0].filter_coords instanceof Array) && arguments[0].filter_coords.length === 4 ? arguments[0].filter_coords : null
            };
        }
    }

    variables.options = variables.toValidOption(arguments[0])
    variables.options.event = [
        ['load'],
        ['progress'],
        ['ready'],
        ['error']
    ];



    function check_src() {
        variables.returned = new Promise(function () {
            variables.resolve = arguments[0];
            variables.reject = arguments[1]
        })

        if (variables.canv instanceof HTMLCanvasElement && variables.canv.hasAttribute("src")) {
            variables.img=variables.canv.getAttribute("src")
        }

        if (typeof variables.img === "string") {
            variables.src = variables.img;
            variables.img = new Image();
            variables.img.src = variables.src
            check_src.img()
        } else if (variables.img instanceof HTMLImageElement) {
            check_src.img()
        } else if (variables.img instanceof Blob) {
            if (typeof window.createImageBitmap === "function") {
                variables.img=window.createImageBitmap(variables.img)
                variables.img.then(function(){
                    variables.img=arguments[0]
                    variables.img.naturalHeight=variables.img.height
                    variables.img.naturalWidth=variables.img.width
                    all_ready(true)
                }).catch(function(){
                    variables.img = new Image();
                    variables.img.src = "";
                    check_src.img()
                });
            }else{
                variables.img=URL.createObjectURL(variables.img);
                variables.src = variables.img;
                variables.objectURL = true;
                variables.img = new Image();
                variables.img.src = variables.src
                check_src.img()
            }
        }else {
            variables.reject("invalid source> src: <Path, Url, HTMLImageElement, Blob, Bitmap>")
            return variables.callDelay(['error'], "invalid source> src: <Path, Url, HTMLImageElement, Blob, Bitmap>")
        }
        return variables.returned
    }
    check_src.img = function(){
        if (variables.img.complete) {
            all_ready(true)
        } else {
            variables.img.addEventListener('load', all_ready)
            variables.img.addEventListener('error', all_ready)
        }
    }
    function all_ready() {
if (variables.objectURL) {
    URL.revokeObjectURL(variables.src)
    delete variables.objectURL
}
        if (variables.updating) {
            variables.canv=variables.canv.canvas;
            variables.updating=null
            //  variables.call()
        }

        if (arguments[0] instanceof Event || arguments[0] === true) {
        if (arguments[0].type==="error") {
             if (variables.options.size) {
                 variables.width_radio = ((variables.canv.width + variables.canv.height) /  variables.canv.height)
                 variables.height_radio = ((variables.canv.width + variables.canv.height) / variables.canv.width)
                 
                 variables.width = variables.width_radio * (variables.options.size / variables.width_radio)
                 variables.height = variables.height_radio * (variables.options.size / variables.width_radio)
            }else{
                    variables.width = variables.canv.width
                    variables.height= variables.canv.height
                }
        } else {
                if (!variables.options.size) {
                    variables.width = variables.img.naturalHeight
                    variables.height= variables.img.naturalWidth
                } else {
                    variables.width_radio = ((variables.img.naturalWidth + variables.img.naturalHeight) / variables.img.naturalHeight)
                    variables.height_radio = ((variables.img.naturalWidth + variables.img.naturalHeight) / variables.img.naturalWidth)

                    variables.width = variables.width_radio * (variables.options.size / variables.width_radio)
                    variables.height = variables.height_radio * (variables.options.size / variables.width_radio)
                }
        }



        variables.canv.style.width=
         (variables.canv.width =variables.width)+"px";
        variables.canv.style.height = 
        (variables.canv.height=variables.height)+"px";


            variables.canv = variables.canv.getContext('2d');

        if (arguments[0].type!=="error") {
            variables.canv.drawImage(variables.img, 0, 0, variables.width, variables.height)
        }

        if (variables.img instanceof ImageBitmap) {
            variables.img.close()
        }
            
            variables.gb_var = {
                options: variables.options,
                original_img_data: variables.canv.getImageData(0, 0, variables.width, variables.height),
                imgdata:variables.canv.getImageData(0, 0, variables.width, variables.height),
                pr: [-255, -255, -255, -255],
                nx: [-255, -255, -255, -255],
                i: 0,
                cpw: 0,
                cph: 0
            };
        } else {
            variables.gb_var = arguments[0];
            arguments[1].__proto__ = variables
            variables = arguments[1]
        }


        variables.gb_var.EffectFilter = new IMAGEStriping.Effect(variables.gb_var)

        if (variables.updating) {

            variables.updating = null
        }
        variables.resolve(new IMGController(variables.gb_var))

        variables.call(variables.gb_var.options.event[0])

        if (variables.gb_var.EffectFilter.hasOwnProperty(variables.gb_var.options.effect)) {
            requestAnimationFrame(ProcessImage(variables.gb_var))
        } else {
            variables.call(variables.gb_var.options.event[1], 100)
            ProcessImageComplete(variables.gb_var)
        }
    }

    function IMGController() {

        this.updateImage = function () {
            variables.img = arguments[0]
            variables.gb_var.imgdata.closed=true
            if (!arguments[1]) {
                variables.canv.clearRect(0, 0, variables.width, variables.height)
            }
            variables.updating = true
            return check_src()
        }

        this.addEffect = function () {
            var gb_var = {
                __proto__: variables.gb_var,
                pr: [-255, -255, -255, -255],
                nx: [-255, -255, -255, -255],
                i: 0,
                cpw: 0,
                cph: 0
            }
            gb_var.EffectFilter = new IMAGEStriping.Effect(gb_var)
            gb_var.options = variables.toValidOption(arguments[0])
            gb_var.options.event = [null, null, null, null]
            gb_var.options.output = "RETURN"

            var p = {
                then: function () {
                    pm.then(arguments[0])
                    return p;
                },
                catch: function () {
                    pm.catch(arguments[0])
                    return p;
                },
                progress: function () {
                    gb_var.options.event[1] = arguments[0];
                    return p
                }
            }





            var pm = new Promise(function () {
                gb_var.options.event[2] = arguments[0]
                gb_var.options.event[3] = arguments[1]
            });


            if (!gb_var.EffectFilter.hasOwnProperty(gb_var.options.effect)) {
                ProcessImageComplete(gb_var)
            } else {
                requestAnimationFrame(ProcessImage(gb_var))
            }
            return p
        }
        this.getDataURL = function () {
            return new Promise(function (r) {
                ProcessImageComplete({
                    __proto__: variables.gb_var,
                    options: {
                        output: "DATAURL",
                        event: {
                            2: r
                        },
                        __proto__: variables.gb_var.options
                    }
                })
            });
        }

        this.getBlob = function () {
            return new Promise(function (r) {
                ProcessImageComplete({
                    __proto__: variables.gb_var,
                    options: {
                        output: "BLOB",
                        event: {
                            2: r
                        },
                        __proto__: variables.gb_var.options
                    }
                })
            });
        }
    }

    function ProcessImage(gb_var) {
        return function () {
            if (gb_var.imgdata.closed) {
                return
            }
            if (gb_var.i >= gb_var.imgdata.data.length) {
                ProcessImageComplete(gb_var, true)
                return
            };
            if (gb_var.cpw === gb_var.imgdata.width) {
                gb_var.cpw = 0;
                gb_var.cph += 1;
            }
            new IMAGEStriping(gb_var).default()
            variables.call(gb_var.options.event[1], Math.min((gb_var.i * 100) / gb_var.imgdata.data.length, 100))
            requestAnimationFrame(arguments.callee)
        }
    }

    function ProcessImageComplete(gb_var, clearRect) {
        if (clearRect) {
            variables.canv.clearRect(0, 0, variables.width, variables.height)
            variables.canv.putImageData(gb_var.imgdata, 0, 0)
        }
        if (gb_var.options.output === "CANVAS") {
            variables.call(gb_var.options.event[2], variables.canv)
        } else if (gb_var.options.output === "IMAGEDATE") {
            variables.call(gb_var.options.event[2], gb_var.imgdata)
        } else if (gb_var.options.output === "DATAURL") {
            variables.call(gb_var.options.event[2], variables.canv.canvas.toDataURL(gb_var.options.imageType, gb_var.options.quality))
        } else if (gb_var.options.output === "BLOB") {
            if (typeof variables.canv.canvas.toBlob === "function") {
                variables.canv.canvas.toBlob(function () {
                    variables.call(gb_var.options.event[2], arguments[0])
                }, gb_var.options.imageType, gb_var.options.quality || 1)
            } else {
                /*
                
                Blob not Supported - fix 
                
                */
            }
        } else if (gb_var.options.output === "RETURN") {
            variables.call(gb_var.options.event[2])
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
        this.default = function () {
            for (var _i = 0; _i < gb_var.options.renderingSpeed; _i++) {
                if (gb_var.imgdata.closed) {
                    return
                }
                if (gb_var.i >= gb_var.imgdata.data.length) {
                    return
                };


                if (
                    gb_var.options.coords &&
                    (gb_var.cpw >= gb_var.options.coords[0] && gb_var.cph >= gb_var.options.coords[1]) &&
                    (gb_var.cpw <= gb_var.options.coords[2] + gb_var.options.coords[0] && gb_var.cph <= gb_var.options.coords[3] + gb_var.options.coords[1])
                ) {
                    gb_var.EffectFilter[gb_var.options.effect]()
                } else {
                    gb_var.EffectFilter[gb_var.options.effect]()
                }

                if (!variables.disable_transition) {
                    variables.canv.fillStyle = `rgba(${gb_var.imgdata.data[gb_var.i]},${gb_var.imgdata.data[gb_var.i+1]},${gb_var.imgdata.data[gb_var.i+2]},${gb_var.imgdata.data[gb_var.i+3]})`;
                    variables.canv.fillRect(gb_var.cpw, gb_var.cph, 1, 1);
                }
                gb_var.cpw += 1
                if (gb_var.cpw === gb_var.imgdata.width) gb_var.cpw = 0, gb_var.cph += 1;
                gb_var.i += 4;
            }
        }

    }

    IMAGEStriping.Effect = function (gb_var) {
        this.HRPAINTING = function () {
            if (sameRGB(gb_var.pr, [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], gb_var.options.effectIntensity)) {
                if (arguments[0] === "smooth") {
                    variables.paints_0.forEach(function () {
                        if (sameRGB(gb_var.pr, arguments[0], gb_var.options.effectIntensity)) {
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

        this.SMOOTHHRPAINTING = function () {
            gb_var.EffectFilter.HRPAINTING('smooth')
        }

        this.OILPAINTS = function () {
            variables.paints_0.forEach(function () {
                if (sameRGB([gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], arguments[0], gb_var.options.effectIntensity)) {
                    gb_var.imgdata.data[gb_var.i] = arguments[0][0],
                        gb_var.imgdata.data[gb_var.i + 1] = arguments[0][1],
                        gb_var.imgdata.data[gb_var.i + 2] = arguments[0][2],
                        gb_var.imgdata.data[gb_var.i + 3] = arguments[0][3];
                }
            });
        }

        this.UNTITLED_0 = function () {
            variables.paints_0.forEach(function () {
                if (variables.RGBQuery.LRRange(arguments[0], [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], gb_var.options.effectIntensity)) {
                    gb_var.imgdata.data[gb_var.i] = arguments[0][0],
                        gb_var.imgdata.data[gb_var.i + 1] = arguments[0][1],
                        gb_var.imgdata.data[gb_var.i + 2] = arguments[0][2],
                        gb_var.imgdata.data[gb_var.i + 3] = arguments[0][3];
                }
            });
        }

        this.UNTITLED_1 = function () {
            variables.paints_1.forEach(function () {
                if (variables.RGBCondition.LRRange(arguments[0][0], [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], arguments[0][2] || gb_var.options.effectIntensity)) {
                    gb_var.imgdata.data[gb_var.i] = arguments[0][1][0],
                        gb_var.imgdata.data[gb_var.i + 1] = arguments[0][1][1],
                        gb_var.imgdata.data[gb_var.i + 2] = arguments[0][1][2],
                        gb_var.imgdata.data[gb_var.i + 3] = arguments[0][1][3];
                }
            });
        }

        this.UNTITLED_2 = function () {
            gb_var.imgdata.data[gb_var.i] = gb_var.imgdata.data[gb_var.i] + gb_var.options.effectIntensity,
                gb_var.imgdata.data[gb_var.i + 1] = gb_var.imgdata.data[gb_var.i + 1] - gb_var.options.effectIntensity,
                gb_var.imgdata.data[gb_var.i + 2] = gb_var.imgdata.data[gb_var.i + 2] - gb_var.options.effectIntensity;
        }
    }

    return check_src()
}