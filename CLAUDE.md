# 宥爵智能科技 — 公司官網工作日誌與交接文件

> **這份文件是給 Claude Code 的「交接日誌」。**
> 每個 session 開始時會自動讀取這份文件，讓你快速了解專案現況。

---

## 專案概述

**宥爵智能科技有限公司（YouJue Intelligent Technology Co., Ltd.）** 的公司官網。
這是一家專注於「創新、有溫度、老師傅經驗傳承給AI」的 AI 科技開發公司。

- **官網網址**：www.youjue.ai（Hostinger 網域）
- **前端**：HTML/CSS/JS（純靜態），部署於 Vercel
- **後端**：Python FastAPI（備用，尚未部署）
- **聯繫表單**：Web3Forms（純前端，免費 250 封/月）
- **架構標準**：基於【YJ-標準架構01】

---

## 公司資訊

| 項目 | 內容 |
|------|------|
| 中文名稱 | 宥爵智能科技有限公司 |
| 英文名稱 | YouJue Intelligent Technology Co., Ltd. |
| 官網 | www.youjue.ai |
| Email | jennie@youjue.ai |
| 核心理念 | 創新、有溫度、老師傅經驗傳承給 AI |
| 旗艦產品 | 珍妮 Ai（Jennie AI）— jennie.youjue.ai |

---

## 技術架構（YJ-標準架構01 精簡版）

### 平台配置

| 平台 | 角色 | 職責 |
|------|------|------|
| **Vercel** | 前端主機 | 靜態 HTML/CSS/JS 託管，自動 HTTPS + CDN |
| **Web3Forms** | 聯繫表單 | 純前端表單提交服務，免費 250 封/月 |
| **GitHub** | 版控 + CI/CD | 程式碼管理、自動測試 |
| **Hostinger** | 網域 + Email | www.youjue.ai DNS 管理 + jennie@youjue.ai 信箱 |
| **Railway** | 後端主機（備用） | Docker 容器運行 FastAPI（尚未部署） |
| **Sentry** | 錯誤追蹤 | 後端未捕獲例外自動上報（選用） |

### 架構拓撲

```
使用者瀏覽器
    │
    ├── 前端頁面 ──── Vercel（靜態託管 + CDN）
    │                    │
    │                    ├── 聯繫表單 POST ──── Web3Forms API
    │                    │                        │
    │                    │                        └── Email 通知 → jennie@youjue.ai
    │                    │
    │                    └── (未來擴充) ──── Railway 後端 API
    │
    監控層：GitHub Actions（CI 自動測試）
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

## 聯繫表單（Web3Forms）

### 服務資訊

| 項目 | 內容 |
|------|------|
| 服務商 | Web3Forms（web3forms.com） |
| 方案 | Free（免費，250 封/月，無時間限制） |
| 帳號 | jennie@youjue.ai |
| Access Key | `4baa0302-03cf-4bd5-b3b1-4d3d7eb698a2` |
| 收件信箱 | jennie@youjue.ai（Hostinger Email） |
| 管理後台 | web3forms.com → Sign in |

### 運作方式

1. 使用者在官網填寫聯繫表單，按「送出訊息」
2. 前端 JS 直接 POST 到 `https://api.web3forms.com/submit`
3. Web3Forms 將表單內容以 Email 寄到 jennie@youjue.ai
4. 頁面顯示綠色成功 toast，全程不離開頁面

### 表單欄位

| 欄位 | 對應 ID | 必填 |
|------|---------|------|
| 姓名 | `contactName` | 是 |
| 電子信箱 | `contactEmail` | 是 |
| 公司名稱 | `contactCompany` | 否 |
| 主旨 | `contactSubject` | 是（下拉選單） |
| 訊息 | `contactMessage` | 是 |

### 主旨選項對照

| value | 顯示文字 | Email 主旨 |
|-------|---------|-----------|
| `product` | 產品諮詢 | 【官網聯繫】產品諮詢 |
| `enterprise` | 企業合作洽談 | 【官網聯繫】企業合作洽談 |
| `technical` | 技術支援 | 【官網聯繫】技術支援 |
| `media` | 媒體採訪 | 【官網聯繫】媒體採訪 |
| `other` | 其他 | 【官網聯繫】其他 |

---

## 後端 API（備用，尚未部署至 Railway）

| 端點 | 方法 | 說明 |
|------|------|------|
| `/` | GET | API 資訊 |
| `/health` | GET | 健康檢查 |
| `/health/detailed` | GET | 詳細健康檢查 |
| `/api/contact` | POST | 聯繫表單提交（目前由 Web3Forms 取代） |

---

## 環境變數

| 變數 | 必要 | 說明 |
|------|------|------|
| `ENVIRONMENT` | 否 | `development` / `production` |
| `ALLOWED_ORIGINS` | 否 | 額外 CORS 白名單（逗號分隔） |
| `RESEND_API_KEY` | 否 | Resend Email API Key |
| `FROM_EMAIL` | 否 | 寄件人（預設 `noreply@youjue.ai`） |
| `NOTIFY_EMAIL` | 否 | 收件人（預設 `jennie@youjue.ai`） |
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
1. **聯絡信箱更換**：全站 `contact@youjue.ai` → `jennie@youjue.ai`
   - 涉及 6 個檔案：`index.html`、`privacy.html`、`terms.html`、`app.js`、`.env.example`、`contact.py`
2. **聯繫表單重構**：移除自建後端 API 呼叫 + mailto fallback，改用 **Web3Forms**
   - 服務：Web3Forms Free（250 封/月，無時間限制）
   - 帳號：jennie@youjue.ai
   - Access Key：`4baa0302-03cf-4bd5-b3b1-4d3d7eb698a2`（已填入 `frontend/js/app.js`）
   - 實測結果：送出成功，jennie@youjue.ai 信箱已收到測試訊息 ✓

#### 決策記錄
- **為何不部署 Railway**：目前後端唯一功能是聯繫表單寄信，Web3Forms 純前端即可完成，省去後端伺服器維護成本與月費
- **為何選 Web3Forms**：免費 250 封/月、無時間限制、純前端整合最簡單、使用者一鍵送出不離開頁面

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
