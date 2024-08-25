ANSIBLE
===

Instalación
--
```bash
# Instalación en servidor ubuntu
  sudo apt-get install ansible
```

Comandos ad-hoc
--
```bash
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
# info detallada de un servidor y una variable.
ansible all -m gather_facts --limit 172.16.250.134 | grep ansible_distribution
# Equivalente a "sudo apt-get update" (ubuntu)
ansible all -m apt -a update_cache=true --become --ask-become-pass
# Equivalente a "sudo apt-get install vim-nox" (ubuntu)
ansible all -m apt -a name=vim-nox --become --ask-become-pass
# Equivalente a "sudo apt-get install snapd" y "update" si es necesario  (ubuntu)
ansible all -m apt -a "name=snapd state=latest" --become --ask-become-pass
# Equivalente a "sudo apt-get dist-upgrade"(ubuntu)
ansible all -m apt -a "upgrade=dist" --become --ask-become-pass
```

Playbooks: instalar apache en los servidores ubuntu.
--
```bash
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

Agregamos a inventory un 4to servidor con SO Centos y optimizamos el yml.
--
```bash
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

  - name: install apache2 and php for Ubuntu
    apt:
      name:
        - apache2
        - libapache2-mod-php
      state: latest
      update_cache: yes
    when: ansible_distribution == ["Debian", "Ubuntu"]

  - name: install apache and php for CentOS
    dnf:
      name:
        - httpd
        - php
      state: latest
      update_cache: yes
    when: ansible_distribution == "CentOS"

# Comando
ansible-playbook --ask-become-pass install_apache.yml
```

Uso de variables.
--
```bash
<inventory>
172.16.250.132 apache_package=apache2 php_package=libapache2-mod-php
172.16.250.133 apache_package=apache2 php_package=libapache2-mod-php
172.16.250.134 apache_package=apache2 php_package=libapache2-mod-php
172.16.250.248 apache_package=httpd php_package=php

<install_apache.yml>
- hosts: all
  become: true
  tasks:

  - name: install apache2 and php
    package:
      name:
        - "{{ apache_package }}"
        - "{{ php_package }}"
      state: latest
      update_cache: yes

# Comando
ansible-playbook --ask-become-pass install_apache.yml
```

Playboook agrupando y etiquetando nodos
--
```bash
<inventory>
[web_servers]
172.16.250.132
172.16.250.248

[db_servers]
172.16.250.133

[file_servers]
172.16.250.134

<site.yml>
- hosts: all
  become: true
  tasks:

  - name: install updates (CentOS)
    tags: always
    dnf:
      update_only: yes
      update_cache: yes
    when: ansible_distribution == "CentOS"  

  - name: install updates (Ubuntu)
    tags: always
    apt:
      upgrade: yes
      update_cache: yes
    when: ansible_distribution == "Ubuntu"  

- hosts: web_servers
  become: true
  tasks:

  - name: install apache2 and php for Ubuntu
    tags: apache, apache2, ubuntu
    apt:
      name:
        - apache2
        - libapache2-mod-php
      state: latest
      update_cache: yes
    when: ansible_distribution == ["Debian", "Ubuntu"]

  - name: install apache and php for CentOS
    tags: apache, httpd, centos
    dnf:
      name:
        - httpd
        - php
       state: latest
      update_cache: yes
    when: ansible_distribution == "CentOS"

- hosts: db_servers
  become: true
  tasks:
  
  - name: install mariadb package (CentOS)
    tags: centos, db, mariadb
    dnf:
      name: mariadb
      state: latest
    when: ansible_distribution == "CentOS"

  - name: install mariadb package (Ubuntu)
    tags: ubuntu, db, mariadb
    apt:
      name: mariadb-server
      state: latest
    when: ansible_distribution == "Ubuntu"

- hosts: file_servers
  become: true
  tasks:

  - name: install samba package
    tags: samba
    package:
      name: samba
      state: latest

# Comando
ansible-playbook --list-tags site.yml
ansible-playbook --ask-become-pass site.yml
# Ejecutar sólo los playbooks para los que tienen la etiqueta "centos"
ansible-playbook --tags centos --ask-become-pass site.yml
# Ejecutar sólo los playbooks para los que tienen la etiqueta "db y apache"
ansible-playbook --tags "db,apache" --ask-become-pass site.yml
```

Manejando archivos
--
```bash
<inventory>
...

