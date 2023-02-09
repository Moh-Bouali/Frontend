describe('the order page', () => {
  
  it('goes to a restaurant menu', function () {
    const username = "tester@gmail.com";
    const password = "tester";
    cy.login(username, password)

    cy.visit('/mainpage')

    cy.contains('Order').click()

    cy.url().should('include', '/restaurantMenu/1')
  })
})