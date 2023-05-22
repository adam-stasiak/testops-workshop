import axios from "axios";
const teamId = ''
const listId = ''
const baseUrl = 'https://api.clickup.com/api/v2/'
    /**
     * This class helps with new ticket creation on clickup
     * And verifies existing duplicates
     * @param {Object} cenv environment variable object
     */
class ClickupHelper {
    constructor(cenv) {
            this.config = {
                headers: {
                    Authorization: cenv.CLICKUP_TOKEN,
                }
            }
        }
        /**
         * Creates ticket on board
         * @param {string} testTag testcase identifier like TP-1
         * @param {string} testName title of testcase
         * @param {string} testDescription description of testcase
         * @return {string} url of newly created ticket
         */
    async createTask(testTag, testName, testDescription) {

    };
    /**
     * Get duplicates of testTag testName pair
     * @param {string} testTag testcase identifier like TP-1
     * @param {string} testName title of testcase
     * @return {map} map of "testTag url" strings 
     */
    async getDuplicates(testTag, testName) {

        }
        /**
         * Verifies duplicates
         * @param {string} testTag testcase identifier like TP-1
         * @param {string} testName title of testcase
         * @return {boolean} true if duplicate exists
         */
    async checkDuplicate(testTag, testName) {

    };
}




module.exports = { ClickupHelper }