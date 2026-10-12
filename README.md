# Grade Calculator

Calculadora de notas ponderadas para [Obsidian](https://obsidian.md). Escribes tus evaluaciones en las propiedades de la nota de cada materia y el plugin calcula tu promedio y **la nota que necesitas en lo que falta para aprobar**.

*English: weighted grade calculator for Obsidian. Put your assessments in a note's properties and get your current average plus the grade you still need to pass. Property names work in English and Spanish.*

## Uso

En la nota de la materia, agrega esto a las propiedades (YAML al inicio de la nota):

```yaml
---
materia: Programación II
escala: 100        # opcional, por defecto 100
aprobacion: 60     # opcional, por defecto 60
evaluaciones:
  - nombre: Parcial 1
    peso: 30
    nota: 50
  - nombre: Parcial 2
    peso: 30       # sin nota = pendiente
  - nombre: Obligatorio
    peso: 40
    nota: 70
---
```

Y en el cuerpo de la nota, un bloque de código:

````
```promedio
```
````

El plugin dibuja la tabla y calcula, con el ejemplo:

| | |
|---|---|
| Acumulado | 43 |
| Promedio de lo evaluado | 61,4 |
| Máximo posible | 73 |
| Necesitas en lo que falta | **56,7** |
| Estado | En juego |

Cuando se completa `nota` en una evaluación, la tabla se actualiza sola.

### Panel con todas tus materias

En cualquier nota:

````
```promedio-general
```
````

Muestra una fila por cada nota que tenga `evaluaciones`, con su promedio, la nota necesaria y el estado. Cada materia es un enlace a su nota.

### Comando

**Insertar plantilla de materia** agrega las propiedades base a la nota abierta y el bloque `promedio`.

## Cómo se calcula

- Cada evaluación aporta `peso/total × nota` a la nota final. Los pesos se normalizan por su suma, así que no hace falta que den exactamente 100 (el plugin avisa si no lo hacen).
- **Necesitas** = `(aprobación − acumulado) / (peso pendiente / peso total)`.
- Estados: *asegurada* (ya apruebas aunque saques 0 en lo que falta), *en juego*, *fuera de alcance* (ni con nota máxima alcanza), *aprobada* / *no aprobada* (todo evaluado).
- Se aceptan decimales con coma (`8,5`) y pesos con `%` (`30%`).

## Nombres de propiedades

| Español | English |
|---|---|
| `materia` | `course` |
| `escala` | `scale` |
| `aprobacion` | `passing` |
| `evaluaciones` | `evaluations` |
| `nombre` / `peso` / `nota` | `name` / `weight` / `grade` |

Los bloques son `promedio` / `grades` y `promedio-general` / `grades-overview`. La interfaz sale en español/inglés según el idioma de Obsidian.

## Ajustes

Escala máxima y nota de aprobación por defecto (cada nota puede sobrescribirlas con `escala` y `aprobacion`) y decimales mostrados.

## Instalación manual

1. `npm install && npm run build`
2. Copiar `main.js`, `manifest.json` y `styles.css` a `<tu vault>/.obsidian/plugins/grade-planner/`
3. Activa el plugin en *Ajustes → Plugins de la comunidad*.

## Desarrollo

```bash
npm install
npm run dev     # compila en modo watch
npm test        # tests de la lógica de cálculo
```

La lógica de cálculo vive en `src/core.ts` y **no depende de Obsidian**, por eso se prueba con tests unitarios (`src/core.test.ts`). `src/render.ts` dibuja las tablas y `src/main.ts` conecta todo con Obsidian.

Issues y pull requests son bienvenidos.

## Licencia

MIT
