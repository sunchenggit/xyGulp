/* debug */
function bcastr(pic, url, dir, width, height){
    linkarr = new Array();
    picarr  = new Array();
    textarr = new Array();
    var swf_width = width;
    var swf_height = height;
    //文字颜色|文字位置|文字背景颜色|文字背景透明度|按键文字颜色|按键默认颜色|按键当前颜色|自动播放时间|图片过渡效果|是否显示按钮|打开方式
    var configtg='0xffffff|0|0x3FA61F|5|0xffffff|0xC5DDBC|0x000033|2|3|1|_blank';
    var files = "";
    var links = "";
    var texts = "";
    //这里设置调用标记
    linkarr = url;
    picarr  = pic;
  
     
    for(var i=1;i<picarr.length;i++){
    if(files=="") files = picarr[i];
    else files += "|"+picarr[i];
    }
    for(i=1;i<linkarr.length;i++){
    if(links=="") links = linkarr[i];
    else links += "|"+linkarr[i];
    }
    
    document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ swf_width +'" height="'+ swf_height +'">');
    document.write('<param name="movie" value="' + dir + 'images/bcastr3.swf"><param name="quality" value="high">');
    document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
    document.write('<param name="FlashVars" value="bcastr_file='+files+'&bcastr_link='+links+'&bcastr_title='+texts+'">');
    document.write('<embed src="'+ dir + 'images/bcastr3.swf" wmode="opaque" FlashVars="bcastr_file='+files+'&bcastr_link='+links+'&bcastr_title='+texts+'& menu="false" quality="high" width="'+ swf_width +'" height="'+ swf_height +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'); document.write('</object>'); 
  }