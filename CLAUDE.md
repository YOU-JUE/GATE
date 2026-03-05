# 宥爵智能科技 — 公司官網工作日誌與交接文件

> **這份文件是給 Claude Code 的「交接日誌」。**
> 每個 session 開始時會自動讀取這份文件，讓你快速了解專案現況。

---

## 專案概述

**宥爵智能科技有限公司（YouJue Intelligent Technology Co., Ltd.）** 的公司官網。
這是一家專注於「創新、有溫度、老師傅經驗傳承給AI」的 AI 科技開發公司。

- **官網網址**：www.youjue.ai（Hostinger 網域）
- **前端**：HTML/CSS/JS（純靜態），部署於 Vercel
- **後端**：Python FastAPI，部署於 Railway（Docker）
- **架構標準**：基於【YJ-標準架構01】

---

## 公司資訊

| 項目 | 內容 |
|------|------|
| 中文名稱 | 宥爵智能科技有限公司 |
| 英文名稱 | YouJue Intelligent Technology Co., Ltd. |
| 官網 | www.youjue.ai |
| Email | contact@youjue.ai |
| 核心理念 | 創新、有溫度、老師傅經驗傳承給 AI |
| 旗艦產品 | 珍妮 Ai（Jennie AI）— jennie.youjue.ai |

---

## 技術架構（YJ-標準架構01 精簡版）

### 平台配置

| 平台 | 角色 | 職責 |
|------|------|------|
| **Vercel** | 前端主機 | 靜態 HTML/CSS/JS 託管，自動 HTTPS + CDN |
| **Railway** | 後端主機 | Docker 容器運行 FastAPI |
| **GitHub** | 版控 + CI/CD | 程式碼管理、自動測試、健康檢查 |
| **Sentry** | 錯誤追蹤 | 後端未捕獲例外自動上報（選用） |
| **Resend** | Email 發送 | 聯繫表單通知信（選用） |
| **Hostinger** | 網域 | www.youjue.ai DNS 管理 |

### 架構拓撲

```
使用者瀏覽器
    │
    ├── 前端頁面 ──── Vercel（靜態託管 + CDN）
    │                    │ API 呼叫（CORS）
    │                    ▼
    └── 後端 API ──── Railway（Docker + Uvicorn）
                        │
                        └── Resend（Email 通知）

    監控層：GitHub Actions（健康檢查）+ Sentry（錯誤追蹤）
```

---

## 目錄結構

```
frontend/
  index.html        — 首頁（公司大門）
  products.html     — 產品服務頁
  privacy.html      — 隱私權政策
  terms.html        — 服務條款
  css/styles.css    — 主樣式檔
  js/app.js         — 主應用邏輯
  images/           — 圖片資源
  vercel.json       — Vercel 部署設定

backend/
  main.py           — FastAPI 入口（app 初始化 + middleware + router 註冊）
  requirements.txt  — Python 依賴
  .env.example      — 環境變數範例
  routers/
    __init__.py     — Router package
    health.py       — 健康檢查端點
    contact.py      — 聯繫表單 API
  tests/
    __init__.py     — Test package
    test_health.py  — 健康檢查 + 聯繫表單測試

Dockerfile          — 後端 Docker 映像
.github/workflows/
  test.yml          — CI 自動測試
  health-check.yml  — 每 30 分鐘健康檢查

CLAUDE.md           — 本文件（交接日誌）
```

---

## 前端頁面結構

### 首頁（index.html）— 公司大門

| 區塊 | ID | 說明 |
|------|------|------|
| 導覽列 | `navbar` | 固定頂部，滾動變色，手機版漢堡選單 |
| Hero | `hero` | 全螢幕視差背景 + 粒子動畫 + 品牌標語 |
| 關於我們 | `about` | 公司簡介 + 四大核心價值卡片 |
| 核心理念 | `philosophy` | 創新/溫度/傳承三大理念 + 視覺化流程圖 |
| 產品服務 | `products` | 珍妮 AI 旗艦產品展示 + 行業支援 + 未來規劃 |
| 技術架構 | `technology` | 六大技術卡片 + 系統架構拓撲圖 |
| 聯繫我們 | `contact` | 公司資訊卡片 + 聯繫表單 |
| Footer | — | 品牌 / 產品 / 公司 / 聯繫 四欄 |

### 視覺設計

- **品牌主色**：`#6366F1`（Indigo）
- **設計風格**：現代 SaaS 風格，暗色 Hero + 亮色內容區
- **動畫**：Scroll Reveal + Hero 粒子 + 打字機效果
- **RWD**：完整響應式（桌面/平板/手機）

---

## 後端 API

| 端點 | 方法 | 說明 |
|------|------|------|
| `/` | GET | API 資訊 |
| `/health` | GET | 健康檢查 |
| `/health/detailed` | GET | 詳細健康檢查 |
| `/api/contact` | POST | 聯繫表單提交 |

