function Node(name, value) {

    this.value = value;
    this.name = name;
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

/////////////////////////////////////////////
// Naming structure: 	root has children childA, childB, childC etc.
//						childA has children childAA, childAB, childAC etc.
//						childAA has children childAAA, childAAB, childAAC etc.

// Create root with first question
var root = new Node("root", "Hi, Jack! What's up? Did something happen?");

// Add possible responses
root.responses = ["yes", "no"];

// Add two responses, one for each response
root.addChild(new Node("childA", "Did it involve another person?"));
root.addChild(new Node("childB", "Okay, well how are you feeling?"));

// Get all children of root as a list
var children = root.getChildren();

// Add possible responses for childA
children[0].responses = ["Mom", "Dad", "friend", "other"];

children[0].addChild(new Node("childAA", "Where were you with this person?"));

// Point at child
children = children[0].getChildren();

// Add possible responses for childAA
children[0].responses = ["Home", "School", "Other"];

children[0].addChild(new Node("childAA", "When did this happen?"));

// Point at child
children = children[0].getChildren();

// Add possible responses for childAA
children[0].responses = ["Today", "Yesterday", "Earlier this week"];

children[0].addChild(new Node("childAA", "At what time?"));

// Point at child
children = children[0].getChildren();

// Add possible responses for childAA
children[0].responses = ["Morning", "Midday", "Evening"];

children[0].addChild(new Node("childAA", "What was it about?"));


$( document ).ready(function() {

    console.log("here we are");


    // Begin with root
    var currentNode = root;

    function initialize() {

    }

    function updateBot(currentNode) {

        console.log("updatebot called");

        // Get info from currentNode:
        value = currentNode.getValue();
        responses = currentNode.getResponses();

        // Update bot to current statement
        $( "#bot" ).text(value);

        return
    }




    function updateResponses(currentNode) {

        // Clear previous response options
        $( "#responses" ).empty();

        // Add a span for each response in responses array
        var responseArrayLength = responses.length;
        for (var i = 0; i < responseArrayLength; i++) {
            $( "#responses" ).append( "<a href='#' id='chatBubbles'><div class='col-sm-4 text-center'> <p class='text-white coloredBackground'> <br>  " + responses[i] + "  <br> <br> </p> </div>" );

        }
    }

    updateBot(currentNode);
    updateResponses(currentNode);

    function iterate(currentNode) {

        children = currentNode.getChildren();

        // Traverse to first child if exists
        if (children.length > 0) {
            updateBot(currentNode);
            updateResponses(currentNode);
        }
        else {
            return false;
        }
    }

    $( "#responses" ).click(function() {
        children = currentNode.getChildren();
        currentNode = children[0];
        iterate(currentNode);
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
