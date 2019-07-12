#!  /bin/bash
# && 如果前面的命令正确执行，那么后面的命令也将执行。否则后面的命令不执行。
scp -P 47295 dist.tar.gz root@119.27.160.41:/usr/share/nginx/html
ssh -p 47295 root@119.27.160.41 "rm -rf /usr/share/nginx/html/attendance/* && tar -zxvf /usr/share/nginx/html/dist.tar.gz -C /usr/share/nginx/html/attendance/ && mv /usr/share/nginx/html/attendance/dist/* -t /usr/share/nginx/html/attendance/ && rm -rf /usr/share/nginx/html/attendance/dist /usr/share/nginx/html/dist.tar.gz"
#
# h0JiO-3xNotm#5bw0v9
# http://119.27.160.41:81