### 聯繫表單 API

```json
POST /api/contact
{
    "name": "姓名",
    "email": "email@example.com",
    "company": "公司名稱（選填）",
    "subject": "product|enterprise|technical|media|other",
    "message": "訊息內容"
}
```

- 成功時回傳 `{ "status": "success" }`
- 若設定了 `RESEND_API_KEY`，自動發送通知 Email 到 `NOTIFY_EMAIL`
- 前端 fallback：API 不可用時自動開啟 `mailto:` 連結

---

## 環境變數

| 變數 | 必要 | 說明 |
|------|------|------|
| `ENVIRONMENT` | 否 | `development` / `production` |
| `ALLOWED_ORIGINS` | 否 | 額外 CORS 白名單（逗號分隔） |
| `RESEND_API_KEY` | 否 | Resend Email API Key |
| `FROM_EMAIL` | 否 | 寄件人（預設 `noreply@youjue.ai`） |
| `NOTIFY_EMAIL` | 否 | 收件人（預設 `contact@youjue.ai`） |
| `SENTRY_DSN` | 否 | Sentry 錯誤追蹤 DSN |

---

## 開發指令

```bash
# 本地啟動後端
cd backend && pip install -r requirements.txt && uvicorn main:app --reload --port 8000

# 前端預覽
cd frontend && python -m http.server 3000

# 跑測試
cd backend && python -m pytest tests/ -v

# Docker 建置
docker build -t youjue-website .
docker run -p 8000:8000 youjue-website
```

---

## 部署步驟

### Vercel（前端）

1. Vercel Dashboard → Import Git Repository
2. Root Directory 設為 `frontend/`
3. Framework Preset: Other
4. Deploy
5. 設定 Custom Domain: `www.youjue.ai`

### Railway（後端）

1. Railway Dashboard → New Project → Deploy from GitHub
2. 自動偵測 Dockerfile
3. 設定環境變數（見上方表格）
4. 設定 Custom Domain（如 `api.youjue.ai`）

### Hostinger（DNS）

| 類型 | 名稱 | 值 | 用途 |
|------|------|------|------|
| CNAME | `www` | `cname.vercel-dns.com` | 前端 |
| CNAME | `api` | Railway 提供的域名 | 後端 |

---

## CI/CD

| Workflow | 觸發 | 說明 |
|----------|------|------|
| `test.yml` | push/PR 到 main（backend/**） | pytest 自動測試 |
| `health-check.yml` | 每 30 分鐘 cron | API 健康檢查 |

---

## 近期工作記錄

### 2026-03-05（初版官網建立）

#### 公司官網初版 — 基於 YJ-標準架構01
- **目的** — 建立宥爵智能科技有限公司的公司官網，作為公司的「大門」
- **架構** — 前端 Vercel + 後端 Railway + GitHub CI/CD，遵循 YJ-標準架構01 精簡版

##### 前端（4 個頁面）
| 頁面 | 說明 |
|------|------|
| `index.html` | 首頁：Hero + 關於 + 理念 + 產品 + 技術 + 聯繫 + Footer |
| `products.html` | 產品服務：珍妮 AI 功能展示 + 行業支援 |
| `privacy.html` | 隱私權政策 |
| `terms.html` | 服務條款 |

##### 後端（FastAPI）
- `main.py` — app 初始化 + CORS + 安全 Headers + Router 註冊
- `routers/health.py` — 健康檢查 2 端點
- `routers/contact.py` — 聯繫表單 API（含 Resend Email 通知）

##### CI/CD
- `test.yml` — 自動測試
- `health-check.yml` — 每 30 分鐘健康檢查

##### 測試
- 5 個測試（健康檢查 + 聯繫表單）

### 2026-03-05（聯繫表單改用 Web3Forms + 信箱更換）

#### 變更內容
- **聯絡信箱**：全站 `contact@youjue.ai` → `jennie@youjue.ai`（6 個檔案）
- **聯繫表單**：移除自建後端 API 呼叫 + mailto fallback，改用 **Web3Forms**（純前端，免費 250 封/月）
- **待辦**：需到 web3forms.com 用 jennie@youjue.ai 取得 Access Key，填入 `frontend/js/app.js` 的 `WEB3FORMS_KEY`

---

## 注意事項

1. **前端是純靜態** — 無 build 步驟，直接部署 HTML/CSS/JS
2. **官網網域是 www.youjue.ai** — Hostinger 管理 DNS
3. **珍妮 AI 的網址是 jennie.youjue.ai** — 不同子域名，是另一個產品
4. **聯繫表單使用 Web3Forms** — 純前端直接送出，不需自建後端，信件寄至 jennie@youjue.ai
5. **公司聯絡信箱是 jennie@youjue.ai** — 非 contact@youjue.ai
6. **Resend 和 Sentry 為選用** — 未設定環境變數時靜默跳過

---

*每次 session 結束前，請更新「近期工作記錄」區段。*
