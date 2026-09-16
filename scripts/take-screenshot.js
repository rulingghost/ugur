const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  console.log('Launching browser at:', chromePath);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
    },
  });

  try {
    const page = await browser.newPage();
    console.log('Navigating to http://localhost:3000 ...');
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Wait a bit for animations and fonts to settle
    await new Promise((r) => setTimeout(r, 2000));

    const outputPath1 = path.join(__dirname, '..', 'marbar-screenshot.png');
    const artifactDir = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\c7445f44-8549-4e95-ab67-c4143d08db14';
    const outputPath2 = path.join(artifactDir, 'marbar-screenshot.png');

    console.log('Capturing viewport screenshot...');
    await page.screenshot({
      path: outputPath1,
      fullPage: false,
    });
    console.log('Saved to:', outputPath1);

    if (fs.existsSync(artifactDir)) {
      fs.copyFileSync(outputPath1, outputPath2);
      console.log('Copied to artifact dir:', outputPath2);
    }

    // Also full page screenshot
    const fullPagePath = path.join(__dirname, '..', 'marbar-screenshot-full.png');
    const fullPageArtifact = path.join(artifactDir, 'marbar-screenshot-full.png');
    console.log('Capturing full page screenshot...');
    await page.screenshot({
      path: fullPagePath,
      fullPage: true,
    });
    console.log('Saved full page to:', fullPagePath);
    if (fs.existsSync(artifactDir)) {
      fs.copyFileSync(fullPagePath, fullPageArtifact);
      console.log('Copied full page to artifact dir:', fullPageArtifact);
    }

    console.log('SUCCESS');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('Error taking screenshot:', err);
  process.exit(1);
});
