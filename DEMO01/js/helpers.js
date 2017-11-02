$(function(){
	/**
     * 是否相等
     */
    Handlebars.registerHelper('eq', function (a, b) {
        return a == b;
    });
    
    /*
    * 金额格式化
    */
    Handlebars.registerHelper('formatMoney', function (s) {
        n = 2;
        if(s==0){
            return s.toFixed(n);
        }else if(!s){
            return '';
        }else{
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            t = "";
            for(i = 0; i < l.length; i ++ ){
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        }

       });
    /**
     * 数值求和
     */
    Handlebars.registerHelper('sum', function () {
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
            var val = parseFloat(arguments[i]);
            if (!isNaN(val)) {
                sum += val;
            }
        }
        return sum;
    });
})

