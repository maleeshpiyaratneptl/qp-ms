/// <reference types="Cypress" />

describe('QuadPay TestSuite : Update the shipping Address ', () => {


    context('Edit address', () => {

        beforeEach(() => {
            cy.loginWithMobileNumber()
            cy.navigateToEditAddress()
        })

        it('TC_QP_UD_0001-1 : Verify a customer updating  the address with all mandatory fields', () => {
            let addressLine1 = 'Address line 1';
            let addressLine2 = 'Address line 2';
            let city = 'Test City';
            let state = 'California';
            let stateCode = 'CA'
            let postalCode = '90002';


            enterAddressDetails(addressLine1, addressLine2, city, state, postalCode)
            cy.get('.col > .form-group > .form-control').clear()
            cy.get('.btn-primary').click()


            // cy.get('address').invoke('text').then((addressOLD) => {
            //     addressOLD = addressOLD.trim()
            //     cy.log('OLD ADDRESS ' + addressOLD)

            //     let addressRegularExpression = new RegExp('^' + addressLine1 + '\\s')
            //     expect(addressOLD).to.match(addressRegularExpression)

            //     addressRegularExpression = new RegExp(city + ',\\s')
            //     expect(addressOLD).to.match(addressRegularExpression)


            //     addressRegularExpression = new RegExp(stateCode + '\\s')
            //     expect(addressOLD).to.match(addressRegularExpression)

            //     addressRegularExpression = new RegExp(postalCode + '$')
            //     expect(addressOLD).to.match(addressRegularExpression)

            // })

        })


        it('TC_QP_UD_0001-2: Verify a customer updating  the address with all fields', () => {
            let addressLine1 = 'Address line 1';
            let addressLine2 = 'Address line 2';
            let city = 'Test City';
            let state = 'California';
            let stateCode = 'CA'
            let postalCode = '90003';


            enterAddressDetails(addressLine1, addressLine2, city, state, postalCode)
            cy.get('.btn-primary').click()

            // cy.get('address').invoke('text').then((addressOLD) => {
            //     addressOLD = addressOLD.trim()
            //     cy.log('OLD ADDRESS ' + addressOLD)

            //     let addressRegularExpression = new RegExp('^' + addressLine1 + '\\s')
            //     expect(addressOLD).to.match(addressRegularExpression)

            //     addressRegularExpression = new RegExp(addressLine2)
            //     expect(addressOLD).to.match(addressRegularExpression)

            //     addressRegularExpression = new RegExp(city + ',\\s')
            //     expect(addressOLD).to.match(addressRegularExpression)


            //     addressRegularExpression = new RegExp(stateCode + '\\s')
            //     expect(addressOLD).to.match(addressRegularExpression)

            //     addressRegularExpression = new RegExp(postalCode + '$')
            //     expect(addressOLD).to.match(addressRegularExpression)

            // })

        })


        it('TC_QP_UD_0002 : Verify save button is disabled when customer update address with blank values', () => {

            cy.get('form.ng-untouched > :nth-child(1) > .ng-untouched').clear()
            cy.get('.col > .form-group > .form-control').clear()
            cy.get('.city > .form-group > .form-control').clear()
            cy.get('.zip > .form-group > .form-control').clear()
            cy.get('.btn-primary')
                .should('have.text', 'Save')
                .should('be.disabled')
        })




        it('TC_QP_UD_0003 : Update address with blank street address and fill all other field', () => {
            enterAddressDetails('123', 'test tt', 'test city', 'California', '90001')
            cy.get('form.ng-dirty > :nth-child(1) > .ng-dirty').clear()
            cy.get('.btn-primary')
                .should('have.text', 'Save')
                .should('be.disabled')
        })

        it('TC_QP_UD_0004 : Update address with valid street and town/city address with blank postal code', () => {
            enterAddressDetails('123', "test tt", 'test city', 'California', '90001')
            cy.get('.zip > .form-group > .form-control').clear()
            cy.get('.btn-primary')
                .should('have.text', 'Save')
                .should('be.disabled')
        })

        it('TC_QP_UD_0005 : update address with valid street and town/city address with invalid postal code', () => {
            let invalidPostalCode = '10000'
            enterAddressDetails('123', "test tt", 'test city', 'California', invalidPostalCode)
            cy.get('.btn-primary')
                .should('have.text', 'Save')
                .should('be.disabled')
        })

        it('TC_QP_UD_0006 : Verify an existing address can be used by another user');

        it('TC_QP_UD_0007 : Verify page title is correctly displayed on update address page', () => {
            cy.title().should('eq', 'Edit Address - QuadPay')

        })

        it('TC_QP_UD_0008 : Verify that page URL is correctly displayed in update address page', () => {
            cy.url().should('eq', Cypress.env('BASE_URL') + '/profile-edit-address')
        })



        it('TC_QP_UD_0009 : Verify user is directed to the dashboard when cancel button is clicked ', () => {
            let addressInDashboardAfter
            let addressInDashboardBefore

            cy.navigateToDashboard()

            cy.get('address').invoke('text').then((addressOLD) => {
                addressInDashboardBefore = addressOLD.trim()
                cy.log('OLD ADDRESS ' + addressOLD)
            })

            cy.navigatetoEditAddress()
            cy.get('.btn-sucsess').click()

            cy.get('address').invoke('text').then((addressOLD) => {
                addressInDashboardAfter = addressOLD.trim()
                cy.log('OLD ADDRESS ' + addressOLD)
                expect(addressInDashboardAfter).to.equal(addressInDashboardBefore)
            })

            cy.url().should('eq', Cypress.env('BASE_URL') + '/profile')
        })


        it('TC_QP_UD_0010 : Verify GUI in update address page', () => {

            let addressInDashboard;

            cy.navigateToDashboard()

            cy.get('address').invoke('text').then((addressOLD) => {
                addressInDashboard = addressOLD.trim()
                cy.log(' ' + addressInDashboard)
            })

            cy.navigatetoEditAddress()


            cy.get('.small').text().should('contain', 'Update Your Address')
            cy.get('form.ng-untouched > :nth-child(1) > label').text().should('contain', 'Address *')
            cy.get('.city > .form-group > label').text().should('contain', 'City *')
            cy.get('.state > .form-group > label').text().should('contain', 'State *')
            cy.get('.zip > .form-group > label').text().should('contain', 'Zip Code *')
            cy.get('.required-note').text().should('contain', '* required field')

            cy.get('.btn-primary').should('have.text', 'Save')
            cy.get('.btn-sucsess').should('have.text', 'Cancel')

            cy.verifyFooter()
            cy.verifyHeader()

            // cy.get('form.ng-untouched > :nth-child(1) > .ng-untouched').invoke('text').then((addressLine11) => {
            //     let addressRegularExpression = new RegExp('^' + addressLine11 + '\\s')
            //     expect(addressInDashboard).to.match(addressRegularExpression)
            // })

            cy.get('.city > .form-group > .form-control').invoke('val').then(addLine1 => {
                cy.log('ADDRESS LINE1 ' +  addLine1)
            })

            //TODO 1 : Verify the content in the input fields 
            // expect(addressInDashboard).to.contain(cy.get('form.ng-pristine > :nth-child(1) > .ng-pristine').text())
        })


        it('TC_QP_UD_0011 : Verify user cannot type characters into the ZIP code field', () => {
            cy.get('.zip > .form-group > .form-control')
                .clear().type('abc').should('have.value', '')
                .clear().type('a12').should('have.value', '12')
                .clear().type('a3b2').should('have.value', '32')
        })


        function enterAddressDetails(addressLine1, addressLine2, city, state, zipCode) {
        
            cy.get('form.ng-untouched > :nth-child(1) > .ng-untouched').clear().type(addressLine1)
            cy.get('.col > .form-group > .form-control').clear().type(addressLine2)
            cy.get('.city > .form-group > .form-control').clear().type(city)
            cy.get('.state > .form-group > .form-control').select(state)
            cy.get('.zip > .form-group > .form-control').clear().type(zipCode, {delay: 500})
        }
    })
})
