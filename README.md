# cypress-test-promise

This repo describes an apparent issue in Cypress's handling of custom commands that return a promise.

When a custom command that returns a promise is timed out, the error message shown is misleading.

When test is run with `cypress open`, there is no mention of the original timeout; instead it shows the error:

> CypressError: Cypress detected that you returned a promise from a command while also invoking one or more cy commands in that promise.

When test is run with `cypress run`, however, the timeout is properly logged along with the error above:

> CypressError: Cypress command timeout of `4000ms` exceeded.


# How to run ?

```
npm i
npm test
```

This will give the following output:

```

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:    7.6.0                                                                              │
  │ Browser:    Electron 89 (headless)                                                             │
  │ Specs:      1 found (start.spec.js)                                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                                                    
  Running:  start.spec.js                                                                   (1 of 1)


  issue
    1) fails
    2) "after each" hook for "fails"


  0 passing (5s)
  2 failing

  1) issue
       fails:
     CypressError: Cypress command timeout of `4000ms` exceeded.
      at cypressErr (http://localhost:59175/__cypress/runner/cypress_runner.js:154468:18)
      at Object.errByPath (http://localhost:59175/__cypress/runner/cypress_runner.js:154537:10)
      at http://localhost:59175/__cypress/runner/cypress_runner.js:156279:29

  2) issue
       "after each" hook for "fails":
     CypressError: Cypress detected that you returned a promise from a command while also invoking one or more cy commands in that promise.

The command that returned the promise was:

  > `cy.returnPromiseThatResolvesAfter()`

The cy command you invoked inside the promise was:

  > `cy.wait()`

Because Cypress commands are already promise-like, you don't need to wrap them or return your own promise.

Cypress will resolve your command with whatever the final Cypress command yields.

The reason this is an error instead of a warning is because Cypress internally queues commands serially whereas Promises execute as soon as they are invoked. Attempting to reconcile this would prevent Cypress from ever resolving.

https://on.cypress.io/returning-promise-and-commands-in-another-command

Because this error occurred during a `after each` hook we are skipping the remaining tests in the current suite: `issue`
      at $Cy.cy.<computed> [as wait] (http://localhost:59175/__cypress/runner/cypress_runner.js:151791:23)
  From Your Spec Code:
      at Context.eval (http://localhost:59175/__cypress/tests?p=cypress/integration/start.spec.js:102:8)

```
