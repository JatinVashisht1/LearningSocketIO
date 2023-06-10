import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function logger(dataToLog, filePath) {
    console.log("=====================================================================");
    console.log(`File: \"${filePath}\"\n`);
    const jsonData = JSON.stringify(dataToLog, null, 4);
    console.log(`Data:===> \n\n${jsonData.toString()}\n`);
    console.log("=====================================================================\n");
}