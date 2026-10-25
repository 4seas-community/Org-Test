# Cloudflare AI 使用级别问卷（简化版）

## 功能
- 6 道题，匿名填写
- 自动显示个人 Level 0–4 和建议
- 管理员口令保护团队统计：各等级数量、团队平均分、各题平均分
- 不收集姓名或邮箱；允许重复提交

## 部署步骤
1. 在 Cloudflare Dashboard 创建 **D1 Database**。
2. 打开 D1 的 Console，执行 `schema.sql` 中全部 SQL。
3. 编辑 `wrangler.jsonc`，把 `database_name` 和 `database_id` 替换为新数据库的真实值。
4. 安装 Node.js，然后在本文件夹打开终端运行：
   - `npx wrangler login`
   - `npx wrangler secret put ADMIN_PIN`，按提示输入一个强管理员口令
   - `npx wrangler deploy`
5. 部署完成后，Cloudflare 会提供 `workers.dev` 地址。把该地址发给同事填写。

## 文件说明
- `public/index.html`：问卷网页
- `worker.js`：API 与数据处理
- `schema.sql`：D1 数据表
- `wrangler.jsonc`：部署配置

## 说明
- 需要 Cloudflare Workers + D1；不是只上传 HTML 就能保存多人答案的纯静态页面。
- 匿名是指不要求姓名/邮箱；Cloudflare 仍可能处理服务运行所需的技术日志。
- 当前按每次提交计数，不能阻止同一个人重复提交。
- 每题选项对应 0–4 分，6 题平均分四舍五入得到等级。这是简化自评量表，不是 Karpathy 官方认证。
- 管理员口令通过 Cloudflare Secret 设置，不写在公开 HTML 里。
