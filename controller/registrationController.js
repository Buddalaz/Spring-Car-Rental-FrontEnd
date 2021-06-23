$("#imageContent").hide();

function showImageContent(){
    $("#imageContent").show();
}

function hideRegContent(){
    $("#regContent").hide();
}

//save customer details
$("#btnSaveCustomer").click(function (){

    let custID = $("#txtCustId").val();
    let firstName = $("#txtFirstName").val();
    let lastName = $("#txtLastName").val();
    let contactNumber = $("#txtContactNumber").val();
    let address = $("#txtAddress").val();
    let nicNumber = $("#txtNicNumber").val();
    let drivingLicense = $("#txtDrivingLicense").val();

    console.log();

    $.ajax({
        method:'POST',
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
            contactNumber:contactNumber
        }),
        success:function (data){
            console.log(data);
            console.log(data.message);
        }
    });
    showImageContent();

    hideRegContent();
});

//save nic and driving license images
$("#btnSaveCustomerImg").click(function (){

});