# GitHub Actions PDF生成配置指南

## 第二步：配置环境变量

### 2.1 本地开发环境配置

1. **创建 `.env.local` 文件**：
   - 在项目根目录（c:\project_mt\invoify\）创建 `.env.local` 文件
   - 添加以下内容：

```env
# GitHub Actions PDF生成配置
GITHUB_TOKEN=你的GitHub_Personal_Access_Token
GITHUB_REPO_OWNER=你的GitHub用户名
GITHUB_REPO_NAME=invoify

# 邮件功能配置（如果需要）
NODEMAILER_EMAIL=your_email@example.com
NODEMAILER_PW=your_email_password
```

2. **替换实际值**：
   - `GITHUB_TOKEN`: 粘贴第一步创建的Personal Access Token
   - `GITHUB_REPO_OWNER`: 你的GitHub用户名（例如：mtian999）
   - `GITHUB_REPO_NAME`: 仓库名称（通常是 invoify）

### 2.2 Vercel部署环境配置

如果你使用Vercel部署，需要在Vercel控制台添加环境变量：

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的Invoify项目
3. 进入 **Settings** → **Environment Variables**
4. 添加以下变量：
   - `GITHUB_TOKEN`: 你的Personal Access Token
   - `GITHUB_REPO_OWNER`: 你的GitHub用户名
   - `GITHUB_REPO_NAME`: invoify

## 第三步：测试GitHub Actions工作流

### 3.1 手动测试工作流

1. **访问GitHub仓库**：
   - 打开你的GitHub仓库页面
   - 点击 **Actions** 标签页

2. **手动触发工作流**：
   - 找到 "Generate PDF with Chromium" 工作流
   - 点击 **Run workflow**
   - 在 `invoice_data` 输入框中粘贴测试数据：

```json
{
  "details": {
    "pdfTemplate": "template1"
  },
  "sender": {
    "name": "测试公司",
    "address": "测试地址"
  },
  "receiver": {
    "name": "客户名称",
    "address": "客户地址"
  },
  "items": [
    {
      "name": "测试项目",
      "quantity": 1,
      "price": 100
    }
  ]
}
```

3. **查看执行结果**：
   - 工作流运行完成后，点击工作流实例
   - 在 **Artifacts** 部分下载生成的PDF

### 3.2 通过应用测试

1. **启动本地开发服务器**：
```bash
npm run dev
```

2. **测试PDF生成**：
   - 在应用中创建一个发票
   - 点击生成PDF按钮
   - 如果本地生成失败，系统会自动触发GitHub Actions
   - 查看控制台输出的GitHub Actions链接

## 第四步：故障排除

### 4.1 常见问题

**问题1**: GitHub Token权限不足
```
Error: Failed to trigger GitHub workflow: 403 Forbidden
```
**解决方案**: 确保Token有 `repo` 和 `workflow` 权限

**问题2**: 仓库信息配置错误
```
Error: Failed to trigger GitHub workflow: 404 Not Found
```
**解决方案**: 检查 `GITHUB_REPO_OWNER` 和 `GITHUB_REPO_NAME` 是否正确

**问题3**: 工作流文件不存在
```
Error: Workflow not found
```
**解决方案**: 确保 `.github/workflows/generate-pdf.yml` 文件已提交到仓库

### 4.2 调试步骤

1. **检查环境变量**：
```javascript
// 在浏览器控制台执行
console.log('GITHUB_TOKEN配置:', !!process.env.GITHUB_TOKEN);
```

2. **查看GitHub Actions日志**：
   - 进入GitHub仓库 → Actions
   - 点击失败的工作流实例
   - 查看详细日志信息

3. **本地测试API**：
```bash
curl -X POST http://localhost:3000/api/trigger-pdf-workflow \
  -H "Content-Type: application/json" \
  -d '{"invoiceData": {"details": {"pdfTemplate": "template1"}}}'
```

## 第五步：使用流程

### 5.1 正常使用流程

1. 用户在应用中创建发票
2. 点击"生成PDF"按钮
3. 系统首先尝试本地生成
4. 如果失败，自动触发GitHub Actions
5. 用户收到GitHub Actions链接
6. 工作流完成后，从Artifacts下载PDF

### 5.2 GitHub Actions优势

- ✅ 完整的Ubuntu环境，包含所有Chromium依赖
- ✅ 可靠的PDF生成，不受serverless限制
- ✅ 自动化流程，无需手动干预
- ✅ 生成的PDF保存7天，便于下载

## 注意事项

1. **Token安全**：
   - 不要将Personal Access Token提交到代码仓库
   - 定期更新Token
   - 使用最小权限原则

2. **成本考虑**：
   - GitHub Actions对公共仓库免费
   - 私有仓库有使用限额

3. **性能**：
   - GitHub Actions生成PDF需要1-3分钟
   - 适合对实时性要求不高的场景

## 完成配置后的验证

配置完成后，你可以通过以下方式验证：

1. 重启开发服务器
2. 在应用中尝试生成PDF
3. 查看控制台是否有错误信息
4. 访问GitHub Actions页面确认工作流正常运行

如果遇到任何问题，请参考故障排除部分或查看GitHub Actions的详细日志。
