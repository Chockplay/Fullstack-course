
# Part 0 

 In this part, we will familiarize ourselves with the practicalities of taking the course. After that, we will have an overview of the basics of web development and also talk about the advances in web application development during the last few decades.


# Exercice 0.4: New note diagram

 Sequence diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.

```mermaid
    sequenceDiagram
        participant user
        participant browser
        participant server
        
        Note right of user: Write a note

        user ->> browser: Push save button
        browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
        activate server
        server-->>browser: Status code HTTP 302
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        server-->>browser: HTML document
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: the css file
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate server
        server-->>browser: the JavaScript file
        deactivate server

        Note right of browser: The browser starts executing the JavaScript code

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: [{..., "content": "test", "date": "2024-03-17..." }, ... ]
        deactivate server

        Note right of browser: The browser executes the callback function that renders the notes with the last note sent
```


# Exercice 0.5: Single page app diagram

Sequence diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
        activate server
        server-->>browser: HTML document
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: the css file
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        activate server
        server-->>browser: the JavaScript file
        deactivate server

        Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: [{ "content": "...", "date": "..." }, ... ]
        deactivate server

        Note right of browser: The browser executes the callback function that renders the notes
```


# Exercice 0.6: New note in Single page app diagram

 Sequence diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
    sequenceDiagram
    participant user
    participant browser
    participant server
    
    Note right of user: Write a note
    user ->> browser: Push save button

    Note right of browser: The event handler creates a new note, adds it to the notes list
    Note right of browser: The browser renders the notes with the new note

    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The POST request contains the new note as JSON data: {content":"test", date: "2024-03-17..."}
    server-->>browser: Status code 201 Created
    deactivate server
```