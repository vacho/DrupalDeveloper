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
- 2: Descagar el archivo "Config File" por ejemplo de digitalocean o servidor que aloja la administracion de kubernetes => xxx-kubeconfig.yml
- 3: Permitir de khubectl reconozca la configuracion
$  export KUBECONFIG=/some-path/xxxx-kubeconfig.yaml
- 4. Provar con comando para ver todos los nodos
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
kubectl -n nombre_namespace get pods
kubectl -n kube-system get pods

# Borrar un pod
kubectl -n kube-system delete pod nombre_pod

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

Namespaces
```bash
<Namespace.yaml>
apiVersion: v1
kind: Namespace
metadata:
  name: 04--pod

kubectl apply -f Namespace.yaml

#Commando
kubectl apply -f Namespace.yaml
kubectl delete -f Namespace.yaml
```

Pods
```bash
<Pod.yaml>
apiVersion: v1
kind: Pod
metadata:
  name: nginx-better
  namespace: 04--pod
spec:
  containers:
    - name: nginx
      image: cgr.dev/chainguard/nginx:latest
      ports:
        - containerPort: 8080
          protocol: TCP
      readinessProbe:
        httpGet:
          path: /
          port: 8080
      resources:
        limits:
          memory: "50Mi"
        requests:
          memory: "50Mi"
          cpu: "250m"
      securityContext:
        allowPrivilegeEscalation: false
        privileged: false
  securityContext:
    seccompProfile:
      type: RuntimeDefault
    runAsUser: 1001
    runAsGroup: 1001
    runAsNonRoot: true

# Comandos
kubectl apply -f Pod.yaml
kubectl port-forward -n ${NAMESPACE} nginx-better 8080:8080
```

Replicas
```bash
<Replicas.yaml>
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-better
  namespace: 04--replicaset
  labels:
    app: nginx-better
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx-better
  template:
    metadata:
      labels:
        app: nginx-better
    spec:
      containers:
        - name: nginx
          image: cgr.dev/chainguard/nginx:latest
          ports:
            - containerPort: 8080
              protocol: TCP
          readinessProbe:
            httpGet:
              path: /
              port: 8080
          resources:
            limits:
              memory: "50Mi"
            requests:
              memory: "50Mi"
              cpu: "250m"
          securityContext:
            allowPrivilegeEscalation: false
            privileged: false
      securityContext:
        seccompProfile:
          type: RuntimeDefault
        runAsUser: 1001
        runAsGroup: 1001
        runAsNonRoot: true

# Comandos
kubectl apply -f Replicas.yaml
kubectl get replicasets.apps
```

Deployments
```bash
<Deployment.yaml>
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-better
  namespace: 04--deployment
  labels:
    app: nginx-better
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx-better
  template:
    metadata:
      labels:
        app: nginx-better
    spec:
      containers:
        - name: nginx
          image: cgr.dev/chainguard/nginx:latest
          ports:
            - containerPort: 8080
              protocol: TCP
          readinessProbe:
            httpGet:
              path: /
              port: 8080
          resources:
            limits:
              memory: "50Mi"
            requests:
              memory: "50Mi"
              cpu: "250m"
          securityContext:
            allowPrivilegeEscalation: false
            privileged: false
      securityContext:
        seccompProfile:
          type: RuntimeDefault
        runAsUser: 1001
        runAsGroup: 1001
        runAsNonRoot: true

#Comandos
kubectl apply -y Deployment.yaml
kubectl get deployments.apps
#Rollout - Rollback
kubectl rollout restart deployment nginx-better
kubectl rollout undo deployment nginx-better
```

Services.- Expone los pods con un loadbalancer
```bash
<deploy.yaml>
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-minimal
  labels:
    foo: deployment-label
  annotations:
    bar: deployment-annotation
spec:
  replicas: 3
  selector:
    matchLabels:
      baz: pod-label
  template:
    metadata:
      labels:
        baz: pod-label
      annotations:
        bing: pod-annotation
    spec:
      containers:
        - name: nginx
          image: nginx:1.26.0

<clusterip.yaml>
apiVersion: v1
kind: Service
metadata:
  name: nginx-clusterip
  labels:
    foo: service-label
  annotations:
    bar: service-annotation
spec:
  type: ClusterIP # This is the default value
  selector:
    baz: pod-label
  ports:
    - protocol: TCP
      port: 80 # Port the service is listening on
      targetPort: 80 # Port the container is listening on (if unset, defaults to equal port value)

<nodeport.yaml>
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  type: NodePort
  selector:
    baz: pod-label
  ports:
    - protocol: TCP
      port: 80 # Port the service is listening on
      targetPort: 80 # Port the container is listening on (if unset, defaults to equal port value)
      # nodePort: 30XXX (if unset, kubernetes will assign a port within 30000-32767)

<loadbalancer.yaml>
apiVersion: v1
kind: Service
metadata:
  name: nginx-loadbalancer
spec:
  type: LoadBalancer # Will only work if cluster is configured to provision one from an external source (e.g. cloud provider)
  selector:
    baz: pod-label
  ports:
    - protocol: TCP
      port: 80 # Port the service is listening on
      targetPort: 80 # Port the container is listening on (if unset, defaults to equal port value)

# Comandos
kubectl apply -f deploy.yaml
kubectl apply -f clusterip.yaml
kubectl apply -f nodeport.yaml
kubectl apply -f loadbalancer.yaml
kubectl get service

# Para poder usar loadbalancer en kind
go install sigs.k8s.io/cloud-provider-kind@latest
sudo cloud-provider-kind
```

