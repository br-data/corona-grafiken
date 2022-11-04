# Corona-Grafiken

Jeden Tag gibt es neue Corona-Zahlen und Statistiken. Mit dieser Web-Anwendung können die wichtigsten Corona-Grafiken einfach im Browser erstellt werden. Die verschieden Grafiken können in verschiedenen Formaten (Instagram, Twitter, BR24-Artikel) angezeigt und als SVG- oder PNG-Datei exportiert werden.

Anwendung: <https://interaktiv.br.de/corona-grafiken/>

## Verwendung

1. Repository klonen `git clone https://...`
2. Erforderliche Module installieren `npm install`
3. Entwicklungsserver starten `npm start`
4. Projekt bauen mit `npm run build`

Um die Module installieren und die Entwicklerwerkzeuge nutzen zu können, muss vorher die JavaScript-Runtime [Node.js](https://nodejs.org/en/download/) installiert werden.

## Diagramme

Welche Diagramme verfügbar sind, kann in [src/config/charts.ts](src/config/charts.ts) konfiguriert werden.

Beispiel für ein Balkendiagramm der Corona-Neuinfektionen in Bayern:

```javascript
{
  id: "bavaria-cases-chart",
  name: "Bayern: Neuinfektionen",
  title: "Neue Corona-Fälle in Bayern",
  description: "Entwicklung der Neuinfektionen nach Erkrankungsdatum",
  type: "bar-chart",
  hasAnnotation: false,
  dataSource: "Robert Koch-Institut, BR-Analyse",
  dataHasDate: true,
  data: [
    {
      key: "cases",
      filetype: "json",
      url:
        "https://corona-deutschland-api.interaktiv.br.de/query?startDate=${startDate}&endDate=${endDate}&dateField=Refdatum&newCases=true&group=Bundesland&bundesland=Bayern",
    },
  ],
}
```

Die `id` für jedes Diagramm muss einzigartig sein und wird auch als Dateiname verwendet, wenn das Diagramm heruntergeladen wird.

Der `name` eines Diagramms wird ausschließlich in der Diagrammauswahl der App angezeigt und sollte kurz und prägnant sein.

`title` und `description` werden jeweils in der Kopfzeile des Diagramms angezeigt. Auch wenn beide Texte in der App überschrieben werden können, sollten sie sinnvoll gewählt sein und den Inhalt eines Diagramms möglichst gut zu beschreiben.

`type` legt fest, welche Diagramm geladen werden soll. Die finale Zuordnung zur jeweiligen Komponente erfolgt im [ChartViewer](src/views/chartViewer/ChartViewer.tsx). Dabei ist zu beachten, dass sich die Diagrammtypen in den meisten Fällen nicht beliebig austauschen lassen, da jedes Diagramm auf ein bestimmtes Datenformate zugeschnitten ist.

Manche Chart-Komponenten (z.B. `Map`) unterstützen das Attribut `hasAnnotation` und können zusätzliche Anmerkungen, Informationen oder Auswertungen anzeigen. Ist das Attribut `false` wird der entsprechende Schalter in der Menüleiste deaktiviert.

Die `dataSource` beschreibt die Datenquelle(n) und wird zusammen mit einem automatisch generierten Zeitstempel in der Fußzeile des Diagramms angezeigt.

`dataHasDate` gibt an, ob der Zeitraum der Daten angepasst werden kann. Ist der Wert dafür `false`, wird die Datumseingabe in den erweiterten Einstellung der App deaktiviert. Ein variables Datum muss jedoch von der Datenquelle unterstützt werden (siehe unten).

`data` muss eine Array mit mindestens einem Objekt sein und definiert welche Daten für ein jeweiliges Diagramm benötigt werden. Die einzelnen Datenquellen haben einen `key`, eine Dateityp `filetype`, welcher entweder `json` oder `csv` sein kann und eine `url`. Die URL kann die Template-String `${startDate}` und `${endDate}` enthalten, über die der Zeitraum der Daten verändert werden kann. Das jeweilige Datum wird dann als ISO-String, zum Beispiel `2021-03-22` in der URL an der entsprechenden Stelle eingefügt. Das Laden der Daten erfolgt in einem eigenen Hook [useMultiFetch](src/utils/useMultiFetch.ts).

## Formate

Die verschiedenen Formate in der die Grafik bereitgestellt werden kann, können in der Datei [src/config/formats.ts](src/config/formats.ts) konfiguriert werden.

Beispiel Instagram:

```javascript
{
  id: "instagram-1-1",
  name: "Instagram (1:1)",
  width: 540,
  height: 540,
  scalingFactor: 1,
}
```

Die `id` eines Formats muss einzigartig sein. Der `name` gibt, an wie ein Format in der Formatauswahl der App heißen soll.

Die `width` und `height` eines Formats geben an, in welcher Größe die Diagramme angezeigt werden sollen. Die tatsächlich Auflösung beim PNG-Export ist jedoch jeweils doppelt so hoch (1080 x 1080), um den Anforderungen der jeweiligen Plattform zu genügen.

Der initiale `scalingFactor` eines Formats beeinflusst sowohl die Schrift- als auch die Logo- und Diagrammgröße. Als Faustregel kann man sagen, dass bei kleineren Formaten meist ein kleinerer Skalierungsfaktor sinnvoll ist.

## Farben

Alle Farben der App (`appColors`) und der Diagramme (`chartColors`) können in der Datei [src/config/colors.ts](src/config/colors.ts) verändert werden. Die Farbgebung, zumindest der Diagramm, orientiert sich weitestgehend am BR24-Styleguide (`ciColors`). Außerdem kann hier die Farbskala der Karte (`getMapColor`) verändert werden.

## App

Die App-Konfiguration in [src/config/app.json](src/config/app.json) enthält verschiedene Variablen, welche dazu genutzt werden die [Meta-Daten](src/index.ejs) und das [Manifest](src/manifest.json) der Web-Anwendung zu befüllen. Dies geschieht automatisch im [Webpack-Build](webpack.config.js).

## Diagramme entwickeln

Die Diagramme sind, wie der Rest der Anwendung auch, als React-Komponenten geschrieben. Zudem verwenden die Diagramme [D3.js](https://d3js.org/), um bestimmte Berechnungen und das Zeichnen von komplexen SVG-Pfaden zu erleichtern.

Das Erstellen von neuen Diagrammen ist relativ einfach, da es für viele Bestandteile eines Diagramms schon fertige Komponenten gibt. Grundgerüst, Hintergrund, Legende und die Kopf- und Fußzeile können einfach aus [src/components/charts/partials](src/components/charts/partials) importiert werden.

Beispiel für den Aufbau eines einfachen Diagramms:

```xml
<ChartSvg>
  <ChartBackground />
  <ChartAxisBottom />
  <ChartAxisGrid />
  <ChartGroup />
  <ChartHeader />
  <ChartLegend>
    <ChartKey />
  </ChartLegend>
  <ChartFooter />
  <ChartLogo />
</ChartSvg
```

Meistens ist es sinnvoll das eigentliche Diagramm, also die die Balken, Linien oder etwa eine Karte jeweils in einer SVG-Gruppe `<ChartGroup />` zu verpacken.

Alle bestehenden Diagramme finden sich in [src/components/charts](src/components/charts).

## Deployment

Die Anwendung wird automatisch mit Github Action gebaut und über die Google Cloud ausgeliefert. Jeder Commit auf den `develop` oder `live`-Branch des Repositories startet einen neuen Build. Statische Builds (`isWebsite=true`) werden automatisch über folgende URLs ausgeliefert:

- **live:** `https://interaktiv.br.de/${repoName}`
- **develop:** `https://interaktiv.brdata-dev.de/${repoName}`

Das Deployment wird in der Datei `config.yaml` konfiguriert. Die Konfiguration für den Github-Workflow in `.github/workflow` sollte nicht angefasst werden. Für mehr Informationen, siehe [br-data/cloud-deploy-template](https://github.com/br-data/cloud-deploy-template).

## Verbesserungen

- Status-API integrieren
- Settings in Komponente zusammenfassen
- `useMultiFetch` in React HOC umwandeln
- Code-Splitting mit Lazy-Load
