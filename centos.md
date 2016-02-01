# Centos:[zsh/httpd/php]

## go online
```sh
/etc/sysconfig/network-scripts/ifcfg-xxxxx
ONBOOT=no =>ONBOOT=yes
service network restart
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