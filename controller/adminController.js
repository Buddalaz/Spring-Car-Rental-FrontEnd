$(document).ready(function () {
    $.when($.getJSON("http://localhost:8080/carrent/api/v1/customer/count", function (json) {
            // console.log(json);
            $("#custCount").append(json.count);
        }),
        $.getJSON("http://localhost:8080/carrent/api/v1/vehicle/count", function (json) {
            // console.log(json);
            $("#vehiCount").append(json.count);
        }),
        $.getJSON("http://localhost:8080/carrent/api/v1/rentOrder/count", function (json) {
            // console.log(json);
            $("#orderCount").append(json.count);
        }),
        $.getJSON("http://localhost:8080/carrent/api/v1/driver/count", function (json) {
            // console.log(json);
            $("#driverCount").append(json.count);
        }),
        $.getJSON("http://localhost:8080/carrent/api/v1/vehicle/countGeneral", function (json) {
            // console.log(json);
            $("#generalCount").append(json.count);
        }),
        $.getJSON("http://localhost:8080/carrent/api/v1/vehicle/countPremium", function (json) {
            // console.log(json);
            $("#premiumCount").append(json.count);
        }),
        $.getJSON("http://localhost:8080/carrent/api/v1/vehicle/countLuxury", function (json) {
            // console.log(json);
            $("#luxuryCount").append(json.count);
        }));
});


//rent return details
//save rent return Details
$("#btnSaveReturn").click(function () {

    $("#returnTableBody").empty();

    let date = $("#txtReturnDate").val();
    let reason = $("#txtReturnReason").val();
    let txtUsedKM = $("#txtUsedKm").val();
    let usedKM = parseFloat(txtUsedKM);
    let txtRentID = $("#txtRentID").val();

    var returnDetails = {
        rDate: date,
        usedKm: usedKM,
        reason: reason,
        rentorder: {
            rentID:txtRentID
        }
    }

    // console.log(returnDetails);
    // console.log(JSON.stringify(returnDetails));

    if (usedKM => 5000){
        alert("This Rent Vehicle Needs To Add Maintains");
    }

    $.ajax({
        method: 'POST',
        url: 'http://localhost:8080/carrent/api/v1/rentReturns',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(returnDetails),
        success: function (response) {
            console.log(response);
            if (response.message === 'success') {
                $("#saveReturnDialog").show();
                //popup the success message
                $(function () {
                    $("#saveReturnDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                            }
                        }
                    });
                });
            }
        }
    });
});




// load customer details to customer table
$("#btnCustomerLoad").click(function () {

    $("#customerTableBody").empty();

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/carrent/api/v1/customer',
        async: true,
        success: function (response) {
            console.log(response);
            var details = response.data;
            for (const i of details) {
                var img = "<img src='D:\\IJSE\\SECOND_SEMESTER\\Advanced API Development\\Course_work\\Easy_Car_Rental_PVT\\Easy_Car_Rental_PVT_BackEnd\\target\\Easy_Car_Rental_PVT_BackEnd-1.0.0\\uploads\\nic\\'"+ i.filepath +"/>";

                let row = `<tr><td>${i.customerID}</td><td>${i.firstName}</td><td>${i.lastName}</td><td>${i.nicNumber}</td>
<td>${i.driveLicenseNumber}</td><td>${i.address}</td><td>${i.contactNumber}</td>
            <td>${img}</td><td><button type="button" class="btn btn-danger">Remove</button></td></tr>`;
                $("#customerTableBody").append(row);
            }
        }
    });
});


//load rent order Details to the table
$("#btnOrder").click(function () {

    $("#rentOrdertBody").empty();

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/carrent/api/v1/rentOrder',
        async: true,
        success: function (response) {
            console.log(response);
            var orders = response.data;
            console.log(orders);
            for (const i of orders) {
                let row = `<tr><td>${i.rentID}</td><td>${i.customer.customerID}</td><td>${i.vehicle.vehicleID}</td><td>${i.driver.driveId}</td>
<td>${i.pickUpDate}</td><td>${i.pickOffDate}</td><td>${i.status}</td><td>${i.reason}</td>
<td>${i.totalFee}</td><td>${i.date}</td><td><button type="button" class="btn btn-danger">Denait</button></td>
<td><button type="button" class="btn btn-success">Accepted</button></td></tr>`;
                $("#rentOrdertBody").append(row);
            }
        }
    });
});


