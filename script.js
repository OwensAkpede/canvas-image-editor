var canv = document.createElement('canvas')
var img = new Image();
_img.src =
    img.src = "img-12.jpeg";
    // img.src = "img.png";

var mx = 4000;
var mv = 50;
var paints = [


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
    [199, 171, 167, 255], //x
    [199, 171, 167, 255], //x
    [199, 171, 167, 255], //x
    [199, 171, 167, 255], //x
    [199, 171, 167, 255], //x



    [92, 92, 92,255],//black
    [34, 34, 34,255],//black
    [0, 0, 0,255],//black

    [232, 236, 244,255],//white
    [255, 255, 255,255],//white

    [231, 51, 51  ,255],//red
    [51, 88, 231  ,255],//blue
    [97, 231, 51  ,255],//green
    [220, 224, 50  ,255],//yellow
    [224, 50, 222  ,255],//pink
    [224, 156, 50  ,255],//orange
    [50, 218, 224  ,255],//purple
];


document.body.appendChild(canv)

img.onload = function (e) {

    var w = canv.width = img.width
    var h = canv.height = img.height

    canv = canv.getContext('2d');
    canv.drawImage(img, 0, 0)

    var imgdata = canv.getImageData(0, 0, w, h)
console.log(imgdata);
    var pr = [];
    var i = 0;
    var cpw = 0;
    var cph = 0;


    (function () {
        if (i >= imgdata.data.length) {
            return
        };
        if (cpw === imgdata.width) {
            cpw = 0;
            cph += 1;
        }

        for (var _i = 0; _i < mx; _i++) {
            if (i >= imgdata.data.length) {
                // canv.clearRect(0,0,w,h)
                // canv.putImageData(imgdata,0,0)
                return
            };
            pr=[imgdata.data[i],imgdata.data[i+1],imgdata.data[i+2],imgdata.data[i+3]]
            if (
                true||
                (pr[0] > imgdata.data[i] ? imgdata.data[i] + mv >= pr[0] : pr[0] + mv >= imgdata.data[i]) &&
                (pr[1] > imgdata.data[i + 1] ? imgdata.data[i + 1] + mv >= pr[1] : pr[1] + mv >= imgdata.data[i + 1]) &&
                (pr[2] > imgdata.data[i + 2] ? imgdata.data[i + 2] + mv >= pr[2] : pr[2] + mv >= imgdata.data[i + 2]) &&
                (pr[3] > imgdata.data[i + 3] ? imgdata.data[i + 3] + mv >= pr[3] : pr[3] + mv >= imgdata.data[i + 3])
            ) {
                
                paints.forEach(function () {
                    if (sameRGB(pr, arguments[0],mv)) {
                        pr = arguments[0]
                    }
                });
                imgdata.data[i] = pr[0],
                imgdata.data[i + 1] = pr[1],
                imgdata.data[i + 2] = pr[2],
                imgdata.data[i + 3] = pr[3];

            } else {
                pr = [imgdata.data[i], imgdata.data[i + 1], imgdata.data[i + 2], imgdata.data[i + 3]];
            }

            canv.fillStyle = `rgba(${imgdata.data[i]},${imgdata.data[i+1]},${imgdata.data[i+2]},${imgdata.data[i+3]})`;
            canv.fillRect(cpw, cph, 1, 1);
            cpw += 1
            if (cpw === imgdata.width) cpw = 0, cph += 1;
            i += 4
        }

        requestAnimationFrame(arguments.callee)
    })();
}


function sameRGB(pr, data, mv) {
    if (!mv) {
        mv = 120
    }
    // setTimeout(() => {
    //     console.log(pr,data);
    // }, 200);
    if (pr[0] === undefined) {
        return false
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

// console.log(sameRGB([80, 20, 0,1],[0, 0 ,0,1]));