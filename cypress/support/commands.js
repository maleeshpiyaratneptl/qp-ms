// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// ***********************************************
// QuadPay commands.js 
// Custom commands 
// ***********************************************


//const BASE_URL = Cypress.env('BASE_URL');
//const VALID_MOBILE_NUMBER = Cypress.env('VALID_MOBILE_NUMBER');

import '@percy/cypress';

/*
* Accessing the customer portal login page 
*/
Cypress.Commands.add('accessLoginPage', () => {
    //cy.viewport(1024, 768)
    cy.visit(Cypress.env('BASE_URL'))
})

/*
* Accessing the merchant portal login page 
*/
Cypress.Commands.add('accessMpLoginPage', () => {
    cy.viewport(Cypress.env('VIEWPORT'))
    cy.visit(Cypress.env('merchant_base_url'))
})

/*
* Navigate to merchant portal transaction
*/
Cypress.Commands.add('navigateToTransaction', () => {
    cy.get('.dashboard-nav > :nth-child(2) > a').click()
    cy.wait(6000)
    cy.get('.dashboard-nav > :nth-child(2) > a').click()
    cy.get('thead > tr > :nth-child(7)')
})


/*
*login to  merchant portal 
*/
Cypress.Commands.add('loginToMpOrderSec', () => {
    cy.viewport(Cypress.env('VIEWPORT'))
    cy.visit(Cypress.env('merchant_base_url'))
    cy.get('.sign-form > :nth-child(1) > .ng-untouched').type(Cypress.env('merchant_active_email'))
    cy.get(':nth-child(2) > .ng-untouched').type(Cypress.env('merchant_active_password'))
    cy.get('.btn').click()
    cy.get('.active > a').click()
})

/*
* Successful user login with an existing customer's mobile number
*/
Cypress.Commands.add('loginWithMobileNumber', () => {
    cy.accessLoginPage()
    cy.get('input[name="phoneNumber"]').type(Cypress.env('VALID_MOBILE_NUMBER'))
    cy.get('.btn').click()
    cy.wait(Cypress.env('WAIT_FOR_VERIFICATIONCODE'))
    cy.getAndTypeVerificationCodeSMS()
    cy.get(':nth-child(8) > [type="submit"]').click()
})

const newLocal = 'purchaseTheOrder';
/*
* login for early payment
*/
Cypress.Commands.add('loginforEarlyPayment', () => {
    cy.accessLoginPage()
    cy.get('input[name="phoneNumber"]').type(Cypress.env('VALID_MOBILE_NUMBER'))
    cy.get('.btn').click()
    cy.wait(Cypress.env('WAIT_FOR_VERIFICATIONCODE'))
    cy.request(Cypress.env('SMS_SERV_EP_URL')).then((response) => {

        var verificationCode = response.body.match(/Your QuadPay verification code is: \d{6}/g)[0]
          .match(/\d{6}/)[0]
  
        cy.typeVerificationCode(verificationCode);
      });
  
      Cypress.Commands.add('typeVerificationCode', (verificationCode) => {
        cy.get('[name="code1"]').type(verificationCode[0]);
        cy.get('[name="code2"]').type(verificationCode[1]);
        cy.get('[name="code3"]').type(verificationCode[2]);
        cy.get('[name="code4"]').type(verificationCode[3]);
        cy.get('[name="code5"]').type(verificationCode[4]);
        cy.get('[name="code6"]').type(verificationCode[5]);
        cy.get(':nth-child(8) > [type="submit"]').click()
        
      })
  })
   

/*
* Navigating to the Dashboard page 
*/
Cypress.Commands.add('navigateToDashboard', () => {
    cy.contains('Dashboard').click();
})
/*
* Navigating to update card information page 
*/
Cypress.Commands.add('navigateToUpdateCardInformation', () => {
    cy.contains('Dashboard').click();
    cy.get(':nth-child(1) > .card-name > .view-link').click()
})

/*
* Navigating to the Edit email page from landing  page
*/
Cypress.Commands.add('navigateToEditEmailPage', () => {
    cy.navigateToDashboard()
    cy.get('.email > .setting-link').click()
})

/*
* Navigating to the Edit address page from landing  page
*/
Cypress.Commands.add('navigateToEditAddress', () => {
    cy.navigateToDashboard()
    cy.get(':nth-child(4) > .setting-link').click()
})


