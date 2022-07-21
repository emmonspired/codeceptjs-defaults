/// <reference path="../../steps.d.ts" />
const {
  loginPage,
  testData, signUpPage,
  homePage,
  protectorAcademypPage,
  usccaDashboardPage,
  userAccountMenu,
  userAccountDetailsPage,

} = inject();


Feature('Sign Up page & registration');
Scenario('Login page', async ({ I }) => {
  I.amOnPage(homePage.url);
  I.wait(3);
  I.click(homePage.loginNavigationButton);
  I.wait(3);
  I.see('Log In Now');
}).tag('@SDET');

Scenario('Sign up form validation', async ({ I }) => {
  I.amOnPage(loginPage.url);
  I.click(loginPage.signUpButton);
  I.see('Create Free Account');

  I.click('Create Free Account');
  I.see('First name is required');
  I.fillField('First Name', 'f');
  I.click('Create Free Account');
  I.dontSee('First name is required');
  I.see('First name must be at least 2 characters.');
  I.fillField('First Name', 'ff');
  I.dontSee('First name must be at least 2 characters.');
  I.click('Create Free Account');

  I.click('Create Free Account');
  I.see('Last name is required');
  I.fillField('Last Name', 'l');
  I.click('Create Free Account');
  I.dontSee('Last name is required');
  I.see('Last name must be at least 2 characters.');
  I.fillField('Last Name', 'll');
  I.click('Create Free Account');
  I.dontSee('Last name must be at least 2 characters.');
  I.click('Create Free Account');

  I.see('Email is required');
  I.fillField('Email', testData.userLogin);
  I.click('Create Free Account');
  I.dontSee('Email is required');
  I.see('Email is invalid');
  I.fillField('Email', testData.userDomain);
  I.click('Create Free Account');
  I.dontSee('Email is invalid');
  I.click('Create Free Account');

  I.click('Create Free Account');
  I.dontSee('Mobile phone is required');
  I.fillField('Mobile Phone', testData.incompletePhoneNumber);
  I.click('Create Free Account');
  I.see('Phone number format is invalid');
  I.dontSee('Mobile Phone format is invalid');
  I.fillField('Mobile Phone', testData.invalidPhoneNumber);
  I.dontSee(testData.invalidPhoneNumber);
  //   // I.see('188-8888-881'); Here is a potential bug in web form,
  //   // driver gets '+188-8888-881' instead '188-8888-881'
  //   // Also, I see that method like 'I.clearField()' does not work with this form

  I.click('Create Free Account');
  I.see('Password is required');
  I.fillField('Password', testData.invalidPassword);
  I.click('Create Free Account');
  I.dontSee('Password is required');
  I.see('Password must be at least 8 characters');
  I.fillField('Password', testData.validPassword);
  I.click('Create Free Account');
  I.dontSee(testData.validPassword);

  I.fillField('Password Confirmation', testData.invalidPassword);
  I.click('Create Free Account');
  I.see('Passwords don\'t match');
  I.dontSee(testData.invalidPassword);
  I.fillField('Password Confirmation', testData.validPassword);
  I.click('Create Free Account');
  I.dontSee('Passwords don\'t match');
  I.dontSee('Password is required');
}).tag('@SDET');

Scenario('Creation and verification of a New (Free) User Account', async ({ I }) => {
  I.amOnPage(signUpPage.url);
  I.wait(3);
  I.fillField('First Name', testData.firstName);
  I.fillField('Last Name', testData.lastName);
  I.fillField('Email', testData.newUserEmail);
  I.fillField('Mobile Phone', testData.validPhoneNumber);
  I.fillField('Password', testData.validPassword);
  I.fillField('Password Confirmation', testData.validPassword);
  I.click('Create Free Account');
  I.see('SUCCESS!');
  I.wait(5);
  I.click(signUpPage.continueButton);
  I.wait(3);
  I.see(`Welcome back, ${testData.firstName}!`);
  I.wait(3);
  I.click(usccaDashboardPage.userHamburgerMenuButton);
  I.click(userAccountMenu.accountDetailsButton);
  I.wait(3);
  I.click(userAccountDetailsPage.passwordUpdateButton);
  I.wait(3);
  I.fillField('Password', testData.newValidPassword);
  I.fillField('Confirm password', testData.newValidPassword);
  I.click(userAccountDetailsPage.passwordSubmitButton);
  I.wait(3);
  I.click(usccaDashboardPage.userHamburgerMenuButton);
  I.wait(3);
  I.click(userAccountMenu.logOutButton);
  I.wait(3);
  I.amOnPage(loginPage.url);
  I.wait(3);
  I.fillField('Email', testData.newUserEmail);
  I.fillField('Password', testData.newValidPassword);
  I.click('Log In');
  I.wait(3);
  I.see(`Welcome back, ${testData.firstName}!`);
}).tag('@SDET');

