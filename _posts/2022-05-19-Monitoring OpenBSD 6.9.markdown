---
layout: post
title: Monitoring OpenBSD 6.9
date: 2022-05-19 01:13 +0200
categories: SysAdmin
---
Monitoring OpenBSD 6.9
1\. Installation de slant
=========================

1.1. Sur le serveur et le client
--------------------------------

pkg\_add slant

1.2. Sur le serveur
-------------------

vi .slantrc

waittime 60 ;
servers
	http://localhost/cgi-bin/slant-cgi
	http://192.168.1.108/cgi-bin/slant-cgi
	;
           layout {
             header ;
             errlog 10 ;
             host {
               cpu qmin\_bars qmin hour ;
               mem qmin\_bars qmin hour ;
               nprocs qmin\_bars qmin hour ;
               net qmin hour ;
               disc qmin hour ;
               link ip state access ;
               rprocs qmin ;
               host record ;
             } ;
           } ;

1.3. Sur le serveur et les clients
----------------------------------

vi /etc/httpd.conf

server "localhost" {
	listen on \* port 80
		root "/htdocs"
	location "/cgi-bin/\*"{
		root "/"
		fastcgi socket "/run/slowcgi.sock"
	}
}

rcctl enable slowcgi
rcctl start slowcgi
rcctl enable slant\_collectd
rcctl start slant\_collectd

1.4. Monitoring sur le serveur
------------------------------

slant -f ~/.slantrc