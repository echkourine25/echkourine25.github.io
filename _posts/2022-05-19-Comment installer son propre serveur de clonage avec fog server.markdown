---
layout: post
title: Comment installer son propre serveur de clonage avec fog server
date: 2022-05-19 01:13 +0200
categories: SysAdmin
---
Comment installer son propre serveur de clonage avec fog server
### Introduction

#### Prérequis

##### Compétences nécessaires

*   Être à l'aise avec l'invite de commande
*   Savoir modifier des fichiers de configuration GNU/Linux

##### Matériel nécessaire

*   Avoir au moins connecté en LAN un serveur debian avec une connexion internet avec un espace de stockage conséquent

### Déploiement

#### Installation de FOG Project

##### 1\. Téléchargez et vérifiez l'archive sur le serveur

`wget https://github.com/FOGProject/fogproject/archive/1.5.7.tar.gz`

##### 2\. Décompressez l'archive et lancer l'installation

`tar xvzf 1.5.7.tar.gz   cd fogproject-1.5.7/bin   sudo ./installfog.sh`

##### Suivez les instructions d'installation

*   Déclarez une carte réseau préférée et refusez tout en rapport avec DHCP
*   Le serveur MariaDB (base de donnée) n'a pas de mot de passe par défaut.

#### Installation et configuration de dnsmasq

##### 1\. Installez le paquet

`sudo apt-get install dnsmasq`

##### 2\. Créez le fichier /etc/dnsmasq.d/ltsp.conf

`# Don't function as a DNS server:   port=0   # Log lots of extra information about DHCP transactions.   log-dhcp   # Set the root directory for files available via FTP.   tftp-root=/tftpboot   # The boot filename, Server name, Server Ip Address   dhcp-boot=undionly.kpxe,,192.168.1.49   # Disable re-use of the DHCP servername and filename fields as extra   # option space. That's to avoid confusing some old or broken DHCP clients.   dhcp-no-override   # inspect the vendor class string and match the text to set the tag   dhcp-vendorclass=BIOS,PXEClient:Arch:00000   dhcp-vendorclass=UEFI32,PXEClient:Arch:00006   dhcp-vendorclass=UEFI,PXEClient:Arch:00007   dhcp-vendorclass=UEFI64,PXEClient:Arch:00009   # Set the boot file name based on the matching tag from the vendor class (above)   dhcp-boot=net:UEFI32,i386-efi/ipxe.efi,,192.168.1.49   dhcp-boot=net:UEFI,ipxe.efi,,192.168.1.49   dhcp-boot=net:UEFI64,ipxe.efi,,192.168.1.49   # PXE menu. The first part is the text displayed to the user. The second is the timeout, in seconds.   pxe-prompt="Booting FOG Client", 1   # The known types are x86PC, PC98, IA64_EFI, Alpha, Arc_x86,   # Intel_Lean_Client, IA32_EFI, BC_EFI, Xscale_EFI and X86-64_EFI   # This option is first and will be the default if there is no input from the user.   pxe-service=X86PC, "Boot to FOG", undionly.kpxe   pxe-service=X86-64_EFI, "Boot to FOG UEFI", ipxe.efi   pxe-service=BC_EFI, "Boot to FOG UEFI PXE-BC", ipxe.efi   dhcp-range=192.168.1.49,proxy   `

##### 3\. Remplacez dans ltsp.conf toutes les occurences de 192.168.1.49 par l'adresse ip de votre serveur

##### 4\. Relancez dnsmasq

`sudo service dnsmasq restart`

### Conclusion

Le serveur est prêt et l'interface web d'administration et le mot de passe sont fournis lors de l'installation de FOG Serveur.

Retrouvez-moi dans un autre tutoriel pour apprendre à piloter l'interface d'administration de FOG Project et cloner un disque dur.