var isLogin = false;

$("#btnLogin").click(function () {

    let username = $("#txtUserName").val();
    let password = $("#txtPassword").val();

    if(username === 'admin'){
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
                }else {
                    alert("There is Something Wrong please check again");
                }
            }
        });
    }
    else {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8080/carrent/api/v1/customer/search/' + username + '/' + password,
            async: true,
            success: function (response) {
                console.log(response);
                let loginDetails = response.data;
                console.log(loginDetails);

                sessionStorage.setItem("customer",JSON.stringify(loginDetails))

                window.location.href = '../directions/customerPage.html';
                // if (loginDetails.role === 'admin'){
                //     window.location.href = '../directions/adminDashboard.html';
                // }else if (loginDetails.role === 'driver'){
                //     window.location.href = '../directions/driver.html';
                // }else {
                //     window.location.href = '../index.html';
                // }
            }
        });
    }



});