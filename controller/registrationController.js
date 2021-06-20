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

    // $.ajax({
    //     method:'POST',
    //     url:'http://localhost:8080/Easy_Car_Rental_PVT_BackEnd_war_exploded/easycarrentalpvt/customer',
    //     async:true,
    //     contentType:'application/json',
    //     data:JSON.stringify({
    //         customerID:custID,
    //         firstName:firstName,
    //         lasTName:lastName,
    //         nicNumber:nicNumber,
    //         driveLicenseNumber:drivingLicense,
    //         address:address,
    //         contactNumber:contactNumber
    //     }),
    //     success:function (data){
    //         console.log(data);
    //         console.log(data.message);
    //     }
    // });
    showImageContent();

    hideRegContent();
});

//save nic and driving license images
$("#btnSaveCustomerImg").click(function (){

});