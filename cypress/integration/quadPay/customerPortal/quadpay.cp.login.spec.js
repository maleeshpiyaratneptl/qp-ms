/// <reference types="Cypress" />

describe('QuadPay : Customer Login Test Cases', () => {


    const pageTitle = 'Login - QuadPay'
    let validEmail
    let validMobileNumber
    let verificationCode


    before('Setup ', () => {
        validEmail = Cypress.env('VALID_EMAIL')
        validMobileNumber = Cypress.env('VALID_MOBILE_NUMBER')

    })

    context('QuadPay User Login with mobile number', () => {
        beforeEach(() => {
            cy.accessLoginPage()
        })
        it('TC_QP_UL_0002 : Verify a customer can login to the QP,\
                 When a valid mobile number and associated active verification code are given', () => {
                cy.eyesOpen({
                    appName: 'Hello World!',
                    testName: 'QP_customer_login',
                    browser: { width: 800, height: 600 },
                });
                cy.eyesCheckWindow('Main Page');



                cy.get(':nth-child(1) > .form-control')
                    .type(validMobileNumber)
                    .should('have.value', validMobileNumber)
                cy.get('.btn')
                    .should('have.text', 'Send Code')
                    .click()
                cy.eyesClose();
                cy.wait(7500)
                cy.getAndTypeVerificationCodeSMS()
                cy.get(':nth-child(8) > [type="submit"]').click()
                cy.verifyFooter()
                cy.verifyHeader()
                cy.get('.user-box > a').click()
            })

        it('TC_QP_UL_0004 : Verify an appropriate error is displayed and customer cannot login to QP, \
        When a valid mobile number  and an already used verification code are given ', () => {
                const USED_VERIFICATION_CODE = '850022'
                cy.get(':nth-child(1) > .form-control')
                    .type(validMobileNumber)
                    .should('have.value', validMobileNumber)
                cy.get('.btn')
                    .should('have.text', 'Send Code')
                    .click()
                cy.get('[name="code1"]').type(USED_VERIFICATION_CODE[0]);
                cy.get('[name="code2"]').type(USED_VERIFICATION_CODE[1]);
                cy.get('[name="code3"]').type(USED_VERIFICATION_CODE[2]);
                cy.get('[name="code4"]').type(USED_VERIFICATION_CODE[3]);
                cy.get('[name="code5"]').type(USED_VERIFICATION_CODE[4]);
                cy.get('[name="code6"]').type(USED_VERIFICATION_CODE[5]);
                cy.get(':nth-child(8) > [type="submit"]').click()
                cy.get('input[name="phoneNumber"]')
                    .should('have.value', validMobileNumber)

                cy.contains('Invalid Verification Code.')
                    .should('be.visible')
                    .and('have.attr', 'style', 'color: red')

                cy.get('[type="button"]').should('be.enabled')

            })

        it('TC_QP_UL_0006 : Verify an appropriate error is displayed and customer cannot login to QP,\
                            When a valid mobile number and an invalid verification code are given ', () => {
                const getInvalidVerificationCode = '@#$234'
                cy.get('input[name="phoneNumber"]')
                    .type(validMobileNumber)
                    .should('have.value', validMobileNumber)

                cy.get('.btn').click()

                cy.get('[name="code1"]').click().type(getInvalidVerificationCode[0])
                cy.get('[name="code2"]').type(getInvalidVerificationCode[1])
                cy.get('[name="code3"]').type(getInvalidVerificationCode[2])
                cy.get('[name="code4"]').type(getInvalidVerificationCode[3])
                cy.get('[name="code5"]').type(getInvalidVerificationCode[4])
                cy.get('[name="code6"]').type(getInvalidVerificationCode[5])
                cy.get(':nth-child(8) > [type="submit"]')
                    .focus()
                    .click()

                cy.get('input[name="phoneNumber"]')
                    .should('have.value', validMobileNumber)

                cy.contains('Invalid Verification Code.')
                    .should('be.visible')
                    .and('have.attr', 'style', 'color: red')

                cy.get('[type="button"]').should('be.enabled')
            })


        it('TC_QP_UL_0007: Verify cannot proceed to login , When phone number is not given (blank)', () => {
            cy.get('input[name="phoneNumber"]')
                .type('      ')
            cy.get('.btn').should('be.disabled')

        })
        it('TC_QP_UL_0010 : Verify that the Login button is disabled  When customer tries to login with valid mobile number and blank verification code ', () => {
            const blankVeryCode = '      '
            cy.get('input[name="phoneNumber"]')
                .type(validMobileNumber)
                .should('have.value', validMobileNumber)

            cy.get('.btn').click()

            cy.get('[name="code1"]').click().type(blankVeryCode[0])
            cy.get('[name="code2"]').type(blankVeryCode[1])
            cy.get('[name="code3"]').type(blankVeryCode[2])
            cy.get('[name="code4"]').type(blankVeryCode[3])
            cy.get('[name="code5"]').type(blankVeryCode[4])
            cy.get('[name="code6"]').type(blankVeryCode[5])
            cy.get(':nth-child(8) > [type="submit"]').should('be.disabled')
                .focus()

            cy.get('input[name="phoneNumber"]')
                .should('have.value', validMobileNumber)
        })

        it('TC_QP_UL_0013 : Verify a customer can login to the system with a valid mobile number and latest verification CODE \
        When user has requested to resend the code', () => {
                let VALID_MOBILE_NUMBER = Cypress.env('VALID_MOBILE_NUMBER')

                cy.get('input[name="phoneNumber"]')
                    .type(VALID_MOBILE_NUMBER)
                    .should('have.value', VALID_MOBILE_NUMBER)

                cy.get('.btn').click()
                cy.wait(3000)
                cy.get('[type="button"]')
                cy.wait(7500)
                cy.getAndTypeVerificationCodeSMS()
                cy.get(':nth-child(8) > [type="submit"]').click()
                cy.get('.user-box > a').click()

            })
        it('TC_QP_UL_0014 : Verify user cannot  login to the system with a valid mobile number and previous verification code \
                        When the customer has request to resend the CODE and  previous verification CODE is timed out (expired)', () => {

                cy.get(':nth-child(1) > .form-control')
                    .type(validMobileNumber)
                    .should('have.value', validMobileNumber)
                cy.get('.btn')
                    .should('have.text', 'Send Code')
                    .click()
                cy.getVerificationCodeSMS()
                cy.wait(4200)
                cy.get('[type="button"]').click()
                cy.typeVerificationCode()
                cy.get(':nth-child(8) > [type="submit"]').click()
                cy.contains('Invalid Verification Code.')
                    .should('be.visible')
                    .and('have.attr', 'style', 'color: red')
            })

        it('TC_QP_UL_0019 : Verify customer cannot enter more than 10 digits in the mobile number filed ', () => {
            cy.get('input[name="phoneNumber"]')
                .type('458965245634').should('not.have.value', '458965245634')
        })

        it('TC_QP_UL_0020 : Verify SEND CODE button is enabled When 10 digits are entered ', () => {
            cy.get(':nth-child(1) > .form-control')
                .type(validMobileNumber)
                .should('have.value', validMobileNumber)
            cy.get('.btn').should('be.enabled')
        })

        it('TC_QP_UL_0021 : Verify SEND CODE button is not enabled When 10 digits are not entered ', () => {
            cy.get(':nth-child(1) > .form-control')
                .type('12345')
            cy.get('.btn').should('be.disabled')
        })
        it('TC_QP_UL_0022 : Verify customer cannot enter characters into the mobile number field ', () => {
            cy.get(':nth-child(1) > .form-control')
                .type('@#$#@#*&!@')
                .should('not.have.value', '@#$#@#*&!@')

        })

        it('TC_QP_UL_0025 : Verify an appropriate error message is displayed When non-existing customer mobile number is given ', () => {
            const invalidMobileNumber = '4589652456'

            cy.get('input[name="phoneNumber"]')
                .type(invalidMobileNumber)
                .should('have.value', invalidMobileNumber)

            cy.get('.btn').should('have.text', 'Send Code')

            cy.get('.btn').click()

            cy.contains('We were unable to locate a customer using that number.')
                .should('be.visible')

            cy.get('input[name="phoneNumber"]')
                .should('have.value', invalidMobileNumber)
        })
        it('TC_QP_UL_0035 :  Verify that mobile number is not autocomplete when typing mobile number', () => {
            cy.get('input[name="phoneNumber"]')
                .type(validMobileNumber)
                .and('have.attr', 'autocomplete', 'off')
        })

    })

    context("New user registration", () => {
        beforeEach(() => {
            cy.accessLoginPage()
        })
     
        const incoming_mailbox = `sudaraka@rayonate.com`;

        it.only("Look for an email with specific subject and link in email body", () => {
            cy.get(':nth-child(1) > .switch-mode > a').click()
            cy.get('#emailInput').type(validEmail)
            cy.get('.btn').click()
            // debugger; //Uncomment for debugger to work...
            // ...

            
            // cy
            //     .task("gmail:get_messages", {
            //         from: "Human Friendly Name <sender@email-address>",
            //         receiver: "your@email-address",
            //         subject: "string",
            //         body: {
            //           html: "string",
            //           text: "string"
                
            //     .then(email => {
            //         var name= "manoj"
            //         return name
                
        });
 


    it.skip('TC_QP_UL_0001 :  Verify a customer can login to the QP, When a valid email and associated active verification code are given ', () => {
        cy.get(':nth-child(1) > .switch-mode > a').click()
        cy.get('#emailInput').type(validEmail)
        cy.get('.btn').click()
        cy.request('https://accounts.google.com/servicelogin/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin').then((response) => {

            //     console.log('email URL ' + validEmail)
            //     var verificationCode
            //     var body = response.body
            //     console.log('Body ' + body)
            //     var startIndex = body.indexOf('Your QuadPay verification code is:')
            //     console.log('Start index is  ' + startIndex)
            //     startIndex = startIndex + 'Your QuadPay verification code is:'.length
            //     console.log('Start index is  ' + startIndex)
            //     var endIndex = startIndex + 7
            //     verificationCode = body.substring(startIndex + 1, endIndex)
            //     console.log('Verification code  ' + verificationCode);
            //     cy.get('[name="code1"]').type(verificationCode.charAt(0));
            //     cy.get('[name="code2"]').type(verificationCode.charAt(1));
            //     cy.get('[name="code3"]').type(verificationCode.charAt(2));
            //     cy.get('[name="code4"]').type(verificationCode.charAt(3));
            //     cy.get('[name="code5"]').type(verificationCode.charAt(4));
            //     cy.get('[name="code6"]').type(verificationCode.charAt(5));
        })


        //     var verificationCode = response.body.match(/Your QuadPay verification code is: \d{6}/g)[0]
        //       .match(/\d{6}/)[0]

        //     cy.typeVerificationCode(verificationCode);
        //   });

        //   Cypress.Commands.add('typeVerificationCode', (verificationCode) => {
        //     cy.get('[name="code1"]').type(verificationCode[0]);
        //     cy.get('[name="code2"]').type(verificationCode[1]);
        //     cy.get('[name="code3"]').type(verificationCode[2]);
        //     cy.get('[name="code4"]').type(verificationCode[3]);
        //     cy.get('[name="code5"]').type(verificationCode[4]);
        //     cy.get('[name="code6"]').type(verificationCode[5]);

        //   })
        // cy.visit('https://mail.google.com/mail/u/0/?tab=rm#inbox')
    })
    it('TC_QP_UL_0003 :  Verify an appropriate error is displayed and customer cannot login to QP, When a valid email and an already used verification code are given ')
    it('TC_QP_UL_0005 :  Verify an appropriate error is displayed and customer cannot login to QP,\
                             When a valid email and an invalid verification code are given ', () => {
            const getInvalidVerificationCode = '000000'
            cy.contains('Login using email instead')
                .click()

            cy.get('input[name="email"]')
                .type(validEmail)
                .should('have.value', validEmail)

            cy.get('.btn').click()


            cy.get('[name="code1"]').click().type(getInvalidVerificationCode[0])
            cy.get('[name="code2"]').type(getInvalidVerificationCode[1])
            cy.get('[name="code3"]').type(getInvalidVerificationCode[2])
            cy.get('[name="code4"]').type(getInvalidVerificationCode[3])
            cy.get('[name="code5"]').type(getInvalidVerificationCode[4])
            cy.get('[name="code6"]').type(getInvalidVerificationCode[5])
            cy.get(':nth-child(8) > [type="submit"]')
                .focus()
                .click()

            cy.get('input[name="email"]')
                .should('have.value', validEmail)

            cy.contains('Invalid Verification Code.')
                .should('be.visible')
                .and('have.attr', 'style', 'color: red')

            cy.get('[type="button"]').should('be.enabled')
        })


    it('TC_QP_UL_0008 :  Verify cannot proceed to login , When email is not given (blank)', () => {
        cy.contains('Login using email instead')
            .click()

        cy.get('input[name="email"]')
            .type('           ')
        cy.get('.btn').should('be.disabled')
    })

    it('TC_QP_UL_0009 :  Verify that the Login button is disabled  When customer tries to login with valid email and blank verification code ', () => {
        const blankVeryCode = '      '
        cy.contains('Login using email instead')
            .click()

        cy.get('input[name="email"]')
            .type(validEmail)
            .should('have.value', validEmail)

        cy.get('.btn').click()


        cy.get('[name="code1"]').click().type(blankVeryCode[0])
        cy.get('[name="code2"]').type(blankVeryCode[1])
        cy.get('[name="code3"]').type(blankVeryCode[2])
        cy.get('[name="code4"]').type(blankVeryCode[3])
        cy.get('[name="code5"]').type(blankVeryCode[4])
        cy.get('[name="code6"]').type(blankVeryCode[5])
        cy.get(':nth-child(8) > [type="submit"]').should('be.disabled')
            .focus()
        cy.get('input[name="email"]')
            .should('have.value', validEmail)
    })

    it('TC_QP_UL_0012 :  Verify a customer can login to the system with a valid email and latest verification code When customer has requested to resend the code ')
    it('TC_QP_UL_0015 :  Verify user can  login to the system with a valid email and previous verification CODE \
                              When the customer has requested to resend the CODE and previous verification code is not expired yet  ')


    const invalidEmailsformat = ['janesh@test', 'quadpay.com', 'uadpay.lk']
    invalidEmailsformat.forEach((invalidEmaill) => {

        it(`TC_QP_UL_0023 : Verify SEND CODE button is not enabled When a valid email format is not given into the Email Address input ${invalidEmailsformat}`, () => {

            cy.contains('Login using email instead')
                .click()

            cy.get('input[name="email"]')
                .type(invalidEmaill)
                .should('have.value', invalidEmaill)

            cy.get('.btn')
                .should('have.text', 'Send Code')

            cy.get('.btn').click()
            cy.get(':nth-child(2) > .validation-result').should('have.text', ' Invalid email address ')
        })

    })

    const invalidEmails = ['janesh@test.com', 'quadpay@ptl.com', 'janesh@quadpay.lk']
    invalidEmails.forEach((invalidEmail) => {
        it('TC_QP_UL_0024 :  Verify an appropriate error message is displayed When non-existing customer email is given ', () => {

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


    it('TC_QP_UL_0026 : Verify switching from login with email When customer has tried to login with invalid email address')


    it('TC_QP_UL_0027 :  Verify switching from login with email When customer has tried to login with an existing email and an invalid verification code   ')




})



context('UI elements in login page', () => {
    beforeEach(() => {
        cy.accessLoginPage()
    })

    it('TC_QP_UL_0032 : Verify that page title is correctly display on user login section', () => {
        cy.title()
            .should('eq', pageTitle)
    })

    it('TC_QP_UL_0033 : Verify ui elements the login page', () => {
        cy.get('h2')
            .contains('Shopper Sign In')
            .should('be.visible')

        cy.contains('Enter your phone number to receive a one-time code to login.')
            .should('be.visible')

        cy.get('label')
            .contains('Phone Number')
            .should('be.visible')
            .its('disabled')

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

        cy.get('input[name="phoneNumber"]')
            .invoke('attr', 'placeholder')
            .should('contain', 'Mobile Number (e.g. 5551234001)')

    })

    it('TC_QP_UL_0034 : Verify the URL in login page contains login', () => {
        cy.url()
            .should('include', 'login')
            .should('eq', Cypress.env('BASE_URL') + '/login')
    })

    it('TC_QP_UL_0035 :  Verify that email is not autocomplete when typing email address', () => {
        cy.get(':nth-child(1) > .form-control')
            .and('have.attr', 'autocomplete', 'off')
    })

    it('TC_QP_UL_0036 :   Verify that mobile number is not autocomplete when typing mobil number ', () => {
        cy.get('a')
            .contains('Login using email instead')
            .click()

        cy.get('#emailInput')
            .and('have.attr', 'autocomplete', 'off')
    })


})
})


