//set the date when the page load to order content
$(document).ready(function () {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#txtDate').val(today);

    // console.log(sessionStorage.getItem("customer"));
    let obj = JSON.parse(sessionStorage.getItem("customer"));


    $('#txtCustId').val(obj.customerID);
    $('#custName').val(obj.firstName);

    $('#txtCustomerID').val(obj.customerID);
    $('#txtCustomerFname').val(obj.firstName);
    $('#txtCustomerLname').val(obj.lastName);
    $('#txtAddress').val(obj.address);
    $('#txtCustomerConNumber').val(obj.contactNumber);
    $('#txtNicNumber').val(obj.nicNumber);
    $('#txtDriveLicNumber').val(obj.driveLicenseNumber);
    $('#txtUserName').val(obj.userName);
    $('#txtPassword').val(obj.password);

});

//save customer order
$("#btnSaveOrder").click(function () {

    let rentid = $("#txtRentId").val();
    let pickupdate = $("#user1").val();
    let pickoffdate = $("#user2").val();
    let stat = $("#txtStatus").val();

    let rea = $("#txtReason").val();
    let newrea = parseFloat(rea);

    let totalfee = $("#txtTotalFee").val();
    let newtotalfee = parseFloat(totalfee);

    let dateoftodate = $("#txtDate").val();
    let custid = $("#txtCustId").val();
    let vehiid = $("#txtVehicleId").val();
    let driid = $("#txtDriveId").val();

    var rentDetails = {
        rentID: rentid,
        pickUpDate: pickupdate,
        pickOffDate: pickoffdate,
        status: stat,
        reason: newrea,
        totalFee: newtotalfee,
        date: dateoftodate,
        customer: {
            customerID: custid
        },
        vehicle: {
            vehicleID: vehiid
        },
        driver: {
            driveId: driid
        }
    }

    console.log(rentDetails);
    // console.log(JSON.stringify(rentDetails));
    // console.log(JSON.parse(rentDetails));

    $.ajax({
        method: 'POST',
        url: 'http://localhost:8080/carrent/api/v1/rentOrder',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(rentDetails),
        success: function (response) {
            console.log(response);
            if (response.message === 'success'){
                //popup the success message
                $( function() {
                    $( "#dialog" ).dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function() {
                                $( this ).dialog( "close" );
                                //clear the input field's
                                $("#txtRentId").val("");
                                $("#user1").val("");
                                $("#user2").val("");
                                $("#txtStatus").val("");
                                $("#txtReason").val("");
                                $("#txtTotalFee").val("");
                                $("#txtDate").val("");
                                $("#txtCustId").val("");
                                $("#txtVehicleId").val("");
                                $("#txtDriveId").val("");
                            }
                        }
                    });
                } );
            }else {
                $("#errorMsg").append(response.data);
                $( function() {
                    $( "#dialog2" ).dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function() {
                                $( this ).dialog( "close" );
                            }
                        }
                    });
                } );
            }
        }
    });
});


//Update customer details
$("#btnSaveCustomer").click(function (){

    let custID = $("#txtCustomerID").val();
    let firstName = $("#txtCustomerFname").val();
    let lastName = $("#txtCustomerLname").val();
    let contactNumber = $("#txtCustomerConNumber").val();
    let address = $("#txtAddress").val();
    let nicNumber = $("#txtNicNumber").val();
    let drivingLicense = $("#txtDriveLicNumber").val();
    let txtUserName = $("#txtUserName").val();
    let txtPassword = $("#txtPassword").val();

    // console.log();

    $.ajax({
        method:'PUT',
        url:'http://localhost:8080/carrent/api/v1/customer',
        async:true,
        contentType:'application/json',
        data:JSON.stringify({
            customerID:custID,
            firstName:firstName,
            lastName:lastName,
            nicNumber:nicNumber,
            driveLicenseNumber:drivingLicense,
            address:address,
            contactNumber:contactNumber,
            userName:txtUserName,
            password:txtPassword
        }),
        success:function (data){
            console.log(data);
            console.log(data.message);
        }
    });
    // showImageContent();
    //
    // hideRegContent();
});


$("#signOut").click(function (){
    window.location.href = '../directions/signin.html';
    sessionStorage.removeItem("customer");
});
