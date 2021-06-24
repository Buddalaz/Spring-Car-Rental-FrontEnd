
var isLogin = false;

$("#productCard1").click(function (){
    if (isLogin){
        $("#orderPage").show();
    }else {
        window.location.href = '../directions/signin.html';
    }
});
