Cypress.Commands.add('returnPromiseThatResolvesAfter', function (n) {
    return Cypress.Promise.delay(n);
})
