/// <reference types="Cypress" />

describe('QuadPay : Customer Login Test Cases', () => {

  after(() => {
    cy.settleAllInstallment()
  })


  context('usual test cases', () => {


    it('TC_QP_EI_0001 : Verify customer can pay 2nd installment  early When first installment is already paid ', () => {
      cy.placeNewItem()
      cy.loginforEarlyPayment()
      cy.get('.active > a').click()
      cy.get(':nth-child(1) > .btn-box > .btn').click()
      cy.get(':nth-child(1) > :nth-child(4) > .status > :nth-child(1) > div').should('have.text', 'Paid')
      cy.get('.btn').click()
      cy.get('.btn-primary').click()
      cy.get('.btn').click()
      cy.get('.user-box > a').click()
    })

   it('TC_QP_EI_0002 : Verify customer can pay 3rd installment  early When second installment is already paid ', () => {
      cy.loginforEarlyPayment()
      cy.get('.active > a').click()
      cy.get(':nth-child(1) > .btn-box > .btn').click()
      cy.get(':nth-child(1) > :nth-child(4) > .status > :nth-child(1) > div').should('have.text', 'Paid')
      cy.get(':nth-child(2) > :nth-child(4) > .status > :nth-child(1) > div > span').should('have.text', 'Paid')
      cy.get('.btn').click()
      cy.get('.btn-primary').click()
      cy.get('.btn').click()
      cy.get('.user-box > a').click()
    })

    it('TC_QP_EI_0003 : Verify customer can pay 4th installment  early When third installment is already paid ', () => {
      cy.loginforEarlyPayment()
      cy.get('.active > a').click()
      cy.get(':nth-child(1) > .btn-box > .btn').click()
      cy.get(':nth-child(1) > :nth-child(4) > .status > :nth-child(1) > div').should('have.text', 'Paid')
      cy.get(':nth-child(2) > :nth-child(4) > .status > :nth-child(1) > div > span').should('have.text', 'Paid')
      cy.get(':nth-child(3) > :nth-child(4) > .status > :nth-child(1) > div > span').should('have.text', 'Paid')
      cy.get('.btn').click()
      cy.get('.btn-primary').click()
      cy.get('.btn').click()
      cy.get('.user-box > a').click()
    })
  })

  context('bad test cases',()=>{

    it('TC_QP_EI_0004 : Verify an appropriate error is displayed When customer payoff 4th quarter installment before 3rd quarter', () => {
      cy.placeNewItem()
      cy.loginforEarlyPayment()
      cy.get('.active > a').click()
      cy.get(':nth-child(1) > .btn-box > .btn').click()
      cy.get('.btn').should('have.text','PAY NOW')
      cy.get(':nth-child(4) > :nth-child(4)').should('not.have.text','PAY NOW')

    })

    it('TC_QP_EI_0005 : Verify an appropriate error is displayed When customer payoff last 2 quarter installment together before 2nd quarter ',()=>{
      cy.loginforEarlyPayment()
      cy.get('.active > a').click()
      cy.get(':nth-child(1) > .btn-box > .btn').click()
      cy.get('.btn').should('have.text','PAY NOW')
      cy.get(':nth-child(3) > :nth-child(3)').should('not.have.text','PAY NOW')
      cy.get(':nth-child(4) > :nth-child(4)').should('not.have.text','PAY NOW')
    })
    it('TC_QP_EI_0006 : Verify customer cannot make early payments  When associated card is in lost state ')
    it('TC_QP_EI_0007 : Verify customer cannot make early payments  When associated card is in insufficient fund state')
    it('TC_QP_EI_0008 : Verify customer cannot make early payments  When associated card is in expired state  ')
    it('TC_QP_EI_0009 : Verify customer cannot make early payments  When associated card is in stolen state')
    it('TC_QP_EI_0010 : Verify customer cannot make an early payment again (duplicate) When payment is initiated through another browser (tab)')
    it('TC_QP_EI_0011 : Verify that page title is correctly display on payment section')

  })
})