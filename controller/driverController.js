$(document).ready(function () {
    $.when($.getJSON("http://localhost:8080/carrent/api/v1/rentOrder", function (json) {
        console.log(json);

        $("#driverScheduleTBody").empty();

        let driverDetails = json.data;
        for (let i of driverDetails) {
            if (i.driver.driveId === 'D001'){
                let row = `<tr><td>${i.driver.driveId}</td><td>${i.pickUpDate}</td><td>${i.pickOffDate}</td><td>${i.date}</td>
<td>${i.vehicle.brand}</td><td>${i.customer.firstName}</td></tr>`;
                $("#driverScheduleTBody").append(row);

            }else if (driver.driveId === 'D002'){
                let row = `<tr><td>${i.driver.driveId}</td><td>${i.pickUpDate}</td><td>${i.pickOffDate}</td><td>${i.date}</td>
<td>${i.vehicle.brand}</td><td>${i.customer.firstName}</td></tr>`;
                $("#driverScheduleTBody").append(row);

            }else{
                let row = `<tr><td>${i.driver.driveId}</td><td>${i.pickUpDate}</td><td>${i.pickOffDate}</td><td>${i.date}</td>
<td>${i.vehicle.brand}</td><td>${i.customer.firstName}</td></tr>`;
                $("#driverScheduleTBody").append(row);

            }
        }
    }));
});


$("#btnSignOut").click(function () {
    window.location.href = '../directions/signin.html';
});












