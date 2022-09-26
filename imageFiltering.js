function ImageFiltering() {
    this.then=9

    var variables = {
        class:this,
        canv: document.createElement('canvas'),
        mx: 50000,
        mx: 10000,
        mx: 3000,
        mv: 50,
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
        }
    }

    // console.log(variables.RGBCondition.LRRange([87, 87, 87,255],[20, 20, 20,255], 80));
    // console.log(variables.RGBQuery.LRRange([87, 87, 87,255],[80, 80, 80,255], 50));

    var img = new Image();
    img.src = "img-9.jpg";
    document.body.appendChild(img)
    variables.canv.style.zoom=2.4
    document.body.appendChild(variables.canv)




    function onready() {
        var r = 180


        img.width = variables.canv.width = ((img.width + img.height) / img.height) * (r / 2)
        img.height = variables.canv.height = ((img.width + img.height) / img.width) * (r / 2)



        variables.canv = variables.canv.getContext('2d');

        variables.canv.drawImage(img, 0, 0, variables.canv.canvas.width, variables.canv.canvas.height)
        var gb_var = {
            imgdata: variables.canv.getImageData(0, 0, variables.canv.canvas.width, variables.canv.canvas.height),
            pr: [-255, -255, -255, -255],
            nx: [-255, -255, -255, -255],
            i: 0,
            cpw: 0,
            cph: 0
        };

        requestAnimationFrame(ProcessImage(gb_var))
        // requestAnimationFrame(function(){ProcessImage(gb_var)()})
        // console.log(gb_var.imgdata.data.length);
    }

    function ProcessImage(gb_var) {
        return function () {
            if (gb_var.i >= gb_var.imgdata.data.length) {
                return
            };
            if (gb_var.cpw === gb_var.imgdata.width) {
                gb_var.cpw = 0;
                gb_var.cph += 1;
            }

            new IMAGEStriping(gb_var).default()
            requestAnimationFrame(arguments.callee)
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
            for (var _i = 0; _i < variables.mx; _i++) {
                if (gb_var.i >= gb_var.imgdata.data.length) {
                    // variables.canv.clearRect(0,0,variables.canv.width,variables.canv.height)
                    // variables.canv.putImageData(gb_var.imgdata,0,0)
                    return
                };
                gb_var.pr = [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]]
                if (
                    true ||
                    (gb_var.pr[0] > gb_var.imgdata.data[gb_var.i] ? gb_var.imgdata.data[gb_var.i] + variables.mv >= gb_var.pr[0] : gb_var.pr[0] + variables.mv >= gb_var.imgdata.data[gb_var.i]) &&
                    (gb_var.pr[1] > gb_var.imgdata.data[gb_var.i + 1] ? gb_var.imgdata.data[gb_var.i + 1] + variables.mv >= gb_var.pr[1] : gb_var.pr[1] + variables.mv >= gb_var.imgdata.data[gb_var.i + 1]) &&
                    (gb_var.pr[2] > gb_var.imgdata.data[gb_var.i + 2] ? gb_var.imgdata.data[gb_var.i + 2] + variables.mv >= gb_var.pr[2] : gb_var.pr[2] + variables.mv >= gb_var.imgdata.data[gb_var.i + 2]) &&
                    (gb_var.pr[3] > gb_var.imgdata.data[gb_var.i + 3] ? gb_var.imgdata.data[gb_var.i + 3] + variables.mv >= gb_var.pr[3] : gb_var.pr[3] + variables.mv >= gb_var.imgdata.data[gb_var.i + 3])
                ) {

                    variables.paints_0.forEach(function () {
                        if (sameRGB(gb_var.pr, arguments[0], variables.mv)) {
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
            for (var _i = 0; _i < variables.mx; _i++) {
                if (gb_var.i >= gb_var.imgdata.data.length) {
                    //  variables.canv.clearRect(0,0,variables.canv.width,variables.canv.height)
                    // variables.canv.putImageData(gb_var.imgdata,0,0)
                    return
                };

                // new IMAGEStriping.Effect(gb_var).Untitled_1()
                // new IMAGEStriping.Effect(gb_var).Untitled_0()
                // new IMAGEStriping.Effect(gb_var).HRPainting()
                new IMAGEStriping.Effect(gb_var).HRPainting("smooth")
                // new IMAGEStriping.Effect(gb_var).OilPaints()
                variables.canv.fillStyle = `rgba(${gb_var.imgdata.data[gb_var.i]},${gb_var.imgdata.data[gb_var.i+1]},${gb_var.imgdata.data[gb_var.i+2]},${gb_var.imgdata.data[gb_var.i+3]})`;
                variables.canv.fillRect(gb_var.cpw, gb_var.cph, 1, 1);
                gb_var.cpw += 1
                if (gb_var.cpw === gb_var.imgdata.width) gb_var.cpw = 0, gb_var.cph += 1;
                gb_var.i += 4;
            }
        }

    }

    IMAGEStriping.Effect = function (gb_var) {
        this.HRPainting = function () {
            if (sameRGB(gb_var.pr, [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], variables.mv)) {
                if (arguments[0] === "smooth") {
                    variables.paints_0.forEach(function () {
                        if (sameRGB(gb_var.pr, arguments[0], variables.mv)) {
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

        this.OilPaints = function () {
            variables.paints_0.forEach(function () {
                if (sameRGB([gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], arguments[0], variables.mv)) {
                    gb_var.imgdata.data[gb_var.i] = arguments[0][0],
                        gb_var.imgdata.data[gb_var.i + 1] = arguments[0][1],
                        gb_var.imgdata.data[gb_var.i + 2] = arguments[0][2],
                        gb_var.imgdata.data[gb_var.i + 3] = arguments[0][3];
                }
            });
        }

        this.Untitled_0 = function () {
            variables.paints_0.forEach(function () {
                if (variables.RGBQuery.LRRange(arguments[0], [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], variables.mv)) {
                    gb_var.imgdata.data[gb_var.i] = arguments[0][0],
                        gb_var.imgdata.data[gb_var.i + 1] = arguments[0][1],
                        gb_var.imgdata.data[gb_var.i + 2] = arguments[0][2],
                        gb_var.imgdata.data[gb_var.i + 3] = arguments[0][3];
                }
            });
        }

        this.Untitled_1 = function () {
            variables.paints_1.forEach(function () {
                if (variables.RGBCondition.LRRange(arguments[0][0], [gb_var.imgdata.data[gb_var.i], gb_var.imgdata.data[gb_var.i + 1], gb_var.imgdata.data[gb_var.i + 2], gb_var.imgdata.data[gb_var.i + 3]], arguments[0][2] || variables.mv)) {
                    gb_var.imgdata.data[gb_var.i] = arguments[0][1][0],
                        gb_var.imgdata.data[gb_var.i + 1] = arguments[0][1][1],
                        gb_var.imgdata.data[gb_var.i + 2] = arguments[0][1][2],
                        gb_var.imgdata.data[gb_var.i + 3] = arguments[0][1][3];
                }
            });
        }
    }
    img.onload = onready;

    // console.log(sameRGB([80, 20, 0,1],[0, 0 ,0,1]));
}