describe('The Login Page', () => {

  it('sets auth token when logging in via form submission', function () {

    const username = "tester@gmail.com";
    const password = "tester";
    cy.login(username, password)
  })
})