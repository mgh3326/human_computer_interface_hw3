$(document).ready(function(){
    var parser = math.parser();

    var prevTagId;
    var preValue = '';
    var preResult = '';
    var prepreValue = '';
    var prepreResult = '';
    var displayValue = '0';
    var resultValue = '';
    var afterEXE = false;
    var copyString = ''; var copied = false;
    $('#input').val(displayValue); 

    $('.key').each(function(index, key){
        $(this).click(function(e){
            if(displayValue == '0') displayValue = '';

            var textVal = $(this).text();
            if(textVal == 'EXE')
            {
                try
                {
                    prepreValue = preValue;
                    prepreResult = preResult;
                    preValue = displayValue;
                    displayValue = parser.eval(displayValue).toString();
                    var tokens = displayValue.split(' ');
                    if(tokens[0] == 'function')
                    {
                        displayValue = tokens[0];
                    }
                    preResult = displayValue; 
                    $('#result').val(displayValue);
                    displayValue = '0'; resultValue = '';

                    afterEXE = true;
                }
                catch (e)
                {
                    preValue = displayValue;
                    displayValue = '0';
                    if(displayValue != 'function')
                    {
                        $('#result').val(e);
                    }
                    preResult = '';
                }
            }
            else if($(this).hasClass('folder')){
                var tagId;
                if (textVal == '삼각')
                    tagId = '#TriFunc';
                else if (textVal == '벡터행렬')
                    tagId = '#VecMat';
                else if (textVal == '확률')
                    tagId = '#Percent';
                else if (textVal == '통계')
                    tagId = '#Statistics';
                else if (textVal == '함수')
                    tagId = '#Func';
                else if (textVal == '변수')
                    tagId = '#Var';
                else if (textVal == '논리연산')
                    tagId = '#LogicOp';
                else if (textVal == '비트연산')
                    tagId = '#BitOp';
                
                if(prevTagId != tagId)
                    $(prevTagId).hide();
                
                $(tagId).toggle();
                prevTagId = tagId;
            }
            else if(textVal == 'COPY'){
                if(afterEXE)
                    copyString = preResult;
                else
                    copyString = displayValue;
                copied = true;
                $(this).css('background-color','#c6ff3b');
                $(this).css('color','gray');
            }
            else if(textVal == 'SHIFT'){
                if($('.alpha').attr('id') == 'alpha-on'){
                    $('.alpha').attr('id', 'alpha-off');
                    $('.alpha').removeClass('clicked');
                    AlphaOff();
                }

                if($(this).attr('id') == 'shift-off'){
                    $(this).attr('id', 'shift-on');
                    $(this).addClass('clicked');
                    ShiftON();
                }
                else if($(this).attr('id') == 'shift-on'){
                    $(this).attr('id', 'shift-off');
                    $(this).removeClass('clicked');
                    ShiftOff();
                }
            }
            else if(textVal == 'ALPHA'){
                if($('.shift').attr('id') == 'shift-on'){
                    $('.shift').attr('id', 'shift-off');
                    $('.shift').removeClass('clicked');
                    ShiftOff();
                }

                if($(this).attr('id') == 'alpha-off'){
                    $(this).attr('id', 'alpha-on');
                    $(this).addClass('clicked');
                    AlphaON();
                }
                else if($(this).attr('id') == 'alpha-on'){
                    $(this).attr('id', 'alpha-off');
                    $(this).removeClass('clicked');
                    AlphaOff();
                }
            }
            else if(textVal == '◀◀'){
                displayValue = '';
                $('#input').val(prepreValue);
                $('#result').val(prepreResult);
            }
            else if(textVal == '▶▶'){
                displayValue = '';
                $('#input').val(preValue);
                $('#result').val(preResult);
            }
            else if(afterEXE && ($(this).hasClass('operator') 
                || $(this).hasClass('semi-operator'))){
                var arrOper = ['+', '-', '*', '/', '%', '^', '!', '&', '|',
                                '<<', '>>'];

                if($.inArray(textVal, arrOper) != -1)
                    displayValue = preResult + textVal;
                else if(textVal == '~')
                    displayValue = textVal + preResult;
                else if(textVal == 'n!')
                    displayValue = preResult + '!';
                else if(textVal == '+/-'){
                    if(preResult[0] != '-')
                        displayValue = '-' + preResult;
                    else
                        displayValue = preResult.slice(1,);
                }

                $('#input').val(displayValue);
                $('#result').val('');
                afterEXE = false;
            }
            else {
                if(textVal == 'AC'){
                    displayValue = '0';
                    resultValue = '';
                }
                else if(textVal == 'DEL'){
                    if(afterEXE)
                        displayValue = preValue.slice(0,-1);
                    else
                        displayValue = displayValue.slice(0,-1);
                }
                else if(textVal == '+/-'){
                    if(displayValue[0] != '-')
                        displayValue = '-' + displayValue;
                    else
                        displayValue = displayValue.slice(1,);
                }
                else if(textVal == 'PASTE'){
                    if(copied)
                        displayValue += copyString;
                }
                else if(textVal == 'n!')
                    displayValue += '!';
                else if(textVal == 'nPr')
                    displayValue += 'permutations(';
                else if(textVal == 'nCr')
                    displayValue += 'combinations(';
                else if(textVal == '|x|')
                    displayValue += 'abs(';
                else if(textVal == 'trans')
                    displayValue += 'transpose(';
                else{
                    displayValue += textVal;
                    if($(this).hasClass('paren'))
                        displayValue += '(';   
                }
                $('#input').val(displayValue);
                $('#result').val(resultValue);
                afterEXE = false;
            }
            if(!$(this).hasClass('folder'))
                $('.hideBtn').hide();
            e.preventDefault()
        })
    })

    $('#calculator').click(function(e){
        if(!$(e.target).hasClass('key'))
            $('.hideBtn').hide();
    });

    function ShiftON() {
        $('#1').text('!');
        $('#2').text('<');
        $('#3').text('>');
        $('#4').text('e'); $('#4').addClass('symbol-key');
        $('#5').text('pi'); $('#5').addClass('symbol-key'); 
        $('#5').removeClass('paren normal');
    }

    function ShiftOff(){
        $('#1').text('^'); 
        $('#2').text('◀◀');
        $('#3').text('▶▶');
        $('#4').text(';'); $('#4').removeClass('symbol-key');
        $('#5').text('sqrt'); $('#5').removeClass('symbol-key'); 
        $('#5').addClass('paren normal');
    }

    function AlphaON() {
        $('#1').text('exp'); $('#1').addClass('normal paren');
        $('#2').text('log'); $('#2').addClass('normal paren');
        $('#3').text('ceil'); $('#3').addClass('normal paren');
        $('#4').text('|x|'); $('#4').addClass('normal');
        $('#5').text('round');
        $('#6').text('floor'); $('#6').removeClass('symbol-key'); 
        $('#6').addClass('normal paren');
    }

    function AlphaOff(){
        $('#1').text('^'); $('#1').removeClass('normal paren');
        $('#2').text('◀◀'); $('#2').removeClass('normal paren');
        $('#3').text('▶▶'); $('#3').removeClass('normal paren');
        $('#4').text(';'); $('#4').removeClass('normal');
        $('#5').text('sqrt');
        $('#6').text('i'); $('#6').addClass('symbol-key'); 
        $('#6').removeClass('normal paren');
    }

    function alloc(tagId){
        $(tagId).css('background-color', '#f287db');
    }

    function free(tagId){
        $(tagId).css('background-color', '#76e0c3');
    }
})