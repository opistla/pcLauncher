import fs from 'fs';
import path from 'path';

const service = {
  write: (data: any) => {
    const writeJsonFilePath = path.join(__dirname, 'testObj.json');
    fs.writeFileSync(writeJsonFilePath, JSON.stringify(data, null, 2));
  }
}

export default service;