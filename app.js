// created seperate function below to create the "Add New Lego Set" button so that the process would run once
const createCreateButton = () => {
    // using jQuery to create button and prepend to div.addCreate
    let createPara = $(`<button class="create">Add New Lego Set</button>`);
    $(`.addCreate`).prepend(createPara);
    $(".create").css({"margin": "10px"});
    // call the createHandler function when button is clicked
    $(".create").on("click", createHandler);
};

const setUp = () => {
    console.log("inside setUp()");
    console.log(`Accessing collection.js \n-> collection[0].name = ${collection[0].name}`);
    $(".wrapper").empty();
    // default webpage shows all sets
    cardFunc(collection);
    // loads up the filter function when Load Sets button is clicked
    $("#load-sets").on("click", function() {
        filterFunc();
    });
    // refers to mouse action function for hover and click effects
    mouseActionFunc();
};

const cardFunc = (array) => {
    console.log("Inside cardFunc()");
    // loop through array of sets and create card for each set
    $(".wrapper").empty();
    array.forEach((set) => {
        console.log("Creating card for set:", set);
        let cardMarkup = `
            <div class = "card">
                <div class = "image_container">
                    <img class="set_pic" src="./images/${set.img}"/>
                </div>
                <div class = "content">
                    <h2 class = "setName">${set.name}</h2>
                    <div class = "data_row">
                        <span class = "setNum"><strong>Set Number:</strong> ${set.number}</span>
                        <span class = "setYear"><strong>Year:</strong> ${set.releaseYear}</span>
                        <span class = "setPieces"><strong>Pieces:</strong> ${set.pieces}</span>
                    </div>
                    <div class = "price_row">
                        <span class = "setRetail">Retail: $${set.retail}</span>
                        <span class = "setValue">Value: $${set.value}</span>
                    </div>
                </div>
            </div>
        `;
        // append each card to the wrapper
        $(".wrapper").append(cardMarkup);
    });
};

const filterFunc = () => {
    // clear any old content
    $(".wrapper").empty();
    // store the selected theme from the dropdown
    let selectedTheme = $("#theme-filter").val();
    console.log("Selected Theme on Load Sets:", selectedTheme);
    // create condition to filter sets in collection to only those that match selected theme
    const filteredSets = [];
    // refers to cardFunc to display all records in collection if "all" is selected
    if (selectedTheme === "all") {
        filteredSets.push(...collection);
    }
    // otherwise, filter through collection to find matching themes and push to filteredSets array
    else {
        collection.forEach((set) => {
            if (set.theme === selectedTheme) {
                filteredSets.push(set);
            }
        })
    }
    console.log("Filtered Sets:", filteredSets);
    console.log("Number of filtered sets:", filteredSets.length);
    // display the filtered sets using cardFunc
    cardFunc(filteredSets);
    // refers to mouse action function for hover and click effects
    mouseActionFunc();
};

const mouseActionFunc = () => {
    console.log("Inside mouseActionFunc()");
    // hover effect for cards
    $(".card").on("mouseover", function () {
        console.log("Mouse over function");
        $(this).css({"box-shadow": "0 0 15px 5px rgba(0,0,0,0.3)"});
    });
    // remove hover effect when mouse leaves card
    $(".card").on("mouseout", function () {
        console.log("Mouse out function");
        $(this).css({"box-shadow": "0 0 0 0"});
    });
    // click effect for cards to view details (Read)
    $(".card").on("click", function () {
        console.log(this);
        let setNum = $(this).find(".setNum").text().split(" ")[2];
        console.log("Set Number of clicked card:", setNum);
        index = collection.findIndex(set => set.number == setNum);
        console.log("Index of clicked card in collection:", index);
        cardClickFunc(index);
    });
};

