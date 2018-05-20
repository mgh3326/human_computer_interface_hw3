var CheckHelp="false";    //bool
var str="";               //string
var parser=math.parser();
var x;
var y;
var z;
var w;

function ClickBtn(value){
  switch (value) {
    case "Enter":
      if(CheckHelp=="false"){
        var result="";
        try{
          result=parser.eval(str).toString();
        }catch(e){
          alert(e);
        }
        setInputText(result);
        str="";
      }else{
        AlertHelp(value);
      }
      break;
    case "Help":
      document.getElementById("HelpBtn").value="Back";
      CheckHelp="true";
      setInputText("Help Mode | Click button!");
      break;
    case "Back":
      document.getElementById("HelpBtn").value="Help";
      document.getElementsByClassName("inputText")[0].value="";
      CheckHelp="false";
      setInputText(str);
      break;
    case "delete":
      if(CheckHelp=="false"){
        str=DeleteFun();
        setInputText(str);
      }else{
        AlertHelp(value);
      }
      break;
    case "Clear":
      if(CheckHelp=="false"){
        str="";
        setInputText(str);
      }else{
        AlertHelp(value);
      }
      break;
    default:
      if(CheckHelp=="false"){
        str+=value;
        LastInputValue=value;
        setInputText(str);
      }else{
        AlertHelp(value);
      }
      break;
  }
}

function DeleteFun()
{
    var rt=str.split(str.slice(0,-1))[1];
    switch(rt)
    {
      case "p":
      case "n":
      case "s":
        rt=str.slice(0,-3);
        break;
      case "g":
        {
          var a=str.slice(-2 ,-1);
          switch (a) {
            case "o":
              rt=str.slice(0,-3);
              break;
            default:
              rt=str.slice(0,-1);
              break;
          }
          break;
        }
      case "i":
        {
          var a=str.slice(-2,-1);
          switch (a) {
            case "p":
              rt=str.slice(0,-2);
              break;
            default:
              rt=str.slice(0,-1);
              break;
          }
        }
        break;
      case "t":
        {
          var a=str.slice(-2 ,-1);
          switch (a) {
            case "e":
              rt=str.slice(0,-3);
              break;
            default:
              rt=str.slice(0,-4);
          }
        }
        break;
      default:
        rt=str.slice(0,-1);
    }
    return rt;
}

function AlertHelp(type)
{
  switch (type) {
    case "0": setInputText("0 : Number 0"); break;
    case "1": setInputText("1 : Number 1"); break;
    case "2": setInputText("2 : Number 2"); break;
    case "3": setInputText("3 : Number 3"); break;
    case "4": setInputText("4 : Number 4"); break;
    case "5": setInputText("5 : Number 5"); break;
    case "6": setInputText("6 : Number 6"); break;
    case "7": setInputText("7 : Number 7"); break;
    case "8": setInputText("8 : Number 8"); break;
    case "9": setInputText("9 : Number 9"); break;
    case "det": setInputText("det: Determinant (ex det([3,1;5,2])=1)"); break;
    case ")": setInputText(") : Bracket operation (ex 3*(5+2))"); break;
    case "(": setInputText("( : Bracket operation (ex 3*(5+2))"); break;
    case "[": setInputText("[ : Determinant operation (ex det([3,1;5,2])=1)"); break;
    case "]": setInputText("] : Determinant operation (ex det([3,1;5,2])=1)"); break;
    case "exp": setInputText("exp : exponential function"); break;
    case "log": setInputText("log : log opreation (ex log(100))"); break;
    case "sqrt": setInputText("sqrt : root operation (ex sqrt(4))"); break;
    case "w": setInputText("w : Value w (ex w=5 or w+5)"); break;
    case "x": setInputText("x : Value x (ex x=5 or x+5)"); break;
    case "y": setInputText("y : Value y (ex y=5 or y+5)"); break;
    case "z": setInputText("z : Value z (ex z=5 or z+5)"); break;
    case ">": setInputText("> : Inequality (ex 5>3)"); break;
    case "<": setInputText("< : Inequality (ex 5<3)"); break;
    case "=": setInputText("= : Equal or Substitution (x=5 or 5!=3 or 5==5)"); break;
    case "!": setInputText("! : Factorial or Not Equeal (ex 5! or 5!=3)"); break;
    case ",": setInputText(", : Determinant operation (ex det([3,1;5,2])=1)"); break;
    case ":": setInputText(": : Determinant operation (ex det([3,1;5,2])=1)"); break;
    case ";": setInputText("; : Determinant operation (ex det([3,1;5,2])=1)"); break;
    case "f": setInputText("f : Function f (ex f(x)=x+5)"); break;
    case "g": setInputText("g : Function g (ex g(x)=x+5)"); break;
    case "i": setInputText("i : Imaginary number (ex i^2=-1)"); break;
    case "e": setInputText("e : Euler's numbe (2.71828....)"); break;
    case "pi": setInputText("pi : π (3.141592...)"); break;
    case "sin": setInputText("sin : Trigonometric function sin (ex sin(50))"); break;
    case "cos": setInputText("cos : Trigonometric function cos (ex cos(50))"); break;
    case "tan": setInputText("tan : Trigonometric function tan (ex tan(50))"); break;
    case "+": setInputText("+ : Plus operation (ex 3+5)"); break;
    case "-": setInputText("- : Minus operation (ex 5-3)"); break;
    case "*": setInputText("* : Multiply operation (ex 5*3)"); break;
    case "/": setInputText("/ : Division operation (ex 5/3)"); break;
    case "^": setInputText("^ : Square operation (ex 5^3)"); break;
    case "delete": setInputText("delete : Remove last text"); break;
    case "Clear": setInputText("Clear : Remove all text"); break;
    case "Enter": setInputText("Enter : Calculate text"); break;
    case "%": setInputText("% : remainder opeation (ex 5%3)"); break;
    case ".": setInputText(". : Decimal point (ex 5.3)"); break;
    default:break;
  }
}

function setInputText(value)
{
    document.getElementsByClassName("inputText")[0].value=" "+value;
}
