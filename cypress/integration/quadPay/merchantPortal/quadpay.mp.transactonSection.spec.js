/// <reference types="Cypress" />

describe('QuadPay : Merchant portal transaction section', () => {

    beforeEach(() => {
        cy.loginToMpOrderSec()
        cy.navigateToTransaction()
    })

    context('Test cases for displaying Transaction section in merchant portal', () => {
    })

    it('TC_QP_TN_0001 : Verify that page title in the transaction  page is correctly displayed', () => {
        cy.title().should('eq', 'Transaction - QuadPay')
    })

    it + ('TC_QP_TN_0002 : Verify that Merchant Fee is correctly display on amount section for every order', () => {
        let merchantFee = '$0.00'
        cy.get('tbody > :nth-child(1) > :nth-child(5)').should('have.text', 'Merchant Fee')
        cy.get('tbody > :nth-child(1) > :nth-child(6)').should('have.text', merchantFee)
    })

    it('TC_QP_TN_0003 : Verify that Captured funds is correctly display on amount section for every order', () => {
        let CapturedFund = '$801.00'
        cy.get('tbody > :nth-child(2) > :nth-child(5)').should('have.text', 'Funds Capture')
        cy.get('tbody > :nth-child(2) > :nth-child(6)').should('have.text', CapturedFund)
    })

    it('TC_QP_TN_0004 : Verify the order link which transaction section is working and its navigate to orders profile', () => {
        cy.get(':nth-child(1) > :nth-child(3) > a').click()
        cy.get('h2').should('be.visible')
    })
    it.skip('TC_QP_TN_0005 : Verify that using first transaction date. it can to filter detail correctly with the detail of first date', () => {

        cy.get('#datepicker-0').click()
        cy.get('.main-calendar-days > :nth-child(6)').click()
        cy.get('#datepicker-1').click()
        cy.get('.main-calendar-days > :nth-child(6)').click()
        cy.get('.search-container > .btn').click()
    })

    it('TC_QP_TN_0006 : Verify that using last transaction date. it can get the transaction detail correctly with the detail of last date', () => {
        cy.get('copy','tbody > :nth-child(1) > :nth-child(3) > a').then((response) => {
            var date = response.body.match(/May \d{8}/g)[0]
                .match(/May \d{8}/)[0]

            cy.searchDate(date)
        })

    })
   
    it('TC_QP_TN_0008 : verify that date is consistent and in us format on TRANSACTION section')
    it('TC_QP_TN_0009 : Verify that click on transaction link after filtering data,that should land to default page.', () => {

    })

    context('search option in transaction section  ', () => {

        it('TC_QP_ST_0001 : Verify that default date is set to first date of month in left date input box and last date should be today in right date input box', () => {
            cy.get('#datepicker-0').click()
            cy.get('.is-selected').should('be.selected')
            cy.get('#datepicker-1').click()
            cy.get('.is-today').should('be.selected')
        })

        it('TC_QP_ST_0002 : Verify that search option is correctly display the data when starting date and end date is today', () => {
            cy.get('#datepicker-0').click()
            cy.get('.is-today').click()
            cy.get('#datepicker-1').click()
            cy.get('.is-today').click()
            cy.get('.search-container > .btn').click()
        })
        it('TC_QP_ST_0003 : Verify that data is not display when search with past date where the date is not available')
        it('TC_QP_ST_0004 : Verify that date is display when search by final updated date ')
        it('TC_QP_ST_0005 : Verify that after refreshing the page that is reloaded the page with the detail of searched date range', () => {
            cy.get('#datepicker-0').clear().type('05/01/19')
            cy.get('#datepicker-1').clear().type('05/31/19')
            cy.get('.search-container > .btn').clear()
        })
    })

    context('Payment date update after completing all installment',()=>{
        it('TC_QP_TN_0007 : Verify that the PAYMENT DATE is update after the date when transaction was completed.', () => {
            after(() => {
                cy.settleAllInstallment()
            })
    
            cy.placeNewItemForMerchant()
           
            var currentDate = new Date();
            var dd = currentDate.getDate();
            var mm = currentDate.getUTCMonth()+1 ; 
            var yyyy = currentDate.getFullYear();
            if (dd < 10) {
              dd = '0' + dd;
            } 
            if (mm < 10) {
              mm = '0' + mm;
            } 
            var currentDate = mm + '/' + dd + '/' + yyyy;
    
            cy.get('tbody > :nth-child(1) > :nth-child(1)').should('have.text', currentDate)
            cy.wait(76400000)

            var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"  ];

            function dateFormat1(d) {
                var t = new Date(d);
                return t.getDate() + ' ' + monthNames[t.getMonth()] ;
              }
            cy.get(':nth-child(3) > :nth-child(7)').should('have.text',t)
      
    
        })
    })
}) 
    function updatedDate(currentDate) {
        var currentDate = new Date();
        var dd = currentDate.getDate();
        var mm = currentDate.getUTCMonth() + 1;
        var yyyy = currentDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var currentDate = mm + '/' + dd + '/' + yyyy;

    }

 
