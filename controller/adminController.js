// $(document).ready(function() {
//         $.when($.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
//                 tags: "moon",
//                 tagmode: "any",
//                 format: "json"
//             }),
//             $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
//                 tags: "bird",
//                 tagmode: "any",
//                 format: "json"
//             })).then(function (picArray1, picArray2) {
//             $.each(picArray1[0].items, function (i, item) {
//                 var img = $("<img/>");
//                 img.attr('width', '200px');
//                 img.attr('height', '150px');
//                 img.attr("src", item.media.m).appendTo("#myImages");
//                 if (i == 1) return false;
//             })
//             $.each(picArray2[0].items, function (i, item) {
//                 var img = $("<img/>");
//                 img.attr('width', '200px');
//                 img.attr('height', '150px');
//                 img.attr("src", item.media.m).appendTo("#myImages");
//                 if (i == 1) return false;
//             })
//         });
// });

// load customer details to customer table
$("#btnCustomerLoad").click(function (){

    $("#customerTableBody").empty();

    $.ajax({
        method:'GET',
        url:'http://localhost:8080/carrent/api/v1/customer',
        async:true,
        success:function (response) {
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

// load vehicle details to vehicle table
$("#btnVehicleLoad").click(function (){

    $("#vehicleTableBody").empty();

    $.ajax({
        method:'GET',
        url:'http://localhost:8080/carrent/api/v1/vehicle',
        async:true,
        success:function (response) {
            console.log(response);
            var details = response.data;
            for (const i of details) {
                let row = `<tr><td>${i.vehicleID}</td><td>${i.brand}</td><td>${i.model}</td><td>${i.type}</td>
<td>${i.extraFee}</td><td>${i.regNumber}</td><td>${i.passNumber}</td><td>${i.transmissionType}</td>
<td>${i.fuelType}</td><td>${i.dailyRent}</td><td>${i.monthlyRent}</td><td>${i.dailyKM}</td>
<td>${i.monthlyKM}</td></tr>`;
                $("#vehicleTableBody").append(row);
            }
        }
    });
});