[workstations]
172.16.250.135


<files/default_site.html>
<html>
  <title>Web-site test</title>
  <body>
  <p>Ansible is awesome!</p>
  </body>
</html>

# Agregamos a site.yml
<site.yml>
...
- hosts: workstations
  became: true
  tasks:
  
  - name: install unzip
    package:
      name: unzip
  
  - name: install terraform
    unarchive:
      src: https://releases.hashicorp.com/terraform/0.12.28.terraform_0.12.28_linux_amd64.zip
      dest: /usr/local/bin
      remote_src: yes
      mode: 0755
      owner: root
      group: root

- hosts: web_servers
  become: true
  tasks:

  ...

  - name: Copy default html file for site
    tags: apache, apache2, httpd
    copy:
      src: default_site.html
      dest: /var/www/html/index.html
      owner: root
      group: root
      mode: 0644

#comando
ansible-playbook --ask-become-pass site.yml
```

Playbook servicios
--
```bash
# Agregamos a site.yml
<site.yml>
- hosts: all
  become: true
  tasks:

...

- hosts: web_servers
  become: true
  tasks:

...

  - name: start httpd (CentOS)
    tags: apache, centos, httpd
    service:
      name: httpd
      state: started
      enabled: yes
    when: ansible_distribution == "CentOS"

  # Change ServerAdmin in httpd.conf
  - name: change e-mail address for admin
    tags: apache, centos, httpd
    lineinfile:
      path: /etc/httpd/conf/httpd.conf
      regexp: '^ServerAdmin'
      line: ServerAdmin somebody@gmail.com
    when: ansible_distribution == "CentOS"
    register: httpd
 
  - name: restar httpd (CentOS)
    tags: apache, centos, httpd
    service:
      name: httpd
      state: restarted
    when: httpd.changed

#comando
ansible-playbook --ask-become-pass site.yml
```

Playbook Crear usuarios
--
```bash
<files/sudoer_simone>
simone ALL=(ALL) NOPASWD: ALL

<ansible.cfg>
[defaults]
inventory = inventory
private_key_file = ~/.ssh/ansible
remote_user = simone

<site.yml>

...

- hosts: all
  become: true
  tasks: 

  - name: create simone user
    tags: always
    user:
      name: simone
      groups: root
  
  - name: add ssh key for simone
    tags: always
    authorized_key:
      user: simone
      key: "ssh-ed23...."
  
  - name: add sudoers file for simone
    tags: always
    copy:
      src: sudoer_simone
      dest: /etc/sudoers.d/simone
      owner: root
      group: root
      mode: 0440

#comando ejecuta como simone sin "--ask-become-pass"
ansible-playbook site.yml
```

Playboos bootstrap
--
```bash
<bootstrap.yml>
- hosts: all
  become: true
  tasks:

  - name: install updates (CentOS)
    tags: always
    dnf:
      update_only: yes
      update_cache: yes
    when: ansible_distribution == "CentOS"  

  - name: install updates (Ubuntu)
    tags: always
    apt:
      upgrade: yes
      update_cache: yes
    when: ansible_distribution == "Ubuntu"
  
  - name: create simone user
    tags: always
    user:
      name: simone
      groups: root
  
  - name: add ssh key for simone
    tags: always
    authorized_key:
      user: simone
      key: "ssh-ed23...."
  
  - name: add sudoers file for simone
    tags: always
    copy:
      src: sudoer_simone
      dest: /etc/sudoers.d/simone
      owner: root
      group: root
      mode: 0440

```

Roles
--
```bash
<site.yml>
---

- hosts: all
  become: true
  pre_tasks:

  - name: update repository index (CentOS)
    tags: always
    dnf:
      update_cache: yes
    changed_when: false
    when: ansible_distribution == "CentOS"

  - name: update repository index (Ubuntu)
    tags: always
    apt:
      update_cache: yes
    changed_when: false
    when: ansible_distribution == "Ubuntu"

- hosts: all
  become: true
  roles:
    - base
      
- hosts: workstations
  become: true
  roles:
    - workstations
  
- hosts: web_servers
  become: true
  roles:
    - web_servers

- hosts: db_servers
  become: true
  roles:
    - db_servers

