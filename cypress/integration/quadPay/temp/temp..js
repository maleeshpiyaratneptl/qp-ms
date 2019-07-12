describe('test_name', function() {

    it('what_it_does', function() {
   
       cy.viewport(1920, 979)
    
       cy.visit('https://demo-woo-ci.quadpay.com/checkout/')
    
       cy.get('#billing_country_field > .woocommerce-input-wrapper > .select2 > .selection > .select2-selection').click()
    
       cy.get('#order_review > #payment > .wc_payment_methods > .wc_payment_method > #payment_method_bacs').click()
    
       cy.get('.woocommerce-input-wrapper > .select2 > .selection > .select2-selection > #select2-billing_country-container').click()
    
       cy.get('#order_review > #payment > .wc_payment_methods > .wc_payment_method > #payment_method_bacs').click()
    
       cy.get('.woocommerce-input-wrapper > .select2 > .selection > .select2-selection > #select2-billing_country-container`>.select2-billing_country-result-bzvd-US').click()
    
       cy.get('#order_review > #payment > .wc_payment_methods > .wc_payment_method > #payment_method_bacs').click()
    
    })
   
   })

   /*
   *test temporary
   */
  /// <reference types="Cypress" />

describe('QuadPay : Customer Login Test Cases', () => {


   const pageTitle = 'Login - QuadPay'
   let validEmail
   let validMobileNumber
   let verificationCode

//    before('Setup ' , () => {
//        validEmail = Cypress.env('VALID_EMAIL')
//        validMobileNumber = Cypress.env('VALID_MOBILE_NUMBER')

//    })

   context('QuadPay User Login', () => {

    //    beforeEach(() => {
    //        cy.accessLoginPage()
    //    })


       it('QuadPay Login Tests : Verify error for invalid phone number with ENTER key', () => {

           const invalidMobileNumber = '4589652456'
           cy.get('.btn').its('disabled')

           cy.get('input[name="phoneNumber"]')
               .type(invalidMobileNumber + '{enter}')
               .should('have.value', invalidMobileNumber)


           cy.get('.btn').should('be.enabled').click()

           cy.contains('We were unable to locate a customer using that number.')
               .should('be.visible')

           cy.get('input[name="phoneNumber"]')
               .should('have.value', invalidMobileNumber)
       })

       it('TC_QP_UL_0028 : Verify error for invalid phone number', () => {

           // const invalidMobileNumber = '4589652456'

           // cy.get('input[name="phoneNumber"]')
           //     .type(invalidMobileNumber)
           //     .should('have.value', invalidMobileNumber)

           // cy.get('.btn').should('have.text', 'Send Code')

           // cy.get('.btn').click()

           // cy.contains('We were unable to locate a customer using that number.')
           //     .should('be.visible')

           // cy.get('input[name="phoneNumber"]')
           //     .should('have.value', invalidMobileNumber)

       })
       it('TC_QP_UL_0033 : Verify UI elements in the login page', () => {

           cy.get('h2')
               .contains('Shopper Sign In')
               .should('be.visible')

           cy.contains('Enter your phone number to receive a one-time code to login.')
               .should('be.visible')

           cy.get('label')
               .contains('Phone Number')
               .should('be.visible')
               .its('disabled')

           cy.get(':nth-child(1) > .form-control')
               .should('be.enabled')
               .and('have.attr', 'maxlength', '10')


           cy.get('a')
               .contains('Login using email instead')
               .should('be.visible')
               .click()

           cy.get('p')
               .contains('Enter your email address to receive a one-time code to login.')
               .should('be.visible')

           cy.get('label')
               .contains('Email Address')
               .should('be.visible')

           cy.get('a')
               .contains('Login using phone number instead')
               .should('be.visible')
               .click()

           cy.get('.btn')
               .should('have.text', 'Send Code')
               .should('be.disabled')
               .and('be.visible')

           cy.get('img')
               .should('have.attr', 'src', '/assets/images/quadpay-logo.svg')
               .and('be.visible')

           cy.verifyFooter()
       })


       it('TC_QP_UL_0035 :  Verify that mobile number is not autocomplete when typing mobile number', () => {
           // cy.get(':nth-child(1) > .form-control')
           //     .and('have.attr', 'autocomplete', 'off')
       })

       it('TC_QP_UL_0035 :  Verify that email is not autocomplete when typing email address', () => {

           // cy.get('a')
           //     .contains('Login using email instead')
           //     .click()

           // cy.get('#emailInput')
           //     .and('have.attr', 'autocomplete', 'off')
       })

       it('Quadpay Login Tests : Check autofocus to the mobile number field', () => {
           cy.get(':nth-child(1) > .form-control')
               .and('have.attr', 'autofocus')

       })


       it('Quadpay Login Tests : Check autofocus to the email address field', () => {
           cy.get('a')
               .contains('Login using email instead')
               .click()

           cy.get('#emailInput')
               .and('have.attr', 'autofocus')

       })

     

       context('Login with non existing email addresses', () => {

           const invalidEmails = ['janesh@test.com', 'quadpay@ptl.com', 'janesh@quadpay.lk']
           invalidEmails.forEach((invalidEmail) => {
               
       it(`TC_QP_UL_0024 : Verify an appropriate error message is displayed When non-existing customer email is given  ${invalidEmail}`, () => {

                   cy.contains('Login using email instead')
                       .click()

                   cy.get('input[name="email"]')
                       .type(invalidEmail)
                       .should('have.value', invalidEmail)

                   cy.get('.btn')
                       .should('have.text', 'Send Code')

                   cy.get('.btn').click()

                   cy.get(':nth-child(3) > p')
                       .eq(0)
                       .should('have.text', 'We were unable to locate a customer using that email.')
                       .should('be.visible')

                   cy.get('input[name="email"]')
                       .should('have.value', invalidEmail)
                       .should('be.enabled')

               })

           })

       })
       context('test_name', ()=> {
        it('new try for email',()=>{
            cy.request('https://accounts.google.com/servicelogin/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin')
        })
    })



       context('Login with invalid email addresses', () => {

           const invalidEmails = ['a@b.c', 'test@', '12345', '@', '  ']
           invalidEmails.forEach((invalidEmail) => {
               it(`TC_QP_UL_0026 : Verify switching from login with email When customer has tried to login with invalid email address ${invalidEmail}`, () => {

                   cy.contains('Login using email instead')
                       .click()

                   cy.get('input[name="email"]')
                       .type(invalidEmail)
                       .should('have.value', invalidEmail)

                   cy.get('.btn')
                       .should('have.text', 'Send Code')

                   cy.get('.btn').click()

                   cy.get(':nth-child(2) > .validation-result')
                       .eq(0)
                       .should('have.text', ' Invalid email address ')
                       .should('be.visible')
                       .should('have.class', 'validation-result')

                   cy.get('input[name="email"]')
                       .should('have.value', invalidEmail)
                       .should('be.enabled')
               })

           })

       })


       it('Quadpay Login Tests : Verify error for invalid email', () => {

           const invalidEmail = 'janesh@test.com'

           cy.contains('Login using email instead')
               .click()

           cy.get('input[name="email"]')
               .type(invalidEmail)
               .should('have.value', invalidEmail)

           cy.get('.btn')
               .should('have.text', 'Send Code')

           cy.get('.btn').click()

           cy.get(':nth-child(3) > p')
               .eq(0)
               .should('have.text', 'We were unable to locate a customer using that email.')

           cy.get('input[name="email"]')
               .should('have.value', invalidEmail)


       })


       it('Quadpay Login Tests : Verify error for invalid email with pressing enter key from email field', () => {

           const invalidEmail = 'janesh@test.com'

           cy.contains('Login using email instead')
               .click()

           cy.get('input[name="email"]')
               .type(invalidEmail + '{enter}')
               .should('have.value', invalidEmail)

           cy.get('.btn')
               .should('have.text', 'Send Code')

           cy.get('.btn').click()

           cy.get('form p')
               .eq(0)
               .should('have.text', 'We were unable to locate a customer using that email.')

           cy.get('input[name="email"]')
               .should('have.value', invalidEmail)

       })


       it('Quadpay Login Tests : Verify login page after entering a valid email', () => {

           cy.contains('Login using email instead')
               .click()

           cy.get('input[name="email"]')
               .type(validEmail)
               .should('have.value', validEmail)

           cy.get('.btn').click()

           cy.get('input[name="email"]')
               .should('have.value', validEmail)

           cy.get(':nth-child(6) > label')
               .should('be.visible')
               .should('have.text', 'Verification Code')


           cy.get(':nth-child(8) > [type="submit"]')
               .should('be.visible')
               .should('have.text', 'Login')

           cy.get('[type="button"]')
               .should('be.visible')
               .should('have.text', 'Resend Code')

       })


       it('Quadpay Login Tests : Verify login page after entering a valid mobile number', () => {

           cy.get('input[name="phoneNumber"]')
               .type(validMobileNumber)
               .should('have.value', validMobileNumber)

           cy.get('.btn')
               .should('have.text', 'Send Code')
               .click()
               .should('not.exist')

           cy.get('input[name="phoneNumber"]')
               .should('have.value', validMobileNumber)

           cy.get('label')
               .should('be.visible')
               .eq(2)
               .should('have.text', 'Verification Code')


           cy.get('button.btn.btn-primary.block-btn')
               .eq(1)
               .should('be.visible')
               .should('have.text', 'Login')

           cy.get('button.btn.btn-primary.block-btn')
               .should('be.visible')
               .eq(2)
               .should('have.text', 'Resend Code')

       })

       it('TC_QP_UL_0032 : Verify that page title is correctly display on user login section', () => {

           // cy.title()
           //     .should('eq', pageTitle)

       })


       it('TC_QP_UL_0034 : Verify the URL in login page contains login', () => {

           // cy.url()
           //     .should('include', 'login')
           //     .should('eq', Cypress.env('BASE_URL') + '/login')

       })


       it('Verify the placeholder in the email address field', () => {

           cy.contains('Login using email instead').click()

           cy.get('input[name="email"]')
               .should('be.visible')
               .invoke('attr', 'placeholder')
               .should('contain', 'Email Address')
       })



       it('Verify the placeholder in the mobile number field', () => {
           cy.get('input[name="phoneNumber"]')
               .should('be.visible')
               .invoke('attr', 'placeholder')
               .should('contain', 'Mobile Number (e.g. 5551234001)')
       })



       it.skip('TC_QP_UL_0005 : Verify an appropriate error is displayed and customer cannot login to QP, When a valid email and an invalid verification code are given ', () => {

       //     cy.contains('Login using email instead')
       //         .click()

       //     cy.get('input[name="email"]')
       //         .type(validEmail)
       //         .should('have.value', validEmail)

       //     cy.get('.btn').click()


       //     cy.get('[name="code1"]').click().type(getInvalidVerificationCode()[0])
       //     cy.get('[name="code2"]').type(getInvalidVerificationCode()[1])
       //     cy.get('[name="code3"]').type(getInvalidVerificationCode()[2])
       //     cy.get('[name="code4"]').type(getInvalidVerificationCode()[3])
       //     cy.get('[name="code5"]').type(getInvalidVerificationCode()[4])
       //     cy.get('[name="code6"]').type(getInvalidVerificationCode()[5])
       //     cy.get(':nth-child(8) > [type="submit"]')
       //         .focus()
       //         .click()

       //     cy.get('input[name="email"]')
       //         .should('have.value', validEmail)

       //     cy.contains('Invalid Verification Code.')
       //         .should('be.visible')
       //         .and('have.attr', 'style', 'color: red')

       //     cy.get('[type="button"]').should('be.enabled')
       })

       it('TC_QP_UL_0005 : Verify an appropriate error is displayed and customer cannot login to QP, When a valid mobile number and an invalid verification code are given ', () => {

       //     cy.get('input[name="phoneNumber"]')
       //         .type(validMobileNumber)
       //         .should('have.value', validMobileNumber)

       //     cy.get('.btn').click()

       //     cy.get('[name="code1"]').click().type(getInvalidVerificationCode()[0])
       //     cy.get('[name="code2"]').type(getInvalidVerificationCode()[1])
       //     cy.get('[name="code3"]').type(getInvalidVerificationCode()[2])
       //     cy.get('[name="code4"]').type(getInvalidVerificationCode()[3])
       //     cy.get('[name="code5"]').type(getInvalidVerificationCode()[4])
       //     cy.get('[name="code6"]').type(getInvalidVerificationCode()[5])
       //     cy.get(':nth-child(8) > [type="submit"]')
       //         .focus()
       //         .click()

       //     cy.get('input[name="phoneNumber"]')
       //         .should('have.value', validMobileNumber)

       //     cy.contains('Invalid Verification Code.')
       //         .should('be.visible')
       //         .and('have.attr', 'style', 'color: red')

       //     cy.get('[type="button"]').should('be.enabled')
       })



       it('TC_QP_UL_0001 : Verify a customer can login to the QP,\
        When a valid email and associated active verification code are given  ', () => {

           let VALID_MOBILE_NUMBER = Cypress.env('VALID_MOBILE_NUMBER')

           cy.get('input[name="phoneNumber"]')
               .type(VALID_MOBILE_NUMBER)
               .should('have.value', VALID_MOBILE_NUMBER)

           cy.get('.btn').click()

           cy.get('input[name="phoneNumber"]')
               .should('have.value', VALID_MOBILE_NUMBER)

           cy.wait(Cypress.env('WAIT_FOR_VERIFICATIONCODE'))

           cy.getAndTypeVerificationCodeSMS();

           cy.get(':nth-child(8) > [type="submit"]')
               .focus()
               .click()

           verifyLandingPage();
       })


       it('QuadPay Login Test : Login with expired verification code', () => {

           let VALID_MOBILE_NUMBER = Cypress.env('VALID_MOBILE_NUMBER')

           cy.get('input[name="phoneNumber"]')
               .type(VALID_MOBILE_NUMBER)

           cy.get('.btn').click()


           cy.wait(Cypress.env('EXPIRY_TIME_VERIFICATIONCODE'))

           cy.getAndTypeVerificationCodeSMS();

           cy.get(':nth-child(8) > [type="submit"]').click()

           cy.contains('Invalid Verification Code.')
               .should('be.visible')
               .and('have.attr', 'style', 'color: red')

           cy.get('[type="button"]').should('be.enabled')


       })


       it('TC_QP_UL_0013 : Verify a customer can login to the system with a valid mobile number and latest verification CODE \
          When user has requested to resend the code', () => {

           // let VALID_MOBILE_NUMBER = Cypress.env('VALID_MOBILE_NUMBER')

           // cy.get('input[name="phoneNumber"]')
           //     .type(VALID_MOBILE_NUMBER)
           //     .should('have.value', VALID_MOBILE_NUMBER)

           // cy.get('.btn').click()

           // cy.wait(Cypress.env('WAIT_FOR_VERIFICATIONCODE'))

           // cy.get(':nth-child(8) > [type="submit"]').should('be.disabled')
           // cy.get('[type="button"]').click()

           // cy.wait(Cypress.env('WAIT_FOR_VERIFICATIONCODE'))
           // cy.getAndTypeVerificationCodeSMS();

           // cy.get(':nth-child(8) > [type="submit"]').click()

           // verifyLandingPage();
       })

       it('QuadPay Login Test : Login with previous verification code received after clicking Resend button', () => {

           let VALID_MOBILE_NUMBER = Cypress.env('VALID_MOBILE_NUMBER')
           let verificationCode;


           cy.get('input[name="phoneNumber"]')
               .type(VALID_MOBILE_NUMBER)
               .should('have.value', VALID_MOBILE_NUMBER)

           cy.get('.btn').click()

           cy.wait(Cypress.env('WAIT_FOR_VERIFICATIONCODE'))

           const SMS_URL = Cypress.env('SMS_SERVICE_URL');
           cy.request(SMS_URL).then((response) => {
               verificationCode = response.body.match(/Your QuadPay verification code is: \d{6}/g)[0]
                   .match(/\d{6}/)[0]
               cy.log('VERIFICATION CODE ' + verificationCode)

               cy.get(':nth-child(8) > [type="submit"]').should('be.disabled')
               cy.get('[type="button"]').click()

               cy.wait(Cypress.env('WAIT_FOR_VERIFICATIONCODE'))

               cy.get('[name="code1"]').type(verificationCode[0]);
               cy.get('[name="code2"]').type(verificationCode[1]);
               cy.get('[name="code3"]').type(verificationCode[2]);
               cy.get('[name="code4"]').type(verificationCode[3]);
               cy.get('[name="code5"]').type(verificationCode[4]);
               cy.get('[name="code6"]').type(verificationCode[5]);

           });


           cy.get(':nth-child(8) > [type="submit"]').click()

           verifyLandingPage();


       })

       it.skip('QuadPay Login Test : Login with used verification code received after clicking Resend button', () => {


           let VALID_MOBILE_NUMBER = Cypress.env('VALID_MOBILE_NUMBER')
           let verificationCode;


           cy.get('input[name="phoneNumber"]')
               .type(VALID_MOBILE_NUMBER)
               .should('have.value', VALID_MOBILE_NUMBER)

           cy.get('.btn').click()

           cy.wait(Cypress.env('WAIT_FOR_VERIFICATIONCODE'))

           const SMS_URL = Cypress.env('SMS_SERVICE_URL');
           cy.request(SMS_URL).then((response) => {
               verificationCode = response.body.match(/Your QuadPay verification code is: \d{6}/g)[0]
                   .match(/\d{6}/)[0]
       

               cy.get('[name="code1"]').type(verificationCode[0]);
               cy.get('[name="code2"]').type(verificationCode[1]);
               cy.get('[name="code3"]').type(verificationCode[2]);
               cy.get('[name="code4"]').type(verificationCode[3]);
               cy.get('[name="code5"]').type(verificationCode[4]);
               cy.get('[name="code6"]').type(verificationCode[5]);
               cy.get(':nth-child(8) > [type="submit"]').click()


           });


           //Logout 


           //Type mobile number 


           //Type used verification code 

           verifyLandingPage();

       })

       it('QuadPay Login Test : Login with expired verification code received after clicking Resend button', () => {
           cy.get('input[name="phoneNumber"]').type(validMobileNumber)
           cy.get('.btn').click()
           cy.wait(15000)
       })

      
it('test date format on merchant portal',()=>{
    var today = new Date();
var dd = today.getDate();
var mm = today.getUTCMonth() ; 
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
} 
if (mm < 10) {
  mm = '0' + mm;
} 
var today = dd + '/' + mm + '/' + yyyy;
document.getElementById('DATE').value = today;
})


   })




   function getInvalidVerificationCode() {
       let verificationCode = '123456'
       return verificationCode;
   }


   function getVerificationCodeSMS() {
       const SMS_URL = Cypress.env('SMS_SERVICE_URL');
       cy.request(SMS_URL).then((response) => {
           verificationCode = response.body.match(/Your QuadPay verification code is: \d{6}/g)[0]
               .match(/\d{6}/)[0]
           console.log('VERIFICATION CODE INSIDE ' + verificationCode)
           console.log('VERIFICATION CODE INSIDE ' + typeof (verificationCode))
           return verificationCode
       });
   }

})


function verifyLandingPage() {
   cy.verifyHeader();
   cy.verifyFooter();
   cy.get('.user-box a').should('have.text', 'Logout').click();
}

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function dateFormat1(d) {
  var t = new Date(d);
  return t.getDate() + ' ' + monthNames[t.getMonth()] + ', ' + t.getFullYear();
}

function dateFormat2(d) {
  var t = new Date(d);
  return t.getDate() + ' ' + monthShortNames[t.getMonth()] + ', ' + t.getFullYear();
}

console.log(dateFormat1(new Date()))
console.log(dateFormat2(new Date()))