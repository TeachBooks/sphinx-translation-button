// _languages will be added above this line

let _button_data = {
    "icon": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
                    <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
                    <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
                </svg>`,
    "items": []
}

    
// MAIN => hook into the DOM and add the buttons
document.addEventListener('DOMContentLoaded', () => addLanguageSwitch(_button_data, _languages))

const addLanguageSwitch = (button_data, languages) => {
    
    // Process link to prevent breaking
    if(languages[0].length == 2) languages = languages.map(([language, code]) => [language, code, ""]); 
    console.log("[sphinx-translation-button] languages specified: ", languages)

    // properly append items to button_data
    button_data.items = languages.map(([language, code, link]) => ({ "label": language, "onclick": () => {
        if ( link != "" ) {
            window.location.href = link
        } else {       
            let currentLanguageCode = languages.find(([language, code]) => window.location.pathname.includes(`/${code}/`))?.[1] || null;
            currentLanguageCode != null && (window.location.pathname = window.location.pathname.replace(`/${currentLanguageCode}/`, `/${code}/`));
        }
    }}))
    addDropdown(button_data)
}

let addDropdown = (button) => {
    // Create a new container for full element
    let container = document.createElement('div');
    container.classList.add("dropdown", "dropdown-source-buttons");

    // Create a new <style> element
    var style = document.createElement('style');
    if (style.styleSheet) {
        // For IE
        style.styleSheet.cssText = dropdownCSS;
    } else {
        // For other browsers
        style.appendChild(document.createTextNode(dropdownCSS));
    }
    container.appendChild(style);

    // Create a new button element and set necessary elements
    let buttonElement = document.createElement('button');
    buttonElement.classList.add("btn", "dropdown-toggle");
    buttonElement.setAttribute("data-bs-toggle", "dropdown");

    if(button.icon != undefined) buttonElement.appendChild(setIcon(button.icon)); 
    if(button.label!= undefined) buttonElement.innerHTML += " " + button.label

    // Create dropdown list containing all links
    let dropdownList = document.createElement('ul');
    dropdownList.classList.add("dropdown-menu");

    // Add dropdown items to the list according to the given format
    // create <li> which will contain <a> with all the relevant information (b for button, running out of names...)
    button.items.forEach(function(b) {
        let listItem = document.createElement('li');
        let linkItem = document.createElement('a');
        linkItem.classList.add("btn", "btn-sm", "dropdown-item");
        linkItem.setAttribute("data-bs-placement", "left");
        linkItem.onclick = b.onclick;

        // Check if icon is present, if not add a dot (&#x2022;)
        if(b.icon != undefined){
            let icon = setSubIcon(b.icon)
            linkItem.appendChild(icon);
        } else {
            linkItem.innerHTML += "&#x2022;";
        }
        console.log("[sphinx-translation-button] adding ", b.language, " with code ", b.code, " and link ", b.link)
        if(b.label != undefined) linkItem.innerHTML += " " + b.label;

        listItem.appendChild(linkItem);
        dropdownList.appendChild(listItem);
    })
    
    container.appendChild(buttonElement);
    container.appendChild(dropdownList);
    document.getElementsByClassName('article-header-buttons')[0].prepend(container)

    return container
}

// Function which sets the same classes for all svg icons
const setIcon = (icon) => {
    // Create a new DOMParser
    const parser = new DOMParser();
    const element = parser.parseFromString(icon, 'text/html').getElementsByTagName('svg')[0];
    element.classList = []
    element.classList.add("svg-inline--fa")
    return element
}

// Different function for svg icons living in different places ;) 
const setSubIcon = (icon) => {
    let span = document.createElement('span');
    span.classList.add("btn__icon-container");
    span.appendChild( setIcon(icon) );
    return span
}

// Template css
const dropdownCSS = `
/* Custom CSS to make the dropdown open on hover */
.dropdown-menu {
display: none; /* Hide the dropdown menu by default */
}
.dropdown-source-buttons:hover .dropdown-menu {
display: block; /* Display the dropdown menu on hover */
}
`

