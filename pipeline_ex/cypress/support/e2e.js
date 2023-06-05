// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import { ExecutionStatus,ExecutionType } from 'testlink-xmlrpc/build/constants';
import { CypressTestlink } from '../../testlinkAgent';
import { ClickupHelper } from '../../clickupAgent'

const buildUrl = Cypress.env("BUILD_URL")
const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()
const testlink = new CypressTestlink(Cypress.env())
const clickup = new ClickupHelper(Cypress.env())
const testlinkEnabled = Cypress.env('TESTLINK_ENABLED')

/**
 * Action performed before specific testcase is executed
 * Block checks whether grep library decided to execute this
 * And if yes that means we should mark execution type as Automated
 */

Cypress.on('test:before:run', async(test) => {

})

/**
 * Action performed after specific testcase is executed
 * Block checks if testlink is enabled and if yes
 * Performs api calls to testlink server with results
 * Finally for last retry creates clickup tasks if issue is
 * New -- no duplicate detected
 */

Cypress.on('test:after:run', async(test, runnable) => {

});