// declaring variables
const searchInput = document.getElementById("searchInput");
const erroDiv = document.getElementById("errorDiv");
const spinner = document.getElementById("spinner");
const details = document.getElementById("details");
const resultDiv = document.getElementById("show-result");



// search button and api fetching
const loadSearchInput = () => {

    // clearing div section and error handling
    spinner.classList.remove("d-none");
    details.innerHTML = "";
    resultDiv.innerHTML = "";
    erroDiv.innerText = "";

    fetch(`https://openlibrary.org/search.json?q=${searchInput.value}`)
        .then(res => res.json())
        .then(data => foundResults(data))
        .finally(() => {
            spinner.classList.add("d-none")
            searchInput.value = ""
        })

};

const foundResults = (results) => {

    // console.log(results);

    // showing search result numbers
    resultDiv.innerHTML = `<p class="fs-4 text-success">Showing ${results.docs.length} of ${results.numFound} </p>`;



    // error handling if no input is given in the searchfield
    if (results.numFound === 0) {
        erroDiv.innerText = "No results found"
        resultDiv.innerHTML = ""
    } else {
        erroDiv.innerText = ""
    }


    // getting every elements of array
    results.docs.forEach((items) => {

        // console.log(items);
        // console.log(results.docs.slice(0, 10));
        

        // hanling errors if any details not found or undefined
        if (!items.first_publish_year) {

            items.first_publish_year="publish date not found"
        }
        if (!items.author_name) {

            items.author_name="author unknown"
        }
        if (!items.publisher) {

            items.publisher="Publisher unknown"
        }
        

        // creating div for showing books
        const divDetails = document.createElement("div");
        divDetails.classList.add('col');
        divDetails.innerHTML =
            `<div class="card h-100">
               <img src="https://covers.openlibrary.org/b/olid/${items.cover_edition_key}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h3 class="card-title">${items?.title}</h3>
                  <h5 class="card-text">Author name : ${items?.author_name}</h5>
                  <h6 class="card-text mt-2 mb-2">Publisher : ${items?.publisher}</h6>
                  <h6 class="card-text">First published : ${items?.first_publish_year}</h6>
                  
               </div>
            </div`

        details.appendChild(divDetails);
    });






};