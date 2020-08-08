const randomBtn = $("#randomButton")
const homeBtn = $("#homeButton")
const boredAPIURL = "https://www.boredapi.com/api/"
const boredRandomPath = "activity/"
const boredRandomAPI = boredAPIURL + boredRandomPath
let searchType;

// Random button function
function randomBtnClick() {
    searchType = "random"
    // Hide search area and show results area
    $("#searchArea").addClass("hide")
    $("#resultArea").removeClass("hide")

    // Clear result contents
    $("#resultArea").empty()

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
        let retryBtn = $("<button>").attr({
            class: "btn btn-secondary",
            id: "retryButton"
        })
        let retryBtnEl = retryBtn.text("Look Again")

        // Add results to results area on page
        let boredResults = $("<div>").append(boredAPIActivityEl, boredAPITypeEl, boredAPIParticipantsEL, boredAPIPriceEL, homeBtnEl, retryBtnEl)
        $("#resultArea").append(boredResults)

    })
}

function homeBtnClick() {
    // Reset Search Type
    searchType = ""
    // Hide result area and show search area
    $("#resultArea").addClass("hide")
    $("#searchArea").removeClass("hide")
}

// Listner for random buttons
randomBtn.on("click", randomBtnClick)

// Listener for home button
$(document).on("click", "#homeButton", homeBtnClick)

// Listener for retry button
$(document).on("click", "#retryButton", function () {
    if (searchType === "random") {
        randomBtnClick()
    }
})

// Listener to update drop-downs
$(document).on("click", ".activityBtn", function () {
    let activityText = $(this).text()
    $("#activityButton").text(activityText)
    console.log(activityText)
})