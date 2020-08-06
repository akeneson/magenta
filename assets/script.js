const randomBtn = $("#randomButton")
const homeBtn = $("#homeButton")
const boredAPIURL = "http://www.boredapi.com/api/"
const boredRandomPath = "activity/"


// Random button function
function randomBtnClick() {
    // Hide search area and show results area
    $("#searchArea").addClass("hide")
    $("#resultArea").removeClass("hide")

    const boredRandomAPI = boredAPIURL + boredRandomPath
    // Make API call
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
        let boredAPIPriceEL = $("<p>").text("Price: " + res.price)

        // Home button
        let homeBtn = $("<button>").attr({
            class: "btn btn-secondary",
            id: "homeButton"
        })
        let homeBtnEl = homeBtn.text("Go Home")

        // Search again button

        // Add results to results area on page
        let boredResults = $("<div>").append(boredAPIActivityEl, boredAPITypeEl, boredAPIParticipantsEL, boredAPIPriceEL, homeBtnEl)
        $("#resultArea").append(boredResults)

    })
}

function homeBtnClick() {
    // Hide result area and show search area
    $("#resultArea").addClass("hide")
    $("#searchArea").removeClass("hide")

    // Clear result contents
    $("#resultArea").empty()

}

randomBtn.on("click", randomBtnClick)
$(document).on("click", "#homeButton", homeBtnClick)