import path from 'path';
import fs from 'fs';

export async function joinCreate() {
  const file = path.join(process.cwd(), '@/asset/data.json');
  const data = {
    a: 'hello',
    b: '안녕하세요'
  }
  const content = fs.writeFileSync(file, JSON.stringify(data));
  return {
    props: { content }
  };
};