//vehicle section crud
//save vehicle details to vehicle table
$("#btnSaveVehicle").click(function () {

    $("#vehicleTableBody").empty();

    let vehId = $("#txtVehicleId").val();
    let vehBrand = $("#txtVehicleBrand").val();
    let vehModel = $("#txtVehicleModel").val();
    let vehType = $("#inputType").val();
    let txtVehFee = $("#txtVehicleExtraFee").val();
    let vehFee = parseFloat(txtVehFee);
    let vehRegNum = $("#txtVehicleRegNum").val();
    let vehColor = $("#txtVehicleColor").val();
    let vehPassNum = $("#txtVehiclePassNum").val();
    let vehTranType = $("#inputTransmissionType").val();
    let vehFullType = $("#inputFullType").val();
    let txtDaliyRent = $("#txtVehicleDailyRent").val();
    let vehDaliyRent = parseFloat(txtDaliyRent);
    let txtMonthRent = $("#txtVehicleMonthRent").val();
    let vehMonthRent = parseFloat(txtMonthRent);
    let vehDaliyKM = $("#txtVehicleDailyKM").val();
    let vehMonthKM = $("#txtVehicleMonthKM").val();
    let txtVehQty = $("#txtVehicleQty").val();
    let vehQty = parseInt(txtVehQty);

    var vehicleDetails = {
        vehicleID: vehId,
        brand: vehBrand,
        model: vehModel,
        type: vehType,
        extraFee: vehFee,
        regNumber: vehRegNum,
        color: vehColor,
        passNumber: vehPassNum,
        transmissionType: vehTranType,
        fuelType: vehFullType,
        dailyRent: vehDaliyRent,
        monthlyRent: vehMonthRent,
        dailyKM: vehDaliyKM,
        monthlyKM: vehMonthKM,
        qyt: vehQty
    }

    //console.log(vehicleDetails);
    //console.log(JSON.stringify(vehicleDetails));

    $.ajax({
        method: 'POST',
        url: 'http://localhost:8080/carrent/api/v1/vehicle',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(vehicleDetails),
        success: function (response) {
            console.log(response);
            if (response.message === 'success') {
                $("#saveDialog").show();
                //popup the success message
                $(function () {
                    $("#saveDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                clearVehicleTxtFields();
                            }
                        }
                    });
                });
            }
        }
    });
});

//update vehicle details
$("#btnUpdateVehicle").click(function () {

    $("#vehicleTableBody").empty();

    let vehId = $("#txtVehicleId").val();
    let vehBrand = $("#txtVehicleBrand").val();
    let vehModel = $("#txtVehicleModel").val();
    let vehType = $("#inputType").val();
    let txtVehFee = $("#txtVehicleExtraFee").val();
    let vehFee = parseFloat(txtVehFee);
    let vehRegNum = $("#txtVehicleRegNum").val();
    let vehColor = $("#txtVehicleColor").val();
    let vehPassNum = $("#txtVehiclePassNum").val();
    let vehTranType = $("#inputTransmissionType").val();
    let vehFullType = $("#inputFullType").val();
    let txtDaliyRent = $("#txtVehicleDailyRent").val();
    let vehDaliyRent = parseFloat(txtDaliyRent);
    let txtMonthRent = $("#txtVehicleMonthRent").val();
    let vehMonthRent = parseFloat(txtMonthRent);
    let vehDaliyKM = $("#txtVehicleDailyKM").val();
    let vehMonthKM = $("#txtVehicleMonthKM").val();
    let txtVehQty = $("#txtVehicleQty").val();
    let vehQty = parseInt(txtVehQty);

    var vehicleDetails = {
        vehicleID: vehId,
        brand: vehBrand,
        model: vehModel,
        type: vehType,
        extraFee: vehFee,
        regNumber: vehRegNum,
        color: vehColor,
        passNumber: vehPassNum,
        transmissionType: vehTranType,
        fuelType: vehFullType,
        dailyRent: vehDaliyRent,
        monthlyRent: vehMonthRent,
        dailyKM: vehDaliyKM,
        monthlyKM: vehMonthKM,
        qyt: vehQty
    }

    console.log(vehicleDetails);
    console.log(JSON.stringify(vehicleDetails));

    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/carrent/api/v1/vehicle',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(vehicleDetails),
        success: function (response) {
            console.log(response);
            if (response.message === 'success') {
                $("#updateDialog").show();
                //popup the success message
                $(function () {
                    $("#updateDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                clearVehicleTxtFields();
                            }
                        }
                    });
                });
            }
        }
    });
});

//delete vehicle details
$("#btnDeleteVehicle").click(function () {
    let vehId = $("#txtVehicleId").val();

    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/carrent/api/v1/vehicle/?id=' + vehId,
        async: true,
        success: function (response) {
            console.log(response);
            if (response.message === 'success') {
                $("#deleteDialog").show();
                //popup the success message
                $(function () {
                    $("#deleteDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                $("#txtVehicleId").val('');
                            }
                        }
                    });
                });
            }
        }
    });
});

