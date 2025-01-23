import { describe, it } from "node:test";

const assert = require('assert');
const loginController = require('./login.controller');

describe('Login Controller', () => {
    it('should return success for valid credentials', () => {
        const result = loginController.login('validUser', 'validPassword');
        assert.strictEqual(result.status, 'success');
    });

    it('should return error for invalid credentials', () => {
        const result = loginController.login('invalidUser', 'invalidPassword');
        assert.strictEqual(result.status, 'error');
    });
});