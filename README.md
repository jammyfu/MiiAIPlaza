# MiiAIPlaza

![预览图像](public/assets/images/preview_dark.png)

`MiiAIPlaza` 是当前仓库的项目名称。它在原始 `mii-creator` 的编辑器、渲染器和本地资源管道之上，继续演进为一个基于浏览器的 3D Mii + Agent 广场系统。

本仓库仍然保留了原始的 Mii 编辑和库体验，但目前的产品方向已不再仅仅是一个独立的化身编辑器：

- `/` 保留了经典的 Mii 编辑器和本地库流程
- `/?plaza=1` 运行早期的第三人称广场原型
- 提供者驱动的在线状态数据正在为 `OpenClaw` 和其他未来的代理后端做准备

## 本仓库负责的内容

本仓库是项目的客户端层。

它负责：

- Mii 编辑、渲染和身份展示
- 可运行的浏览器广场运行时
- HUD（抬头显示）、诊断和玩家互动外壳
- 面向提供者的代理在线状态客户端合约

它不负责：

- 代理（Agent）本身的编排
- 社交持久化或邮箱/留言板存储
- 实时分发或多玩家后端服务

这些部分计划放在稳定的合约和独立的服务器层之后。

## 当前架构方向

当前的分支遵循分层平台路径：

- 本仓库中的 `MiiAIPlaza` 客户端
- 用于 `OpenClaw` 和未来代理系统的提供者适配器
- 在开启真实网络依赖之前的“合约优先”集成
- 通过 `CURRENT_PLAN.md`、`MASTER_PLAN.md` 和 `docs/project-governance/` 进行持续的项目治理

推荐阅读顺序：

- [PROJECT_BRIEF.md 项目简介](PROJECT_BRIEF.md)
- [CURRENT_PLAN.md 当前计划](CURRENT_PLAN.md)
- [MASTER_PLAN.md 总体规划](MASTER_PLAN.md)
- [docs/architecture/PLATFORM_ROADMAP.md docs/architecture/PLATFORM_ROADMAP.md](docs/architecture/PLATFORM_ROADMAP.md)
- [docs/AUTOMATION_COMMANDS.md 自动化命令](docs/AUTOMATION_COMMANDS.md)
- [docs/LONG_RUNNING_AUTONOMY.md docs/LONG_RUNNING_AUTONOMY.md](docs/LONG_RUNNING_AUTONOMY.md)
- [docs/superpowers/specs/2026-04-20-mii-plaza-platform-design.md docs/superpowers/specs/2026-04-20-mii-plaza-platform-design.md](docs/superpowers/specs/2026-04-20-mii-plaza-platform-design.md)

## 开源基础与贡献致谢

