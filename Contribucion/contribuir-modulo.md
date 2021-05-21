Crear un módulo y contribuirlo
========

Crear el proyecto en drupal.org
1. Ir a https://www.drupal.org/project/user
2. Crear en el link "Add a new project"

Subir el código al repositorio oficial de drupal
```bash
mkdir total_visitor_counter
cd total_visitor_counter
git init
git checkout -b 1.0.x
echo "Total visitor counter" > README.txt
git add README.txt
git commit -m "Initial commit."
git remote add origin git@git.drupal.org:project/total_visitor_counter.git
git push origin 1.0.x
```



