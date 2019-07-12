/// <reference types="Cypress" />

describe('QuadPay : Customer Portal - Adding Cards ', () => {

    beforeEach(() => {
        cy.loginWithMobileNumber()
        cy.navigateToAddCardPage();
    })

    context('Adding valid card information', () => {

      

        //Card details https://stripe.com/docs/testing#cards-responses
        //Valid cards 
        let cards = [
            new Card('Credit Card', 'VISA', '4242424242424242'),
            new Card('Debit Card', 'VISA', '4000056655665556'),
            new Card('Credit Card', 'MASTER', '5555555555554444'),
            new Card('Credit Card', 'MASTER', '2223003122003222'),//This is NOT ACCEPTED ?
            new Card('Debit Card', 'MASTER', '5200828282828210'),
            new Card('Prepaid Card', 'MASTER', '5105105105105100'),
            new Card('Credit Card', 'American Express', '378282246310005'),
            new Card('Credit Card', 'American Express', '371449635398431')
        ]
        cards.forEach((card) => {
            it(`TC_QP_AC_0001 : Verify customer can add a payment card  \
                        When customer tries to add a card with valid ${card.cardType} , ${card.cardProvider} - ${card.cardNumber}, \
                        expiration date , valid cvc, valid billing address and valid card holder name are given`,
                () => {
                    //Fill the card details 
                    enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
                    enterCardInformation(card.cardNumber, '01', '23', '456')

                    cy.get('.btn-primary').click()
                    cy.get('.small').should('have.text', 'Card successfully added.')
                    cy.get('.container > :nth-child(1) > :nth-child(1) > p')
                        .should('have.text', 'You can now use this card for future Orders or Installments.')
                    cy.get('.btn').should('have.text', 'Back to Dashboard')
                })
        })
    })



    context('Verify user trying the add cards with invalid information', () => {

        it('TC_QP_AC_0002 : Verify an appropriate error is displayed When customer tries to add a card with invalid credit card number and valid information for other fields', () => {
            //TODO : Incorporate DDT into the test case 
            let invalidCreditCardNumber = '4242424242424243'
            enterBillingInformation('TEMP', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            enterCardInformation(invalidCreditCardNumber, '01', '23', '456')
            cy.get('.btn-primary').click()

            cy.get(':nth-child(5) > #card-errors')
                .should('contain', 'Your card number is invalid.')
                .and('have.attr', 'role', 'alert')
        })

        it('TC_QP_AC_0003 : Verify an appropriate error is displayed When customer tries to add a card with past date and valid information for other fields', () => {

            //TODO : Incorporate DDT into the test case 
            let validCardNumber = '4242424242424242'

            enterBillingInformation('TEMP', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            enterCardInformation(validCardNumber, '01', '19', '456')

            cy.get(':nth-child(1) > #card-errors')
                .should('have.text', 'Your card\'s expiration date is in the past.')
                .and('have.attr', 'role', 'alert')

            cy.get('.btn-primary')
                .should('be.disabled')
                .and('be.visible')
        })

        it('TC_QP_AC_0004 : Verify an appropriate error is displayed When customer tries to add a card with invalid month in expiry date and valid information for other fields', () => {
            //TODO : Incorporate DDT into the test case 
            let validCardNumber = '4242424242424242'

            enterBillingInformation('TEMP', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            enterCardInformation(validCardNumber, '13', '19', '456')
            //Need to check the automatic correction to the invalid input (month value)


        })
        it('TC_QP_AC_0005 : Verify an appropriate error is displayed When customer tries to add a card with invalid year in expiry date and valid information for other fields', () => {
            let validCardNumber = '4242424242424242'

            enterBillingInformation('TEMP', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            enterCardInformation(validCardNumber, '01', '70', '456')

            cy.get(':nth-child(1) > #card-errors')
                .contains('Your card\'s expiration year is invalid.')
                .should('have.attr', 'role', 'alert')

            cy.get('.btn-primary')
                .should('be.disabled')
                .and('be.visible')
        })

        it('TC_QP_AC_0006 : Verify an appropriate error is displayed When customer tries to add a card with invalid CVC and valid information for other fields', () => {

            //TODO : Incorporate DDT into this 
            let validCardNumber = '4242424242424242'
            enterBillingInformation('TEMP', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            enterCardInformation(validCardNumber, '01', '22', '4')
            cy.get('input[name="addressLine1"]').click() //TODO : Need to simulate pressing tab key when Cypress supports it 

            cy.get(':nth-child(2) > #card-errors')
                .contains('Your card\'s security code is incomplete.')
                .should('have.attr', 'role', 'alert')

            cy.get('.btn-primary')
                .should('be.disabled')
                .and('be.visible')
        })

    })


    context('Trying to add cards without mandatory information', () => {

        it('TC_QP_AC_0007 : Verify customer cannot proceed to add a card When card number is not given (blank)', () => {

            //Fill the card details
            enterBillingInformation('Address Line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')

            cy.get(':nth-child(6) > .input-with-icon > .StripeElement > .__PrivateStripeElement > iframe').then($iframe => {
                const doc = $iframe.contents()
                let input = doc.find('input')[1]
                //Type the card number 
                cy
                    .wrap(input)
                    .clear()
                //     .type(cardNumber, { force: true })

                //Type the expiry date and year 
                input = doc.find('input')[3]
                cy
                    .wrap(input)
                    .type('01', { force: true })
                    .type('22', { force: true })
            })

            //Type the security code 
            cy.get(':nth-child(2) > .input-with-icon > .StripeElement > .__PrivateStripeElement > iframe').then($iframe => {
                const doc = $iframe.contents()
                let input = doc.find('input')[1]
                cy
                    .wrap(input)
                    .clear()
                    .type('543', { force: true })

            })

            cy.get('.btn-primary').click()
            cy.get(':nth-child(6) > #card-errors')
                .contains('Your card number is incomplete.')
                .should('have.attr', 'role', 'alert')
            cy.get('.btn-primary').should('be.disabled')

        })


        it('TC_QP_AC_0008 : Verify customer cannot proceed to add a card When expiry date is not given (blank)', () => {

            let cardNumber = '4242424242424242'

            //Fill the card details
            enterBillingInformation('Address Line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')

            cy.get(':nth-child(6) > .input-with-icon > .StripeElement > .__PrivateStripeElement > iframe').then($iframe => {
                const doc = $iframe.contents()
                let input = doc.find('input')[1]
                //Type the card number 
                cy
                    .wrap(input)
                    .clear()
                    .type(cardNumber, { force: true })

                //Type the expiry date and year 
                // input = doc.find('input')[3]
                // cy
                //     .wrap(input)
                //     .clear()
            })

            //Type the security code 
            cy.get(':nth-child(2) > .input-with-icon > .StripeElement > .__PrivateStripeElement > iframe').then($iframe => {
                const doc = $iframe.contents()
                let input = doc.find('input')[1]
                cy
                    .wrap(input)
                    .clear()
                    .type('543', { force: true })

            })

            cy.get('.btn-primary').click()

            cy.get(':nth-child(1) > #card-errors')
                .contains('Your card\'s expiration date is incomplete.')
                .should('have.attr', 'role', 'alert')

        })

        it('TC_QP_AC_0009 : Verify customer cannot proceed to add a card When CVC is not given (blank)', () => {

            let cardNumber = '4242424242424242'

            //Fill the card details
            enterBillingInformation('Address Line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')

            cy.get(':nth-child(6) > .input-with-icon > .StripeElement > .__PrivateStripeElement > iframe').then($iframe => {
                const doc = $iframe.contents()
                let input = doc.find('input')[1]
                //Type the card number 
                cy
                    .wrap(input)
                    .clear()
                    .type(cardNumber, { force: true })

                //Type the expiry date and year 
                input = doc.find('input')[3]
                cy
                    .wrap(input)
                    .type('01', { force: true })
                    .type('22', { force: true })
            })

            //Type the security code 
            // cy.get(':nth-child(2) > .input-with-icon > .StripeElement > .__PrivateStripeElement > iframe').then($iframe => {
            //     const doc = $iframe.contents()
            //     let input = doc.find('input')[1]
            //     cy
            //         .wrap(input)
            //         .clear()
            //         .type('543', { force: true })

            // })

            cy.get('.btn-primary').click()

            cy.get(':nth-child(2) > #card-errors')
                .contains('Your card\'s security code is incomplete.')
                .should('have.attr', 'role', 'alert')
        })


        it('TC_QP_AC_0010 : Verify customer cannot proceed to add a card When Billing address line 1 is not given (blank)', () => {
            let cardNumber = '4242424242424242'

            //Fill the card details 
            enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            cy.get('input[name="addressLine1"]').clear()
            enterCardInformation(cardNumber, '01', '23', '456')

            cy.get('.btn-primary').should('be.disabled')

        })


        it('TC_QP_AC_0011 : Verify customer can proceed to add a card When Billing address line 2 is not given (blank)', () => {
            let cardNumber = '4242424242424242'

            //Fill the card details 
            enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            cy.get('input[name="addressLine2"]').clear()
            enterCardInformation(cardNumber, '01', '23', '456')

            cy.get('.btn-primary').click()
            cy.get('.small').should('have.text', 'Card successfully added.')
            cy.get('.container > :nth-child(1) > :nth-child(1) > p')
                .should('have.text', 'You can now use this card for future Orders or Installments.')
            cy.get('.btn').should('have.text', 'Back to Dashboard')

        })

        it('TC_QP_AC_0012 : Verify customer cannot proceed to add a card When card holder\'s name is not given (blank)', () => {
            let cardNumber = '4242424242424242'

            //Fill the card details 
            enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            cy.get('input[name="cardHolderName"]').clear()
            enterCardInformation(cardNumber, '01', '23', '456')
            cy.get('.btn-primary').should('be.disabled')

            cy.get('.validation-result > span')
                .contains(' Card holder name is required. ')
            //TODO : Check the color of the error message 

        })


        it('TC_QP_AC_0013 : Verify customer cannot proceed to add a card When city  is not given (blank)', () => {
            let cardNumber = '4242424242424242'

            //Fill the card details 
            enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            cy.get('input[name="addressCity"]').clear()
            enterCardInformation(cardNumber, '01', '23', '456')
            cy.get('.btn-primary').should('be.disabled')



        })

        it('TC_QP_AC_0014 : Verify customer cannot proceed to add a card When  ZIP is not given (blank)', () => {
            let cardNumber = '4242424242424242'

            //Fill the card details 
            enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            cy.get('input[name="addressPostCode"]').clear()
            enterCardInformation(cardNumber, '01', '23', '456')
            cy.get('.btn-primary').should('be.disabled')
        })


        it('TC_QP_AC_0015 : Verify customer cannot proceed to add a card When state is not given (blank)')




    })

    context('Verify customer trying to add invalid card numbers', () => {

        it('TC_QP_AC_0018 : Verify an appropriate error is displayed When a customer tries to add a card with international credit card details', () => {
            //TODO : Incorporate TDD into the test case 
            let internationalCardNumber = '4012888888881881'

            //Fill the card details 
            enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            enterCardInformation(internationalCardNumber, '01', '23', '456')

            cy.get('.btn-primary').click()

            cy.get(':nth-child(5) > #card-errors')
                .contains('Sorry, we only accept US cards at this time')
                .should('have.attr', 'role', 'alert')

        })


        it('TC_QP_AC_0019 : Verify an appropriate error is displayed When a customer tries to add a card with insufficient fund  ', () => {
            let insufficientFundCard = '4000000000009995'

            //Fill the card details 
            enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            enterCardInformation(insufficientFundCard, '01', '23', '456')

            cy.get('.btn-primary').click()

            cy.get('h2.small')
                .should('have.text', 'Sorry, there was an error authorizing the card.')

            cy.get('.status-icon')
                .should('have.class', 'not-done')
                .should('have.class', 'status-icon')


            cy.get('.btn')
                .should('have.text', 'Try Again')
                .should('be.enabled')

            cy.verifyFooter()
        })

        it('TC_QP_AC_0020 : Verify an appropriate error is displayed When a customer tries to add a stolen card details', () => {
            let stolenCard = '4000000000009979'

            //Fill the card details 
            enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            enterCardInformation(stolenCard, '01', '23', '456')

            cy.get('.btn-primary').click()

            cy.get('h2.small')
                .should('have.text', 'Sorry, there was an error authorizing the card.')

            cy.get('.status-icon')
                .should('have.class', 'not-done')
                .should('have.class', 'status-icon')


            cy.get('.btn')
                .should('have.text', 'Try Again')
                .should('be.enabled')

            cy.verifyFooter()
        })

        it('TC_QP_AC_0021 : Verify an appropriate error is displayed When a customer tries to add a lost card details', () => {
            let lostCard = '4000000000009987'

            //Fill the card details 
            enterBillingInformation('Address line 1', "Address line 2", 'PTL City', '90001', 'California', 'S.K.J.C. KODIKARA')
            enterCardInformation(lostCard, '01', '23', '456')

            cy.get('.btn-primary').click()

            cy.get('h2.small')
                .should('have.text', 'Sorry, there was an error authorizing the card.')

            cy.get('.status-icon')
                .should('have.class', 'not-done')
                .should('have.class', 'status-icon')


            cy.get('.btn')
                .should('have.text', 'Try Again')
                .should('be.enabled')

            cy.verifyFooter()
        })

        it('TC_QP_AC_0022 : Verify an appropriate error is displayed When a customer tries to add a card which has been used by another user')

    })

    context('Verify page title ', () => {

        it('TC_QP_AC_0023 : Verify that page title is correctly display on add card section', () => {
            cy.title().should('eq', 'Add New Card - QuadPay')
        })
    })

    context('Verify the add card page UI', () => {

        it('Verify the labels in the page ', () => {

            //Verify the labels in the page 
            cy.get(':nth-child(1) > .col > .form-group > label').should('have.text', 'Billing Address *')
            cy.get('.city > .form-group > label').should('have.text', 'City *')
            cy.get(':nth-child(4) > label').should('have.text', 'Card Holder *')
            cy.get(':nth-child(5) > label').should('have.text', 'Credit Card *')
            cy.get('.input-row-holder > :nth-child(1) > label').should('have.text', 'Expiration date *')
            cy.get(':nth-child(2) > label').should('have.text', 'Security Code *')
            cy.get('.required-note').should('have.text', '* required field')
        })


        //Verify the placeholders in the page 
        it('Verify the placeholders in the page ', () => {
            cy.get('input[name="addressLine1"]').should('have.attr', 'placeholder', 'Address')
            cy.get('input[name="addressLine2"]').should('have.attr', 'placeholder', 'Address Line 2')
            cy.get('input[name="addressCity"]').should('have.attr', 'placeholder', 'City')
            cy.get('input[name="addressPostCode"]').should('have.attr', 'placeholder', 'Zip Code')
            cy.get('input[name="cardHolderName"]').should('have.attr', 'placeholder', 'Card Holder')
            cy.get('select[name="addressState"]').should('have.value', 'null')

        })

        //Verify the page footer
        it('Verify the page footer', ()=>{
            cy.verifyFooter()
        })


        //Verify the page header 
        it('Verify the page footer', ()=>{
            cy.verifyHeader()
        })

    })


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


function Card(cardType, cardProvider, cardNumber) {
    this.cardType = cardType
    this.cardProvider = cardProvider
    this.cardNumber = cardNumber
}