Jobs.- Asegura que los pods se ejecute
```bash
<Jobs.yaml>
apiVersion: batch/v1
kind: Job
metadata:
  name: echo-date-better
  namespace: 04--job
spec:
  parallelism: 2
  completions: 2
  activeDeadlineSeconds: 100
  backoffLimit: 1
  template:
    metadata:
      labels:
        app: echo-date
    spec:
      containers:
        - name: echo
          image: cgr.dev/chainguard/busybox:latest
          command: ["date"]
          resources:
            limits:
              memory: "50Mi"
            requests:
              memory: "50Mi"
              cpu: "250m"
          securityContext:
            allowPrivilegeEscalation: false
            privileged: false
            runAsUser: 1001
            runAsGroup: 1001
            runAsNonRoot: true
      restartPolicy: Never
      securityContext:
        seccompProfile:
          type: RuntimeDefault

# Comandos
kubectl apply -f Job.yaml
```

CronJob
```bash
<cronjob.yaml>

apiVersion: batch/v1
kind: CronJob
metadata:
  name: echo-date-better
  namespace: 04--cronjob
spec:
  schedule: "* * * * *"
  jobTemplate:
    spec:
      parallelism: 1
      completions: 1
      activeDeadlineSeconds: 100
      backoffLimit: 1
      template:
        metadata:
          labels:
            app: echo-date
        spec:
          containers:
            - name: echo
              image: cgr.dev/chainguard/busybox:latest
              command: ["date"]
              resources:
                limits:
                  memory: "50Mi"
                requests:
                  memory: "50Mi"
                  cpu: "250m"
              securityContext:
                allowPrivilegeEscalation: false
                privileged: false
                runAsUser: 1001
                runAsGroup: 1001
                runAsNonRoot: true
          restartPolicy: Never
          securityContext:
            seccompProfile:
              type: RuntimeDefault

#comandos
kubectl apply -f cronjob.yaml
kubectl get jobs
#Ejecutar un crojob manualmente.
kubectl create job --from=cronjob/echo-date-better manually-triggered
```

DaemonSet
```bash
<Daemonset.yaml>
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-minimal
  namespace: 04--daemonset
spec:
  selector:
    matchLabels:
      app: fluentd
  template:
    metadata:
      labels:
        app: fluentd
    spec:
      containers:
        - name: fluentd
          image: fluentd:v1.16-1

#Comandos
kubectl apply -f Daemonset.yaml
kubectl get pods -o wide
```

StatefulSet
```bash
<Service.nginx.yaml>
apiVersion: v1
kind: Service
metadata:
  name: nginx # singular since it points to a single cluster IP
spec:
  type: ClusterIP
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80

<Service.nginxs.yaml>
apiVersion: v1
kind: Service
metadata:
  name: nginxs # Plural because it sets up DNS for each replica in the StatefulSet (e.g. nginx-0.nginxs.default.svc.cluster.local)
spec:
  type: ClusterIP
  clusterIP: None # This makes it a "headless" service
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80

<StatefulSet.nginx-with-init-container.yaml>
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: nginx-with-init-conainer
spec:
  serviceName: nginxs
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      initContainers:
        - name: populate-default-html
          image: nginx:1.26.0
          # Nginx is a silly example to use for a stateful application (you should use a deployment for nginx)
          # but this demonstrates how you can use an init container to pre-populate a pod specific config file
          # For example, you might configure a database StatefulSet with some pods having read/write access, and
          # others only providing read access.
          #
          # See: https://kubernetes.io/docs/tasks/run-application/run-replicated-stateful-application/
          command:
            - bash
            - "-c"
            - |
              set -ex
              [[ $HOSTNAME =~ -([0-9]+)$ ]] || exit 1
              ordinal=${BASH_REMATCH[1]}
              echo "<h1>Hello from pod $ordinal</h1>" >  /usr/share/nginx/html/index.html
          volumeMounts:
            - name: data
              mountPath: /usr/share/nginx/html
      containers:
        - name: nginx
          image: nginx:1.26.0
          volumeMounts:
            - name: data
              mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: "standard"
        resources:
          requests:
            storage: 100Mi


#Comandos
kubectl apply -f Service.nginx.yaml
kubectl apply -f Service.nginxs.yaml
kubectl apply -f StatefulSet.nginx-with-init-container.yaml
kubectl port-forward nginx-with-init-conainer-0 8080:80
# tambien se puede correr para kubectl port-forward nginx-with-init-conainer-1 8080:80 o kubectl port-forward nginx-with-init-conainer-2 8080:80
```

```bash
#Comandos
kubectl apply -f 
```
```bash

#Comandos
kubectl apply -f 
```
```bash
#Comandos
kubectl apply -f 
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

Video tutorial curso completo ingles
- https://github.com/sidpalas/devops-directive-kubernetes-course?tab=readme-ov-file