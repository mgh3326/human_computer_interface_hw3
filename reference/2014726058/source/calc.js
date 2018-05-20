var myindex = 0;

$(document).ready(function () {
    var parser = math.parser();
    $("#p0").show();
    $("#s0").hide();
    $("#yeah").show();
    $("#keyboard").hide();
    $("#lower").show();
    $("#capital").hide();

    if (myindex === 0) //0번째 페이지
    {


    } else if (myindex === 1) //1번째 페이지
    {

    }
    var displayValue = '0';
    $('#ohoh').text(displayValue); //result에 결과물을 넣음
    $('#result').text(displayValue); //result에 결과물을 넣음
    $('#latex').html('$$' + math.parse(displayValue).toTex() + '$$'); //latex에 넣는건가?

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
                    $('#result').text(displayValue);
                    $('#ohoh').text(displayValue);

                } else if ($(this).text() === 'res') {
                    // $("#p1").hide();
                } else if ($(this).text() === 'Shift') {
                    $("#p0").toggle();
                    $("#s0").toggle();
                    $("#capital").toggle();
                    $("#lower").toggle();


                } else if ($(this).text() === 'Mode') {
                    $("#yeah").toggle();
                    $("#keyboard").toggle();

                } else if ($(this).text() === '☜') {
                    myindex--;
                } else if ($(this).text() === '☞') {
                    myindex++;
                } else if ($(this).text() === 'DEL') {
                    if (displayValue.length > 0) { // 빈문자열이 아닐 경우
                        str = "";
                        str = displayValue.substring(0, displayValue.length - 1);
                        displayValue = str;
                        $('#ohoh').text(displayValue); //이거 맨 뒤 한글자만 줄일때
                    }
                } else if ($(this).text() === 'ANS') {
                    displayValue += $('#result').text();

                    $('#ohoh').text(displayValue);
                } else if ($(this).text() === 'sin' || $(this).text() === 'cos' || $(this).text() === 'tan' ||
                    $(this).text() === 'asin' || $(this).text() === 'acos' || $(this).text() === 'atan' ||
                    $(this).text() === 'exp' || $(this).text() === 'det' || $(this).text() === 'sqrt' ||
                    $(this).text() === 'log' || $(this).text() === 'inv' || $(this).text() === 'cross') {
                    displayValue += $(this).text();
                    displayValue += '(';
                    $('#ohoh').text(displayValue);
                } else {
                    displayValue += $(this).text();
                    $('#ohoh').text(displayValue);

                }

            }

            e.preventDefault();
        });
    });
});