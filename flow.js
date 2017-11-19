// Define our Node object
// Node has value, responses array, children, and a parent

function Node(value) {

    this.value = value;
    this.responses = [];
    this.children = [];
    this.parent = null;

    this.setParentNode = function(node) {
        this.parent = node;
    }

    this.getParentNode = function() {
        return this.parent;
    }

    this.addChild = function(node) {
        node.setParentNode(this);
        this.children[this.children.length] = node;
    }

    this.getChildren = function() {
        return this.children;
    }

    this.removeChildren = function() {
        this.children = [];
    }
    this.getValue = function() {
        return this.value;
    }
    this.getResponses = function() {
        return this.responses;
    }
}

////////////////////////////////// Create question flow


// Create root with first question
var root = new Node("Hi, Jack! What's up? Did something happen?");

// Add possible responses
root.responses = ["yes", "no"];

// Add two responses, one for each response
root.addChild(new Node("Did it involve another person?"));
root.addChild(new Node("Okay, well how are you feeling?"));

// Get all children of root as a list
var children = root.getChildren();

// Add possible responses
children[0].responses = ["Mom", "Dad", "friend", "other"];

children[0].addChild(new Node("Where were you with this person?"));

// Point at child
children = children[0].getChildren();

// Add possible responses
children[0].responses = ["Home", "School", "Other"];

children[0].addChild(new Node("When did this happen?"));

// Point at child
children = children[0].getChildren();

// Add possible responses
children[0].responses = ["Today", "Yesterday", "Earlier this week"];

children[0].addChild(new Node("At what time?"));

// Point at child
children = children[0].getChildren();

// Add possible responses
children[0].responses = ["Morning", "Midday", "Evening"];

children[0].addChild(new Node("What was it about?"));



// Create an array to store the contents of our conversation
var chatLog = []

function logChat(text) {
    chatLog.push(text);
}

// When the document is ready, do this:
$( document ).ready(function() {

    // Identify the root of our conversation tree
    var currentNode = root;

    // Update the chat bot dialogue to display the next question
    function updateBot(currentNode) {

        // Get info from currentNode:
        value = currentNode.getValue();
        responses = currentNode.getResponses();

        // Update bot to current statement
        $( "#bot" ).text(value);

        // Update the chat log
        logChat(value);

        return
    }

    // Update the response buttons to reflect the new question from the bot
    function updateResponses(currentNode) {

        // Clear previous response options
        $( "#responses" ).empty();

        // Add a span for each response in responses array
        var responseArrayLength = responses.length;
        for (var i = 0; i < responseArrayLength; i++) {
            $( "#responses" ).append( "<a href='#' id='chatBubbles'><div class='col-sm-4 text-center'> <p class='text-white coloredBackground'> <br>  " + responses[i] + "  <br> <br> </p> </div>" );

        }
    }

    // Begin our conversation with initial calls to our update functions
    updateBot(currentNode);
    updateResponses(currentNode);

    // Performed when user clicks on a response button
    // Steps to the next question in the tree
    function iterate(currentNode) {

        children = currentNode.getChildren();

        // Traverse to first child if exists
        if (children.length > 0) {
            updateBot(currentNode);
            updateResponses(currentNode);
        }
        else {
            // Print the conversation log
            var chatLogLength = chatLog.length;
            var speaker = "";

            // Iterate though chat log array
            // Indicate who said what
            for (var i = 0; i < chatLogLength; i++) {
                if (i%2 == 1){
                    speaker = "Chat bot: ";
                } else {
                    speaker = "User: ";
                }
                console.log(speaker + chatLog[i]);
            }
            return false;
        }
    }

    // When user clicks on a response, iterate down in the tree
    $( "#responses" ).click(function(e) {
        children = currentNode.getChildren();
        currentNode = children[0];
        iterate(currentNode);

        var clicked = $(e.target).text();
        logChat(clicked);
    });

});



// console.log("root---------");
// console.log(root);
// children[0].removeChildren();
// console.log("removeChildren root---------");
// console.log(root);
// console.log("get parent node---------");
// console.log(root.getParentNode());
// console.log("children get parent node");
// console.log(children[1].getParentNode());

// Did something happen?
//  yes / no
// Did it involve another person?
// Mom / dad / sister / brother / friend / other / No (select at least one)
// Where were you (with ____)?
// Home / school / sports practice / other practice / [recent location / ie Justin’s house] / communicating over internet / other…
// When did it happen?
// Scroll options for day / general time
// What was it about? (subject)
// another person / a thing / an event / other…
// What happened? (action)
// argument / hurt feelings / physical (punch / shove / hair pull) / yelling / teasing / other…
// And what emotions do you want to tag?
// emoji for angry / sad / offended / etc
// I’m sorry to hear that. pause
// Okay, let’s take a break soon. But first, did I get everything? I know that you and person were at location around date and time. And you action about subject. What else should I know?
// option to type input / select from recent list / speech-to-text / select from pictures
// Great, thank you for adding that. I think I understand a little better now. Now I want you to (insert mindfulness practice ie guided breather / doodling).
// Thank you for taking the time to do that. I hope you feel a little bit better now! Back to what happened. I’m curious about the rest of your day. How were doing before subject happened?
// Good / bad / fine (new tree for negatives. find out if related)
// And how are you afterwards? Is it still impacting you?
// Yes / no (new tree for yes)
// After thinking about it a little bit, how do you think you contributed to subject?
// option to type input / select from recent list / speech-to-text / select from pictures
// Great, I’ll make a note of that.
// Now, can you think of anything that would make it better? Maybe since a little time has passed, would speaking with person help at all? Can I put you in touch with [mom / dad / coach]? Would you like to create a message to send to someone?
// Okay, I will make sure that happens. Have a great day, Alex!
