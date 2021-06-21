//set the date when the page load to order content
$(document).ready(function () {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#txtDate').val(today);
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