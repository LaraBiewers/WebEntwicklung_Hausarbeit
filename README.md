# Web-Entwicklung Hausarbeit

Verwendung von **MongoDB** zur persistierung der Ressourcen.

Alle nötigen Anforderungen sind unter ./Informationen/HausarbeitWS2324.pdf zu finden.

## Abgabeinformationen

Studienleistung -> 02.01.2024 0:00 Uhr
Endabgabe -> 26.02.2024 0:00 Uhr

Abgabe erfolgt über StudIP
+ Bereinigtes Projekt als ZIP-Datei
+ Dateinamen mit lesbaren Namen der Teilnehmer versehen

## NOTIZEN

### package.json

main verweist auf Einstiegspunkt in Browseranwendung -> später bundle.js (esbuild)

*FÜR PV:* <br>
npm install && npm run initdb && npm run build && npm start \<Portnummer nach Wunsch\><br>
(Server schließen mit Strg+c)

### Datenbank und Server

https://www.mongodb.com/docs/manual/administration/install-community/

#### Ausführen unter WSL2

Start MongoDB: sudo systemctl start mongod <br>
Verify that MongoDB has started successfully: sudo systemctl status mongod <br>
Stop MongoDB: sudo systemctl stop mongod <br>
Restart MongoDB: sudo systemctl restart mongod <br>
Begin using MongoDB: mongosh <br>

#### Extension MongoDB

Läuft am besten wenn man als Terminal "git bash" nutzt.