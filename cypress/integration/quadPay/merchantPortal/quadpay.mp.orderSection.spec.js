/// <reference types="Cypress" />

describe('QuadPay : Order section', () => {

  beforeEach(() => {
    cy.loginToMpOrderSec()
  })



  context('Test cases for order section in merchant portal', () => {
    let CS_email = "sudaraka+056@rayonate.com"
    let CS_name = 'goyum sudaraka'
    let CS_mobileNumber = '+17274741721'
    let orderId = ''

    it('TC_QP_DO_0001 : Verify that all the columns in order page is filled when shopper purchase a order ', () => {
      cy.get('h2').should('be.visible')
      cy.get('thead > tr > :nth-child(1)').should('be.visible')
      cy.get('thead > tr > :nth-child(2)').should('be.visible')
      cy.get('thead > tr > :nth-child(3)').should('be.visible')
      cy.get('thead > tr > :nth-child(4)').should('be.visible')
      cy.get('thead > tr > :nth-child(5)').should('be.visible')
      cy.get('.search-form > .ng-untouched').should('be.visible')
      cy.get('pp-search-summary > div').should('be.visible')
      cy.verifyMPHeader()

    })

    it('TC_QP_DO_0002 :Verify that order are updated when customer purchase a order', () => {
      after(() => {
        cy.settleAllInstallment()
      })

      cy.placeNewItemForMerchant()

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

      cy.get('tbody > :nth-child(1) > :nth-child(1)').should('have.text', currentDate)
    })


    it.skip('TC_QP_DO_0003 :Verify that Date is displaying correctly', () => {
      cy.get(':nth-child(2) > :nth-child(1) > time').should('have.value', datetime)
    })

    it('TC_QP_DO_0004 :Verify that every order has unique reference number', () => {
      let orderID = '190527-434539'
      cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', orderID)
      cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', '190527-401371').should('not.equal', orderID)
      cy.get('tbody > :nth-child(3) > :nth-child(3)').should('have.text', '190516-233077').should('not.equal', orderID)
      cy.get('tbody > :nth-child(4) > :nth-child(3)').should('have.text', '190515-889074').should('not.equal', orderID)

    })
    it.skip('TC_QP_DO_0005 :Verify that customer and merchant are getting same order id', () => {
      cy.get('tbody > :nth-child(1) > :nth-child(3)').dblclick().dblclick()('{Ctrl}c')
      cy.get('.search-form > .ng-untouched').type('{Ctrl}v')
      cy.get('button').click()
    })

    it('TC_QP_DO_0006 :Verify that customer name is correctly display in merchant portal as it is on customer profile', () => {

      cy.get(':nth-child(1) > .btn-box > .btn').click()


      // cy.get(':nth-child(2) > span').should('be.visible').and('have.text', 'sudaraka+056@rayonate.com')
      // cy.get(':nth-child(1) > span')
      // cy.get(':nth-child(3) > span')
      // cy.get('option:first').should('be.selected').and('have.value', 'Metallica')
    })
    it('TC_QP_DO_0007 :Verify that Total amount of order is displaying correctly')

    it('TC_QP_DO_0008 :Verify that VIEW ORDER button is working properly and its direct to the order details ', () => {
      cy.get(':nth-child(1) > .btn-box > .btn').should('be.visible').click()
      cy.get('h2').should('be.visible')
    })

    it('TC_QP_DO_0009 :Verify that date is consistent and in us format on orders table', () => {

      after(() => {
        cy.settleAllInstallment()
      })

      cy.placeNewItemForMerchant()

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

      cy.get('tbody > :nth-child(1) > :nth-child(1)').should('have.text', currentDate)
      cy.get('tbody > :nth-child(1) > :nth-child(1').invoke('text').then((currentDate) => {
        currentDate = currentDate.trim()
        cy.log('date' + currentDate)

        let dateRegularExpression = new RegExp('^' + mm + '\\s' + dd + ',\\s' + yyyy)
        expect(currentDate).to.match(dateRegularExpression)




      })
    })

    it('TC_QP_DO_0010 :Verify that click on orders link after filtering data,that should land to default page', () => {
      cy.get(':nth-child(1) > .btn-box > .btn').should('be.visible').click()
      cy.get('.dashboard-nav > :nth-child(1) > a').click()
      cy.get('h2').should('be.visible')

    })
  })


  context.skip('Test cases for displaying Transaction section in merchant portal', () => {
    let search = ['May 03, 2019	', '699', '190503-959280	',
      'Jess Richards',
      'Jess ', 'Richards',
    ]
    search.forEach((search) => {

      it('TC_QP_SO_0001 : Verify that search option is working  with date, REFERENCE, ORDER ID, CUSTOMER full name, customer first name,last name  ', () => {
        cy.get('.search-form > .ng-untouched').type(search)
      })
    })

  })
})


