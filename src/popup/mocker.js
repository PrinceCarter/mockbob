/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */

 
function listenForClicks() {
  console.log("testing");
  document.getElementById("reset").addEventListener("click", (e) => {
    function mockbob(tabs) {
      let send= "refresh";
       browser.tabs.sendMessage(tabs[0].id, {
         command: send,
       });   
       window.close();
     }
   /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not mockbob: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "mockbob()" or "reset()" as appropriate.
     */
    browser.tabs.query({
        active: true,
        currentWindow: true
      })
      .then(mockbob)
      .catch(reportError);
  });
  
  document.getElementById("mockbob").addEventListener("click", (e) => {
    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the mock URL and
     * send a "mockbob" message to the content script in the active tab.
     */
    function mockbob(tabs) {
     let send= document.getElementsByName('selector')[0].value;
      browser.tabs.sendMessage(tabs[0].id, {
        command: send,
      });
      console.log(document.getElementsByName('selector')[0].value )
      
    }


    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not mockbob: ${error}`);
      window.close();
    }

    /**
     * Get the active tab,
     * then call "mockbob()" or "reset()" as appropriate.
     */
    browser.tabs.query({
        active: true,
        currentWindow: true
      })
      .then(mockbob)
      .catch(reportError);
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute mockbob content script: ${error.message}`);
}


/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */


browser.tabs.executeScript({
    file: "/content_scripts/mockbob.js"
  })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);