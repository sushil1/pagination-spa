This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Steps to Run

After unzipping the folder, in the root run:

### `yarn`

and run:

### `yarn start`

Runs the app in the development mode, on http://localhost:3000<br>


## Folder Structure

```
resonate-spa/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    index.css
    index.js

```

Questions:

d.	Document use of any libraries, dev toolchain that you think will fit well for this purpose and design

I am using React Js for this project. This project is bootstrapped by react's create-react-app. create-react-app package takes care of compiling, transpiling ES6, ES7 codes and bundling the app. Also used react loader to load 'loading spinner'. React's one way data flow (state to props) makes it easy to keep track the props and state at any time.

e.	Document any assumptions made, challenges and decisions taken

Since the API provided, just returns 100 datasets without the option of pagination. So we store the data in app's state. We calculate the number of pages and render the pagination view. The pagination sets the current_page to the page clicked, and pageList is rendered as the state of current_page is changed.


h.	Discuss you would make to the the provided API (https://resonatetest.azurewebsites.net/data) in the current scenario and if it returned a larger (10,000/100,000/1,000,000 items) dataset

In case you have a lot of data sets from the API source, we could follow server side pagination strategies. We would return the data in batches to the client, if client request more data, we can push another page of data.
Client then can use various pagination styles such as infinite scrolling to seamlessly fetch data as user browses through the page.
