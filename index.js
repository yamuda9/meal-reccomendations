/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Meal Recommendations for a meal"
 *  Alexa: "How about: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined;

/**
 * Array containing random meals.
 */
var RANDOM_MEALS = [
    "Stir fried vegetables and or with your choice of meat",
    "Sushi",
    "Pizza",
    "Macaroni and cheese",
    "Grilled or sauteed fish with a side of veggies",
    "Breakfast for dinner",
    "Chicken nuggets",
    "Vegetables and or your meat of choice kabobs",
    "Fajitas",
    "Spaghetti and meatballs",
    "Collard greens, potatoes, and whole-wheat buttermilk cheese biscuits",
    "Veggie burgers with kale chips",
    "BLT",
    "Butternut squash ravioli with roasted asparagus",
    "Chicken enchiladas",
    "Jambalaya",
    "Almond encrusted fish with beurre blanc sauce a side of asparagus and baked potatoes",
    "Quesadillas",
    "Tacos",
    "Green curry shrimp",
    "Pizza pockets",
    "Chicken marsala pasta",
    "Risotto with veggies and or seafood or meat of choice",
    "Grilled chicken breast with chimichurri spelt pasta and a side of sliced summer tomato",
    "Enchilada casserole",
    "Fried rice",
    "Roasted chicken with sweet potato casserole or chestnut and prosciutto bread stuffing and sautéed green beans with sliced almonds",
    "Moroccan fish with mango and couscous",
    "Prosciutto wrapped scallops over whole grain polenta on a bed of arugula",
    "Coconut chicken satay served with peanut thai pasta",
    "Gumbo",
    "Grilled beef hamburgers with a side of slow cooker baked beans and corn on the cob",
    "Grilled teriyaki pork tenderloin",
    "Fettucini alfredo",
    "Chicken and Cheese Tostadas"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * MealRecommendations is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var MealRecommendations = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MealRecommendations.prototype = Object.create(AlexaSkill.prototype);
MealRecommendations.prototype.constructor = MealRecommendations;

MealRecommendations.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("MealRecommendations onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

MealRecommendations.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MealRecommendations onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewMealRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
MealRecommendations.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MealRecommendations onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

MealRecommendations.prototype.intentHandlers = {
    "GetNewMealIntent": function (intent, session, response) {
        handleNewMealRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Meal Recommendations give me a meal, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new meal from the list and returns to the user.
 */
function handleNewMealRequest(response) {
    // Get a random meal from the random meals list
    var mealIndex = Math.floor(Math.random() * RANDOM_MEALS.length);
    var meal = RANDOM_MEALS[mealIndex];

    // Create speech output
    var speechOutput = "Here's a suggestion: " + meal;

    response.tellWithCard(speechOutput, "MealRecommendations", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MealRecommendations skill.
    var randomMeals = new MealRecommendations();
    randomMeals.execute(event, context);
};

