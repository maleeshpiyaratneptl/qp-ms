/// <reference types="Cypress" />

describe('QuadPay : Customer Portal - Adding Cards ', () => {

    it('TC_QP_DC_0001 : Verify customer can delete a card When there are no transactions associated with the card ', () => {
        cy.loginWithMobileNumber()
        cy.addNewCreditCard()
        cy.get(':nth-child(1) > .card-name > .view-link').click()
        cy.get('[style="justify-content: flex-start;"] > .btn').click({force:true})
        cy.get('.btn').should('have.text', ' Back to Dashboard ').click()
        cy.get('.user-box > a').click()
    })

    it('TC_QP_DC_0002 : Verify customer can delete a card When all the payments (installments) associated with the card are already settled ', () => {
        cy.placeNewItem()
        cy.loginforEarlyPayment()
        cy.addNewCreditCard()
        cy.changePaymentCard()
        cy.get(':nth-child(1) > .card-name > .view-link').click()
        cy.get('[style="justify-content: flex-start;"] > .btn > .text-danger').click()
        cy.get('.btn').should('have.text', ' Back to Dashboard ').click()

    })

    it('TC_QP_DC_0003 : Verify customer cannot delete a card When all the payments (installments) associated with the card are NOT settled ', () => {
        cy.placeNewItem()
        cy.loginWithMobileNumber()
        cy.get(':nth-child(2) > .card-name > .view-link').click()
        cy.get('[style="justify-content: flex-start;"] > .btn').click({ force: true })
        cy.get('[style="text-align: center"] > .text-danger').should('be.visible').should('have.text', 'Payment Card is currently in use by an active payment plan')
    })
    it('TC_QP_DC_0004 : Verify customer cannot delete a card When the card is being used for making a payment through an online store ')
    it('TC_QP_DC_0005 : Verify that customer have a option to choose another card when needs to delete a currently using card')
})