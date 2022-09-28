function update(src) {
    updates.forEach(function(){
        arguments[0](src)
    })
}

function upload() {
    upload.input.click();
    upload.input.onchange = function(){
        if (upload.input.files[0].type.split("/")[0]==="image") {
            update(upload.input.files[0])
        }
    }
}

function save() {
    if (img) {
        img.getDataURL().then(function(){
            save.a.download="Web Image - "+Date.now()
            save.a.href=arguments[0]
            save.a.click()
            save.a.href=""
        });
    }else{
        console.log('still loading image');
    }
}

save.a=document.createElement('a');
upload.input=document.createElement("input")
upload.input.type="file"



var img;
var src="img-3.jpg"
var updates=[];

window.onload = function(){
    
var st = document.querySelectorAll("button canvas")
for (var i = 0; i < st.length; i++) {
    st[i].onclick = function(){
        if (img) {
            img.addEffect({filter_style:this.getAttribute('filter')})
        }else{
            console.log('still loading image');
        }
    }
    new ImageEditor({
        src:src,
        canvas:st[i],
        size:70,
        filter_style: st[i].getAttribute('filter'),
    }).then(function(e){
    updates.push(function(){
        e.updateImage(arguments[0],true).then(function(){
        e.addEffect({filter_style:-1});
        });
    })
    });
}

    new ImageEditor({
        src:src,
        canvas:canv,
        image_type:"image/jpeg",
        output:"dataURL",
        size:canv.offsetWidth,
        onload:null,
        onprogress:null,
        onerror:null,
        onready:null,
    }).then(function(e){
        img=e
        updates.push(function(){
        e.updateImage(arguments[0],true)
    })
    });
    


}




