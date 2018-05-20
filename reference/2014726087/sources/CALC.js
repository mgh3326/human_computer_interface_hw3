document.write("<script src = './sources/math.js'></script>");

$(function() {
    var header = ".calc-header";
    var body = ".calc-body";
    var $buttons = $("button");
    var $past_string = '';
    var x, y, z;
    var f, g;
    var x_count, y_count, z_count;
    var f_count, g_count;

    $buttons.mousedown(function (){
        var newVal = $(this).val();
        var $inval = $("#inval");
        var $oldval = $inval.val();

        /* for math.parser use */
        var parser = math.parser();

        if(newVal == 'ex')  //Ex버튼을 입력받았을 때
        {
            $past_string += '<BR>';
            try
            {
                /*split을 사용하여 변수저장유무 학인후 조치*/
                var token = $oldval.split('=');
                if(token[0] == 'x' && token[1] != null){
                    x = $oldval; x_count = 1; $oldval = '';
                }
                if(token[0] == 'y' && token[1] != null){
                    y = $oldval; y_count = 1; $oldval = '';
                }
                if(token[0] == 'z' && token[1] != null){
                    z = $oldval; z_count = 1; $oldval = '';
                }
                if(x_count == 1)
                    parser.eval(x.toString());
                if(y_count == 1)
                    parser.eval(y.toString());
                if(z_count == 1)
                    parser.eval(z.toString());

                /*split을 사용하여 함수저장유무 학인후 조치*/
                if((token[0] == 'f(x)' || token[0] == 'f(y)' || token[0] == 'f(z)' ||
                    token[0] == 'f(x,y)' || token[0] == 'f(x,z)' || token[0] == 'f(y,x)' ||
                    token[0] == 'f(x,z)' || token[0] == 'f(z,x)' || token[0] == 'f(z,y)' ||
                    token[0] == 'f(x,y,z)' || token[0] == 'f(x,z,y)' || token[0] == 'f(y,x,z)' ||
                    token[0] == 'f(y,z,x)' || token[0] == 'f(z,x,y)' || token[0] == 'f(z,y,x)')
                    && token[1] != null)
                {
                    f = $oldval; f_count = 1; $oldval = '';
                }
                if((token[0] == 'g(x)' || token[0] == 'g(y)' || token[0] == 'g(z)' ||
                    token[0] == 'g(x,y)' || token[0] == 'g(x,z)' || token[0] == 'g(y,x)' ||
                    token[0] == 'g(x,z)' || token[0] == 'g(z,x)' || token[0] == 'g(z,y)' ||
                    token[0] == 'g(x,y,z)' || token[0] == 'g(x,z,y)' || token[0] == 'g(y,x,z)' ||
                    token[0] == 'g(y,z,x)' || token[0] == 'g(z,x,y)' || token[0] == 'g(z,y,x)')
                    && token[1] != null)
                {
                    g = $oldval; g_count = 1; $oldval = '';
                }
                if(f_count == 1)
                    parser.eval(f.toString());
                if(g_count == 1)
                    parser.eval(g.toString());

                /*수식 계산*/
                var result = parser.eval($oldval);
                
            }
            catch(Exception)
            {
                 $('#past').html(Exception);
                 return 0;
            }
            if(result != null)
            {
                $('#past').html($past_string);
                $past_string += result;
            }
        }
        else if(newVal == 'AC') //AC버튼을 입력받았을 때
        {
            $past_string = '';
            $('#past').html($past_string);
            var result = null;
        }
        else if(newVal == 'func')
        {
            var obj = $("#id_func").offset();
            $("#selector_func").css("top", obj.top - 40);
            $("#selector_func").css("left", obj.left  - 85);
            $("#selector_func").show();
            var result = $oldval;
        }
        else if(newVal == 'ang')
        {
            var obj = $("#id_ang").offset();
            $("#selector_ang").css("top", obj.top - 40);
            $("#selector_ang").css("left", obj.left  - 135);
            $("#selector_ang").show();
            var result = $oldval;
        }
        else if(newVal == 'const')
        {
            var obj = $("#id_const").offset();
            $("#selector_const").css("top", obj.top - 40);
            $("#selector_const").css("left", obj.left  - 85);
            $("#selector_const").show();
            var result = $oldval;
        }
        else if(newVal == 'logic')
        {
            var obj = $("#id_logic").offset();
            $("#selector_logic").css("top", obj.top - 40);
            $("#selector_logic").css("left", obj.left  - 160);
            $("#selector_logic").show();
            var result = $oldval;
        }
        else if(newVal == 'bracket')
        {
            var obj = $("#id_bracket").offset();
            $("#selector_bracket").css("top", obj.top - 40);
            $("#selector_bracket").css("left", obj.left  - 60);
            $("#selector_bracket").show();
            var result = $oldval;
        }
        else if(newVal == 'matrix')
        {
            var obj = $("#id_matrix").offset();
            $("#selector_matrix").css("top", obj.top - 40);
            $("#selector_matrix").css("left", obj.left  - 160);
            $("#selector_matrix").show();
            var result = $oldval;
        }
        else if(newVal == 'var')
        {
            var obj = $("#id_var").offset();
            $("#selector_var").css("top", obj.top - 40);
            $("#selector_var").css("left", obj.left  - 110);
            $("#selector_var").show();
            var result = $oldval;
        }
        else if(newVal == 'dfunc')
        {
            var obj = $("#id_dfunc").offset();
            $("#selector_dfunc").css("top", obj.top - 40);
            $("#selector_dfunc").css("left", obj.left  - 160);
            $("#selector_dfunc").show();
            var result = $oldval;
        }
        else if(newVal == 'back')
        {
            if($oldval != '')
            {
                var result = $oldval.slice(0, -1);
                $past_string = $past_string.slice(0,-1);
                $('#past').html($past_string);
                $inval.val(result);

            }
        }
        else
        {
            var result = $oldval+newVal;
            $past_string += newVal;
            $('#past').html($past_string);
        }
        $inval.val(result);
        $('#past').html($past_string);
    });

    /*구조선택자 이벤트 처리*/
    $('.selector_btn').mouseover(function(){
            $(this).css("background-color", "#008CBA");
    });
    $('.selector_btn').mouseout(function(){
            $(this).css("background-color", "#00BCEA");
    });
    /*마우스가 떨어졌을 때 구조선택자가 사라짐*/
    $('body').mouseup(function(){
        $(".selector").hide();
    });
    $('.selector_btn').mouseup(function(){
        var newVal = $(this).val();
        var $inval = $("#inval");
        var $oldval = $inval.val();
        var parser = math.parser();

        var result = $oldval+newVal;
        $past_string += newVal;
        $('#past').html($past_string);
        $inval.val(result);
        $(".selector").hide();
    });
});
