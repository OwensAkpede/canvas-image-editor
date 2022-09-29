function update(src) {
    updates.forEach(function(){
        arguments[0](src)
    })
}

function upload() {
    upload.input.click();
    upload.input.onchange = function(){
        if (upload.input.files[0].type.search(/^(image|video)+\//i)>=0) {
            update(upload.input.files[0])
        }
        upload.input.value=""
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
upload.input.accept="image/*,video/*"



var img;
var src="img-9.jpg"
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
        rendering_quality:'low'
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
        rendering_quality:'high',
        image_type:"image/jpeg",
        output_type:"dataURL",
        size:500||canv.offsetWidth,
        onload:null,
        onprogress:null,
        onerror:null,
        onready:null,
        enable_transition:true,
    }).then(function(e){
        img=e
        updates.push(function(){
        e.updateImage(arguments[0],true)
    })
    });
    


}




