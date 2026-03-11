# BustaPagaHelper
Progetto Next.js che aiuta a mostrare una spiegazione per le label di una busta paga. 

## Per avviare

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Apri [http://localhost:3000](http://localhost:3000) col browser per vedere il risultato.

## Integrazione OpenAI

L'endpoint `src/app/api/explain/route.ts` usa OpenAI per generare ed ampliare la spiegazione.

Crea un file `.env.local` nella root del progetto con :

```bash
OPENAI_API_KEY=api_ke
# optional (default: gpt-4.1-mini)
OPENAI_MODEL=gpt-4.1-mini
```

Se `OPENAI_API_KEY` non è settata, l'app utilizza automaticamente il glossario locale.

## Esempi di utilizzo
Col mouse è possibile selezionare una voce sul pdf della busta paga. Il motore estre il testo cliccato e le voci vicine associate e
tenta di cariucarne una spiegazione, eventuialmente corroborata da esempi (anche grazie alla generazione del LLM). Nel caso non si selezioni alcuna voce valida 
(es. un numero) non viene ritornata alcuna spiegazione. Selezionare sempre la label associata.  

<img width="1839" height="815" alt="Screenshot 2026-03-11 102119" src="https://github.com/user-attachments/assets/0ec9109a-375c-46b7-95df-23c8f91f1fb6" />

<img width="1824" height="472" alt="Screenshot 2026-03-11 102142" src="https://github.com/user-attachments/assets/933c0585-cf55-45fd-9538-a38bbf4b0bd2" />

<img width="1841" height="651" alt="Screenshot 2026-03-11 102202" src="https://github.com/user-attachments/assets/0f160568-e1d8-47b7-9664-f20f2f07d1f1" />

<img width="1859" height="700" alt="Screenshot 2026-03-11 102310" src="https://github.com/user-attachments/assets/c24b2044-09e6-4c05-8c6d-924f7757af55" />

<img width="1840" height="770" alt="Screenshot 2026-03-11 102349" src="https://github.com/user-attachments/assets/44e7edba-5bf1-4a25-97ea-675234d1d70d" />

<img width="1831" height="592" alt="Screenshot 2026-03-11 102422" src="https://github.com/user-attachments/assets/ebe6513b-27cf-4c1c-9dc7-ef0b21528ff5" />
