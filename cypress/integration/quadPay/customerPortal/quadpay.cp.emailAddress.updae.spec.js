/// <reference types="Cypress" />

describe('QuadPay TestSuite : Customer Portal ', () => {


        beforeEach(() => {
            cy.loginWithMobileNumber()
            cy.navigateToEditEmailPage()
        })


        context('Update Email Address', () => {

        it('TC_QP_UE_0008 : Verify the Update Email Address UI', () => {
            cy.get('label')
                .should('have.text', 'New Email Address')

            cy.get('.btn-primary')
                .should('have.text', 'Save')
                .should('be.disabled')

            cy.get('.btn-sucsess')
                .should('have.text', 'Cancel')
                .should('be.disabled')

            cy.get('.user-box > a')
                .should('have.text', 'Logout')

            cy.verifyFooter()
        })

        it('TC_QP_UE_0009 : Verify the Update Email Address UI : Placeholder', () => {
            cy.get('#emailInput')
                .invoke('attr', 'placeholder')
                .should('contain', 'Email Address')
        })


        it('TC_QP_UE_0010 : Verify autocomplete off in email field', () => {
            cy.get('#emailInput')
                .should('have.attr', 'autocomplete', 'off')
        })


        it('TC_QP_UE_0011 : Verify email field is auto focused', () => {
            cy.get('#emailInput')
                .should('have.attr', 'autofocus')
        })
    })

        context('Test with invalid email addresses', () => {
            const invalidEmails = ['Test', 'a@b.c', '@', '@test.com']
            invalidEmails.forEach((invalidEmail) => {

        it(`TC_QP_UE_0003 : Verify the Update Email Address UI : Invalid email ${invalidEmail}`, () => {
                    cy.get('#emailInput').type(invalidEmail)
                    cy.get('.btn-primary').click()
                    cy.get('.input-row > p')
                        .should('have.text', ' Invalid Email Address ')
                        .and('have.attr', 'style', 'color: red')
                })

        it('TC_QP_UE_0005 : Verify customer cannot proceed with email update When email is blank ',function(){
                    cy.get('#emailInput').clear()
                    cy.get('.btn-primary')
                    .should('be.disabled')
                })
         
            })
        })
      


        context('Test with valid email addresses', () => {
            const validEmails = ['janesh.kodikara@gmail.com', 'janesh1974@gmail.com']
            validEmails.forEach((validEmail) => {

         it('TC_QP_UE_0001 : Verify the Update Email Address with a Valid email', () => {
                    let oldEmailAddress = Cypress.env('VALID_EMAIL');

                    cy.get('#emailInput').type(validEmail)
                    cy.get('.btn-primary').click()

                    cy.get('.email')
                        .contains(validEmail)

                    cy.get('.email > .setting-link').click(); //Reset the email to old email  

                    cy.get('#emailInput').type(oldEmailAddress)
                    cy.get('.btn-primary').click()

                    cy.get('.email')
                        .contains(oldEmailAddress)
                })
            })
        })


        it('QuadPay : Verify updating the email with the current email', () => {
            let oldEmailAddress = Cypress.env('VALID_EMAIL');
            cy.get('#emailInput').type(oldEmailAddress)
            cy.get('.btn-primary').click()
            cy.get('.input-row > p')
                .should('be.visible')
                .and('have.text', ' Sorry, that address is already in use. ')
                .and('have.attr', 'style', 'color: red')
        });

        it('TC_QP_UE_0004 : Verify the Cancel button functionality in Edit Email Page U4', () => {
            //Click the cancel button 
            cy.get('.btn-sucsess').click()
            cy.get('.email')
                .contains(Cypress.env('VALID_EMAIL'))
        })

        it('TC_QP_UE_0012 : Page title in the Update email address page', () => {
            cy.title().should('eq', 'Edit Email Address - QuadPay')
        })

        it('TC_QP_UE_0013 : Verify the URL in Update Email Address page', () => {
            cy.url().should('eq', Cypress.env('BASE_URL') + '/profile-edit-email');
        })

   
})




