# Oracle

## install oracle client & PL/SQL developer
1.[download](http://www.oracle.com/technetwork/topics/winsoft-085727.html)  instantclient-basic-nt-12.1.0.2.0.zip
2.unzip to C:\instantclient_12_1
3.add TNS_ADMIN C:\instantclient_12_1 to System variables
4.create tnsnames.ora to C:\instantclient_12_1
```sh
TEST= 
(DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST =  xxxx.xxxx.xxx)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = xxxx.xxxx.xxx)
    )
  )
```
5.install PL/SQL developer [download](https://www.allroundautomations.com/plsqldev.html)
6.add username password and tablename in tnsnames.ora to login
7.Tools=>Preferences=>Connection 
add Oracle Home C:\instantclient_12_1
add OCI library C:\instantclient_12_1\oci.dll
8.Tools=>Preferences=>Logon History=>store with password=>apply
