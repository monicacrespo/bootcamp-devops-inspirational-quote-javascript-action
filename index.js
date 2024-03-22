const core = require('@actions/core');
const github = require('@actions/github');

// api for quotes
const url = 'https://type.fit/api/quotes';

try {
    // fetch the data from api
    fetch(url)
        // convert response to json
        .then((response) => response.json())
        // store it in data array
        .then((data) => {
            // generate a random number between 0 and the length of the data array
            const index = Math.floor(Math.random() * data.length);
            // store the quote present at the randomly generated index
            let quote = data[index].text;
            // check if the last char does not end with dot (.).   
            if(quote.slice(-1)!== '.'){
                // add a dot at the end of the quote 
                quote = quote.concat('.');
            }

            // store the author of the respective quote
            let author = data[index].author;        
            if(author==null)
            {
                author = "Anonymous";
            }

            // store the quote and the author
            let result = quote.concat(" ", author);            
            console.log(`${result}`);    
            core.setOutput('quote', result);
        })
        .catch((error) => {
            console.log(error);
            core.setFailed(error.message);
    });
    
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}