//Search vehicle details and load vehicle details to table
$("#btnSearchVehicle").click(function () {

    $("#vehicleTableBody").empty();

    let vehId = $("#txtVehicleId").val();

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/carrent/api/v1/vehicle/search/' + vehId,
        async: true,
        success: function (response) {
            console.log(response);
            var details = response.data;

            let row = `<tr><td>${details.vehicleID}</td><td>${details.brand}</td><td>${details.model}</td><td>${details.type}</td>
<td>${details.extraFee}</td><td>${details.regNumber}</td><td>${details.color}</td><td>${details.passNumber}</td><td>${details.transmissionType}</td>
<td>${details.fuelType}</td><td>${details.dailyRent}</td><td>${details.monthlyRent}</td><td>${details.dailyKM}</td>
<td>${details.monthlyKM}</td><td>${details.qyt}</td></tr>`;
            $("#vehicleTableBody").append(row);

            // for (const i of details) {
            //
            // }
        }
    });
});

//load vehicle details to vehicle table
$("#btnVehicleLoad").click(function () {

    $("#vehicleTableBody").empty();

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/carrent/api/v1/vehicle',
        async: true,
        success: function (response) {
            console.log(response);
            var details = response.data;
            console.log(details);
            for (const i of details) {
                let row = `<tr><td>${i.vehicleID}</td><td>${i.brand}</td><td>${i.model}</td><td>${i.type}</td>
<td>${i.extraFee}</td><td>${i.regNumber}</td><td>${i.color}</td><td>${i.passNumber}</td><td>${i.transmissionType}</td>
<td>${i.fuelType}</td><td>${i.dailyRent}</td><td>${i.monthlyRent}</td><td>${i.dailyKM}</td>
<td>${i.monthlyKM}</td><td>${i.qyt}</td></tr>`;
                $("#vehicleTableBody").append(row);
            }
        }
    });
});


//vehicle maintains section crud
//save vehicle Maintains
$("#btnSaveMain").click(function () {

    let txtMainDate = $("#txtMainDate").val();
    let txtMainRes = $("#txtMainReason").val();
    let txtMainStat = $("#txtMainStatus").val();
    let txtMainVehiId = $("#txtMainVehiId").val();

    let mainDetails = {
        status: txtMainStat,
        reason: txtMainRes,
        maintainDate: txtMainDate,
        vehicle: {
            vehicleID: txtMainVehiId
        }
    }

    // console.log(mainDetails);
    // console.log(JSON.stringify(mainDetails));

    $.ajax({
        method: 'POST',
        url: 'http://localhost:8080/carrent/api/v1/maintains',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(mainDetails),
        success: function (response) {
            console.log(response);
            if (response.message === 'success') {
                $("#saveMainDialog").show();
                //popup the success message
                $(function () {
                    $("#saveMainDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                // clearVehicleTxtFields();
                            }
                        }
                    });
                });
            } else {
                $("#saveMainDialog").show();
                //popup the Error message
                $(function () {
                    $("#saveMainDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                // clearVehicleTxtFields();
                            }
                        }
                    });
                });
            }
        }
    });

});

//update vehicle Maintains
$("#btnUpdateMain").click(function () {
    let txtMainDate = $("#txtMainDate").val();
    let txtMainRes = $("#txtMainReason").val();
    let txtMainStat = $("#txtMainStatus").val();
    let txtMainVehiId = $("#txtMainVehiId").val();

    let mainDetails = {
        status: txtMainStat,
        reason: txtMainRes,
        maintainDate: txtMainDate,
        vehicle: {
            vehicleID: txtMainVehiId
        }
    }

    console.log(mainDetails);
    console.log(JSON.stringify(mainDetails));

    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/carrent/api/v1/maintains',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(mainDetails),
        success: function (response) {
            console.log(response);
            if (response.message === 'success') {
                $("#updateMainDialog").show();
                //popup the success message
                $(function () {
                    $("#updateMainDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                // clearVehicleTxtFields();
                            }
                        }
                    });
                });
            } else {
                $("#updateMainDialog").show();
                //popup the Error message
                $(function () {
                    $("#updateMainDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                // clearVehicleTxtFields();
                            }
                        }
                    });
                });
            }
        }
    });
});

//delete vehicle Maintains
$("#btnDeleteMain").click(function () {
    let id = $("#txtMainID").val();

    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/carrent/api/v1/maintains?id=' + id,
        async: true,
        success: function (response) {
            console.log(response);

            if (response.message === 'success') {
                $("#deleteMainDialog").show();
                //popup the success message
                $(function () {
                    $("#deleteMainDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                // clearVehicleTxtFields();
                            }
                        }
                    });
                });
            }
        }
    });
});

//load vehicle Maintains
$("#btnMainLoad").click(function () {

    $("#maintainstBody").empty();

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/carrent/api/v1/maintains',
        async: true,
        success: function (response) {
            console.log(response);
            var details = response.data;
            console.log(details);
            for (const i of details) {
                let row = `<tr><td>${i.maintainID}</td><td>${i.maintainDate}</td><td>${i.reason}</td><td>${i.status}</td>
<td>${i.vehicle.brand}</td><td>${i.vehicle.model}</td></tr>`;
                $("#maintainstBody").append(row);
            }
        }
    });
});


