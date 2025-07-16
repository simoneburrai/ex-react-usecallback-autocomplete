# EX - Autocomplete

## Descrizione

Questo esercizio consiste nell’implementare un campo di ricerca con suggerimenti automatici (autocomplete), simile a quello di Amazon. I suggerimenti vengono ottenuti da un’API locale e aggiornati dinamicamente mentre l’utente digita. Per evitare chiamate API eccessive, si utilizza una funzione di debounce.

---

## Milestone 1: Campo di ricerca e suggerimenti

- Creare un campo di input (`<input type="text">`).
- Effettuare una chiamata API a:
  ```
  http://localhost:3333/products?search=[query]
  ```
- Mostrare i risultati API in una tendina sotto l’input.
- Se il campo è vuoto, nascondere la tendina.

**Obiettivo:** mostrare suggerimenti dinamici in base alla ricerca dell’utente.

---

## Milestone 2: Debounce per ottimizzare la ricerca

- Implementare una funzione di debounce (es. 300ms).
- La chiamata API avviene solo dopo che l’utente smette di digitare per un breve periodo.
- Ridurre il numero di chiamate API.

**Obiettivo:** migliorare le prestazioni ottimizzando le chiamate API.
