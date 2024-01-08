## 如何利用Docker开启nginx服务并设置代理

###  安装nginx

1. 下载nginx视图

```
docker pull nginx
```

2. 查看安装images

```
docker images
```

出现以下内容代表nginx视图安装成功

![Alt text](image.png)

###  启动nginx容器服务

```
docker run  --name nginx_test -p 80:80 -d nginx
```

打开浏览器默认打开http://127.0.0.1, 出现以下内容代表nginx启动成功，或者在本地命令行工具输入  curl http://127.0.0.1 查看服务内容


![Alt text](image-2.png)

###  本地配置nginx代理等服务并挂在容器nginx

1. 查看nginx服务

```
docker images
```
![Alt text](image-3.png)

1. 本地创建对应nginx文件夹并映射到nginx服务


```
mkdir nginx
```

2.映射容器对应nginx对应文件内容

> 将容器nginx.conf文件复制到宿主机

```
docker cp nginx_test:/etc/nginx/nginx.conf C:\\Users\\hui\\Desktop\\docker_practice\\nginx
```


> 将容器conf.d文件夹下内容复制到宿主机

```
docker cp nginx_test:/etc/nginx/conf.d C:\Users\hui\Desktop\docker_practice\nginx
```

> 将容器中的html文件夹复制到宿主机

```
docker cp nginx_test:/usr/share/nginx/html C:\Users\hui\Desktop\docker_practice\nginx
```

本地出现以下文件内容代表文件复制成功

![Alt text](image-5.png)

3. 直接执行docker rm nginx或者以容器id方式关闭容器

> 找到nginx对应的容器id

docker ps

> 关闭该容器(容器名称或id都可以)

docker stop nginx_test

> 删除该容器

docker rm nginx_test

出现以下内容代表删除成功
![Alt text](image-8.png)

4. 映射本地文件到nginx配置并开启新服务

```
docker run -v  C:\\Users\\hui\\Desktop\\docker_practice\\nginx\\nginx.conf:/etc/nginx/nginx.conf -v  C:\\Users\\hui\\Desktop\\docker_practice\\nginx\\conf.d:/etc/nginx/conf.d -v  C:\\Users\\hui\\Desktop\\docker_practice\\nginx\\log:/var/log/nginx -v  C:\\Users\\hui\\Desktop\\docker_practice\\nginx\\html:/usr/share/nginx/html -v  C:\\Users\\hui\\Desktop\\docker_practice\\nginx\\cert:/etc/nginx/cert --name nginx_test -p 80:80 -d nginx
```
docker run -v C:\\Users\\hui\\Desktop\\docker_practice\\nginx\\nginx.conf:/etc/nginx/nginx.conf --name nginx_test -p 80:80 -d nginx
开启新的nginx成功本地文件并映射到对应nginx服务
![Alt text](image-9.png)

5.尝试修改本地文件并重启nginx服务是否有改变

#### 修改文件 

![Alt text](image-10.png)

#### 重启服务

![Alt text](image-12.png)

#### 查看对应网页内容

![Alt text](image-11.png)

出现以上内容代表nginx配置与本地文件映射成功

###  采用vite起本地对应服务并实现对应代理配置

#### 启动对应端口服务
![Alt text](image-13.png)

![Alt text](image-14.png)


#### 配置对应nginx服务实现代理

1.配置代理
![Alt text](image-15.png)

页面错误显示(不能直接代理127.0.0.1：5137)

![Alt text](image-16.png)

代理并采用本地hosts解析域名页面展示(hosts配置文件：C:\Windows\System32\drivers\etc\hosts)

![Alt text](image-19.png)


[Docker下载地址](https://docs.docker.com/desktop/install/windows-install/)

[示例参考文档](https://docs.docker.com/get-started/)