Scenario('Changing the shipment address for New (Free) User Account', async ({ I }) => {
  I.wait(3);
  I.amOnPage(userAccountDetailsPage.url);
  I.fillField('Email', testData.newUserEmail);
  I.fillField('Password', testData.newValidPassword);
  I.click('Log In');
  I.wait(5);
  I.click(usccaDashboardPage.userHamburgerMenuButton);
  I.wait(3);
  I.click(userAccountMenu.accountDetailsButton);
  I.wait(3);
  I.click(userAccountDetailsPage.addressUpdateButton);
  I.fillField('Street', testData.streetAddress);
  I.fillField('City', testData.cityName);
  I.selectOption(userAccountDetailsPage.state, testData.stateAbbr);
  I.fillField('Zip', testData.zipCode);
  I.wait(3);
  I.click(userAccountDetailsPage.addressSubmitButton);
}).tag('@SDET');
//   //And here is the second bug, while you attempt to save shipping address:
// //   49152566d782e75a2bf289d249751a636b73ab17.22178292758988877b67.js:1 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'shippingAddress')
// //     at Object.s [as updateFunction] (49152566d782e75a2bf289d249751a636b73ab17.22178292758988877b67.js:1:97562)
// //     at async 49152566d782e75a2bf289d249751a636b73ab17.22178292758988877b67.js:1:251250
// // s @ 49152566d782e75a2bf289d249751a636b73ab17.22178292758988877b67.js:1
// // await in s (async)
// // We @ framework.22e8b103567426072587.js:1
// // Ye @ framework.22e8b103567426072587.js:1
// // (anonymous) @ framework.22e8b103567426072587.js:1
// // xr @ framework.22e8b103567426072587.js:1
// // Cr @ framework.22e8b103567426072587.js:1
// // (anonymous) @ framework.22e8b103567426072587.js:1
// // De @ framework.22e8b103567426072587.js:1
// // (anonymous) @ framework.22e8b103567426072587.js:1
// // Or @ framework.22e8b103567426072587.js:1
// // Zt @ framework.22e8b103567426072587.js:1
// // Jt @ framework.22e8b103567426072587.js:1
// // t.unstable_runWithPriority @ framework.22e8b103567426072587.js:1
// // Wl @ framework.22e8b103567426072587.js:1
// // Me @ framework.22e8b103567426072587.js:1
// // Xt @ framework.22e8b103567426072587.js:1

Scenario('Checking the videos availability for New (Free) User unauthorized Account', async ({ I }) => {
  I.amOnPage(protectorAcademypPage.url);
  I.wait(5);
  I.click(protectorAcademypPage.videoButton);
  I.wait(5);
  I.grabVideosReport();
}).tag('@SDET');

Scenario('Checking the videos availability for New (Free) User authorized Account', async ({ I }) => {
  I.amOnPage(loginPage.url);
  I.wait(5);
  I.fillField('Email', testData.qaTestEmail);
  I.fillField('Password', testData.qaTestPassword);
  I.click('Log In Now');
  I.wait(5);
  I.click(userAccountDetailsPage.protectorAcademyButton);
  I.wait(5);
  I.click(protectorAcademypPage.videoButton);
  I.wait(5);
  I.grabVideosReport();
}).tag('@SDET');
