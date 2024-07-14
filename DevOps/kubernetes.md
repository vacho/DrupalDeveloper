KUBERNETES
===
```bash
# Tecnologias recomendadas 
 - Windows, Mac, Linux => DockerDesktop
 - Linux => kind
 - Windows, Mac, Linux => Minikube: Maquina virtual con kubernetes + plugins
 - Entorno remoto clopud => DigitalOcean

# Conceptos principales
= Container.-Unidad de software que empaqueta y ejecuta una aplicacion entera.
- Aplicacion containerizada.- Un aplicacion que ha sido especialmente construida para ejecutarse en containers.
- Pod.- Coleccion de una o mas Aplicaciones Containerizadas.
- Node.- Maquina fisica o virtual que colecciona uno o mas Pods. Tambien llamnado como Worker Machine.
  Componentes de un node: Kubelet, Container runtume and Kube-proxy.
- Kubenetes Cluster.- A set of Nodes.

# Administrar kubernetes remotos mediante Config file.
- 1: tener instalado kubectl
- 2: Descagar el archivo "Config File" por ejemplo de digitlocean o servidor que aloja la administracion de kubernetes => xxx-kubeconfig.yml
- 3: Permitir de khubectl reconozca la configuracion
  export KUBECONFIG=/some-path/xxxx-kubeconfig.yaml
- 4. Provar con comando para ver todos los nods
  kubectl get nodes



```


REFERENCIAS
---
Video tutorial utilizando DigitalOcean
- https://www.youtube.com/watch?v=DCoBcpOA7W4&t=3387s

Instalar kubectl
- https://kubernetes.io/es/docs/tasks/tools/included/install-kubectl-linux/#instalar-usando-la-administraci%C3%B3n-nativa-de-paquetes

DockerDesktop
- https://www.docker.com/products/docker-desktop/

Kind
- https://kind.sigs.k8s.io/

Minikube
- https://minikube.sigs.k8s.io/docs/