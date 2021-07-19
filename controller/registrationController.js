$("#regCustomerSuccess").hide();

//save customer details
$("#btnRegCustomer").click(function (){

    let custID = $("#txtCustId").val();
    let firstName = $("#txtFirstName").val();
    let lastName = $("#txtLastName").val();
    let contactNumber = $("#txtContactNumber").val();
    let address = $("#txtAddress").val();
    let nicNumber = $("#txtNicNumber").val();
    let drivingLicense = $("#txtDrivingLicense").val();
    let userName = $("#txtUserName").val();
    let pass = $("#txtPassword").val();

    let formCustomerElement = $("#formCustomer")[0];

    var data = new FormData(formCustomerElement); //setup form data object to send file data
    var file = $("#myFile")[0].files[0]; //access file object
    var file1Name = $("#myFile")[0].files[0].name; //get file name
    data.append("customerID",custID); //append data
    data.append("firstName",firstName); //append data
    data.append("lastName",lastName); //append data
    data.append("nicNumber",nicNumber); //append data
    data.append("driveLicenseNumber",drivingLicense); //append data
    data.append("address",address); //append data
    data.append("contactNumber",contactNumber); //append data
    data.append("userName",userName); //append data
    data.append("password",pass); //append data
    data.append("myFile",file,file1Name); //append data

    console.log(data);

    $.ajax({
        method:'POST',
        url:'http://localhost:8080/carrent/api/v1/customer',
        async:true,
        processData: false, //stop processing data of request body
        contentType:false,
        data:data,
        success:function (data){
            console.log(data);
            console.log(data.message);
            if (data.message === 'success') {
                $("#regCustomerSuccess").show();
                //popup the success message
                $(function () {
                    $("#regCustomerSuccess").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                window.location.href = '../directions/customerPage.html';
                            }
                        }
                    });
                });
            }
        }
    });

});

