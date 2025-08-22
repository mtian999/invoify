const { execSync } = require('child_process');
const os = require('os');

// 只在Vercel环境中运行
if (process.env.VERCEL) {
  console.log('在Vercel环境中安装Puppeteer所需的系统依赖...');
  
  try {
    // 安装Chromium所需的系统库
    if (os.platform() === 'linux') {
      console.log('检测到Linux环境，安装必要的系统依赖...');
      
      // 安装Chromium所需的系统库
      const dependencies = [
        'ca-certificates',
        'fonts-liberation',
        'libappindicator3-1',
        'libasound2',
        'libatk-bridge2.0-0',
        'libatk1.0-0',
        'libc6',
        'libcairo2',
        'libcups2',
        'libdbus-1-3',
        'libexpat1',
        'libfontconfig1',
        'libgbm1',
        'libgcc1',
        'libglib2.0-0',
        'libgtk-3-0',
        'libnspr4',
        'libnss3',
        'libpango-1.0-0',
        'libpangocairo-1.0-0',
        'libstdc++6',
        'libx11-6',
        'libx11-xcb1',
        'libxcb1',
        'libxcomposite1',
        'libxcursor1',
        'libxdamage1',
        'libxext6',
        'libxfixes3',
        'libxi6',
        'libxrandr2',
        'libxrender1',
        'libxss1',
        'libxtst6',
        'lsb-release',
        'wget',
        'xdg-utils'
      ];
      
      execSync(`apt-get update && apt-get install -y ${dependencies.join(' ')}`, { stdio: 'inherit' });
      console.log('系统依赖安装完成！');
    } else {
      console.log(`当前平台 ${os.platform()} 不需要额外安装系统依赖。`);
    }
  } catch (error) {
    console.error('安装系统依赖时出错:', error);
    process.exit(1);
  }
}
