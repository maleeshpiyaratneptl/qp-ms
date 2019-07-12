/// <reference types="Cypress" />

describe('QuadPay : Logout Test ', () => {


    beforeEach(() => {
        cy.loginWithMobileNumber()
    })


    it('QuadPay : Logout', () => {
        cy.get('.user-box a').should('have.text', 'Logout').click();
        verifyLoginPageUI();
        verifyURL();
    })

    it('QuadPay : Logout and click back button', () => {

        //Click Dashboard 
        cy.contains('Dashboard').click()

        //Click Add 
        cy.get('a[href*="add-card"]').click()

        cy.get('.user-box a').should('have.text', 'Logout').click();

        cy.go("back")

        verifyLoginPageUI();
        verifyURL();

    })


    it('QuadPay : Logout and click back and forward button', () => {

        cy.contains('Dashboard').click() //Click Dashboard  
        cy.get('a[href*="add-card"]').click()  //Click Add 
        cy.get('.user-box a').should('have.text', 'Logout').click();
        cy.go(-2)
        cy.go("forward")

        verifyLoginPageUI();
        verifyURL();

    })
})



function verifyLoginPageUI() {

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

}


function verifyURL() {
    cy.url()
        .should('include', 'login')
        .should('eq', Cypress.env('BASE_URL') + '/login');
}