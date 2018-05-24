$(document).ready(function () {
    var parser = math.parser();
    $("#p0").show();
    $("#s0").hide();
    $("#yeah").show();
    $("#keyboard").hide();
    $("#lower").show();
    $("#capital").hide();

    var currentPos = 0;

    var displayValue = '0';
    $('#ohoh').text(displayValue); //result에 결과물을 넣음
    $('#result').text(displayValue); //result에 결과물을 넣음
    $('#latex').html('$$' + math.parse(displayValue).toTex() + '$$'); //latex에 넣는건가?
    function drawGrap(ex) {
        try {
            // compile the expression once
            var expression = ex;
            var expr = math.compile(expression);

            // evaluate the expression repeatedly for different values of x
            var xValues = math.range(-10, 10, 0.5).toArray();
            var yValues = xValues.map(function (x) {
                return expr.eval({x: x});
            });

            // render the plot using plotly
            var trace1 = {
                x: xValues,
                y: yValues,
                type: 'scatter'
            };
            var data = [trace1];
            Plotly.newPlot('plot', data);
        }
        catch (err) {

        }
    }

    function savePosition() {
        currentPos = document.getElementById("result").selectionStart;//result를 담는 방법
        // document.getElementById("ohoh").selectionStart
        // var endPos = ctl.selectionEnd;

    }

    function setCaretPosition(txtbox, txtlen, start, end) {
        if (txtbox.setSelectionRange) { // 커서의 위치를 지정한다.
            txtbox.focus();
            txtbox.setSelectionRange(start + txtlen, end + txtlen);
        }
    }

    // textarea에서 커서 위치 파악하여 해당 위치에 삽입
    // 참고 : http://itzone.tistory.com/272
    function insertAtCursor(areaId, text) {
        var txtarea = document.getElementById(areaId);
        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
            "ff" : (document.selection ? "ie" : false));
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.value.length);
            strPos = range.text.length;
        }
        else if (br == "ff") strPos = txtarea.selectionStart;

        var front = (txtarea.value).substring(0, strPos);
        var back = (txtarea.value).substring(strPos, txtarea.value.length);
        txtarea.value = front + text + back;
        strPos = strPos + text.length;
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.value.length);
            range.moveStart('character', strPos);
            range.moveEnd('character', 0);
            range.select();
        }
        else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }
        txtarea.scrollTop = scrollPos;
    }

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


                } else if ($(this).text() === 'Graph') {
                    var ex = $('#ohoh').text();

                    drawGrap(ex);


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