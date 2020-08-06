const randomBtn = $("#randomButton")
const boredAPIURL = "http://www.boredapi.com/api/"

randomBtn.on("click", function () {
    // Hide search area and show results area
    $("#searchArea").addClass("hide")
    $("#resultArea").removeClass("hide")
    const boredRandomAPI = boredAPIURL + "activity/"
    $.ajax({
        url: boredRandomAPI,
        method: "GET",
    }).then(function (res) {
        // Query boredapi and get results

        // Activity
        let boredAPIActivityEl = $("<p>").text(res.activity)
        // Type
        let boredAPITypeEl = $("<p>").text("Activity Type: " + res.type)

        // Participates
        let boredAPIParticipantsEL = $("<p>").text("Number of Participants: " + res.participants)

        // Price
        let boredAPIPriceEL = $("<p>").text("Price:" + res.price)

        // Add results to results area on page
        let boredResults = $("<div>").append(boredAPIActivityEl, boredAPITypeEl, boredAPIParticipantsEL, boredAPIPriceEL)
        $("#resultArea").append(boredResults)



    })

})