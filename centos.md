# Centos:[zsh/httpd/php/tomcat]

## go online
```sh
/etc/sysconfig/network-scripts/ifcfg-xxxxx
ONBOOT=no =>ONBOOT=yes
service network restart
```
## add user to root group
```sh
sudo usermod -g root [username]
```
## Use ifconfig and netstat
```sh
yum install net-tools
```
## show installed apps
```sh
yum list installed
```
## install on my zsh
```sh
yum install wget
yum install zsh
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```
### add PATH
```sh
vi ~/.zshrc
ZSH_THEME="alanpeabody"
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/usr/local/php5/bin:/usr/local/apache2/bin:/root/node/bin"
source ~/.zshrc
```
### search execute file
```sh
which xxx
```

## install httpd
```sh
yum install gcc zlib-devel openssl-devel
```
### install pcre
```sh
tar -zvxf pcre-8.36.tar.gz
cd pcre-8.36
./configure -prefix=/usr/local/pcre
make
make install
```
### install apr
```sh
tar -zvxf apr-1.52.tar.gz
cd apr-1.52
./configure -prefix=/usr/local/apr
make
make install
```
### install apr-util
```sh
tar -zvxf apr-util-1.5.4.tar.gz
cd apr-util-1.5.4
./configure -prefix=/usr/local/apr-util --waith-apr=/usr/local/apr
make
make install
```
### install httpd
```sh
tar -zxvf httpd-2.4.18.tar.gz
cd httpd-2.4.18
./configure -prefix=/usr/local/apache2 ap_cv_void_ptr_lt_long=no --with-pcre=/usr/local/pcre --with-apr=/usr/local/apr --with-apr-util=/usr/local/apr-util -enable-mods-shared=all -enable-so -enable-rewrite
```
### start httpd
```sh
/usr/local/apache2/bin/apachectl start
```
### add httpd to service
create service
```sh
cp /usr/local/apache2/bin/apachectl /etc/rc.d/init.d/httpd
```
change /etc/rc.d/init.d/httpd to add
```sh
# chkconfig: 2345 10 90
# description: Activates/Deactivates Apache Web Server
```
add and start service
```sh
chkconfig --add httpd
chkconfig httpd on
service httpd start
```
show services list
```sh
chkconfig --list
```
### open 80 port
```sh
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --reload
```

## install php
```sh
yum install libxml2-devel
tar -zxvf php-5.6.17.tar.gz
cd php-5.6.17
./configure -prefix=/usr/local/php5 -with-apxs2=/usr/local/apache/bin/apxs -with-mysql  -with-mysqli -with-pdo-mysql -enable-mbstring=all
make
make install
```
show installed module
```sh
php -m
```
find php.ini path
```sh
php -i |grep "php.ini"
```
configure:[Apache 2.x on Unix systems](http://php.net/manual/en/install.unix.apache2.php)
```sh
cp php.ini-development /usr/local/php5/lib/php.ini
```


## add curl by phpize
```sh
yum install curl-devel
cd php-5.6.17/ext/curl
phpize
./configure
make
make install
add php.ini extension=curl.so
```

## install node
```sh
tar -zxvf node-vx.x.x-linux-x86.tar.gz
vi .zshrc
export PATH="$PATH:/root/node/bin"
source .zshrc
```
install cnpm
```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## check bit
```sh
getconf LONG_BIT
```

## install Tomcat 9
install java
```sh
rpm -qa|grep java
rpm -e --nodeps tzdata-java-2012c-1.el6.noarch
rpm -e --nodeps java-1.6.0-openjdk-1.6.0.0-1.45.1.11.1.el6.i686
rpm -qa|grep gcj
rpm -e --nodeps libgcj-4.4.7-16.el6.i686
mkdir /usr/java
cd /usr/java
rpm -ivh jdk-8u73-linux-i586.rpm
vi /etc/profile
	add:export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL
		export JAVA_HOME=/usr/java/jdk1.8.0_73
		export PATH=$JAVA_HOME/bin:$PATH
		export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
source /etc/profile
java -version
```



open firewall
```sh
vim /etc/sysconfig/iptables
	add:-A INPUT -p tcp --dport 6379 -j ACCEPT
		-A INPUT -j REJECT --reject-with icmp-host-prohibited
service iptables restart
```
install tomcat
```sh
cd /var/local
tar -zxvf apache-tomcat-9.0.0.M3.tar.gz
mv apache-tomcat-9.0.0.M3 tomcat9
cd tomcat9/bin
./startup.sh
```
watch tomcat logs
```sh
tail -f catalina.out
```
## tar
zip
```sh
tar -zxvf filename.tar.gz 
```
unzip
```sh
tar -zcvf filename.tar.gz folder
```
//TODO

## install mysql

## install redis
```sh
tar -zxf redis-3.0.7.tar.gz
cd redis-2.8.5
make
sudo make install
cd utils
sudo ./install_server.sh 
```

## install weblogic
start
```sh
nohup ./startWebLogic.sh &
```
stop
```sh
nohup ./stopWebLogic.sh &
```
logs
```sh
tail -f nohup.out
```

install
```sh
[root@demo ~]# groupadd dba
[root@demo ~]# useradd -g dba oracle  
[root@demo ~]# passwd oracle

[root@demo ~]# export JAVA_HOME
[root@demo ~]# PATH=$JAVA_HOME/bin:$PATH  
[root@demo ~]# export PATH

[oracle@demo ~]# java -jar -Xmx1024m -XX:MaxPermSize=512M fmw_12.2.1.0.0_wls_quick.jar
[oracle@demo ~]# mkdir user_projects/domains/myDomain
[oracle@demo ~]# java weblogic.Server
```