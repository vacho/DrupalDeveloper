SSH
===
```bash
# Instalación de openssh servidor en sistema ubuntu: suficiente para loguearse remotamente por ssh
  sudo apt-get install openssh-server

# Logueo remoto por ssh
  ssh -p 2222 usuario@200.58.81.32

# Generar key para conexion en remoto: va a generar una clave privada y una publica .pub
  ssh-keygen -t ed25519 -C "algun comentario"

```


REFERENCIAS
---
Video explicativo
- https://www.youtube.com/watch?v=-Q4T9wLsvOQ&list=PLT98CRl2KxKEUHie1m24-wkyHpEsa4Y70&index=2

Documentacion ubuntu
- https://ubuntu.com/server/docs/openssh-server
