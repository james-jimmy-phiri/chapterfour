import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'resources', 'js', 'Pages');

const images = {
    general: [
        '/images/hero-bg.jpg',
        '/images/child-hero.png',
        '/images/animate-img-1.jpg',
        '/images/animate-img-2.jpg',
        '/images/animate-img-3.jpg',
    ],
    law: [
        '/images/Parliament_Building_of_Malawioutside.jpg',
        '/images/paliament.jpg',
        '/images/Chief_Justice.jpg',
        '/images/chiefjusticeof malawi.jpg',
        '/images/constitutional_book.jpg',
    ],
    people: [
        '/images/animate-img-4.jpg',
        '/images/animate-img-5.jpg',
        '/images/animate-img-6.jpg',
        '/images/president_muthalika.jpg',
    ]
};

let generalIdx = 0;
let lawIdx = 0;
let peopleIdx = 0;

function getNextImage(category) {
    const list = images[category];
    if (category === 'general') {
        const img = list[generalIdx % list.length];
        generalIdx++;
        return img;
    } else if (category === 'law') {
        const img = list[lawIdx % list.length];
        lawIdx++;
        return img;
    } else {
        const img = list[peopleIdx % list.length];
        peopleIdx++;
        return img;
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Update opacity in hero sections
    content = content.replace(/className="w-full h-full object-cover opacity-30"/g, 'className="w-full h-full object-cover opacity-60"');
    content = content.replace(/bg-gradient-to-r from-slate-900 via-slate-900\/80 to-transparent/g, 'bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent');

    // 2. Replace Unsplash images
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^"'\)\s]*/g;
    
    content = content.replace(regex, (match) => {
        // Determine category based on file name or random
        let category = 'general';
        const lowerPath = filePath.toLowerCase();
        if (lowerPath.includes('boardoftrustees') || lowerPath.includes('ourteam')) {
            category = 'people';
        } else if (lowerPath.includes('coreactivities') || lowerPath.includes('whatwedo') || lowerPath.includes('projects') || lowerPath.includes('law')) {
            category = 'law';
        }
        
        return getNextImage(category);
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            processFile(fullPath);
        }
    }
}

walkDir(directoryPath);
console.log("Done!");