/*
*place the order for early payment
*/
Cypress.Commands.add('placeNewItem', () => {
    cy.visit('https://demo-woo-ci.quadpay.com/')
    cy.get('.storefront-popular-products > .woocommerce > .products > .post-28 > .button').click()
    cy.wait(5000)
    cy.get('.woocommerce-cart-tab-container > .widget > .widget_shopping_cart_content > .woocommerce-mini-cart__buttons > .checkout').click()
    cy.get('#billing_first_name').clear().type('goyum')
    cy.get('#billing_last_name').clear().type('sudaraka')
    cy.get('#billing_company').clear().type('ptl')
    cy.get('#billing_country_field > .woocommerce-input-wrapper > .select2 > .selection > .select2-selection > .select2-selection__arrow').click()
    cy.get('.select2-search__field').type('United States (US)').type('{enter}')
    cy.get('#billing_address_1').clear().type('123')
    cy.get('#billing_address_2').clear().type('test')
    cy.get('#billing_city').clear().type('test city')
    cy.get('#billing_state_field > .woocommerce-input-wrapper > .select2 > .selection > .select2-selection > .select2-selection__arrow').click()
    cy.get('.select2-search__field').type('California').type('{enter}')
    cy.get('#billing_postcode').clear().type('90002')
    cy.get('#billing_phone').clear().type('9189322089')
    cy.get('#billing_email').clear().type('sudaraka+000@rayonate.com')
    cy.get('#payment > ul > li.wc_payment_method.payment_method_quadpay > label').click({ force: true })
    cy.get('#place_order').click({ force: true })
    cy.get('.form-control').type(Cypress.env('VALID_MOBILE_NUMBER'))
    cy.get(':nth-child(3) > .col > .btn').click()
    cy.wait(7000)

    cy.request(Cypress.env('SMS_SERVICE_URL')).then((response) => {

      var verificationCode = response.body.match(/Your QuadPay verification code is: \d{6}/g)[0]
        .match(/\d{6}/)[0]

      cy.typeVerificationCode(verificationCode);
    });

    Cypress.Commands.add('typeVerificationCode', (verificationCode) => {
      cy.get('[name="code1"]').type(verificationCode[0]);
      cy.get('[name="code2"]').type(verificationCode[1]);
      cy.get('[name="code3"]').type(verificationCode[2]);
      cy.get('[name="code4"]').type(verificationCode[3]);
      cy.get('[name="code5"]').type(verificationCode[4]);
      cy.get('[name="code6"]').type(verificationCode[5]);

      cy.get('.btn').click()
      cy.get('.btn').click({ force: true })
      cy.get('.confirm-btn-holder > .btn').click()
     
    })
})

/*
*purchase new item for check update date in merchant portal
*/
Cypress.Commands.add('placeNewItemForMerchant', () => {
    cy.visit('https://demo-woo-ci.quadpay.com/')
    cy.get('.storefront-popular-products > .woocommerce > .products > .post-28 > .button').click()
    cy.wait(5000)
    cy.get('.woocommerce-cart-tab-container > .widget > .widget_shopping_cart_content > .woocommerce-mini-cart__buttons > .checkout').click()
    cy.get('#billing_first_name').clear().type('goyum')
    cy.get('#billing_last_name').clear().type('sudaraka')
    cy.get('#billing_company').clear().type('ptl')
    cy.get('#billing_country_field > .woocommerce-input-wrapper > .select2 > .selection > .select2-selection > .select2-selection__arrow').click()
    cy.get('.select2-search__field').type('United States (US)').type('{enter}')
    cy.get('#billing_address_1').clear().type('123')
    cy.get('#billing_address_2').clear().type('test')
    cy.get('#billing_city').clear().type('test city')
    cy.get('#billing_state_field > .woocommerce-input-wrapper > .select2 > .selection > .select2-selection > .select2-selection__arrow').click()
    cy.get('.select2-search__field').type('California').type('{enter}')
    cy.get('#billing_postcode').clear().type('90002')
    cy.get('#billing_phone').clear().type('9189322089')
    cy.get('#billing_email').clear().type('sudaraka+000@rayonate.com')
    cy.get('#payment > ul > li.wc_payment_method.payment_method_quadpay > label').click({ force: true })
    cy.get('#place_order').click({ force: true })
    cy.get('.form-control').type(Cypress.env('VALID_MOBILE_NUMBER'))
    cy.get(':nth-child(3) > .col > .btn').click()
    cy.wait(7000)

    cy.request(Cypress.env('SMS_SERVICE_URL')).then((response) => {

      var verificationCode = response.body.match(/Your QuadPay verification code is: \d{6}/g)[0]
        .match(/\d{6}/)[0]

      cy.typeVerificationCode(verificationCode);
    });

    Cypress.Commands.add('typeVerificationCode', (verificationCode) => {
      cy.get('[name="code1"]').type(verificationCode[0]);
      cy.get('[name="code2"]').type(verificationCode[1]);
      cy.get('[name="code3"]').type(verificationCode[2]);
      cy.get('[name="code4"]').type(verificationCode[3]);
      cy.get('[name="code5"]').type(verificationCode[4]);
      cy.get('[name="code6"]').type(verificationCode[5]);

      cy.get('.btn').click()
      cy.get('.btn').click({ force: true })
      cy.get('.confirm-btn-holder > .btn').click()
      cy.loginToMpOrderSec()
      cy.navigateToTransaction()
    })
})


