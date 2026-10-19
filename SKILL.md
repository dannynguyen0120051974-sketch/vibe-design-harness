---
name: vibe-harness-design
description: "Use when designing UI/UX, frontend, landing pages, or web apps. Enforces Image-First reference, 14 themes, 30-gate anti-slop linter, and 12 Impeccable post-processing commands."
version: 1.6.0
---

# Vibe-Harness-Design v1.6.0 — Universal UI/UX & Anti-Slop Engine

> **Powered by:** ABS Design System · Hallmark 57 Gates · Impeccable v0.1.15 Craft Floor · Taste Skill Image-First Pipeline  
> **Repo:** `/root/vibe-design-harness` (`https://github.com/teddiesloco/vibe-design-harness`)  
> **Mục tiêu:** Mọi AI model tạo UI đẹp, sang, chuẩn Studio ngang Designer cao cấp — triệt tiêu 100% mùi AI-slop cả lúc dựng mới (Day 0) lẫn lúc tinh chỉnh hậu kỳ (Post-processing).

---

## ⚡ Khi Nào Kích Hoạt

Tự động kích hoạt khi người dùng yêu cầu:
- "làm UI", "thiết kế web", "tạo landing page", "code frontend", "giao diện web"
- "làm component", "sửa giao diện", "làm form", "thiết kế dashboard"
- "polish", "distill", "critique", "audit UI", "làm sang lên", "bớt mùi AI"

---

## 🏛️ Pipeline 5 Bước Toàn Diện (Image-First + Craft Floor + 30-Gate Linter)

```
[BƯỚC 0: IMAGE-FIRST] ──▶ [BƯỚC 1: CONTEXT] ──▶ [BƯỚC 2: CODE] ──▶ [BƯỚC 3: 30-GATE LINT] ──▶ [BƯỚC 4: POST-POLISH]
 Sinh ảnh tham chiếu       Sinh PRODUCT.md       Dựng HTML/React     Quét 30 lỗi AI-slop       Chạy 1 trong 12 lệnh
 16:9 từng section         + DESIGN.md (14       theo Craft Floor    (<1ms) + --fix tự vá      hậu kỳ (polish, distill,
 (nếu làm trang mới)       themes chuẩn)         (không nest card)                             quieter, bolder, harden)
```

---

## 🎨 Bước 0: Image-First Reference (Khi dựng trang mới từ số 0)

- Sinh **1 ảnh riêng biệt (16:9) cho TỪNG section** trước khi code (`node /root/vibe-design-harness/bin/cli.js expand "<concept>" <domain>`).
- **CẤM dùng bố cục Hero mặc định `left-text / right-image` nhàm chán của AI.** Ưu tiên: `centered architectural focus`, `full-bleed editorial`, `asymmetric Bento`, hoặc `Quiet Luxury Apple style`.
- Chọn rõ **Visitor Mode** trước khi đặt bút:
  - **Persuade** (Landing page, Sales page): Конtrast mạnh, nhịp điệu dẫn dắt hành động.
  - **Operate** (Dashboard, App, Admin, Portal): Ổn định, mật độ thông tin rõ, `tabular-nums`.
  - **Read** (Docs, Editorial, Blog): Độ dài dòng `45–75ch`, chữ tối thiểu `16px`.
  - **Experience** (Showcase, Flagship): Chuyển động 60fps tinh tế.

---

## 🎯 Bước 1: Khởi Tạo Cặp Context `PRODUCT.md` + `DESIGN.md` & 4 Token Cứng

Chạy lệnh tạo cặp hồ sơ thiết kế chuẩn Impeccable:
```bash
node /root/vibe-design-harness/bin/cli.js init-context apple_luxury --name "ProjectName"
```
*(14 themes có sẵn: `linear`, `vercel`, `stripe`, `airbnb`, `saas_modern`, `apple_luxury`, `modern_clean`, `luxury_gold`, `luxury_editorial`, `minimalism`, `nordic_clean`, `zen_japanese`, `neo_brutalism`, `glassmorphism_dark`)*

