ANSIBLE
===
```bash
# Instalación en servidor ubuntu
  sudo apt-get install ansible
```

```bash
# Comandos ad-hoc
  sudo apt-get install ansible

ansible all --key-file ~/.ssh/ansible -i inventory -m ping

VS

<ansible.cfg>
[defaults]
inventory = inventory
private_key_file = ~/.ssh/ansible

<inventory>
172.16.250.132
172.16.250.133
172.16.250.134

ansible all -m ping
ansible all --list-hosts
# info detallada de los servidores.
ansible all -m gather_facts
# Equivalente a "sudo apt-get update" (ubuntu)
ansible all -m apt -a update_cache=true --become --ask-become-pass
# Equivalente a "sudo apt-get install vim-nox" (ubuntu)
ansible all -m apt -a name=vim-nox --become --ask-become-pass
# Equivalente a "sudo apt-get install snapd" y "update" si es necesario  (ubuntu)
ansible all -m apt -a "name=snapd state=latest" --become --ask-become-pass
# Equivalente a "sudo apt-get dist-upgrade"(ubuntu)
ansible all -m apt -a "upgrade=dist" --become --ask-become-pass
```
```bash
# Playbooks: instalar apache en los servidores ubuntu.
<install_apache.yml>
---

- hosts: all
  become: true
  tasks:

  - name: update repository index
    apt:
      update_cache: yes

  - name: install apache2
    apt:
      name: apache2
      state: latest
  
  - name: add php support for apache
    apt:
      name: libapache2-mod-php
      state: latest

# Comando
ansible-playbook --ask-become-pass install_apache.yml
# Nota: "state: absent" para desinstalar
```

```bash
# Agregamos a inventory un 4to servidor con SO Centos
<inventory>
172.16.250.132
172.16.250.133
172.16.250.134
172.16.250.248

<install_apache.yml>
---

- hosts: all
  become: true
  tasks:

  - name: update repository index
    apt:
      update_cache: yes
    when: ansible_distribution == "Ubuntu"

  - name: install apache2
    apt:
      name: apache2
      state: latest
    when: ansible_distribution == "Ubuntu"

  - name: add php support for apache
    apt:
      name: libapache2-mod-php
      state: latest
    when: ansible_distribution == "Ubuntu"

# Comando
ansible-playbook --ask-become-pass install_apache.yml
```



REFERENCIAS
---
Tutorial completo ansible
- https://www.youtube.com/watch?v=-Q4T9wLsvOQ&list=PLT98CRl2KxKEUHie1m24-wkyHpEsa4Y70&index=2
