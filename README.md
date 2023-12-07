# Web-Entwicklung Hausarbeit

Verwendung von **MongoDB** zur persistierung der Ressourcen.

Alle nötigen Anforderungen sind unter ./Informationen/HausarbeitWS2324.pdf zu finden.

## Deadlines

Studienleistung -> 02.01.2024 0:00 Uhr
Endabgabe -> 26.02.2024 0:00 Uhr

Abgabe erfolgt über StudIP
+ Bereinigtes Projekt als ZIP-Datei
+ Dateinamen mit lesbaren Namen der Teilnehmer versehen

## NOTIZEN

### package.json

main verweist auf Einstiegspunkt in Browseranwendung -> später bundle.js (esbuild)

lesshint (lesshint-reporter-stylish) wirft "moderate und schwere Fehler" -> großer Einfluss auf das Projekt?

npm audit fix --force bricht ab -> unknown git error
lesshint@1.5.2 statt "^6.3.7" installieren?

### .less Dateien

Um eine .less-Datei in eine HTML-Datei einzubinden, musst sie zunächst in CSS kompiliert werden.