- hosts: file_servers
  become: true
  roles:
    - file_servers


<roles/base/tasks/main.yml>
- name: add ssh key for simone
  authorized_key:
    user: simone
    key: "ssh-ed23..."

<roles/db_servers/tasks/main.yml>
- name: install mariadb package (CentOS)
  tags: centos, db, mariadb
  dnf:
    name: mariadb
    state: latest
  when: ansible_distribution == "CentOS"

- name: install mariadb package (Ubuntu)
  tags: ubuntu, db, mariadb
  apt:
    name: mariadb-server
    state: latest
  when: ansible_distribution == "Ubuntu"

<roles/file_servers/tasks/main.yml>
- name: install samba package
  tags: samba
  package:
    name: samba
    state: latest

<roles/web_servers/tasks/main.yml>
- name: install httpd package (CentOS)
  dnf:
    name:
      - httpd
      - php
    state: latest
  when: ansible_distribution == "CentOS"

- name: start and enable httpd (CentOS)
  tags: apache,centos,httpd
  service:
    name: httpd
    state: started
    enabled: yes
  when: ansible_distribution == "CentOS"

- name: install apache2 (Ubuntu)
  apt:
    name:
      - apache2
      - libapache2-mod-php
    state: latest
  when: ansible_distribution == "Ubuntu"

# Change ServerAdmin in httpd.conf
- name: change e-mail address for admin
  tags: apache,centos,httpd
  lineinfile:
    path: /etc/httpd/conf/httpd.conf
    regexp: '^ServerAdmin'
    line: ServerAdmin somebody@gmail.com
  when: ansible_distribution == "CentOS"
  register: httpd

- name: restar httpd (CentOS)
  tags: apache,centos,httpd
  service:
    name: httpd
    state: restarted
  when: httpd.changed

- name: copy default html file for site
  tags: apache,apache2,httpd
  copy:
    src: default_site.html
    dest: /var/www/html/index.html
    owner: root
    group: root
    mode: 0644

<roles/workstations/tasks/main.yml>
- name: install unzip
  package:
    name: unzip

- name: install terraform
  unarchive:
    src: https://releases.hashicorp.com/terraform/0.12.28.terraform_0.12.28_linux_amd64.zip
    dest: /usr/local/bin
    remote_src: yes
    mode: 0755
    owner: root
    group: root

<roles/webservers/files/default_site.html>
<html>
  <title>Web-site test</title>
  <body>
  <p>Ansible is awesome!</p>
  </body>
</html>

#comando
ansible-playbook site.yml
```

Host variables y Handlers
--
```bash
<host_vars/172.16.250.132.yml>
<host_vars/172.16.250.133.yml>
<host_vars/172.16.250.134.yml>
apache_package_name: apache2
apache_service: apache2
php_package_name: libapache2-mod-php

<host_vars/172.16.250.248.yml>
apache_package_name: httpd
apache_service: htppd
php_package_name: php

<roles/web_servers/tasks/main.yml>
- name: install apache and php packages
  tags: apache,httpd,php
  package:
    name:
      - "{{ apache_package_name }}"
      - "{{ php_package_name }}"
    state: latest

- name: start and enable apache service
  tags: apache,httpd
  service:
    name: "{{ apache_service }}"
    state: started
    enabled: yes

# Change ServerAdmin in httpd.conf
- name: change e-mail address for admin
  tags: apache,centos,httpd
  lineinfile:
    path: /etc/httpd/conf/httpd.conf
    regexp: '^ServerAdmin'
    line: ServerAdmin somebody@gmail.com
  when: ansible_distribution == "CentOS"
  notify: restart_apache

- name: copy default html file for site
  tags: apache,apache2,httpd
  copy:
    src: default_site.html
    dest: /var/www/html/index.html
    owner: root
    group: root
    mode: 0644

<roles/webservers/handlers/main.yml>
- name: restart_apache
  service:
    name: "{{ apache_service}}"
    state: restarted

#Comando
ansible-playbook site.yml

```

REFERENCIAS
---
Tutorial completo ansible
- https://www.youtube.com/watch?v=-Q4T9wLsvOQ&list=PLT98CRl2KxKEUHie1m24-wkyHpEsa4Y70&index=2

Repositorio del curso
- https://github.com/LearnLinuxTV/getting_started_with_ansible