本项目基于开源仓库 [datkat21/mii-creator](https://github.com/datkat21/mii-creator)。

本分叉（fork）以此代码库为基础，并将其扩展为可玩的 Mii 广场体验。

当前仓库还构建或参考了以下开源项目：

- [ariankordi/FFL-Testing](https://github.com/ariankordi/FFL-Testing) ：借鉴了渲染服务器原型想法和本地渲染工作流
- [datkat21/FFL-Testing-with-hats](https://github.com/datkat21/FFL-Testing-with-hats) ：引入了带帽子的本地渲染支持
- [PretendoNetwork/mii-js](https://github.com/PretendoNetwork/mii-js) ：用于 JavaScript 友好的 Mii 数据处理

原始项目的其他致谢依然有效：

- `src/external/mii-frontend` 中的部分实用程序代码改编自 arian 的公开网站/工具
- 自定义 Mii Maker 音乐由 [objecty](https://x.com/objecty) 创作

在重用或分发此分叉时，请保持上游致谢完整。

## 当前功能面

### 编辑器与渲染器

- 真实的 3D Mii 渲染
- 具有扩展颜色和配饰的 Mii 编辑
- 本地库保存/加载流程
- QR 码导出
- PNG 导出
- `.ffsd` 和 `.miic` 导入/导出
- 在应用内自定义渲染创建
- 本地主机的浏览器端 `ffl.js` 渲染
- 可选的原生本地渲染服务器工作流

### 广场原型

- 位于 `/?plaza=1` 的第三人称可玩广场外壳
- 模拟提供者支持的广场居民和热点
- HUD 和 `Provider Status`（提供者状态）中的提供者诊断
- 针对 `OpenClaw` 实时集成的类型化提供者衔接
- 针对不断演进的提供者管道的刷新/回退/状态处理

## 开始使用

### 前提条件

- [Bun](https://bun.sh/)
- Python 3
- macOS 是当前脚本中支持最好的本地渲染环境

安装依赖：

```bash
bun i
```

## 运行应用

### 最快的本地前端循环

运行 TypeScript 构建监听器：

```bash
bun run build-ts
```

在另一个终端中启动静态应用服务：

```bash
bun run serve
```

然后打开：

- [http://127.0.0.1:3000/](http://127.0.0.1:3000/) 进入经典编辑器
- [http://127.0.0.1:3000/?plaza=1](http://127.0.0.1:3000/?plaza=1) 进入广场原型

如果你更喜欢一次性编译而不是监听器：

```bash
bun run build-once
```

### 本地渲染技术栈

本仓库支持两种本地渲染模式：

- 浏览器端 `ffl.js` 渲染，现在是 `localhost` 和 `127.0.0.1` 上的默认模式
- 使用 `/miis/*` 的原生本地渲染服务器模式

macOS 上的原生前提条件：

```bash
brew install cmake pkg-config glfw go
```

设置渲染器资源：

```bash
./scripts/setup-local-renderer.sh
```

仅启动应用：

```bash
./scripts/start-local-app.sh
```

有用的配套命令：

```bash
./scripts/status-local-app.sh
./scripts/stop-local-app.sh
./scripts/start-local-app.sh restart
```

同时启动原生渲染服务器：

```bash
./scripts/start-local-renderer.sh
```

在服务器渲染模式下打开应用：

- [http://127.0.0.1:3000/?rendererBackend=server](http://127.0.0.1:3000/?rendererBackend=server)

一键启动所有内容：

```bash
./scripts/start-local-stack.sh
```

检查或停止全栈：

```bash
./scripts/status-local-stack.sh
./scripts/stop-local-stack.sh
```

### 有用的运行时覆盖参数

- `MII_RENDERER_BACKEND=ffljs`
- `MII_RENDERER_BACKEND=server`
- `MII_RENDERER_BACKEND=both`
- `MII_RENDERER_REPO=/你的/本地/FFL-Testing-with-hats/绝对路径`
- `MII_RENDERER_PORT=5001`
- `MII_APP_PORT=3001`
- `MII_RENDERER_UPSTREAM_PORT=12347`
- `?renderer=remote`
- `?renderer=local`
- `?rendererBackend=ffljs`
- `?rendererBackend=server`

## 运行测试与验证

### 快速测试入口

运行默认测试脚本：

```bash
bun test
```

或者通过 `package.json` 运行：

```bash
bun run test
```

目前涵盖以下内容：

- 核心广场提供者测试
- 居民代入适配器测试
- 本地同步辅助工具测试

### 全库验证

本仓库的主要验证入口是：

```bash
python3 tools/verify.py
```

该命令会运行项目循环中使用的更广泛的仓库检查，包括：

- 用于广场/提供者/运行时的 Bun 测试套件
- 用于同步工具的 Python 单元测试覆盖
- 一次性前端构建验证

你也可以调用包快捷方式：

```bash
bun run verify
```

### 有用的独立命令

```bash
bun run build-once
bun test src/providers/openClawPresenceAdapter.test.ts
bun test src/game/plaza/loadPlazaWorldData.test.ts
python3 -m unittest tools.test_sync_or_queue tools.test_queue_local_git_sync tools.test_verify
```

## 自动化与安全同步

本仓库采用了从 `ai-analysis-mcp` 和 `AegisGraph` 继承的安全同步提交模式。

推荐的自动化流程是：

1. 完成一个稳定的闭环（closure）
2. 运行 `python3 tools/verify.py`
3. 通过安全同步提交，而不是直接使用 `git commit && git push`

主要命令：

```bash
python3 tools/sync_or_queue.py --message "feat: 你的稳定闭环说明"
python3 tools/sync_or_queue.py --message "feat: 你的稳定闭环说明" --prefer-local
python3 tools/local_git_flush.py
```

包快捷方式：

```bash
bun run sync
bun run sync:local
bun run flush:local
```

请参阅：

- [AGENTS.md](AGENTS.md)
- [docs/AUTOMATION_COMMANDS.md](docs/AUTOMATION_COMMANDS.md)
- [docs/LONG_RUNNING_AUTONOMY.md](docs/LONG_RUNNING_AUTONOMY.md)

## 贡献

欢迎贡献，特别是在以下领域：

- 广场玩法和玩家互动
- 提供者适配器和诊断
- Mii 渲染改进
- 本地工具链和自动化可靠性
- 一旦服务合约准备就绪后的社交/世界系统

如果你参与贡献，请与仓库循环文件保持一致，并在同步更改前进行验证。

## 模型致谢

部分自定义帽子模型由 The Models Resource 提供：

- [Top Hat（高礼帽）](https://www.models-resource.com/nintendo_switch/supersmashbrosultimate/model/30314/)
- [Ribbon & Bow（缎带与蝴蝶结）](https://www.models-resource.com/3ds/nintendogscats/model/30239/)

感谢 [Timimimi](https://github.com/Timiimiimii) 创作的额外帽子模型：

- 猫耳 (Cat Ears)
- 草帽 (Straw Hat)
- 希贾布 (Hijab)
- 自行车头盔 (Bike Helmet)