// A.K.A. view/read handler
// pass through index of clicked card to display details of that specific set
const cardClickFunc = (index) => {
    console.log("Inside cardClickFunc()");
    console.log(`Clicked card index: ${index}`);
    // clear wrapper content to only display the details of the clicked set
    $(".wrapper").empty();
    // assign clicked set to variable
    const viewSet = collection[index];
    console.log("Viewing set:", viewSet);
    // create markup for detailed view of clicked set
    let detailMarkup = `
        <div class="viewCard">
            <button id="backButton">Back to Collection</button>
            <div class = "viewImageContainer">
                <img class="set_pic" src="./images/${viewSet.img}"/>
            </div>
            <div class="viewContent">
                <h1 class="setName">${viewSet.name}</h1>
                <span class="view_data"><strong>Set Number:</strong> ${viewSet.number}</span><br/>
                <span class="view_data"><strong>Release Year:</strong> ${viewSet.releaseYear}</span><br/>
                <span class="view_data"><strong>Pieces:</strong> ${viewSet.pieces}</span><br/>
                <span class="view_data"><strong>Retired:</strong> ${viewSet.retired}</span><br/>
                <span class="view_data"><strong>Retail Price:</strong> $${viewSet.retail}</span><br/>
                <span class="view_data"><strong>Current Value:</strong> $${viewSet.value}</span><br/>
                <span class="view_data"><strong>Theme:</strong> ${viewSet.theme}</span><br/>
                <span class="view_data"><strong>Subtheme:</strong> ${viewSet.subtheme}</span><br/>
            </div>
            <div class="options">
                <button id="updateButton">Update Set</button>
                <button id="deleteButton">Delete Set</button>
            </div>
        </div>
    `;
    // append detailed view markup to wrapper
    $(".wrapper").append(detailMarkup);
    // set up event handlers for back, update, and delete buttons
    $("#backButton").on("click", function() {
        setUp();
    });
    $("#updateButton").on("click", function() {
        updateHandler(index);
    });
    $("#deleteButton").on("click", function() {
        deleteHandler(index);
    });
};

// Update handler
const updateHandler = (index) => {
    console.log("Inside updateHandler()");
    // assign display areas to variables
    let displayLine = $(".viewContent");
    let displayButtons = $(".options");
    // create markup for update form
    let updatePara = $(`
        <div class="updateForm">
            <label><strong>Name: </strong></label><br/>
            <input type="text" id="update_name" value='${collection[index].name}' size="30"/><br/>
            <label><strong>Set Number: </strong></label><br/>
            <input type="number" id="update_number" value='${collection[index].number}' size="5"/><br/>
            <label><strong>Release Year: </strong></label><br/>
            <input type="number" id="update_year" value='${collection[index].releaseYear}' size="4"/><br/>
            <label><strong>Pieces: </strong></label><br/>
            <input type="number" id="update_pieces" value='${collection[index].pieces}' size="4"/><br/>
            <label><strong>Retired: </strong></label><br/>
            <input type="text" id="update_retired" value='${collection[index].retired}' size="3"/><br/>
            <label><strong>Retail Price: </strong></label><br/>
            <input type="number" id="update_retail" value='${collection[index].retail}' size="6"/><br/>
            <label><strong>Current Value: </strong></label><br/>
            <input type="number" id="update_value" value='${collection[index].value}' size="6"/><br/>
            <label><strong>Theme: </strong></label><br/>
            <input type="text" id="update_theme" value='${collection[index].theme}' size="30"/><br/>
            <label><strong>Subtheme: </strong></label><br/>
            <input type="text" id="update_subtheme" value='${collection[index].subtheme}' size="30"/><br/>
        </div>
    `);
    // create markup for update options buttons
    let updateButtons = $(`
        <div class="updateOptions">
            <button id="saveButton">Save</button>
            <button id="cancelButton">Cancel</button>
        </div>
    `);
    // replace display areas with update form and buttons
    displayLine.html(updatePara);
    displayButtons.html(updateButtons);
    // set up event handler for save button to update collection
    $("#saveButton").on("click", function() {
        collection[index] = {
            name: $("#update_name").val(),
            number: $("#update_number").val(),
            releaseYear: $("#update_year").val(),
            pieces: $("#update_pieces").val(),
            retired: $("#update_retired").val(),
            retail: $("#update_retail").val(),
            value: $("#update_value").val(),
            theme: $("#update_theme").val(),
            subtheme: $("#update_subtheme").val(),
            img: collection[index].img, // keep existing image
        };
        // return to detailed view of updated set
        cardClickFunc(index);
    });
    // set up event handler for cancel button to return to detailed view without saving
    $("#cancelButton").on("click", function() {
        cardClickFunc(index);
    });
};