/*
*payoff all installments
*/
Cypress.Commands.add('settleAllInstallment',()=>{
    cy.loginforEarlyPayment()
    cy.get('.active > a').click()
    cy.get(':nth-child(1) > .btn-box > .btn').click()
    cy.get(':nth-child(1) > :nth-child(4) > .status > :nth-child(1) > div').should('have.text', 'Paid')
    cy.get('.btn').click()
    cy.get('.btn-primary').click()
    cy.get('.btn').click()
   
    cy.get('.active > a').click()
    cy.get(':nth-child(1) > .btn-box > .btn').click()
    cy.get(':nth-child(1) > :nth-child(4) > .status > :nth-child(1) > div').should('have.text', 'Paid')
    cy.get('.btn').click()
    cy.get('.btn-primary').click()
    cy.get('.btn').click()
   
    cy.get('.active > a').click()
    cy.get(':nth-child(1) > .btn-box > .btn').click()
    cy.get(':nth-child(1) > :nth-child(4) > .status > :nth-child(1) > div').should('have.text', 'Paid')
    cy.get('.btn').click()
    cy.get('.btn-primary').click()
    cy.get('.btn').click()
})

/*
*clear all payments
*/

Cypress.Commands.add('settleAllPayments',()=>{
    cy.loginforEarlyPayment()
    cy.get('.active > a').click()
    cy.get(':nth-child(1) > .btn-box > .btn').click()
    
    cy.get('.btn').click()
    cy.get('.btn-primary').click()
    cy.get('.btn').click()
    cy.get('.dashboard-nav > :nth-child(1) > a').click()
    cy.get(':nth-child(1) > .btn-box > .btn').click()
    cy.get('.btn').click()
    cy.get('.btn-primary').click()
    cy.get('.btn').click()
    cy.get('.dashboard-nav > :nth-child(1) > a').click()
    cy.get(':nth-child(1) > .btn-box > .btn').click()
    cy.get('.btn').click()
    cy.get('.btn-primary').click()
    cy.get('.btn').click()
    cy.get('.dashboard-nav > :nth-child(1) > a').click()
    cy.get(':nth-child(1) > .btn-box > .btn').click()
})



/*
* Navigate to the Edit mobile number page from landing page 
*/Cypress.Commands.add('navigateToEditMobileNumberPage', () => {
    cy.navigateToDashboard()
    cy.get('.phone > .setting-link').click()
})

/*
* Type verification code received to mobile number 
* TODO : 1. SMS Reading should be configurable from different numbers 
*        and differnt service providers 
*        2. Refactor the method to two seperate methods. 
            i. Get Versification code 
            ii. Type the verification code 
*/
Cypress.Commands.add('getAndTypeVerificationCodeSMS', () => {

    const SMS_URL = Cypress.env('SMS_SERVICE_URL');

    cy.request(SMS_URL).then((response) => {

        var verificationCode = response.body.match(/Your QuadPay verification code is: \d{6}/g)[0]
            .match(/\d{6}/)[0]

        cy.typeVerificationCode(verificationCode);
    });
})



Cypress.Commands.add('typeVerificationCode', (verificationCode) => {
    cy.get('[name="code1"]').type(verificationCode[0]);
    cy.get('[name="code2"]').type(verificationCode[1]);
    cy.get('[name="code3"]').type(verificationCode[2]);
    cy.get('[name="code4"]').type(verificationCode[3]);
    cy.get('[name="code5"]').type(verificationCode[4]);
    cy.get('[name="code6"]').type(verificationCode[5]);
})


Cypress.Commands.add('getVerificationCodeSMS', () => {

    const SMS_URL = Cypress.env('SMS_SERVICE_URL');

    cy.request(SMS_URL).then((response) => {
        var verificationCode = response.body.match(/Your QuadPay verification code is: \d{6}/g)[0]
            .match(/\d{6}/)[0]

        return verificationCode
    });

})

Cypress.Commands.add('verifyFooter', () => {
    cy.get('.copyright > p').contains('© QuadPay Inc')

    cy.get('.sub-menu > :nth-child(1) > a')
        .contains('Privacy')
        .should('have.attr', 'href', 'https://www.quadpay.com/privacy-policy/')
        .and('be.visible')

    cy.get(':nth-child(2) > a')
        .contains('Terms')
        .should('have.attr', 'href', 'https://www.quadpay.com/terms-and-conditions/')
        .and('be.visible')
});


