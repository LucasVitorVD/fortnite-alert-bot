"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mission = void 0;
var uuid_1 = require("uuid");
var Mission = /** @class */ (function () {
    function Mission(details, level, zone, reward) {
        this.id = (0, uuid_1.v4)();
        this.details = details || '';
        this.level = level || '';
        this.zone = zone || '';
        this.reward = reward || '';
    }
    Mission.prototype.getId = function () {
        return this.id;
    };
    Mission.prototype.getDetails = function () {
        return this.details;
    };
    Mission.prototype.setDetails = function (details) {
        this.details = details;
    };
    Mission.prototype.getLevel = function () {
        return this.level;
    };
    Mission.prototype.setLevel = function (level) {
        this.level = level;
    };
    Mission.prototype.getZone = function () {
        return this.zone;
    };
    Mission.prototype.setZone = function (zone) {
        this.zone = zone;
    };
    Mission.prototype.getReward = function () {
        return this.reward;
    };
    Mission.prototype.setReward = function (reward) {
        this.reward = reward;
    };
    return Mission;
}());
exports.Mission = Mission;
