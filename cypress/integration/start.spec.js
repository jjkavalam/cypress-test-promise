describe('issue', function () {
    it('fails', function () {
        // use a delay greater than the command timeout
        cy.returnPromiseThatResolvesAfter(5000);
    })
    afterEach(() => {
        cy.wait(1); // In my understanding, it could be any command here
    })
})