# umiadmin

说明：这是一个使用 Docker 部署的 umimax 前端项目和 nest 后端项目。

## 前提条件

- 在本地安装 Docker 和 Docker Compose。

## 使用方法

1. **克隆项目**:

   ```bash
   git clone <repository_url>
   ```

2. **进入项目目录**:

   ```bash
   cd <project_directory>
   ```

3. **构建和启动容器**:

   ```bash
   docker-compose up --build
   ```

   这将会构建并启动 umimax 前端项目、nest 后端项目、MySQL 数据库和 Redis 服务。

4. **访问项目**:

   - umimax 前端项目: 访问 <http://localhost:8000>
   - nest 后端项目: 访问 <http://localhost:1101>

## Docker 配置

### 前端项目

- Dockerfile: `admin_front/Dockerfile`
- 端口映射: 将容器的 8000 端口映射到主机的 8000 端口。

### 后端项目

- Dockerfile: `admin_back/Dockerfile`
- 依赖服务: 后端项目依赖 MySQL 数据库服务。
- 端口映射: 将容器的 1101 端口映射到主机的 1101 端口。

### 数据库

- 数据库类型: MySQL
- 端口映射: 将容器的 3306 端口映射到主机的 3306 端口。
- 数据持久化: 将 MySQL 数据目录挂载到本地的 `/path/to/mysql/data` 目录。

### 缓存

- 缓存类型: Redis
- 端口映射: 将容器的 6379 端口映射到主机的 6379 端口。
- 数据持久化: 将 Redis 数据目录挂载到本地的 `/path/to/redis/data` 目录。

## 注意事项

- 请确保本地的 8000、1101、3306 和 6379 端口没有被其他进程占用。
- 请确保在项目根目录下替换 `<repository_url>` 和 `<project_directory>` 为实际的仓库 URL 和项目目录。
- 请根据实际情况修改 Docker Compose 配置文件中的路径和环境变量。
