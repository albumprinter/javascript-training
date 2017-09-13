// include ClickableButton, similar to Java:
// import ui.ClickableButton;

const ClickableButton = require("./ui/ClickableButton");

console.log( "Test application ready" );

// take reference to elements inside index.html

const referenceToTextareaInDOM = document.querySelector("#message");
const referenceToButton1InDOM = document.querySelector( "#button1" );
const referenceToButton2InDOM = document.querySelector( "#button2" );

// define our applications behaviour

function onButton1Click() {
    referenceToTextareaInDOM.value += "nonsense\n";
}

function onButton2Click() {
    referenceToTextareaInDOM.value = "";

    // we only allow this behaviour once, destroy button2 instance upon invocation
    button2.destroy();
}

// and construct ClickableButton as an interface to assign logic to button1 inside HTML

const button1 = new ClickableButton( referenceToButton1InDOM, onButton1Click );
const button2 = new ClickableButton( referenceToButton2InDOM, onButton2Click );
