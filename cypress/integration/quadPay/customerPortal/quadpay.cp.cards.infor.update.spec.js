/// <reference types="Cypress" />

describe('QuadPay : Customer Portal - Updating Card information ', () => {

    beforeEach(() => {
        cy.loginWithMobileNumber()
        cy.navigateToUpdateCardInformation();
    })
    context('Update card information', () => {

        it('TC_QP_UC_0001 : Verify billing address associate with a\
         card can be updated when all mandatory fields are filled with valid information ',
            () => {
                enterUpdateAddress('123', "test tt", 'test city', 'California', '90001')
                cy.get(':nth-child(2) > .col > .form-group > .form-control').clear()
                cy.get('[style="justify-content: flex-end;"] > .btn-primary').click()
                cy.get('.small').should('have.text', 'Card successfully updated.')
                cy.get('.btn').should('have.text', 'Back to Dashboard')
            })

        it('TC_QP_UC_0002 : Verify billing address associate with a\
         card can be updated when all fields are filled with valid information ',
            () => {
                enterUpdateAddress('123', "test tt", 'test city', 'California', '90001')
                cy.get('[style="justify-content: flex-end;"] > .btn-primary').click()
                cy.get('.small').should('have.text', 'Card successfully updated.')
                cy.get('.btn').should('have.text', 'Back to Dashboard')
            })

        it('TC_QP_UC_0004 : Verify display of billing address, card expiry date and\
         card type When edit card is selected ', function () {
                cy.get('.card-name > :nth-child(1)').should('be.visible')
                cy.get('.date').should('be.visible')
                cy.get('.existing-address').should('be.visible')
            })

        it('TC_QP_UC_0005 : Verify customer cannot proceed with update card details \
        When Billing address line 1 is not given (blank) ',
            () => {
                enterUpdateAddress('123', "test tt", 'test city', 'California', '90001')
                cy.get(':nth-child(1) > .col > .form-group > .form-control').clear()
                cy.get('[style="justify-content: flex-end;"] > .btn-primary')
                    .should('be.disabled')

            })

        it('TC_QP_UC_0006 : Verify customer can proceed with update card details \
        When Billing address line 2 is not given (blank) ',
            () => {
                enterUpdateAddress('123', "test tt", 'test city', 'California', '90001')
                cy.get(':nth-child(2) > .col > .form-group > .form-control').clear()
                cy.get('[style="justify-content: flex-end;"] > .btn-primary').click()
                cy.get('.small').should('have.text', 'Card successfully updated.')
                cy.get('.btn').should('have.text', 'Back to Dashboard')
            })

        it('TC_QP_UC_0007 : Verify customer cannot proceed with update card details \
        When city is not given (blank) ',
            () => {
                enterUpdateAddress('123', "test tt", 'test city', 'California', '90001')
                cy.get('.city > .form-group > .form-control').clear()
                cy.get('[style="justify-content: flex-end;"] > .btn-primary')
                    .should('be.disabled')
            })

        it('TC_QP_UC_0008 : Verify customer cannot proceed with update card details \
        When postal code is not given (blank) ',
            () => {
                enterUpdateAddress('123', "test tt", 'test city', 'California', '90001')
                cy.get('.zip > .form-group > .form-control').clear()
                cy.get('[style="justify-content: flex-end;"] > .btn-primary')
                    .should('be.disabled')
            })
    })

    function enterUpdateAddress(addressLine1, addressLine2, city, state, postalCode) {
        cy.get(':nth-child(1) > .col > .form-group > .form-control').type(addressLine1)
        type(addressLine2)
        cy.get('.city > .form-group > .form-control').type(city)
        cy.get('select[name="addressState"]').select(state)
        cy.get('.zip > .form-group > .form-control').type(postalCode)
    }
})
