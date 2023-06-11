const axios = require('axios')
const path = require('path')
const fs = require('fs')

// Функція для асинхронного зчитування файлу JSON
async function readJSONFile(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        });
    });
}

// Отримання HTML-вмісту за URL-адресою та збереження в файлі
async function saveHTMLContent(url: string, folderPath: string) {
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        const fileName = url.substring(url.lastIndexOf('/') + 1) + '.html';
        const filePath = path.join(folderPath, fileName);

        fs.writeFileSync(filePath, htmlContent);
        console.log(`Saved HTML content from ${url} to ${filePath}`);
    } catch (error) {
        console.error(`Error saving HTML content from ${url}: ${error.message}`);
    }
}

async function main() {
    const jsonFilePath = process.argv[2];

    if (!jsonFilePath) {
        console.error('Please provide a path to the JSON file.');
        return;
    }

    try {
        const jsonData = await readJSONFile(jsonFilePath);
        const folderName = path.basename(jsonFilePath, path.extname(jsonFilePath)) + '_pages';
        const folderPath = path.join(__dirname, folderName);
        fs.mkdirSync(folderPath);

        for (const url of jsonData) {
            await saveHTMLContent(url, folderPath);
        }

        console.log('HTML content saved successfully.');
    } catch (error) {
        console.error(`Error reading or parsing the JSON file: ${error.message}`);
    }
}

main();