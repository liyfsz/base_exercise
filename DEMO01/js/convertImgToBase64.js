/* 2015-09-28 上传图片*/
    function convertImgToBase64(url, callback, outputFormat){ 
        var canvas = document.createElement('CANVAS'); 
        var ctx = canvas.getContext('2d'); 
        var img = new Image; 
        img.crossOrigin = 'Anonymous'; 
        img.onload = function(){
          var width = img.width;
          var height = img.height;
          // 按比例压缩4倍
          var rate = (width<height ? width/height : height/width)/4;
          canvas.width = width*rate; 
          canvas.height = height*rate; 
          ctx.drawImage(img,0,0,width,height,0,0,width*rate,height*rate); 
          var dataURL = canvas.toDataURL(outputFormat || 'image/png'); 
          callback.call(this, dataURL); 
          canvas = null; 
        };
        img.src = url; 
      }

       function getObjectURL(file) {
            var url = null ; 
            if (window.createObjectURL!=undefined) {  // basic
              url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) {       // mozilla(firefox)
              url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // web_kit or chrome
              url = window.webkitURL.createObjectURL(file) ;
            }
            return url ;
      }
     // 前端只需要给input file绑定这个change事件即可（上面两个方法不用管）huodong-msg为input class
      $('.huodong-msg').bind('change',function(event){
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img){
              // base64Img为转好的base64,放在img src直接前台展示(<img src="data:image/jpg;base64,/9j/4QMZRXh...." />)
              alert(base64Img);
              // base64转图片不需要base64的前缀data:image/jpg;base64
              alert(base64Img.split(",")[1]);
            });
            event.preventDefault(); 
        }); 
    /* 2015-09-28 */