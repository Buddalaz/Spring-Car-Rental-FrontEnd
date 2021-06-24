var isLogin = false;

$("#btnLogin").click(function () {

    let username = $("#txtUserName").val();
    let password = $("#txtPassword").val();

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/carrent/api/v1/user/search/' + username + '/' + password,
        async: true,
        success: function (response) {
            console.log(response);
            let loginDetails = response.data;
            // console.log(loginDetails);
            if (loginDetails.role === 'admin'){
                window.location.href = '../directions/adminDashboard.html';
            }else if (loginDetails.role === 'driver'){
                window.location.href = '../directions/driver.html';
            }else {
                window.location.href = '../index.html';
            }
        }
    });

});