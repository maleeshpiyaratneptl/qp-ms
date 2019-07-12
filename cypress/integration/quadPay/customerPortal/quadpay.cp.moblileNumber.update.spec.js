/// <reference types="Cypress" />

describe('QuadPay TestSuite : Customer Portal ', () => {



    context('Update Mobile Number', () => {

        beforeEach(() => {
            cy.loginWithMobileNumber()
            cy.navigateToEditMobileNumberPage()
        })



        context('Test with valid mobile numbers', () => {
            const validMobileNumbers = ['9188760708', '9188760709',]

            validMobileNumbers.forEach((validMobile) => {

                it(`TC_QP_UP_0001 : Verify the Update mobile number with a Valid number ${validMobile}`, () => {

                    let oldMobileNumber = Cypress.env('VALID_MOBILE_NUMBER');
                    cy.get('.form-control').type(validMobile)
                    cy.get('.btn-primary').click()

                    cy.get('.phone').invoke('text').then((mobileNumberInnerText) => {
                        mobileNumberInnerText = mobileNumberInnerText.trim()
                        let regularExpression = new RegExp('^\\+1\\s\\(\\d{3}\\)\\s\\d{3}-\\d{4}')
                        expect(mobileNumberInnerText).match(regularExpression)

                        let mobileNumberUnformatted = mobileNumberInnerText.replace(/\D/g, '')
                        regularExpression = new RegExp(validMobile + '$')
                        expect(mobileNumberUnformatted).match(regularExpression)

                    })

                    cy.get('.phone > .setting-link').click() //Reset the email to old mobile number  

                    cy.get('.form-control').type(oldMobileNumber)
                    cy.get('.btn-primary').click()
                    cy.wait(10000)
                })


            })
        })


        it('TC_QP_UP_0002 : Verify updating the mobile number with the current mobile number', () => {
            let oldMobileNumber = Cypress.env('VALID_MOBILE_NUMBER');
            cy.get('.form-control').type(oldMobileNumber)
            cy.get('.btn-primary').click()
            cy.get('.input-row > p')
                .should('be.visible')
                .and('have.text', ' Sorry, that number is already in use. ')
                .and('have.attr', 'style', 'color: red')
        });


        context('Test with invalid Mobile Numbers', () => {
            const invalidMobileNumbers = ['1455555555', '0455555555']
            invalidMobileNumbers.forEach((invalidMobile) => {

        it(`TC_QP_UP_0003 : Verify the Update Mobile number : Invalid Mobile number ${invalidMobile}`, () => {
                    cy.get('.form-control').clear().type(invalidMobile)
                    cy.get('.btn-primary')
                        .should('be.disabled')
                })
            })
        })

        it('TC_QP_UP_0004 : Verify updating the  mobile number with an existing mobile number', () => {
            let existingMobile = Cypress.env('EXISTING_MOBILE_NUMBER');
            cy.get('.form-control').type(existingMobile)
            cy.get('.btn-primary').click()
            cy.get('.input-row > p')
                .should('be.visible')
                .and('have.text', ' Sorry, that number is already in use. ')
                .and('have.attr', 'style', 'color: red')
        });


        it('TC_QP_UP_0005 : Verify updating the  mobile number with an existing mobile number', () => {
            cy.get('.btn-sucsess').click()
            cy.url().should('eq', Cypress.env('BASE_URL') + '/profile')
        });


        it('TC_QP_UP_0006 : Verify save button is disabled when user enter spaces into the mobile number field', () => {
            cy.get('.form-control').clear()
            cy.get('.btn-primary').should('be.disabled')
            cy.get('.form-control').type('     ')
            cy.get('.btn-primary').should('be.disabled')
            cy.get('.form-control').type('     ')
            cy.get('.btn-primary').should('be.disabled')
        })


        it('TC_QP_UP_0007 : Verify the URL in Update mobile number page', () => {
            cy.url().should('eq', Cypress.env('BASE_URL') + '/profile-edit-phone')
        })

        it('TC_QP_UP_0008 : Verify mobile number field is auto focused', () => {
            cy.get('.form-control')
                .should('have.attr', 'autofocus')
        })


        it('TC_QP_UP_0009 : Verify autocomplete off in mobile number input field field', () => {
            cy.get('.form-control')
                .should('have.attr', 'autocomplete', 'off')
        })

        it('TC_QP_UP_0010 : Page title in the Update mobile number page', () => {
            cy.title().should('eq', 'Edit Mobile Number - QuadPay')
        })



        it('TC_QP_UP_0011 : Verify the Update Mobile Number page UI', () => {

            cy.get('.btn-primary')
                .should('have.text', 'Save')
                .should('be.disabled')

            cy.get('.btn-sucsess')
                .should('have.text', 'Cancel')
                .should('be.disabled')

            cy.get('.form-control')
                .should('be.enabled')

            cy.get('.user-box > a')
                .should('have.text', 'Logout')

            cy.verifyFooter()

            cy.get('label')
                .should('have.text', 'New Phone Number')
        })

        it('TC_QP_UP_0012 : Verify the Update Mobile Number Page  UI : Placeholder in the input field', () => {
            cy.get('.form-control')
                .should('have.attr', 'placeholder', 'Mobile Number (e.g. 5551234001)')
        })

    })
})


function formatPhoneNumber(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        let intlCode = (match[1] ? '+1 ' : '')
        let formattedNumber = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        cy.log('Formatted number ' + formattedNumber)
        return formattedNumber
    }
    return null
}