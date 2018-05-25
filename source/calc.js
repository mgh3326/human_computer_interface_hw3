$(document).ready(function () {
    var parser = math.parser();
    var my_arr = [];
    $("#p0").show();
    $("#s0").hide();
    $("#yeah").show();
    $("#keyboard").hide();
    $("#lower").show();
    $("#capital").hide();
    $("#tri-F").hide();
    $("#spec-F").hide();
    $("#diff-F").hide();
    $("#proc-F").hide();
    $("#var-F").hide();

    var currentPos = 0;

    var displayValue = '0';
    $('#ohoh').text(displayValue); //result에 결과물을 넣음
    $('#result').text(displayValue); //result에 결과물을 넣음
    $('#latex').html('$$' + math.parse(displayValue).toTex() + '$$'); //latex에 넣는건가?

    // Semicolon (;) to ensure closing of earlier scripting
    // Encapsulation
    // $ is assigned to jQuery
    ;(function ($) {

        // DOM Ready
        $(function () {

            // Binding a click event
            // From jQuery v.1.7.0 use .on() instead of .bind()
            $('#my-button').bind('click', function (e) {

                // Prevents the default action to be triggered.
                e.preventDefault();

                // Triggering bPopup when click event is fired
                $('#element_to_pop_up').bPopup();

            });

        });

    })(jQuery);

    function drawGrap(ex) {
        try {
            // compile the expression once

            var expression = ex;
            var arrayOfStrings = ex.split("\n");
            var xValues = math.range(-100, 100, 0.1).toArray();
            var data = [];
            for (var i in arrayOfStrings) {
                var expr = math.compile(arrayOfStrings[i]);

                var yValues = xValues.map(function (x) {
                    return expr.eval({x: x});
                });
                var trace3 = {
                    x: xValues,
                    y: yValues,
                    type: 'scatter'
                };
                data.push(trace3);

            }

            Plotly.newPlot('plot', data);
        }
        catch (err) {

        }
    }


    $('.menu-open-button').each(function (index, key) {
        $(this).click(function (e) {

            if ($(this).text() === "삼각함수") {
                $("#tri-F").toggle();
            }
            else if ($(this).text() === '지수로그') {
                $("#spec-F").toggle();

            }
            else if ($(this).text() === '비교연산') {
                $("#diff-F").toggle();
            }
            else if ($(this).text() === '행렬') {
                $("#proc-F").toggle();
            }
            else if ($(this).text() === '상수') {
                $("#proc-F").toggle();
            }
            else if ($(this).text() === '변수') {
                $("#var-F").toggle();
            }
            else if ($(this).text() === '함수') {
                $("#spec-F").toggle();
            }
            else if ($(this).text() === '벡터') {
                $("#proc-F").toggle();
            }
        });
    });
    $('.key').each(function (index, key) {
        $(this).click(function (e) {
            if (displayValue === '0') displayValue = '';

            if ($(this).text() === 'EV') {
                try {

                    displayValue = parser.eval(displayValue).toString();
                    var tokens = displayValue.split(' ');
                    if (tokens[0] === 'function') {
                        displayValue = tokens[0];
                    }
                    $('#result').text(displayValue);
                    var str = "";
                    str += $('#ohoh').text()
                    str += " = ";
                    str += displayValue;
                    my_arr.push(str);
                    // alert(str);
                    displayValue = '0';
                } catch (err) {
                    displayValue = '0';
                    if (displayValue !== 'function') {
                        $('#result').text(err);
                    }
                }
            } else {
                if ($(this).text() === 'AC') {
                    displayValue = '0';
                    currentPos = 0;

                    $('#result').text(displayValue);
                    $('#ohoh').text(displayValue);
                    $('#ohoh').focus();

                    document.getElementById("ohoh").selectionEnd = 0;//이렇게 하면 되는구만
                } else if ($(this).text() === 'res') {
                    // $("#p1").hide();
                } else if ($(this).text() === 'Shift') {
                    $("#p0").toggle();
                    $("#s0").toggle();
                    $("#capital").toggle();
                    $("#lower").toggle();


                } else if ($(this).text() === 'Enter') {
                    var cursor_position = document.getElementById("ohoh").selectionStart;
                    str = displayValue.substring(0, document.getElementById("ohoh").selectionStart);
                    str += "\n";
                    str += displayValue.substring(document.getElementById("ohoh").selectionStart, displayValue.length);
                    displayValue = str;
                    $('#ohoh').text(displayValue); //이거 맨 뒤 한글자만 줄일때
                    $('#ohoh').focus();
                    document.getElementById("ohoh").selectionEnd = cursor_position + 1;//이렇게 하면 되는구만

                }
                else if ($(this).text() === 'Graph') {
                    // var str = $('#ohoh').text();
                    // var res = str.split("\n");

                    var ex = $('#ohoh').text();

                    drawGrap(ex);
                    $('#plot').bPopup();


                }
                else if ($(this).text() === 'Graph') {
                    var ex = $('#ohoh').text();
                    drawGrap(ex);
                    $('#plot').bPopup();
                }
                else if ($(this).text() === 'History') {
                    if (my_arr.length === 0) {
                        alert("검색 기록이 현재 없습니다.")
                    }
                    else {
                        var str = "";
                        for (var i in my_arr) {
                            str += i;
                            str += "st : ";
                            str += my_arr[i];
                            str += '\n';
                        }
                        $('#help').text(str);
                        $('#help').bPopup();
                    }

                }
                else if ($(this).text() === 'Mode') {
                    $("#yeah").toggle();
                    $("#keyboard").toggle();


                } else if ($(this).text() === '◀') {
                    document.getElementById("ohoh").selectionStart--;//이렇게 하면 되는구만
                    document.getElementById("ohoh").selectionEnd--;//이렇게 하면 되는구만

                }
                else if ($(this).text() === '▶') {
                    document.getElementById("ohoh").selectionStart++;
                    // document.getElementById("ohoh").selectionEnd ++;//이건 왜 필요없지?

                }
                else if ($(this).text() === '★') {
                    // alert(displayValue);
                    if (displayValue !== "") {
                        $(this).text(displayValue); //이거 맨 뒤 한글자만 줄일때
                    }
                    else {
                        $(this).text($('#result').text()); //이거 맨 뒤 한글자만 줄일때
                    }

                    // document.getElementById("ohoh").selectionEnd ++;//이건 왜 필요없지?

                }


                else if ($(this).text() === 'DEL') {
                    if (displayValue.length > 0) { // 빈문자열이 아닐 경우
                        str = "";
                        var cursor_position = document.getElementById("ohoh").selectionStart;
                        if (document.getElementById("ohoh").selectionStart === displayValue.length)//커서가 마지막에 있다면
                        {
                            str = displayValue.substring(0, displayValue.length - 1);
                        }
                        else {
                            str = displayValue.substring(0, document.getElementById("ohoh").selectionStart - 1);
                            str += displayValue.substring(document.getElementById("ohoh").selectionStart, displayValue.length);
                        }
                        displayValue = str;
                        $('#ohoh').text(displayValue); //이거 맨 뒤 한글자만 줄일때
                        $('#ohoh').focus();
                        document.getElementById("ohoh").selectionEnd = cursor_position - 1;//이렇게 하면 되는구만


                    }
                    else {
                        alert("현재 아무것도 입력이 안되있어서 DEL이 동작하지 않습니다.")
                    }

                } else if ($(this).text() === 'ANS') {
                    var cursor_position = document.getElementById("ohoh").selectionStart;
                    str = displayValue.substring(0, document.getElementById("ohoh").selectionStart);
                    str += $('#result').text();
                    str += displayValue.substring(document.getElementById("ohoh").selectionStart, displayValue.length);
                    displayValue = str;
                    $('#ohoh').text(displayValue); //이거 맨 뒤 한글자만 줄일때
                    $('#ohoh').focus();
                    document.getElementById("ohoh").selectionEnd = cursor_position + 1;//이렇게 하면 되는구만
                } else if ($(this).text() === 'sin' || $(this).text() === 'cos' || $(this).text() === 'tan' ||
                    $(this).text() === 'asin' || $(this).text() === 'acos' || $(this).text() === 'atan' ||
                    $(this).text() === 'exp' || $(this).text() === 'det' || $(this).text() === 'sqrt' ||
                    $(this).text() === 'log' || $(this).text() === 'inv' || $(this).text() === 'cross') {
                    displayValue += $(this).text();
                    displayValue += '(';
                    $('#ohoh').text(displayValue);
                } else {

                    str = "";
                    if (document.getElementById("ohoh").selectionStart === displayValue.length)//커서가 마지막에 있다면
                    {
                        displayValue += $(this).text();
                        $('#ohoh').text(displayValue); //이거 맨 뒤 한글자만 줄일때

                    }
                    else {
                        var cursor_position = document.getElementById("ohoh").selectionStart;
                        str = displayValue.substring(0, document.getElementById("ohoh").selectionStart);
                        str += $(this).text();
                        str += displayValue.substring(document.getElementById("ohoh").selectionStart, displayValue.length);
                        displayValue = str;
                        $('#ohoh').text(displayValue); //이거 맨 뒤 한글자만 줄일때
                        $('#ohoh').focus();
                        document.getElementById("ohoh").selectionEnd = cursor_position + 1;//이렇게 하면 되는구만

                    }

                }
                $('#ohoh').focus();//이러면 현재 커서 나오네

            }

            e.preventDefault();
        });
    });
});