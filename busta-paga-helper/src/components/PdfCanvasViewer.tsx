'use client'

import { use, useEffect, useRef, useState } from 'react'

interface Props {
  file: File | null
  showMeanings: Function
}

interface Highlight {
  page: number
  x: number
  y: number
  width: number
  height: number
  text: string
}

export default function PdfCanvasViewer({ file,showMeanings }: Props) {
  const [numPages, setNumPages] = useState<number>(0)
  const [highlight, setHighlight] = useState<Highlight | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if (highlight && highlight.text)
        showMeanings(highlight.text)

  }, [highlight])

  useEffect(() => {
    if (!file || !containerRef.current) return

    const renderPDF = async () => {
      const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist')

      GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString()

      const url = URL.createObjectURL(file)

      try {
        const pdf = await getDocument(url).promise
        setNumPages(pdf.numPages)

        const container = containerRef.current!
        container.innerHTML = ''

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum)
          const scale = 1.5
          const viewport = page.getViewport({ scale })

          // --- Main canvas ---
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')!
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.cursor = 'pointer'
          canvas.style.position = 'absolute'
          canvas.style.left = '0'
          canvas.style.top = '0'

          // --- Highlight canvas ---
          const highlightCanvas = document.createElement('canvas')
          const hCtx = highlightCanvas.getContext('2d')!
          highlightCanvas.width = viewport.width
          highlightCanvas.height = viewport.height
          highlightCanvas.style.position = 'absolute'
          highlightCanvas.style.left = '0'
          highlightCanvas.style.top = '0'
          highlightCanvas.style.pointerEvents = 'none'

          // --- Wrapper ---
          const wrapper = document.createElement('div')
          wrapper.style.position = 'relative'
          wrapper.style.width = `${viewport.width}px`
          wrapper.style.height = `${viewport.height}px`
          wrapper.appendChild(canvas)
          wrapper.appendChild(highlightCanvas)
          container.appendChild(wrapper)

          canvas.addEventListener('click', async (e) => {
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const [pdfX, pdfY] = [
              x / scale,
              (canvas.height - y) / scale,
            ]

            const textContent = await page.getTextContent()

            const nearby = (textContent.items as any[])
              .map((item: any) => {
                const [tx, ty] = [item.transform[4], item.transform[5]]
                const distance = Math.hypot(tx - pdfX, ty - pdfY)
                return {
                  text: item.str,
                  x: tx,
                  y: ty,
                  width: item.width ,
                  height: item.height || 10,
                  distance,
                }
              })
              .filter((d) => d.text.trim().length > 0)
              .sort((a, b) => a.distance - b.distance)

            if (nearby.length > 0) {
              const best = nearby[0]
              setHighlight({
                page: pageNum,
                text: best.text,
                x: best.x * scale,
                y: (viewport.height - best.y * scale),
                width: best.width * scale,
                height: best.height * scale,
              })
            }
          })

          await page.render({ canvasContext: context, viewport }).promise
        }
      } catch (err) {
        console.error('Errore caricamento PDF:', err)
      } finally {
        URL.revokeObjectURL(url)
      }
    }

    renderPDF()
  }, [file])

  // Aggiorna l’highlight visuale
  useEffect(() => {
    if (!containerRef.current || !highlight) return

    const wrappers = containerRef.current.querySelectorAll('div[style*="relative"]')
    const pageIndex = highlight.page - 1
    const wrapper = wrappers[pageIndex]
    if (!wrapper) return

    const highlightCanvas = wrapper.querySelector('canvas:nth-child(2)') as HTMLCanvasElement
    const hCtx = highlightCanvas.getContext('2d')!
    hCtx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height)

    hCtx.fillStyle = 'rgba(255, 0, 0, 0.3)'
    hCtx.strokeStyle = 'red'
    hCtx.lineWidth = 2

    hCtx.fillRect(highlight.x, highlight.y - highlight.height, highlight.width, highlight.height)
    hCtx.strokeRect(highlight.x, highlight.y - highlight.height, highlight.width, highlight.height)
  }, [highlight])

  return (
    <div>
      {!file && <p style={{ color: 'gray' }}>Nessun file selezionato.</p>}
      <div
        key={file?.name} // Forza il reset del componente quando il file cambia
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '1rem',
        }}
      />
      {highlight && (
        <div style={{ marginTop: '1rem', padding: '8px', background: '#eef', borderRadius: '8px' }}>
          <strong>Testo evidenziato (pagina {highlight.page}):</strong><br />
          <code>{highlight.text}</code>
        </div>
      )}
    </div>
  )
}

