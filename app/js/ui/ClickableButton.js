"use strict";

// this is not exposed to files requiring this file (as only ClickableButton is provided to module.exports)

let instanceCount = 0;

class ClickableButton {

    /**
     * @constructor
     * @param {Element} element HTML element that this component will be mounted to
     * @param {Function} callback function to execute when button is clicked
     */
    constructor( element, callback ) {

        /**
         * scope argument variables
         * as references to this ClickableButton instance
         */
        this._element  = element;
        this._callback = callback;

        // increment amount of instances
        ++instanceCount;

        // JS Scope example 1:
        // callback function is not bound, by default JavaScript will
        // scope the execution of scope of given callback handler to the
        // Object that called the handler, in this case:
        // this._element references HTMLDomElement (supplied in argument element)
        // which is triggered by click event (in browser) and will invoke callback handler
        // "this"-Object inside callback handler is thus: this._element
        
        this._element.addEventListener( "click", handleUnboundClick );
        
        // JS Scope example 2 (with binding):
        // we want to create a reference to this class' static internal click handler
        // .bind() provides a scope of execution (determining which object is referenced
        // by "this" inside the handler

        // by specifying the this keyword, the scope in which handleBoundClick will
        // be executed is this instance of ClickableButton

        // we assign this to a instance property, as .bind() returns a new function
        // reference, in other words: removeEventListener() would not work, as a
        // new function reference would be supplied - one that has not been bound in addEventListener()

        this._boundHandler = handleBoundClick.bind( this );

        // add event listener to HTML Element, on click, execute
        // internal handleBoundClick as handle

        this._element.addEventListener( "click", this._boundHandler );
    }

    destroy() {
        --instanceCount;
        this._element.removeEventListener( "click", handleUnboundClick );
        this._element.removeEventListener( "click", this._boundHandler );

        console.log("destroy instance, remaining instances:" + instanceCount);
    }
}

// "private" to this file, thus not exposed onto external instance of ClickableButton

function handleUnboundClick( event ) {
    // log the caller of this function, e.g. who is the "this" in this execution context?
    // it is the HTMLElement that fired the event listener
    console.log("unbound click", this);
}

function handleBoundClick( event ) {
    // log the caller of this function, e.g. who is the "this" in this execution context?
    // it is an instance of ClickableButton that was bound to the callback
    console.log("bound click", this);
    // log our private static int just to show that we can
    console.log("amount of clickableButton instances: " + instanceCount );
    // execute the callback handler registered to this ClickableButton instance in its constructor
    this._callback();
}

module.exports = ClickableButton;

//Java counterpart:
//
//
//public class ClickableButton() {
//
//    private static int instanceCount = 0;
//
//    ClickableButton( element, handler ) {
//        _element = element;
//        _callback = handler;
//    }
//
//    public void destroy() {}
//
//    private static void handleUnboundClick( event ) {}
//    private static void handleBoundClick( event ) {}
//}
