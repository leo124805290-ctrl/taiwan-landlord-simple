# 台灣房東系統 - 超級簡單版
# 一次部署成功！ 💪

FROM node:18-alpine

WORKDIR /app

# 複製package.json
COPY package*.json ./

# 安裝依賴（超級簡單，沒有衝突）
RUN npm install --only=production

# 複製原始碼
COPY . .

# 暴露端口
EXPOSE 3000

# 啟動命令
CMD ["node", "server.js"]