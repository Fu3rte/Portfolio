# 问题修复日志

用于记录 bug、性能问题和优化项的处理过程。保持简洁，只写可追踪信息。

## 记录格式

| 日期 | 类型 | 模块/文件 | 问题 | 处理 | 验证 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-05-21 | 性能 | - | - | - | - | 待处理 |
| 2026-05-21 | 性能 | src/App.tsx | PhotosPage 和 ContactPage 同步进入初始路由图 | 使用 React.lazy + Suspense 延迟加载非首页路由 | not verified | 已修复 |
| 2026-05-21 | 性能 | src/features/About/About.tsx, src/components/customComponent/LocationCard.tsx | Leaflet 随 About 同步进入首页模块图 | LocationCard 改为 React.lazy + Suspense 延迟加载 | not verified | 已修复 |

## 状态约定

- 待处理
- 处理中
- 已修复
- 已验证
- 暂缓
