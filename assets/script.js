const randomBtn = $("#randomButton")
const homeBtn = $("#homeButton")
const boredAPIURL = "https://www.boredapi.com/api/"
const boredRandomPath = "activity/"
const boredRandomAPI = boredAPIURL + boredRandomPath
let searchType;
let activityType;
let activityPeople;

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

function filteredSearch() {

    if (activityPeople < 4) {

        searchType = "custom"
        // Hide search area and show results area
        $("#searchArea").addClass("hide")
        $("#resultArea").removeClass("hide")

        // Clear result contents
        $("#resultArea").empty()

        // Custom search URL
        let activitySearchType = "type=" + activityType + "&"
        let activitySearchPeople = "participants=" + activityPeople
        let filteredSearchURL = boredAPIURL + "activity?" + activitySearchType + activitySearchPeople

        // Make API call
        $.ajax({
            url: filteredSearchURL,
            method: "GET",
        }).then(function (res) {
            // Query boredapi and get results
            // Activity
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
            if (res.error) {
                let errorMsg = $("<p>").text("No activity found, go back to the home page and try again...")

                $("#resultArea").append(errorMsg, homeBtnEl)
            } else {

                let boredAPIActivityEl = $("<p>").text(res.activity)
                // Type
                let boredAPITypeEl = $("<p>").text("Activity Type: " + res.type)

                // Participates
                let boredAPIParticipantsEL = $("<p>").text("Number of Participants: " + res.participants)

                // Price
                let boredAPIPriceEL = $("<p>").text("Price: " + res.price)



                // Add results to results area on page
                let boredResults = $("<div>").append(boredAPIActivityEl, boredAPITypeEl, boredAPIParticipantsEL, boredAPIPriceEL, homeBtnEl, retryBtnEl)
                $("#resultArea").append(boredResults)
            }

        })
    } else {
        // Hide search area and show results area
        $("#searchArea").addClass("hide")
        $("#resultArea").removeClass("hide")

        // Clear result contents
        $("#resultArea").empty()

        // Home button
        let homeBtn = $("<button>").attr({
            class: "btn btn-secondary",
            id: "homeButton"
        })
        let homeBtnEl = homeBtn.text("Go Home")

        let warningMsg = $("<p>").text("You need to social distance go home and try again...")

        $("#resultArea").append(warningMsg, homeBtnEl)
    }


}

// Listner for random buttons
randomBtn.on("click", randomBtnClick)

// Listener for home button
$(document).on("click", "#homeButton", homeBtnClick)

// Listener for retry button
$(document).on("click", "#retryButton", function () {
    if (searchType === "random") {
        randomBtnClick()
    } else if (searchType === "custom") {
        filteredSearch()
    }
})

// Listener for filtered search button
$("#useMyFilter").on("click", filteredSearch)

// Listener to update activity drop-downs
$(document).on("click", ".activityBtn", function () {
    let activityText = $(this).text()
    $("#activityButton").text(activityText)
    activityType = $(this).text()
})

// Listener for people count
$(document).on("click", ".peopleBtn", function () {
    activityPeople = $(this).attr("id")
    console.log(activityPeople)
})
