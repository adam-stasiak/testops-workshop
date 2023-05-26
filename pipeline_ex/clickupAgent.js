import axios from "axios";
const teamId = '2501903'
const listId = '900501311040'
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
    async createTask(testTag,testName,testDescription) {
        try {
            let data = {
                "name": `${testName}`,
                "description": `${testDescription}`,
                "tags": [`${testTag}`]
            }
            const response = await axios.post(`${baseUrl}list/${listId}/task?custom_task_ids=true&team_id=${teamId}`,data,this.config)
            return response.data.url
        } catch (error) {
            console.error('Error while new card creation:',error.message);
        }
    };
    /**
     * Get duplicates of testTag testName pair
     * @param {string} testTag testcase identifier like TP-1
     * @param {string} testName title of testcase
     * @return {map} map of "testTag url" strings 
     */
    async getDuplicates(testTag,testName) {
        const response = await axios.get(`${baseUrl}team/${teamId}/task?tags[]=${testTag.toLowerCase()}&name=${testName}`,this.config)
        return response.data.tasks.filter(x => x.name === testName).map(x => `${x.name} ${x.url}`)

    }
    /**
     * Verifies duplicates
     * @param {string} testTag testcase identifier like TP-1
     * @param {string} testName title of testcase
     * @return {boolean} true if duplicate exists
     */
    async checkDuplicate(testTag,testName) {
        try {
            const duplicates = await this.getDuplicates(testTag,testName)
            if (duplicates[0] === undefined) {
                return false
            } else {
                return true
            }


        } catch (error) {
            console.error('Error while checking duplicates',error.message);
        }
    };
}




module.exports = { ClickupHelper }