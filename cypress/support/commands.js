// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import axios from "axios";

Cypress.Commands.add('doTask', function () {
    Cypress.log({
        message: "start task"
    })
    return cy.task('myTask').then(() => "ok");
})

Cypress.Commands.add('getHttp', function () {
    Cypress.log({
        message: "make request"
    })
    return axios.get(`https://httpbin.org/delay/2`).then(resp => resp.statusText)
})