**4 Luật Cứng (Craft Floor):**
1. **Surface & Color:** Nền sâu (`bg-zinc-950`, `#08090a`) hoặc Sáng Tinh Khiết (`#fbfbfd`, `#ffffff` chuẩn Quiet Luxury). **CẤM:** `bg-gray-800`, gradient tím-xanh (`from-purple-* to-blue-*`), hồng-cam (`from-pink-* to-orange-*`), hoặc quầng sáng `radial-gradient` loè loẹt sau lưng chữ (`radial-spotlight-glow`).
2. **Typography & Hierarchy:** Dùng `Plus Jakarta Sans`, `Inter`, `Playfair Display`, `Geist`, `JetBrains Mono`. **CẤM TIỆT:** `Space Grotesk`, `Syne`, `Outfit`, `Sora`, `Chivo`, `Unbounded`, tiêu đề Hero Serif in nghiêng (`italic-serif-display`), nhảy cóc `h1 -> h3` (`skipped-heading`), hoặc `text-justify`.
3. **Layout & Card:** **CẤM** card lồng trong card, **CẤM** viền dày 1 bên trên card bo góc (`border-accent-on-rounded` / `border-l-4 rounded-xl`), **CẤM** đánh số `01 / 02 / 03` rập khuôn trên mọi card (`numbered-section-labels`), **CẤM** hàng card đeo viền mảnh kèm `shadow-2xl` (`gpt-thin-border-wide-shadow`).
4. **Motion & Copywriting:** Dùng `cubic-bezier(0.16, 1, 0.3, 1)`. **CẤM:** `animate-bounce`, chấm tròn `animate-pulse` trang trí giả tạo (`pulsing-dot`), văn mẫu AI (`unleash`, `supercharge`, `revolutionize`, `empower`, `"Not a X. A Y."`, `"security theater"`).

---

## 🔍 Bước 3: Cổng Chặn Tự Động 30-Gate Linter (`<1ms`)

Sau khi tạo/sửa file HTML hoặc React TSX, **bắt buộc chạy**:

```bash
node /root/vibe-design-harness/bin/cli.js lint <file.html|file.tsx> --fix
```

- Lọc theo nhóm lỗi nếu cần: `--scope color|layout|type|motion|copy|slop`
- Bỏ qua có chủ đích trên dòng cụ thể: `<!-- vibe-disable rule-id -->`
- Nếu có binary Rust của Impeccable trên máy, có thể chạy song kiếm hợp bích:
  `/root/.hermes/skills/creative/impeccable/scripts/impeccable detect <file_or_url>`

---

## ✨ Bước 4: 12 Lệnh Tinh Chỉnh Hậu Kỳ (Impeccable Post-Processing Flows)

Khi cần nâng cấp hoặc sửa giao diện đang có, gọi playbook chuẩn bằng CLI hoặc MCP `run_design_command`:

```bash
node /root/vibe-design-harness/bin/cli.js command <tên_lệnh>
```

| Lệnh | Mục đích sử dụng |
|---|---|
| `audit` | Chấm điểm 5 chiều (Accessibility, Performance, Theming, Responsive, Anti-Slop) trên thang 100 |
| `critique` | Đóng vai Giám đốc Sáng tạo nhận xét trực diện bố cục, điểm nhìn (Squint Test) và mùi AI |
| `polish` | Chuốt lại lần cuối trước khi ship: căn chỉnh quang học, micro-spacing, hover/focus states |
| `distill` | Gọt bỏ 30-50% khung viền thừa, badge rườm rà và chữ dài dòng để về đúng tinh thần tối giản |
| `bolder` | Tăng độ cá tính và tương phản cho giao diện đang bị nhạt/an toàn quá mức |
| `quieter` | Hạ tông giao diện đang bị loè loẹt/ồn ào về chuẩn **Quiet Luxury** điềm đạm, sang trọng |
| `delight` | Thêm chi tiết chạm tinh tế (micro-interactions, empty states có hồn) |
| `harden` | Bọc thép giao diện: chống tràn chữ dài, đa ngôn ngữ, màn hình 320px, mạng chậm, 4 trạng thái async |
| `animate` | Thiết kế chuyển động GPU (`transform`, `opacity`) mượt mà, có `prefers-reduced-motion` |
| `clarify` | Chuốt lại toàn bộ UX copywriting, nút CTA và thông báo lỗi cho rõ nghĩa, con người |
| `adapt` | Tái cấu trúc bố cục thích ứng đa thiết bị (Mobile thumb-zone ≥44px, Desktop wide) |
| `overdrive` | Đẩy kỹ thuật UI lên mức Flagship (60fps choreography, shaders, fluid transitions) |
