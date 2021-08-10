const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Given(/^I open Google's search page$/, () => {
  return client.url('http://google.com').waitForElementVisible('body', 1000);
});

Then(/^the title is "([^"]*)"$/, title => {
  return client.assert.title(title);
});

Then(/^the Google search form exists$/, () => {
  return client.assert.visible('input[name="q"]');
});



// Given('I open Google\'s search page', function () {
// // Write code here that turns the phrase above into concrete actions
// return 'pending';
// });



// Then('the title is {string}', function (string) {
// // Write code here that turns the phrase above into concrete actions
// return 'pending';
// });



// Then('the Google search form exists', function () {
// // Write code here that turns the phrase above into concrete actions
// return 'pending';
// });