// Delete handler
const deleteHandler = (index) => {
    console.log("Inside deleteHandler()");
    // assign set to be removed to variable set
    let set = $(".viewContent").eq(index);
    console.log("removing ... ", set);
    // remove set from collection array
    set.remove();
    collection.splice(index, 1);
    console.log("Updated collection:", collection);
    // return to main collection view
    setUp();
};

// Create handler
const createHandler = () => {
    console.log("Inside createHandler()");
    // disable create button to prevent multiple forms
    $("button.create").prop("disabled", true);
    // create markup for create form
    let createPara = $(`
        <div class="createContainer">
            <div class="createForm">
                <label><strong>Name: </strong></label><br/>
                <input type="text" id="new_name" placeholder="Enter name" size="30"/><br/>
                <label><strong>Set Number: </strong></label><br/>
                <input type="number" id="new_number" placeholder="Enter set number" size="5"/><br/>
                <label><strong>Release Year: </strong></label><br/>
                <input type="number" id="new_year" placeholder="Enter release year" size="4"/><br/>
                <label><strong>Pieces: </strong></label><br/>
                <input type="number" id="new_pieces" placeholder="Enter number of pieces" size="4"/><br/>
                <label><strong>Retired: </strong></label><br/>
                <input type="text" id="new_retired" placeholder="Yes or No" size="5"/><br/>
                <label><strong>Retail Price: (don't use $)</strong></label><br/>
                <input type="number" id="new_retail" placeholder="Enter retail price" size="6"/><br/>
                <label><strong>Current Value: (don't use $)</strong></label><br/>
                <input type="number" id="new_value" placeholder="Enter current value" size="6"/><br/>
                <label><strong>Theme: </strong></label><br/>
                <input type="text" id="new_theme" placeholder="Enter theme" size="30"/><br/>
                <label><strong>Subtheme: </strong></label><br/>
                <input type="text" id="new_subtheme" placeholder="Enter subtheme" size="30"/><br/>
            </div>
            <div class="createOptions">
                <button class="save_new">Save New Set</button>
                <button class="cancel_new">Cancel</button>
            </div>
        </div>
    `);
    // append create form after the create button
    $(".create").after(createPara);
    // add css to create a border for the create form
    $(".createContainer").css({"border": "1px solid black", "padding": "10px", "margin": "10px"});
    $(".createOptions").css({"margin-top": "10px"});
    // set up event handler for save new set button
    $(".save_new").on("click", function() {
        let newSet = {
            name: $("#new_name").val(),
            number: $("#new_number").val(),
            releaseYear: $("#new_year").val(),
            pieces: $("#new_pieces").val(),
            retired: $("#new_retired").val(),
            retail: $("#new_retail").val(),
            value: $("#new_value").val(),
            theme: $("#new_theme").val(),
            subtheme: $("#new_subtheme").val(),
            img: "sample.png",
        };
        // add new set to collection array
        console.log("New Set to be added:", newSet);
        collection.push(newSet);
        // return to main collection view showing updated collection (look at the bottom of the page)
        setUp();
        // remove create form
        $(".createContainer").remove();
        // re-enable create button
        $("button.create").prop("disabled", false);
    });

    // set up event handler for cancel button
    $(".cancel_new").on("click", function() {
        // remove create form, buttons, and re-enable create button without saving
        $(".createContainer").remove();
        $("button.create").prop("disabled", false);
    });
};

// initialize the webpage using setUp function
$(document).ready(setUp);
// create the "Add New Lego Set" button one time
$(document).ready(createCreateButton);