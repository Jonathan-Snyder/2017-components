try {
    // use components.js

    // THINGS WE HAVE TRIED:
    // new Function("(a = 0) => a");
    // var myFunc = new Function("class foo { }"); myFunc();'
    // eval("var foo = (x)=>x+1");
    new Function('class {}');

    // Is ES6 compatible
    loadScript("dist/components.js");
}
catch (e) {
    // load polyfills
    // Is not ES6 compatible
    loadScript("dist/components-and-polyfills.es5.min.js");
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}