Cypress.Commands.add('verifyHeader', () => {
    cy.get('.user-box a')
        .should('have.text', 'Logout')
        .should('be.visible')

    cy.get('img')
        .should('have.attr', 'alt', 'Quadpay')
        .should('have.attr', 'src', '/assets/images/quadpay-logo.svg')

})

Cypress.Commands.add('navigateToAddCardPage', () => {
    cy.contains('Dashboard').click();       //Click Dashboard 
    cy.get('a[href*="add-card"]').click();  //Click Add Card Link 
})


/*
*add new credit card for delete card test cases 
*/

Cypress.Commands.add('addNewCreditCard',()=>{
    cy.navigateToAddCardPage();

    enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
    enterCardInformation('4242424242424242', '01', '23', '456')
   
    cy.get('.btn-primary').click()
    cy.get('.small').should('have.text', 'Card successfully added.')
    cy.get('.container > :nth-child(1) > :nth-child(1) > p')
        .should('have.text', 'You can now use this card for future Orders or Installments.')
    cy.get('.btn').should('have.text', 'Back to Dashboard').click()

})
function enterCardInformation(cardNumber, month, year, cvc) {

    cy.get(':nth-child(6) > .input-with-icon > .StripeElement > .__PrivateStripeElement > iframe').then($iframe => {
        const doc = $iframe.contents()
        let input = doc.find('input')[1]
        //Type the card number 
        cy
            .wrap(input)
            //.clear()
            .type(cardNumber, { force: true })

        //Type the expiry date and year 
        input = doc.find('input')[3]
        cy
            .wrap(input)
            .type(month, { force: true })
            .type(year, { force: true })
    })

    //Type the security code 
    cy.get(':nth-child(2) > .input-with-icon > .StripeElement > .__PrivateStripeElement > iframe').then($iframe => {
        const doc = $iframe.contents()
        let input = doc.find('input')[1]
        cy
            .wrap(input)
            //.clear()
            .type(cvc, { force: true })

    })
}

function enterBillingInformation(addressLine1, addressLine2, city, postalCode, state, cardHolderName) {
    cy.get('input[name="addressLine1"]').type(addressLine1)
    cy.get('input[name="addressLine2"]').type(addressLine2)
    cy.get('input[name="addressCity"]').type(city)
    cy.get('input[name="addressPostCode"]').type(postalCode)
    cy.get('select[name="addressState"]').select(state)//Select country from dropdown 
    cy.get('input[name="cardHolderName"]').type(cardHolderName)
}

/*
*verify merchant portal header
*/

Cypress.Commands.add('verifyMPHeader', () => {
    cy.get('.header > .container-lg')
        .should('have.text', 'OrdersTransactionsPaymentsLogout')
        .should('be.visible')

    cy.get('img')
        .should('have.attr', 'alt', 'Quadpay')
        .should('have.attr', 'src', '/assets/images/quadpay-logo.svg')

})

/*
*change the card
*/
Cypress.Commands.add('changePaymentCard',()=>{
    cy.get('.dashboard-nav > :nth-child(1) > a').click()
    cy.get(':nth-child(1) > .btn-box > .btn').click()
    cy.get(':nth-child(1) > :nth-child(4) > .status > :nth-child(1) > div').should('have.text','Paid')
    cy.get('.btn').click()
    cy.get(':nth-child(1) > a > .card-name').click()
    cy.get('.btn-primary').click()
    cy.get('.btn').click()

    cy.get('.dashboard-nav > :nth-child(1) > a').click()
  cy.get(':nth-child(1) > .btn-box > .btn').click()
  cy.get(':nth-child(1) > :nth-child(4) > .status > :nth-child(1) > div').should('have.text','Paid')
  cy.get(':nth-child(2) > :nth-child(4) > .status > :nth-child(1) > div > span').should('have.text','Paid')
  cy.get('.btn').click()
  cy.get(':nth-child(1) > a > .card-name').click()
  cy.get('.btn-primary').click()
  cy.get('.btn').click()

  cy.get('.dashboard-nav > :nth-child(1) > a').click()
  cy.get(':nth-child(1) > .btn-box > .btn').click()
  cy.get(':nth-child(1) > :nth-child(4) > .status > :nth-child(1) > div').should('have.text','Paid')
  cy.get(':nth-child(2) > :nth-child(4) > .status > :nth-child(1) > div > span').should('have.text','Paid')
  cy.get(':nth-child(3) > :nth-child(4) > .status > :nth-child(1) > div > span').should('have.text','Paid')
  cy.get('.btn').click()
  cy.get(':nth-child(1) > a > .card-name').click()
  cy.get('.btn-primary').click()
  cy.get('.btn').click()

})

function perchaseTheOrder() {
    return 'perchaseorder';
}

