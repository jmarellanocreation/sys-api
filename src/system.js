const SystemInfo = require('systeminformation');
const OS = require('os');
const WebServer = require('./webServer');
const configs = require('./config');

class System {

    #webServer;
    #data;

    constructor(options) {
        if(options.wsPort)
            configs.wsPort = options.wsPort;
        this.init(configs);
    }
    init(configs){
        this.#webServer = new WebServer(configs);
        setTimeout(async ()=>{
            await this.update();
        }, 60000);
        this.update();
    }
    async update(){
        await this.gather();
        this.#webServer.updateData(this.#data);
    }
    async gather(){
        this.#data = {};
        const time = await this.getTimeData();
        this.#data.time = time;
        const system = await this.getSystemData();
        this.#data.system = system;
        const bios = await this.getBiosData();
        this.#data.bios = bios;
        const cpu = await this.getCPUData();
        this.#data.cpu = cpu;
        const cpuLoad = await this.getCPULoadData();
        this.#data.cpuLoad = cpuLoad;
        const mem = await this.getMemData();
        this.#data.mem = mem;
        const os = await this.getOSData();
        this.#data.os = os;
        const fs = await this.getFSData();
        this.#data.fs = fs;
    }
    async getTimeData() {
        let data = {};
        try {
          data = await SystemInfo.time();
        } catch (e) {
          console.log(e)
        }
        return data;
    }
    async getSystemData() {
        let data = {};
        try {
          data = await SystemInfo.system();
        } catch (e) {
          console.log(e)
        }
        return data;
    }
    async getBiosData() {
        let data = {};
        try {
          data = await SystemInfo.bios();
        } catch (e) {
          console.log(e)
        }
        return data;
    }
    async getCPUData() {
        let data = {};
        try {
          data = await SystemInfo.cpu();
        } catch (e) {
          console.log(e)
        }
        return data;
    }
    async getCPULoadData() {
        let data = {};
        try {
          data = await OS.cpus();
        } catch (e) {
          console.log(e)
        }
        return data;
    }
    async getMemData() {
        let data = {};
        try {
          data = await SystemInfo.mem();
        } catch (e) {
          console.log(e)
        }
        return data;
    }
    async getOSData() {
        let data = {};
        try {
          data = await SystemInfo.osInfo();
        } catch (e) {
          console.log(e)
        }
        return data;
    }
    async getFSData() {
        let data = {};
        try {
          data = await SystemInfo.fsSize();
        } catch (e) {
          console.log(e)
        }
        return data;
    }
}
  
module.exports = System