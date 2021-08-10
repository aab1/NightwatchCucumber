const { Given, Then, When } = require('cucumber');
const { homePage } = require('../pages/homePage/HomePage');



Given('I navigate to home depot website', async ()=> {
    await homePage.maximizeWindow();
    await homePage.navigateTo("https://www.homedepot.com/");  
});

When('I search {string}', async (searchValue)=> {
    await homePage.base_textField.search.setValue(searchValue,true);
});

Then('search result is displayed', async ()=> {
    await homePage.pause(2000);
});

