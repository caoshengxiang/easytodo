#!  /bin/bash
# && 如果前面的命令正确执行，那么后面的命令也将执行。否则后面的命令不执行。
scp dist.tar.gz root@119:/usr/local/nginx/html
ssh root@119 "rm -rf /usr/local/nginx/html/snAdmin/* && tar -zxvf /usr/local/nginx/html/dist.tar.gz -C /usr/local/nginx/html/snAdmin/ && mv /usr/local/nginx/html/snAdmin/dist/* -t /usr/local/nginx/html/snAdmin/ && rm -rf /usr/local/nginx/html/snAdmin/dist /usr/local/nginx/html/dist.tar.gz"

# ***
# http://erp.zzcfo.cn
