;(function($){
	function Clock(){}
	
	//创建表盘
	Clock.prototype.createClock=function(_selector){
		var w,h;
        for(var i=0;i<60;i++){
            if(i%5==0){
                w=6;
                h=30;
            }else{
                w=4;
                h=24;
            }
            var cellStyle="width: "+w+"px;height: "+h+"px;background: #000;position:absolute;left:0;top:0;right:0;bottom:0;transform: translate(400px,0) rotate("+6*i+"deg);transform-origin: "+w/2+"px 200px;";
            var $cell=$("<div></div>");
            $cell.attr("style",cellStyle);
//            $cell[0].style.cssText=cellStyle;
            $cell.appendTo($(_selector));
        }
	};

	//创建指针
	Clock.prototype.createPointer=function(w,h,c,d,_selector){
		var centerStyle="width:30px;height:30px;background:#000;border-radius:50%;position:absolute;left:388px;top:185px;";
        var $center=$('<div></div>');
        $center.attr("style",centerStyle);
        $center.appendTo($(_selector));

        var pointerStyle="width:"+w+"px;height:"+h+"px;background:"+c+";position:absolute;left:"+(400+(6-w)/2)+"px;top:"+(200-h)+"px;transform: rotate("+d+"deg);transform-origin: center bottom;";
        var $pointer=$('<div></div>');
        $pointer.attr("style",pointerStyle);
        $pointer.appendTo($(_selector));
        return $pointer[0];
	}
	
	//得到时分秒针的旋转角度
    function getDeg(date){
        var hd=date.getHours();
        hd=hd>12?hd-12:hd;
        var md=date.getMinutes();
        hd=hd*30+(md/2);
        var sd=date.getSeconds();

        var degs=[hd,md*6,sd*6];
        return degs;
    }
	
	var clock=new Clock();
	
	
	$.fn.extend({
		createClock:function(){
			var _selector = $(this).selector;
			
			clock.createClock(_selector);
			
			var date=new Date();
	        var degs=getDeg(date);
	        var h=clock.createPointer(6,100,"#000",degs[0],_selector);
	        var m=clock.createPointer(4,120,"#000",degs[1],_selector);
	        var s=clock.createPointer(2,150,"#000",degs[2],_selector);

	        setInterval(function(){
	            var date=new Date();
	            var degs=getDeg(date);
	            h.style.transform="rotate("+degs[0]+"deg)";
	            m.style.transform="rotate("+degs[1]+"deg)";
	            s.style.transform="rotate("+degs[2]+"deg)";
	        },1000);
		}
	})
})(jQuery)