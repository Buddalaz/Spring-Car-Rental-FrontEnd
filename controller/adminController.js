$(document).ready(function () {
    // $.when($.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
    //         tags: "moon",
    //         tagmode: "any",
    //         format: "json"
    //     }),
    //     $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
    //         tags: "bird",
    //         tagmode: "any",
    //         format: "json"
    //     })).then(function (picArray1, picArray2) {
    //     $.each(picArray1[0].items, function (i, item) {
    //         var img = $("<img/>");
    //         img.attr('width', '200px');
    //         img.attr('height', '150px');
    //         img.attr("src", item.media.m).appendTo("#myImages");
    //         if (i == 1) return false;
    //     })
    //     $.each(picArray2[0].items, function (i, item) {
    //         var img = $("<img/>");
    //         img.attr('width', '200px');
    //         img.attr('height', '150px');
    //         img.attr("src", item.media.m).appendTo("#myImages");
    //         if (i == 1) return false;
    //     })
    // });

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
        }));
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
                let row = `<tr><td>${i.customerID}</td><td>${i.firstName}</td><td>${i.lastName}</td><td>${i.nicNumber}</td>
<td>${i.driveLicenseNumber}</td><td>${i.address}</td><td>${i.contactNumber}</td>
            <td><button type="button" class="btn btn-danger">Remove</button></td></tr>`;
                $("#customerTableBody").append(row);
            }
        }
    });
});


//save vehicle details to vehicle table
$("#btnSaveVehicle").click(function () {

    $("#vehicleTableBody").empty();

    let vehId = $("#txtVehicleId").val();
    let vehBrand = $("#txtVehicleBrand").val();
    let vehModel = $("#txtVehicleModel").val();
    let vehType = $("#txtVehicleType").val();
    let txtVehFee = $("#txtVehicleExtraFee").val();
    let vehFee = parseFloat(txtVehFee);
    let vehRegNum = $("#txtVehicleRegNum").val();
    let vehColor = $("#txtVehicleColor").val();
    let vehPassNum = $("#txtVehiclePassNum").val();
    let vehTranType = $("#txtVehicleTranType").val();
    let vehFullType = $("#inputGroupSelect01").val();
    let txtDaliyRent = $("#txtVehicleDailyRent").val();
    let vehDaliyRent = parseFloat(txtDaliyRent);
    let txtMonthRent = $("#txtVehicleMonthRent").val();
    let vehMonthRent = parseFloat(txtMonthRent);
    let vehDaliyKM = $("#txtVehicleDailyKM").val();
    let vehMonthKM = $("#txtVehicleMonthKM").val();

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
        monthlyKM: vehMonthKM
    }

    console.log(vehicleDetails);
    console.log(JSON.stringify(vehicleDetails));

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
    let vehType = $("#txtVehicleType").val();
    let txtVehFee = $("#txtVehicleExtraFee").val();
    let vehFee = parseFloat(txtVehFee);
    let vehRegNum = $("#txtVehicleRegNum").val();
    let vehColor = $("#txtVehicleColor").val();
    let vehPassNum = $("#txtVehiclePassNum").val();
    let vehTranType = $("#txtVehicleTranType").val();
    let vehFullType = $("#inputGroupSelect01").val();
    let txtDaliyRent = $("#txtVehicleDailyRent").val();
    let vehDaliyRent = parseFloat(txtDaliyRent);
    let txtMonthRent = $("#txtVehicleMonthRent").val();
    let vehMonthRent = parseFloat(txtMonthRent);
    let vehDaliyKM = $("#txtVehicleDailyKM").val();
    let vehMonthKM = $("#txtVehicleMonthKM").val();

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
        monthlyKM: vehMonthKM
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
<td>${details.monthlyKM}</td></tr>`;
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
            for (const i of details) {
                let row = `<tr><td>${i.vehicleID}</td><td>${i.brand}</td><td>${i.model}</td><td>${i.type}</td>
<td>${i.extraFee}</td><td>${i.regNumber}</td><td>${i.color}</td><td>${i.passNumber}</td><td>${i.transmissionType}</td>
<td>${i.fuelType}</td><td>${i.dailyRent}</td><td>${i.monthlyRent}</td><td>${i.dailyKM}</td>
<td>${i.monthlyKM}</td></tr>`;
                $("#vehicleTableBody").append(row);
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