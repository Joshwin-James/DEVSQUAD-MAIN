const ExcelJS = require('exceljs');
const path = require('path');

const JOBS_FILE = path.join(__dirname, '../data/job_applications.xlsx');
const ESPORTS_FILE = path.join(__dirname, '../data/esports_registrations.xlsx');

async function initializeExcelFile(filePath, headers) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.addRow(headers);
    await workbook.xlsx.writeFile(filePath);
}

async function appendToExcel(filePath, data) {
    const workbook = new ExcelJS.Workbook();
    try {
        await workbook.xlsx.readFile(filePath);
    } catch (error) {
        // File doesn't exist, create it with headers
        const headers = Object.keys(data);
        await initializeExcelFile(filePath, headers);
        await workbook.xlsx.readFile(filePath);
    }

    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.addRow(Object.values(data));
    await workbook.xlsx.writeFile(filePath);
}

module.exports = {
    saveJobApplication: async (data) => {
        await appendToExcel(JOBS_FILE, data);
    },
    saveEsportsRegistration: async (data) => {
        await appendToExcel(ESPORTS_FILE, data);
    }
};
