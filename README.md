# Aplicacion en nodejs, express, vue, html, bootstrap para encontrar el nombre de mi bebe

Ejecutar para instalar las librerías

```
npm install
```

## Pasos para convertir archivo a json

Levantar Docker
```
docker run --rm \
--name postgresdocker \
-e POSTGRES_DB=<<NAMEBD>> \
-e POSTGRES_USER=<<USER>> \
-e POSTGRES_PASSWORD=<<PASS>> \
-v /var/www/html/Deployment/dataPostgres:/var/lib/postgresql/data \
-p 5432:5432 \
-d postgres
```

Copiar archivo al Docker
```
docker cp names.text postgresdocker:/tmp/
```

Entrar al docker y acceder a la BD

```
docker exec -it postgresdocker bash
psql -d <<NAMEBD>> -U <<USER>>
```

Creacion tablas

```
CREATE TABLE public.names2 (
	"name" varchar(50) NOT NULL
);

CREATE TABLE public.names (
	id serial NOT NULL,
	"name" varchar(50) NULL,
	estado bool NULL DEFAULT false
);
```

Copiar archivo 
```
copy names2 TO '/tmp/names.text';
```

Generar nueva tabla con estado 
```
INSERT INTO name(name, estado) SELECT distinct(initcap(lower(trim(name)))) as name, true FROM names2 WHERE name !='' AND  name !=''  AND name IS NOT NULL ORDER BY name ASC
```

De tabla a json
```
copy (SELECT array_to_json(array_agg(row_to_json (n))) FROM (SELECT * FROM names) n) TO '/tmp/names2.json';
```