
        var dis_history = [0, ];
        var res_history = [0, ];
        var his_index = 0;
        var his_len = 1;
        var his_bool = 0;
        var helpmode = 0; // false

        function hisSave(disval, resval){ // 이전 내용 저장
          if(his_bool){
            his_bool = 0;
            his_len = his_index+1;
          }
          dis_history[his_len] = disval;
          res_history[his_len] = resval;
          his_len++;
          his_index++;
        }

        function filter(event){ // keyboard block
          event.preventDefault();
        }

        function printManual(bttext){ // 매뉴얼 출력
          switch(bttext){
            case 'sin': case 'cos': case 'tan': case 'deg':
              $('#helper').text('-삼각함수(sin, cos, tan)와 단위(deg)\n\n괄호안의 값을 삼각함수로 구해줍니다.\n사용 시, 소괄호가 없을 경우 에러처리 됩니다(대괄호 불가).\n값 뒤에 deg를 붙여주면 degree값으로 구해주며, 아무것도 붙지 않았다면 radian값으로 구해줍니다.\n\n사용 예시: sin(90deg) == 1').text();
              break;
            case '<': case '<=': case '>': case '>=': case '==': case '!=':
              $('#helper').text("-부등호(<, <=, >, >=, ==, !=)\n\n부등호 양 옆 피연산자의 크기를 비교하여 참(true)인지 거짓(false)인지 반환합니다.\n==는 양 옆 피연산자가 같을 때 true이며, !=는 양 옆 피연산자가 다를 때 true입니다.\n\n사용 예시: 10<9 == false");
              break;
            case '=':
              $('#helper').text("-대입연산자(=)\n\n오른쪽의 수식을 왼쪽에 대입할 때 사용합니다.\n이것을 사용하면 원하는 함수를 정의하는 것이 가능합니다.\n\n사용 예시: f(x)=x+50 -> EV\n           f(50) == 100");
              break;

            case 'Copy': case 'Paste':
              $('#helper').text("-복사, 붙여넣기\n\n복사를 원하는 영역을 드래그 후, Copy버튼을 누르면 드래그 한 영역이 복사됩니다.\n원하는 위치를 클릭 후 Paste버튼을 누르면 커서가 위치하는 곳에 복사된 값이 붙여넣기 됩니다.");
              break;

            case '◀': case '▶':
              $('#helper').text("-실행 취소(◀)와 다시 실행(▶)\n\n계산 실수를 하였을 때 ◀버튼을 누르면 실행 이전의 값으로 되돌아 갈 수 있습니다.\n취소시킨 동작을 다시 실행하고 싶다면 ▶버튼을 누르면 다시 실행됩니다.");
              break;

            case 'det':
              $('#helper').text("-행렬식\n\n대괄호를 사용하여 행렬을 표현합니다.\n<행렬 만드는법>\n1. 맨 바깥을 대괄호로 감싸줍니다.\n2. 그 안에 대괄호로 열들을 묶어 행을 표현합니다.\n3. 행을 표현하는 대괄호 안의 각 원소는 콤마(,)로 구분하며 차례대로 [1열,2열..]의 값이 됩니다.\n4. 각 행은 (,)로 구분합니다.\n\n사용 예제: 2x3행렬 == [[1,2,3], [4,5,6]]\n여기서 det는 괄호 안 정방행렬(n*n행렬)의 행렬식을 구해줍니다. 정방행렬이 아니거나 소괄호로 묶이지 않았을 경우 에러로 처리됩니다.\n\n사용 예시: det([[1,2],[3,4]]) == -2");
              break;
            case ',':
              $('#helper').text("-콤마\n\n벡터나 행렬을 표현하거나 함수를 정의할 때 사용합니다.\n<벡터 만드는법>\n1. 맨 바깥을 대괄호로 감싸줍니다.\n2. 각 축의 값을 콤마(,)로 구분하여 표현합니다.\n\n사용 예시: 벡터의 내적을 구할수 있습니다.\n[1,2]*[4,5] == 14");
              break;

            case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
              $('#helper').text("-수(0~9)\n\n수식의 기본이 되는 숫자입니다.");
              break;
            case '(': case ')': case '[': case ']':
              $('#helper').text("-괄호(소,대)\n\n수식에서 우선순위를 정하거나 특정 범위를 묶을 때, 행렬이나 벡터, 함수를 정의할 때 사용합니다.");
              break;

            case 'n!':
              $('#helper').text("-팩토리얼\n\n팩토리얼 값(1~n까지의 곱)을 구해줍니다.\n\n사용 예시: 5! == 120");
              break;
            case 'exp':
              $('#helper').text("-e의 거듭제곱(e^x)\n\n괄호 안의 값(x)을 지수로 하여 e^x를 구해줍니다.\n사용 시, 소괄호가 없을 경우 에러처리 됩니다(대괄호 불가).\n\n사용 예시: exp(3) == 20.0855...");
              break;
            case 'pi':
              $('#helper').text("-파이(pi)\n\n(x)pi의 값을 구해줍니다. pi의 앞에 있는 값에 pi를 곱한 값을 반환합니다.\n\n사용 예시: 3pi == 9.4247...");
              break;
            case 'log':
              $('#helper').text("-로그(log)\n\n로그의 값을 구해줍니다.\nlog(x)으로 사용 할 경우 밑을 e로 하는 자연로그가 되며, log(x,y)로 사용 할 경우 밑을 y로 하여 값을 구해줍니다.\n사용 시, 소괄호가 없을 경우 에러처리 됩니다(대괄호 불가).\n\n사용 예시: log(10) == 2.3025...");
              break;
            case 'sqrt':
              $('#helper').text("-제곱근(sqrt)\n\n괄호 안 값의 제곱근을 구해줍니다.\n사용 시, 소괄호가 없을 경우 에러처리 됩니다(대괄호 불가).\n\n사용 예시: sqrt(81) == 9");
              break;
            case '^':
              $('#helper').text("-거듭 제곱\n\nx^n으로 사용하면 x를 n번 곱한 값을 구해줍니다.\n\n사용 예시: 5^2 == 25");
              break;
            case 'i':
              $('#helper').text("-복소수(i)\n\n제곱하면 -1인 복소수 i를 나타냅니다.\n\n사용 예시: i^2 == -1");
              break;
            case 'e':
              $('#helper').text("-과학적 표기법\n\na*(10^b)의 값을 (a)e(b)로 간단하게 표기할 수 있습니다.\n큰 값을 표현하는데 편리합니다.\n\n사용 예시: 5e2 == 500");
              break;
            case '%': case '*': case '/': case '+': case '-':
              $('#helper').text("-연산자\n\na%b: a를 b로 나눈 나머지를 구해줍니다.\n*: 곱하기\n/: 나누기\n+: 더하기\n-: 빼기\n\n사용 예시: 3*2+5 == 11");
              break;
            case '.':
              $('#helper').text("-소수점\n\n소수를 표현하는데 사용합니다.\n\n사용 예시: 0.22+0.44 == 0.66");
              break;
            case 'C':
              $('#helper').text("-초기화\n\n입력되어 있는 수식과 결과 값을 0으로 초기화합니다.");
              break;
            case 'EV':
              $('#helper').text("-EV\n\n입력되어 있는 수식을 계산하여 결과 창에 보여줍니다.");
              break;
            case 'Ans':
              $('#helper').text("-Ans\n\n결과 창의 값을 수식 창에 입력합니다.\nEV로 계산 후 그 다음 식에 결과 값이 이용될 때 편리하게 사용할 수 있습니다.\n\n사용 예시: 계산한 값이 3.14일때 Ans 버튼을 누르면 수식 창에 3.14가 입력됨.");
              break;
            case 'X': case 'DEL':
              $('#helper').text("-Delete\n\n수식 창의 문자 한개를 지웁니다.");
              break;
            case 'inv':
              $('#helper').text("-역행렬\n\n괄호 안의 행렬의 역행렬을 구해줍니다.\n사용 시, 소괄호가 없을 경우 에러처리 됩니다(대괄호 불가). 또한, determinant(det)값이 0이 아니어야 합니다.\n\n사용 예시: inv([[2,4],[0,1]]) == [[0.5,-2],[0,1]]");
              break;
            case 'cross':
              $('#helper').text("-벡터의 외적\n\n괄호 안의 두 벡터의 외적을 구해줍니다.\n사용 시, 소괄호가 없을 경우 에러처리 됩니다(대괄호 불가). 또한, 각 벡터는 3차원이어야 합니다.\n\n사용 예시: cross([1,1,0],[0,1,1]) == [1,-1,1]");
              break;
            default:
              $('#helper').text("-영문자\n\n미지수를 표현하거나 함수를 정의할 때 사용할 수 있습니다.\n\n<함수를 정의하는 법>\n1. 원하는 함수의 식을 씁니다.\n2. EV를 눌러 정의합니다.\n사용 예시: f(x,y)=2x+y\n\nsin, exp 등을 영문자로 입력해도 계산이 가능합니다.\n▲와 ▼로 대소문자 전환이 가능합니다.");
              break;
          }
        }

        function getCaretPosition(txtbox){ // 현재 커서의 위치를 반환한다.
          if(txtbox.selectionStart || txtbox.selectionStart == '0'){
            return {'start': txtbox.selectionStart, 'end': txtbox.selectionEnd }
          }
          else
            return {'start': 0, 'end': 0 }
        }

        function setCaretPosition(txtbox, txtlen, start, end){
          if(txtbox.setSelectionRange){ // 커서의 위치를 지정한다.
            txtbox.focus();
            txtbox.setSelectionRange(start+txtlen, end+txtlen);
          }
        }

        function makeText(txtposi, txtbox, oldtxt, pastetxt){
          var newtxt; // 커서 위치를 기준으로 수식을 두개로 잘라 그 사이에 복사할 문자열을 추가한다.
          newtxt = oldtxt.substring(0, txtposi.start);
          newtxt += pastetxt;
          newtxt += oldtxt.substring(txtposi.end, oldtxt.length);

          return newtxt;
        }

        function selectText() { // 드래그 영역의 문자열을 반환한다.
          var selectionText = "";
          if(window.getSelection){ // 선택된 드래그 영역의 정보를 가져온다.
            selectionText = window.getSelection();
          } else if (document.getSelection) {
              selectionText = document.getSelection();
          } else if (document.selection) {
              selectionText = document.selection.createRange().text;
          }
          return selectionText.toString();
        }

        $(document).ready(function(){
            var textbox = document.getElementById("display"); // display textbox
            var text=""; // copy and paste text
            var posi; // cursor position
            var len; // drag length
            var parser = math.parser();
            $('.key-mode').hide();
            $('#helper').hide();

            var displayValue = '0';
            var resultValue = '0';

            $('#display').text(displayValue);
            $('#result').text(resultValue);
            $('.bt').each(function(index, key){
                $(this).click(function(e){
                    if(displayValue == '0') displayValue = '';

                    // if helpmode
                    if(helpmode == 1 && $(this).text() != 'calculator' && $(this).text() != 'keyboard' && $(this).text() != '▲' && $(this).text() != '▼'){
                      if($(this).attr('class') == 'bt help'){ // helpmode 종료
                        $('#helper').hide();
                        $('#display').show();
                        $('#result').show();
                        helpmode = 0; // 0으로 초기화
                        $(function() {
                          $('.help').css("background-color", "#66CC66").text("?");
                          $('#helper').text("");
                        });
                      }
                      else if($(this).attr('class') == 'bt eng')
                        printManual('eng'+$(this).text());
                      else
                        printManual($(this).text());
                    }

                    // delete
                    else if($(this).text() == 'DEL' || $(this).attr('class') == 'bt del'){
                      posi = getCaretPosition(textbox);
                      if(displayValue.length>0 && posi.end != 0 && displayValue != ''){ // 빈문자열이 아니고 커서의 위치가 맨 앞이 아닐 경우
                        var str="";
                        if(posi.start==posi.end){ // 한문자만 삭제하는 경우
                          str = displayValue.substring(0, posi.start-1);
                          len = 1;
                        }
                        else{ // 드래그 영역을 삭제하는 경우
                          str = displayValue.substring(0, posi.start);
                          len = 0;
                        }
                        str += displayValue.substring(posi.end, displayValue.length);
                        displayValue = str;
                        hisSave(displayValue, resultValue);
                        $('#display').text(displayValue);
                        setCaretPosition(textbox, 0, posi.start-len, posi.start-len);
                      }
                    }

                    // helpmode, delete가 아닌경우
                    
                    
                      switch($(this).text()){
                        case 'EV': // 수식 계산
                            try
                            {
                                if(displayValue == ''){ // 빈 문자열일 경우 0 출력
                                  displayValue = '0';
                                  $('#display').text("0");
                                }

                                resultValue = parser.eval(displayValue).toString();
                                var tokens = resultValue.split(' ');

                                if(tokens[0] == 'function')
                                {
                                    resultValue = tokens[0];
                                }
                                $('#result').text(resultValue);
                                hisSave(displayValue, resultValue);

                                displayValue = '0';
                            }
                            catch (e)
                            {
                                resultValue = '0';
                                displayValue = '0';
                                if(resultValue != 'function')
                                {
                                    $('#result').text(e);
                                }
                            }
                            setCaretPosition(textbox, 0, 0, 0);
                            break;

                        case 'Copy':
                            text = selectText();
                            $('#display').focus();
                            break;

                        case 'Paste':
                          if(text != ""){
                            var str="";
                            posi = getCaretPosition(textbox);
                            displayValue = makeText(posi, textbox, displayValue, text);
                            hisSave(displayValue, resultValue);
                            $('#display').text(displayValue);
                            setCaretPosition(textbox, text.length, posi.start, posi.start);
                          }
                            break;

                        case '?':
                            $('#display').hide();
                            $('#result').hide();
                            $('#helper').show();
                            helpmode = 1;
                            $(function() {
                              $('.help').css("background-color", "#FF0000").text("X");
                              $('#helper').text("-helper\n\n다양한 기능을 제공하는 공학용 계산기 입니다.\n도움을 원하시는 버튼을 눌러주세요.\n\n함수 정의(만드는 법은 영문자 버튼을 클릭)\n벡터(만드는 법은 , 버튼을 클릭)\n행렬(만드는 법은 det 버튼을 클릭)");
                            });
                            break;

                        case '◀':
                            if(his_index > 0){
                              his_bool = 1;
                              displayValue = dis_history[--his_index];
                              resultValue = res_history[his_index];
                              $('#display').text(displayValue);
                              $('#result').text(resultValue);
                              setCaretPosition(textbox, displayValue.length, 0, 0);
                            }
                            break;

                        case '▶':
                            if(his_index < his_len-1){
                              his_bool = 1;
                              displayValue = dis_history[++his_index];
                              resultValue = res_history[his_index];
                              $('#display').text(displayValue);
                              $('#result').text(resultValue);
                              setCaretPosition(textbox, displayValue.length, 0, 0);
                            }
                            break;

                        case 'calculator':
                            $(this).text('keyboard');
                            $('.cal-mode').hide();
                            $('.key-mode').show();
                            $('.big').hide();
                            $('.small').show();
                            break;

                        case 'keyboard':
                            $(this).text('calculator');
                            $('.key-mode').hide();
                            $('.cal-mode').show();
                            break;

                        case '▲':
                        case '▼':
                            $('.big').toggle();
                            $('.small').toggle();
                            break;

                        case 'Ans':
                            posi = getCaretPosition(textbox);
                            // 결과 창의 내용을 입력 창의 커서 위치에 출력
                            displayValue = makeText(posi, textbox, displayValue, $('#result').text());
                            hisSave(displayValue, resultValue);
                            $('#display').text(displayValue);
                            setCaretPosition(textbox, $('#result').text().length, posi.start, posi.start);
                            break;

                        default:
                            if($(this).text() == 'C') // 초기화
                            {
                                displayValue = '0';
                                resultValue = '0';
                            }
                            else
                            {
                                posi = getCaretPosition(textbox);
                                if($(this).text() == 'n!'){ // n! 버튼을 눌렀을 땐 ! 출력
                                  displayValue = makeText(posi, textbox, displayValue, "!");
                                  len = -1;
                                }
                                // 소괄호가 필요한 기능의 버튼을 눌렀을 땐 (를 붙여서 출력
                                else if($(this).text() == 'sin' || $(this).text() == 'cos' || $(this).text() == 'tan' ||
                                          $(this).text() == 'exp' || $(this).text() == 'det' || $(this).text() == 'sqrt' ||
                                          $(this).text() == 'log' || $(this).text() == 'inv' || $(this).text() == 'cross'){
                                  displayValue = makeText(posi, textbox, displayValue, $(this).text()+"(");
                                  len = 1;
                                }
                                else{
                                  displayValue = makeText(posi, textbox, displayValue, $(this).text());
                                  len = 0;
                                }
                            }
                            hisSave(displayValue, resultValue);
                            $('#display').text(displayValue);
                            $('#result').text(resultValue);
                            if($(this).text() == 'C')
                              setCaretPosition(textbox, 0, 0, 0);
                            else
                              setCaretPosition(textbox, $(this).text().length+len, posi.start, posi.start);
                            break;
                      }
                    }
                    e.preventDefault()
                })
            })
        })
