const os = require('os');
const si = require('systeminformation');

// Функція для виведення системної інформації
async function printSystemInfo() {
    console.log('Operating System:', os.platform());
    console.log('Architecture:', os.arch());
    console.log('Current User Name:', os.userInfo().username);

    const cpuInfo = await si.cpu();
    console.log('CPU Cores Models:');
    for (const core of Object.values(cpuInfo.cores)) {
        console.log(core.model);
    }

    const cpuTemperature = await si.cpuTemperature();
    console.log('CPU Temperature:', cpuTemperature.main);

    const graphicsControllers = await si.graphics();
    console.log('Graphic Controllers:');
    graphicsControllers.controllers.forEach((controller) => {
        console.log('  Vendor:', controller.vendor);
        console.log('  Model:', controller.model);
    });

    const memoryInfo = await si.mem();
    console.log('Total Memory:', (memoryInfo.total / 1024 / 1024 / 1024).toFixed(2), 'GB');
    console.log('Used Memory:', (memoryInfo.used / 1024 / 1024 / 1024).toFixed(2), 'GB');
    console.log('Free Memory:', (memoryInfo.free / 1024 / 1024 / 1024).toFixed(2), 'GB');

    const batteryInfo = await si.battery();
    console.log('Battery:');
    console.log('  Charging:', batteryInfo.ischarging ? 'Yes' : 'No');
    console.log('  Percent:', batteryInfo.percent);
    console.log('  Remaining Time:', batteryInfo.timeleft);
}

function main() {
    const frequencyInSeconds = Number(process.argv[2]);

    if (isNaN(frequencyInSeconds)) {
        console.error('Please provide a valid frequency in seconds.');
        return;
    }
    setInterval(printSystemInfo, frequencyInSeconds * 1000);
}

main();