$(document).ready(function(){
    var parser = math.parser();

    var displayValue = '0';
    $('#result').text(displayValue);

    var history = [];
    $('.button').each(function(index, key){       
        $(this).click(function(e){
            if(displayValue == '0') displayValue = '';

            if($(this).text() == 'EV') {
                try{
                    var variable = displayValue[0];
                    var equal_oper = displayValue[1];
                    var var_value = displayValue.substr(2, displayValue.length-1);

                    displayValue = parser.eval(displayValue).toString();
                    var tokens = displayValue.split(' ');
                    if(tokens[0] == 'function'){
                        displayValue = tokens[0];
                    }
                    $('#result').text(displayValue);

                    if(var_value != '' && equal_oper == '=') {
                        switch(variable) {
                            case 'x': $('#symbol_x').text("x = " + var_value);break;
                            case 'y': $('#symbol_y').text("y = " + var_value); break;
                            case 'z': $('#symbol_z').text("z = " + var_value); break;
                            case 'f': $('#function_f').text("f(x) = " + var_value); break;
                            case 'g': $('#function_g').text("g(x) = " + var_value);break;
                        }
    
                    }
                    
                    displayValue = '0';
                }
                catch (e) {
                    displayValue = '0';
                    if(displayValue != 'function'){
                        $('#result').text(e);
                    }
                }               
            }
            else
            {
                if($(this).text() == 'DEL') {
                    displayValue = displayValue.substr(0, displayValue.length-1);
                    $('#result').text(displayValue);
                }
                else if($(this).text() == 'AC'){
                    displayValue = '0';
                    $('#result').text(displayValue);
                }
                else if($(this).text() == 'his+') {
                    var sel = document.getElementById("history");
                    var op = document.createElement("option");
                    op.value = sel.length;
                    op.text = $('#result').text();

                    op.selected = true;
                    sel.options.add(op);

                   displayValue = '0';
                   $('#result').text(displayValue);
                }
                else if($(this).text() == 'his-') {
                    var target = document.getElementById("history");
                    target.options[target.selectedIndex] =  null;
                }
                else{                        
                    displayValue += $(this).text();
                    $('#result').text(displayValue);
                }
            }

            e.preventDefault()
        })
    })

    $('#history').each(function(index, key){       
        $(this).click(function(e){
            var target = document.getElementById("history");
            var history_text = target.options[target.selectedIndex].text
            
            displayValue = history_text;
            $('#result').text(displayValue);
        })
    }) 


    $(document).on('click', '.shift_back', function () {
        var shift_back = $(this);
        var shift_toggle = $(this).find('.shift_toggle');
        var left = shift_toggle.css('left');

        if(left == '39px') {
            shift_back.css('background', '#CCCCCC');
            toggleActionStart(shift_toggle, 'TO_LEFT');
            $('#oper1').text("+");
            $('#oper2').text("-");
            $('#oper3').text("*");
            $('#oper4').text("/");
            $('#oper5').text("&");
            $('#oper6').text("^");
            $('#vec1').text("[");
            $('#vec2').text("]");
        }
        else if(left == '4px') {
            shift_back.css('background', '#2196F3');
            toggleActionStart(shift_toggle, 'TO_RIGHT');

            $('#oper1').text("<");
            $('#oper2').text(">");
            $('#oper3').text("<=");
            $('#oper4').text(">=");
            $('#oper5').text("==");
            $('#oper6').text("!=");
            $('#vec1').text("(");
            $('#vec2').text(")");
        }
    });
     
    function toggleActionStart(toggleBtn, LR) {
        var intervalID = setInterval(
            function() {
                var left = parseInt(toggleBtn.css('left'));
                left += (LR == 'TO_RIGHT') ? 5 : -5;
                if(left >= 0 && left <= 40) {
                    left += 'px';
                    toggleBtn.css('left', left);
                }
            }, 10);
        setTimeout(function(){
            clearInterval(intervalID);
        }, 201);
    }
})