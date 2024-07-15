KUBERNETES
===

Conceptos y comandos para empezar
```md
# Tecnologias recomendadas 
 - Windows, Mac, Linux => DockerDesktop
 - Linux => kind
 - Windows, Mac, Linux => Minikube: Maquina virtual con kubernetes + plugins
 - Entorno remoto clopud => DigitalOcean

# Conceptos basicos
= Container.-Unidad de software que empaqueta y ejecuta una aplicacion entera.
- Aplicacion containerizada.- Un aplicacion que ha sido especialmente construida para ejecutarse en containers.
- Pod.- Coleccion de una o mas Aplicaciones Containerizadas.
- Node.- Maquina fisica o virtual que colecciona uno o mas Pods. Tambien llamnado como Worker Machine.
  Componentes de un node: Kubelet, Container runtume and Kube-proxy.
- Kubenetes Cluster.- Una coleccion de Nodos.
- Namespace.- Division logica de tu cluster de kubernetes.

# Conceptos de infraestructura
- Deployment.- Manifiesto yml que contiene los pods, replicas y containers. Kubernetes se encarga de que se cumpla esa infraestructura, siempre que se pueda.
- DaemonSet.- Manifiesto yml que contiene un Deployment, y que se debe desplegar en todos los nodos.
- StatefulSet.- Manifiesto yml que contiene un deployment y que se cotendra en volumen atado, utilizado para base de datos.
- pvc.- Persistent Volume Claim.

# Concepto: Servicios
- Cluster IP.- Ip fija dentro del clouster, osea ip privada para uso unico dentro del clouster.
- Node Port.- Crea un puerto en cada nodo, para recibir el trafico y mandar a los pods que se necesite enviar mediante el puerto.
- Load Balancer.- Balanceador de carga con el proveedor de nube.


# Administrar kubernetes remotos mediante Config file.
- 1: tener instalado kubectl
- 2: Descagar el archivo "Config File" por ejemplo de digitlocean o servidor que aloja la administracion de kubernetes => xxx-kubeconfig.yml
- 3: Permitir de khubectl reconozca la configuracion
$  export KUBECONFIG=/some-path/xxxx-kubeconfig.yaml
- 4. Provar con comando para ver todos los nods
$  kubectl get nodes
```

Comandos utiles
```bash
# Ver los contextos en el archivo config
kubectl config get-contexts

# Ver todos los nodos 
kubectl get nodes

# Ver los namespaces
kubectl get ns

# Ver los pods
kubectl -n kube-system get pods

# Borrar un pod
kubectl -n kube-system delete pod <nombre_pod>

# Levantar un pod
kubectl apply -f nombre_archivo_contiene_info_pod.yml

# Entrar modo ssh a un pod
 kubectl exec -it nombre_pod -- sh

# Entrar modo bash a un pod
 kubectl exec -it ubuntu -- bash

# Levantar un manifiesto: deployment, daemontset
 kubectl apply -f nombre_archivo_contiene_manifiesto.yaml

# Dar de baja un manifiesto: deployment, daemontset
 kubectl delete -f nombre_archivo_contiene_manifiesto.yaml
 
# Ver todos los pvc
 kubectl get pvc

# Describir un recurso: pod, node, pvc, etc.
 kubectl describe <nombre_recurso>
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