// API key and requirements
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '002cafb39cmsh8d7b2d1fc12bd64p1e8bb8jsn6c398c80dc7a',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};


function call_api (inputted_word) { 

    let word = inputted_word;
    let URL = `https://wordsapiv1.p.rapidapi.com/words/${word}`;
    let URL_SYN = `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`

    // main synonyms fetch
    fetch(URL_SYN, options)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        var synonyms = data.synonyms[0]
        
        for ( i=1; i<(data.synonyms.length-1); i++) {
            synonyms = `${synonyms}, ${data.synonyms[i]}`
        }

        document.getElementById('syn_output').innerHTML = synonyms
        console.log(synonyms)
    })

    // main definition fetch
    fetch(URL, options)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        if (data.success === false ) {
            window.alert('Unknown word! Please try again!')
        } else {

        // Number of definition results returned

        if (data.results === undefined) {
            console.log('No definitions found!')
            window.alert('No definitions found!')
        } else {
            var num_of_results = data.results.length;
        
            // Pronunciation data of the word
            var pronunciation = data.pronunciation.all;

            // initiating definition lists
            var def_list = [];
            var pos_list = [];
            var example_list = [];

            // populating definition lists
            for (i=0; i<(num_of_results); i++) {
                def_list.push(data.results[i].definition)
                pos_list.push(data.results[i].partOfSpeech)
                
                // example error handler
                if (data.results[i].examples != undefined) {
                    example_list.push(data.results[i].examples[0])

                } else {
                    example_list.push('')

                }   
            };

            // holds the index's of the lists based on their part of speech
            var noun_index_list = [];
            var verb_index_list = [];
            var adj_index_list = [];
            var adv_index_list = [];

            // populates the POS lists
            for (i=0; i<(pos_list.length); i++) {

                if ( pos_list[i] == 'noun' ) {
                    noun_index_list.push(i)

                } else if ( pos_list[i] == 'verb' ) {
                    verb_index_list.push(i)

                } else if ( pos_list[i] == 'adjective' ) {
                    adj_index_list.push(i)
                } else if ( pos_list[i] == 'adverb' ) {
                    adv_index_list.push(i)
                }
            };

            // un-hides the display box
            document.getElementById('display_container').style.visibility = 'visible';

            clear_screen();

            // creates the definition elements 
            create_noun_elements(def_list, example_list, noun_index_list);
            create_verb_elements(def_list, example_list, verb_index_list);
            create_adj_elements(def_list, example_list, adj_index_list);
            create_adv_elements(def_list, example_list, adv_index_list);

            // updates other textual parts
            display_headers(noun_index_list, verb_index_list, adj_index_list, adv_index_list);
            update_title(word, pronunciation);

            // debugging
            //view_lists();    
    }}})
}



function view_lists () {
    let noun_element_main = document.getElementById('noun_list_main')
    let noun_count = noun_element_main.childElementCount

    let verb_element_main = document.getElementById('verb_list_main')
    let verb_count = verb_element_main.childElementCount

    let adj_element_main = document.getElementById('adj_list_main')
    let adj_count = adj_element_main.childElementCount

    let adv_element_main = document.getElementById('adv_list_main')
    let adv_count = adv_element_main.childElementCount

    console.log(`Nouns: ${noun_count}`)
    console.log(`Verbs: ${verb_count}`)
    console.log(`Adjective: ${adj_count}`)
    console.log(`Adverbs: ${adv_count}`)
}


function clear_screen () { 
    
    let noun_element_main = document.getElementById('noun_list_main')
    let noun_count = noun_element_main.childElementCount

    let verb_element_main = document.getElementById('verb_list_main')
    let verb_count = verb_element_main.childElementCount

    let adj_element_main = document.getElementById('adj_list_main')
    let adj_count = adj_element_main.childElementCount

    let adv_element_main = document.getElementById('adv_list_main')
    let adv_count = adv_element_main.childElementCount

    
    if ( noun_count != 0 ) {
        for (i=0; i < noun_count; i++) {
            noun_element_main.lastChild.remove()
        }
    }
      
    if ( verb_count != 0 ) {
        for (i=0; i < verb_count; i++) {
            verb_element_main.lastChild.remove()
        }
    }

    if ( adj_count != 0 ) {
        for (i=0; i < adj_count; i++) {
            adj_element_main.lastChild.remove()
        }
    }

    if ( adv_count != 0 ) {
        for (i=0; i < adv_count; i++) {
            adv_element_main.lastChild.remove()
        }
    }
    

}



