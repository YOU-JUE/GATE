# 宥爵智能科技 — 公司官網

**YouJue Intelligent Technology Co., Ltd.**

> 創新、有溫度、老師傅經驗傳承給 AI

## 關於我們

宥爵智能科技有限公司是一家專注於 AI 應用開發的科技公司。我們致力於打造「創新、有溫度、能傳承老師傅經驗」的 AI 產品。

- 官網：[www.youjue.ai](https://www.youjue.ai)
- 旗艦產品：[珍妮 Ai](https://jennie.youjue.ai)

## 技術架構

基於【YJ-標準架構01】：

- **前端**：HTML/CSS/JS → Vercel
- **後端**：Python FastAPI → Railway (Docker)
- **CI/CD**：GitHub Actions

## 開發

```bash
# 後端
cd backend && pip install -r requirements.txt && uvicorn main:app --reload

# 前端
cd frontend && python -m http.server 3000

# 測試
cd backend && python -m pytest tests/ -v
```
