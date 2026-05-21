# 问题修复日志

用于记录 bug、性能问题和优化项的处理过程。保持简洁，只写可追踪信息。

## 记录格式

| 日期 | 类型 | 模块/文件 | 问题 | 处理 | 验证 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-05-21 | 性能 | - | - | - | - | 待处理 |
| 2026-05-21 | 性能 | src/App.tsx | PhotosPage 和 ContactPage 同步进入初始路由图 | 使用 React.lazy + Suspense 延迟加载非首页路由 | not verified | 已修复 |
| 2026-05-21 | 性能 | src/features/About/About.tsx, src/components/customComponent/LocationCard.tsx | Leaflet 随 About 同步进入首页模块图 | LocationCard 改为 React.lazy + Suspense 延迟加载 | not verified | 已修复 |
| 2026-05-21 | 性能 | src/pages/PhotosPage.tsx, src/components/InfiniteGallery/InfiniteGallery.tsx, scripts/optimize-photos.mjs | 照片页直接使用大尺寸原图导致资源体积过大 | 生成 1920px optimized WebP，页面改用单套 WebP 资源，原图 source 目录加入 gitignore | not verified | 已修复 |
| 2026-05-21 | 性能 | src/pages/PhotosPage.tsx, src/assets/Photos | 原图仍被 Git 跟踪且照片页只展示 7 张 optimized WebP | 照片页改为展示 10 张 optimized WebP，移除已跟踪原图并保留 ignored source | npm run typecheck, npm run build | 已修复 |
| 2026-05-21 | Bug | src/components/InfiniteGallery/InfiniteGallery.tsx | 照片数量未补齐完整画布网格，固定 3x3 平铺副本在大视口和拖拽后露出空白 | 画布内部循环补齐完整行，并按视口动态计算平铺副本范围，点击检测同步覆盖平铺副本 | npm run typecheck, npm run build, Playwright | 已修复 |
| 2026-05-21 | 性能 | src/App.tsx, src/components/WholePage/Pointer.tsx | 全局自定义 Pointer 挂载窗口级鼠标监听并隐藏原生 cursor | 移除 Pointer 包裹和组件，清理 cursor-none/data-pointer，恢复原生鼠标指针 | not verified | 已修复 |

## 状态约定

- 待处理
- 处理中
- 已修复
- 已验证
- 暂缓
