# Corona-Grafiken

Jeden Tag gibt es neue Corona-Zahlen und Statistiken. Mit dieser Web-Anwendung können die wichtigsten Corona-Grafiken einfach im Browser erstellt werden. Die verschieden Grafiken können in verschiedenen Formaten (Instagram, Twitter, BR24-Artikel) angezeigt und als SVG- oder PNG-Datei exportiert werden.

Anwendung: <https://interaktiv.br.de/corona-grafiken>

## Verwendung

1. Repository klonen `git clone https://...`
2. Erforderliche Module installieren `npm install`
3. Entwicklungsserver starten `npm start`
4. Projekt bauen mit `npm run build`

Um die Module installieren und die Entwicklerwerkzeuge nutzen zu können, muss vorher die JavaScript-Runtime [Node.js](https://nodejs.org/en/download/) installiert werden.

## App

`src/config/app`

## Diagramme

`src/config/charts`

## Formate

`src/config/formats`

## Farben

`src/config/colors`

## Deployment

Die Anwendung wird automatisch mit Github Action gebaut und über die Google Cloud ausgeliefert. Jeder Commit auf den `develop` oder `live`-Branch des Repositories startet einen neuen Build. Statische Builds (`isWebsite=true`) werden automatisch über folgende URLs ausgeliefert:

- **live:** `https://interaktiv.br.de/${repoName}`
- **develop:** `https://interaktiv.brdata-dev.de/${repoName}`

Das Deployment wird in der Datei `config.yaml` konfiguriert. Die Konfiguration für den Github-Workflow in `.github/workflow` sollte nicht angefasst werden. Für mehr Informationen, siehe [br-data/cloud-deploy-template](https://github.com/br-data/cloud-deploy-template).

## Verbesserungen

- Anzahl der Achsenlabels programmatisch bestimmen
- Überschrift und Beschreibung editierbar machen
- Karten automatisch annotieren
