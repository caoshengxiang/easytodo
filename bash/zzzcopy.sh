#!  /bin/expect
# && 如果前面的命令正确执行，那么后面的命令也将执行。否则后面的命令不执行。
set timeout 30
spawn mv dist sales && tar zcvf sales.tar.gz sales && mv sales dist && mv sales.tar.gz dist/
spawn scp dist/sales.tar.gz root@119.27.160.41:/opt
expect "password:"
send "daydayUP@2017"
spawn ssh root@119.27.160.41 "rm -rf /opt/web-front/sales && tar -zxvf /opt/sales.tar.gz -C /opt/web-front"
expect "password:"
send "daydayUP@2017"
spawn rm -rf dist
interact

# daydayUP@2017
# http://sales.dcstar-inc.com/#/
