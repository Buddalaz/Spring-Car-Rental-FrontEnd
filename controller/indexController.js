
$("#btnSaveOrder").click(function () {

    let rentid = $("#txtRentId").val();
    let pickupdate = $("#user1").val();
    let pickoffdate = $("#user2").val();
    let stat = $("#txtStatus").val();

    let rea = $("#txtReason").val();
    let newrea = parseFloat(rea);

    let totalfee =  $("#txtTotalFee").val();
    let newtotalfee =  parseFloat(totalfee);

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
            customerID:custid
        },
        vehicle: {
            vehicleID:vehiid
        },
        driveId: {
            driveId:driid
        }
    }

    console.log(rentDetails);
    // console.log(JSON.stringify(rentDetails));
    // console.log(JSON.parse(rentDetails));

    $.ajax({
        method:'POST',
        url:'http://localhost:8080/carrent/api/v1/rentOrder',
        async:true,
        contentType:'application/json',
        data:JSON.stringify(rentDetails),
        success:function (response){
            console.log(response);
            if (response.message === 'success'){
                //popup the success message

            }
        }
    });
});