/// <reference types="Cypress" />

describe('QuadPay : Customer Login Test Cases', () => {
  
  import '@percy/cypress';
  beforeEach(() => {
    cy.accessMpLoginPage()
    
  })
  
  var mocha = new Mocha({
    reporter: 'mochawesome'
  });
 
  context('valid test cases',()=>{

  it.only('TC_QP_ML_0001 : Verify a customer can login to the QP, When a valid email and associated password is given ', () => {
    // cy.eyesOpen({
    //   appName: 'Hello World!',
    //   testName: 'QP_merchant_login',
    //   browser: {  
    //   deviceName: 'iPhone X',
    //   screenOrientation: 'landscape'},
    //   name: 'firefox',
    //   name: 'chrome'
    //     //Add more variations
      
    // });
    // cy.eyesCheckWindow('Main Page');
    

    cy.get('.sign-form > :nth-child(1) > .ng-untouched').type(Cypress.env('merchant_active_email'))
    cy.get(':nth-child(2) > .ng-untouched').type( Cypress.env('merchant_active_password'))
    cy.percySnapshot("first");
    // cy.eyesCheckWindow('Main Page');
    cy.get('.btn').click()
    cy.percySnapshot("secound");
    // cy.eyesCheckWindow('Click!');
    cy.get('.user-box > a').contains('Logout')
    cy.percySnapshot("third");
    cy.verifyFooter()
    // cy.eyesCheckWindow('Footer');
    cy.percySnapshot("forth");
    cy.verifyHeader()
    // cy.eyesCheckWindow('Header');
  })
  // afterEach(() => {
  //   cy.eyesClose();
  // });

  it('TC_QP_ML_0002 : Verify a customer can not login to the QP and appropriate error display, When a valid email and wrong password is given ', () => {
    cy.get('.sign-form > :nth-child(1) > .ng-untouched').type(Cypress.env('merchant_active_email'))
    cy.get(':nth-child(2) > .ng-untouched').type('wrongPassword')
    cy.get('.btn').click()
    cy.get('.validation-result')
      .contains(' Wrong email or password. ')
      .should('be.visible')
  })

  it('TC_QP_ML_0003 : Verify SIGN IN button is disable, When email is not given (blank)', () => {
    cy.get('.sign-form > :nth-child(1) > .ng-untouched').clear()
    cy.get(':nth-child(2) > .ng-untouched').type(Cypress.env('merchant_active_password'))
    cy.get('.btn')
      .should('be.disabled')
  })

  it('TC_QP_ML_0004 : Verify that the SIGN IN button is disabled  When customer tries to login with valid email and blank password ', () => {
    cy.get('.sign-form > :nth-child(1) > .ng-untouched').type(Cypress.env('merchant_active_email'))
    cy.get(':nth-child(2) > .ng-untouched').clear()
    cy.get('.btn')
      .should('be.disabled')
  })

  it('TC_QP_ML_0005 :Verify a customer can logout from the customer portal successfully, When logout link is clicked ', () => {
    cy.get('.sign-form > :nth-child(1) > .ng-untouched').type(Cypress.env('merchant_active_email'))
    cy.get(':nth-child(2) > .ng-untouched').type(Cypress.env('merchant_active_password'))
    cy.get('.btn').click()
    cy.get('.user-box > a').click()
    cy.get('.container').should('be.visible')
  })

  

  it('TC_QP_ML_0007 :')
  it('TC_QP_ML_0008 :')

  it('TC_QP_ML_0009 : Verify an appropriate error message is displayed When non-existing customer email is given', () => {
    cy.get('.sign-form > :nth-child(1) > .ng-untouched').type(Cypress.env('NON_EXISTING_EMAIL'))
    cy.get(':nth-child(2) > .ng-untouched').type(Cypress.env('merchant_active_password'))
    cy.get('.btn').click()
    cy.get('.validation-result')
    .contains(' Wrong email or password. ')
    .should('be.visible')
})

  })
  
 

  context(' Enter invalid  emails ', () => {
    let emails = ['pragmatic','pragmatic.user','pragmatic.user@',
       'pragmatic.user@rayonate',
       'pragmatic.user@rayonate.',
     ]
    emails.forEach((email) => {
     it('TC_QP_ML_0010 : Verify an appropriate error message is displayed When invalid card email format is given', () => {
         cy.get('.sign-form > :nth-child(1) > .ng-untouched').clear().type(email)
         cy.get(':nth-child(2) > .ng-untouched').type('gdgddhddgddhdg')
         cy.get('.btn').should('be.disabled')
        
     })
   })
  })

  context('Verify UI elements in login page merchant portal', () => {

    it('TC_QP_ML_0011 : Verify UI elements in the login page', () => {

      cy.get('.small')
        .contains('Sign In')
        .should('be.visible')
  
      cy.get('.container > p')
        .contains('Enter your email and password to login to your account.')
        .should('be.visible')
  
      cy.get('.sign-form > :nth-child(1) > label')
        .contains('Email')
        .should('be.visible')
  
      cy.get('.sign-form > :nth-child(1) > .ng-untouched')
        .should('be.visible')
  
      cy.get('.label-holder > label')
        .contains('Password')
        .should('be.visible')
  
      cy.get('.forgot-link')
        .contains('Create or reset password')
        .should('be.visible')
  
      cy.get(':nth-child(2) > .ng-untouched')
        .should('be.visible')
  
      cy.get('.btn')
        .contains('Sign in')
        .should('be.visible')

  })

  it('TC_QP_ML_0012 : Verify the page title',()=>{
    cy.title().should('eq', 'Login - QuadPay')

  })
  it('TC_QP_ML_0013 : Verify the autofocus to element',()=>{
    
  })
  it('TC_QP_ML_0014 :  Verify that email is not autocomplete when typing email address',()=>{
    cy.get('.sign-form > :nth-child(1) > .ng-untouched')
         .should('have.attr', 'autocomplete', 'off')
    cy.get(':nth-child(2) > .ng-untouched')
         .should('have.attr', 'autocomplete', 'off')
  })

  })
context('takes time for time out',()=>{
  it('TC_QP_ML_0006 : Verify customer is logged out from the system When the customer is idle for specified timeout')
})
})