// displays the noun, verb, and adj text headers based on the number of returns 
function display_headers(noun_count, verb_count, adj_count, adv_count) {

    if ( noun_count.length != 0 ) {
        document.getElementById('noun_header').style.visibility = 'visible';
        document.getElementById('noun_header').innerHTML = 'Noun';

    } else {
        document.getElementById('noun_header').style.visibility = 'hidden';
        document.getElementById('noun_header').innerHTML = '';

    }

    if ( verb_count.length != 0 ) {
        document.getElementById('verb_header').style.visibility = 'visible';
        document.getElementById('verb_header').innerHTML = 'Verb';

    } else {
        document.getElementById('verb_header').style.visibility = 'hidden';
        document.getElementById('verb_header').innerHTML = '';

    }

    if ( adj_count.length != 0 ) {
        document.getElementById('adj_header').style.visibility = 'visible';
        document.getElementById('adj_header').innerHTML = 'Adjective';

    } else {
        document.getElementById('adj_header').style.visibility = 'hidden';
        document.getElementById('adj_header').innerHTML = '';

    }

    if ( adv_count.length != 0 ) {
        document.getElementById('adv_header').style.visibility = 'visible';
        document.getElementById('adv_header').innerHTML = 'Adverb';

    } else {
        document.getElementById('adv_header').style.visibility = 'hidden';
        document.getElementById('adv_header').innerHTML = '';



    }
}

// updates the name and pronunciation of the inputted word
function update_title(word, pronunciation) {
    document.getElementById('title_name').innerHTML = capitalizeFirstLetter(word);
    document.getElementById('title_pron').innerHTML = `[${pronunciation}]`;
}

// capitalizes the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// creates the noun elements
function create_noun_elements (def_list, example_list, noun_index_list) {
    const insert_loc = document.getElementById('noun_list_main');

    for (i=0; i<(noun_index_list.length); i++) {

        // creating DOM elements
        let li = document.createElement('li');
        let h5 = document.createElement('h5');
        let p = document.createElement('p');
        let br = document.createElement('br');
        let span = document.createElement('span');

        // setting the text to the 'p' and 'span' elements
        var text = def_list[noun_index_list[i]]
        var example = example_list[noun_index_list[i]]

        // appending the elements to the item
        h5.innerHTML = i + 1;
        p.innerHTML = text;
        span.innerHTML = example;
        p.append(br)
        p.append(span)
        li.append(h5)
        li.append(p)

        // finally appending the item to the DOM
        insert_loc.append(li)
    }
}

// creates the verb elements
function create_verb_elements (def_list, example_list, verb_index_list) {
    const insert_loc = document.getElementById('verb_list_main');

    for (i=0; i<(verb_index_list.length); i++) {

        // creating DOM elements
        let li = document.createElement('li');
        let h5 = document.createElement('h5');
        let p = document.createElement('p');
        let br = document.createElement('br');
        let span = document.createElement('span');

        // setting the text to the 'p' and 'span' elements
        var text = def_list[verb_index_list[i]]
        var example = example_list[verb_index_list[i]]

        // appending the elements to the item
        h5.innerHTML = i + 1;
        p.innerHTML = text;
        span.innerHTML = example;
        p.append(br)
        p.append(span)
        li.append(h5)
        li.append(p)

        // finally appending the item to the DOM
        insert_loc.append(li)
    }
}

// creates the adjective elements
function create_adj_elements (def_list, example_list, adj_index_list) {
    const insert_loc = document.getElementById('adj_list_main');

    for (i=0; i<(adj_index_list.length); i++) {

        // creating DOM elements
        let li = document.createElement('li');
        let h5 = document.createElement('h5');
        let p = document.createElement('p');
        let br = document.createElement('br');
        let span = document.createElement('span');

        // setting the text to the 'p' and 'span' elements
        var text = def_list[adj_index_list[i]]
        var example = example_list[adj_index_list[i]]

        // appending the elements to the item
        h5.innerHTML = i + 1;
        p.innerHTML = text;
        span.innerHTML = example;
        p.append(br)
        p.append(span)
        li.append(h5)
        li.append(p)

        // finally appending the item to the DOM
        insert_loc.append(li)
    }
}

// creates the adverb elements
function create_adv_elements (def_list, example_list, adv_index_list) {
    const insert_loc = document.getElementById('adv_list_main');

    for (i=0; i<(adv_index_list.length); i++) {

        // creating DOM elements
        let li = document.createElement('li');
        let h5 = document.createElement('h5');
        let p = document.createElement('p');
        let br = document.createElement('br');
        let span = document.createElement('span');

        // setting the text to the 'p' and 'span' elements
        var text = def_list[adv_index_list[i]]
        var example = example_list[adv_index_list[i]]

        // appending the elements to the item
        h5.innerHTML = i + 1;
        p.innerHTML = text;
        span.innerHTML = example;
        p.append(br)
        p.append(span)
        li.append(h5)
        li.append(p)

        // finally appending the item to the DOM
        insert_loc.append(li)
    }
}





// gets the user input from the input box
function get_input () {
    const input = document.getElementById('search_bar').value;

    call_api(input)
    
}

// Search Button even listener
document.getElementById('submit_button').addEventListener('click', get_input);