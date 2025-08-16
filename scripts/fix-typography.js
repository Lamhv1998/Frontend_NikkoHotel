const fs = require('fs');
const path = require('path');

// Mapping các class cũ sang class mới
const classMapping = {
  'text-title': 'text-h5',
  'text-sub-title': 'text-h6', 
  'text-body-2': 'text-body-sm',
  'text-tiny': 'text-body-xs'
};

// Hàm thay thế class trong một file
function replaceClassesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Thay thế các class
    for (const [oldClass, newClass] of Object.entries(classMapping)) {
      const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, newClass);
        hasChanges = true;
        console.log(`  ✓ Replaced ${oldClass} → ${newClass}`);
      }
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Hàm tìm và xử lý tất cả file Vue
function processVueFiles(dir) {
  const files = fs.readdirSync(dir);
  let processedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processedCount += processVueFiles(filePath);
    } else if (file.endsWith('.vue')) {
      console.log(`Processing: ${filePath}`);
      if (replaceClassesInFile(filePath)) {
        processedCount++;
      }
    }
  }
  
  return processedCount;
}

// Thực thi script
console.log('🔧 Fixing typography classes...\n');

const directories = [
  'components',
  'pages',
  'layouts'
];

let totalProcessed = 0;

for (const dir of directories) {
  if (fs.existsSync(dir)) {
    console.log(`📁 Processing ${dir}/`);
    totalProcessed += processVueFiles(dir);
  }
}

console.log(`\n✅ Completed! Processed ${totalProcessed} files.`);
console.log('\n📋 Class mapping applied:');
for (const [oldClass, newClass] of Object.entries(classMapping)) {
  console.log(`  ${oldClass} → ${newClass}`);
}
