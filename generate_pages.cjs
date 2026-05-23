const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'src/pages/ThirdSemesterCSENotes.tsx');
let templateContent = fs.readFileSync(templatePath, 'utf8');

const semesters = [
  { prefix: 'Third', semNum: '3rd', titlePrefix: '3rd' },
  { prefix: 'Fourth', semNum: '4th', titlePrefix: '4th' },
  { prefix: 'Seventh', semNum: '7th', titlePrefix: '7th' },
  { prefix: 'Eighth', semNum: '8th', titlePrefix: '8th' }
];

const branches = [
  { code: 'BT', title: 'BioTech' },
  { code: 'PL', title: 'Plastics' },
  { code: 'ME', title: 'Mechanical' },
  { code: 'OT', title: 'Oil Tech' },
  { code: 'PT', title: 'Paint Tech' },
  { code: 'LFT', title: 'Leather & Fashion' },
  { code: 'FT', title: 'Food Tech' },
  { code: 'CSE', title: 'CSE/IT' } // For 7th/8th sem
];

const tasks = [
  // 3rd Sem tasks
  { sem: semesters[0], branch: branches[0] }, // BT
  { sem: semesters[0], branch: branches[1] }, // PL
  { sem: semesters[0], branch: branches[2] }, // ME
  { sem: semesters[0], branch: branches[3] }, // OT
  { sem: semesters[0], branch: branches[4] }, // PT
  { sem: semesters[0], branch: branches[5] }, // LFT
  { sem: semesters[0], branch: branches[6] }, // FT
  
  // 4th Sem tasks
  { sem: semesters[1], branch: branches[0] }, // BT
  { sem: semesters[1], branch: branches[1] }, // PL
  { sem: semesters[1], branch: branches[2] }, // ME
  { sem: semesters[1], branch: branches[3] }, // OT
  { sem: semesters[1], branch: branches[4] }, // PT
  { sem: semesters[1], branch: branches[5] }, // LFT
  { sem: semesters[1], branch: branches[6] }, // FT

  // 7th and 8th Sem CSE/IT tasks
  { sem: semesters[2], branch: branches[7] }, // CSE
  { sem: semesters[3], branch: branches[7] }  // CSE
];

tasks.forEach(task => {
  const componentName = `${task.sem.prefix}Semester${task.branch.code}Notes`;
  const fileName = `${componentName}.tsx`;
  const filePath = path.join(__dirname, 'src/pages', fileName);
  
  let newContent = templateContent
    .replace(/ThirdSemesterNotes/g, componentName)
    .replace(/3rd Semester CSE\/IT/g, `${task.sem.titlePrefix} Semester ${task.branch.title}`)
    .replace(/CSE-3rd Semester/g, `${task.branch.code}-${task.sem.titlePrefix} Semester`)
    .replace(/3rd Semester B\.Tech/g, `${task.sem.titlePrefix} Semester B.Tech`)
    .replace(/3rd Semester Syllabus/g, `${task.sem.titlePrefix} Semester Syllabus`)
    .replace(/CSE\/IT 3rd Semester/g, `${task.branch.title} ${task.sem.titlePrefix} Semester`)
    .replace(/3rd semester/g, `${task.sem.titlePrefix} semester`)
    .replace(/3rd Semester/g, `${task.sem.titlePrefix} Semester`);
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Generated ${fileName}`);
});
