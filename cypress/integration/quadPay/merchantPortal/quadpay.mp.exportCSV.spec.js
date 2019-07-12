/// <reference types="Cypress" />

describe('QuadPay : Merchant portal transaction section export CSV', () => {

    beforeEach(() => {
        cy.loginToMpOrderSec()
        cy.navigateToTransaction()
    })
    

    context('Test cases for exporting CSV', () => {
        it('TC_QP_EC_0001 : Verify that Export CSV button is activated when there is data to export', () => {
            cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible')
            cy.get('tbody > :nth-child(2) > :nth-child(3)').should('be.visible')
            cy.get('.export-container > .btn').should('be.enabled')
        })
        it.skip('TC_QP_EC_0044 : Verify that Export CSV button is disable when there is no data to export', () => {
            cy.readFile('Downloads')
        })
        it('TC_QP_EC_0002 : Verify that Export CSV button is disable when there is no data to export', () => {
            cy.get('#datepicker-0').click()
            cy.get('.main-calendar-days > :nth-child(5)').click()
            cy.get('#datepicker-1').click()
            cy.get('.main-calendar-days > :nth-child(5)').click()
            cy.get('.search-container > .btn').click()
            cy.get('.export-container > .btn').should('not.be.visible')
        })
    })
    context('Downloaded file data validation', () => {
        it.only('TC_QP_EC_0003 : Verify that Exported CSV file include all column which are in transaction table', () => {
            cy.get('#datepicker-0').click()
            cy.get('[id="Back"]').click().click()
            cy.get('.main-calendar-days > :nth-child(5)').click()
            cy.get('#datepicker-1').click()
            cy.get('.main-calendar-days > :nth-child(5)').click()
            console.log('click button')
            cy.get('.search-container > .btn').click()
            console.log('search option')
            cy.get('.export-container > .btn').click()
            cy.visit('https://merchant-ut.quadpay.com/83c3a01a-aabe-4290-b5cb-adbf91fb803c', {
  onBeforeLoad(win) {
    cy.stub(win, 'open')}
  })

            
 
            


        })

        it('read csv file ', () => {
            cy.writeFile('cypress/fixtures/transactions.csv')
        })
    })
})