//driver section crud
//save driver
$("#btnSaveDriver").click(function () {

    let txtDriveId = $("#txtDriverId").val();
    let txtDrifname = $("#txtDriverFName").val();
    let txtDrilname = $("#txtDriverLName").val();
    let txtDriConNumber = $("#txtDriverConNumber").val();
    let txtDriEmail = $("#txtDriverEmail").val();

    let driverDetail = {
        driveId: txtDriveId,
        firstName: txtDrifname,
        lastName: txtDrilname,
        email: txtDriEmail,
        contactNumber: txtDriConNumber
    }

    // console.log(driverDetail);
    // console.log(JSON.stringify(driverDetail));

    $.ajax({
        method: 'POST',
        url: 'http://localhost:8080/carrent/api/v1/driver',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(driverDetail),
        success: function (response) {
            console.log(response);
            if (response.message === 'success') {
                $("#saveDriverDialog").show();
                //popup the success message
                $(function () {
                    $("#saveDriverDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                // clearVehicleTxtFields();
                            }
                        }
                    });
                });
            }
        }
    });


});

//update driver
$("#btnUpdateDriver").click(function () {

    let txtDriveId = $("#txtDriverId").val();
    let txtDrifname = $("#txtDriverFName").val();
    let txtDrilname = $("#txtDriverLName").val();
    let txtDriConNumber = $("#txtDriverConNumber").val();
    let txtDriEmail = $("#txtDriverEmail").val();

    let driverDetail = {
        driveId: txtDriveId,
        firstName: txtDrifname,
        lastName: txtDrilname,
        email: txtDriEmail,
        contactNumber: txtDriConNumber
    }

    // console.log(driverDetail);
    // console.log(JSON.stringify(driverDetail));

    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/carrent/api/v1/driver',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(driverDetail),
        success: function (response) {
            console.log(response);
            if (response.message === 'success') {
                $("#updateDriverDialog").show();
                //popup the success message
                $(function () {
                    $("#updateDriverDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                // clearVehicleTxtFields();
                            }
                        }
                    });
                });
            }
        }
    });

});

//delete driver
$("#btnDeleteDriver").click(function () {
    let driveId = $("#txtDriverId").val();

    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/carrent/api/v1/driver?id=' + driveId,
        async: true,
        success: function (response) {
            console.log(response);
            if (response.message === 'success') {
                $("#deleteDriverDialog").show();
                //popup the success message
                $(function () {
                    $("#deleteDriverDialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Ok": function () {
                                $(this).dialog("close");
                                //clear the input field's
                                // clearVehicleTxtFields();
                            }
                        }
                    });
                });
            }
        }
    });
});

//search driver
$("#btnSearchDriver").click(function () {
    let driveId = $("#txtDriverId").val();

    $("#driverTableBody").empty();

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/carrent/api/v1/driver/search/' + driveId,
        async: true,
        success: function (response) {
            console.log(response);
            console.log(response.data);
            if (response.message === 'success') {
                let details = response.data;
                // $("#txtDriverId").val();
                $("#txtDriverFName").val(details.firstName);
                $("#txtDriverLName").val(details.lastName);
                $("#txtDriverConNumber").val(details.contactNumber);
                $("#txtDriverEmail").val(details.email);
            }
        }
    });

});

//load driver
$("#btnDriverLoad").click(function () {

    $("#driverTableBody").empty();

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/carrent/api/v1/driver',
        async: true,
        success: function (response) {
            console.log(response);
            var details = response.data;
            console.log(details);
            for (const i of details) {
                let row = `<tr><td>${i.driveId}</td><td>${i.firstName}</td><td>${i.lastName}</td><td>${i.email}</td>
<td>${i.contactNumber}</td></tr>`;
                $("#driverTableBody").append(row);
            }
        }
    });

});


$("#btnSignOut").click(function () {
    window.location.href = '../directions/signin.html';
});


function clearVehicleTxtFields() {
    $("#txtVehicleBrand").val('');
    $("#txtVehicleModel").val('');
    $("#txtVehicleType").val('');
    $("#txtVehicleExtraFee").val('');
    $("#txtVehicleRegNum").val('');
    $("#txtVehicleColor").val('');
    $("#txtVehiclePassNum").val('');
    $("#txtVehicleTranType").val('');
    $("#inputGroupSelect01").val('');
    $("#txtVehicleDailyRent").val('');
    $("#txtVehicleMonthRent").val('');
    $("#txtVehicleDailyKM").val('');
    $("#txtVehicleMonthKM").val('');
}