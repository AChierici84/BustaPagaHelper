'use client'

import PdfCanvasViewer from '@/components/PdfCanvasViewer'
import React, { useState, useEffect } from 'react'
import 'react-pdf/dist/Page/AnnotationLayer.css'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (file && isMounted) {
      const url = URL.createObjectURL(file)
      setFileUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setFileUrl(null)
    }
  }, [file, isMounted])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    setError(null)
    setText('')
  }

  const showMeanings = async (label: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/explain?q=' + encodeURIComponent(label))
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Errore dal server')
      }
      setText(data.text || 'Nessuna spiegazione trovata')
      setError(null)
    } catch (e: any) {
      setError(e.message || 'Errore interno')
      setText('')
    } finally {
      setLoading(false)
    }
  }

  if (!isMounted) {
    return <div style={{ padding: 20 }}>Caricamento...</div>
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        backgroundColor: '#fafafa',
        color: '#333',
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #ddd',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgb(0 0 0 / 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <h1>DUBBI SULLA TUA BUSTA PAGA? </h1>
        <label
          htmlFor="fileInput"
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            userSelect: 'none',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005bb5')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0070f3')}
        >
          Carica PDF
        </label>
        <input
          id="fileInput"
          type="file"
          accept="application/pdf,image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {loading && <span style={{ color: '#666', fontStyle: 'italic' }}>Caricamento...</span>}
        {error && <span style={{ color: 'crimson', fontWeight: '600' }}>{error}</span>}
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          gap: '1rem',
          padding: '1rem 1.5rem',
          overflow: 'hidden',
        }}
      >
        {/* PDF Preview */}
        <section
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
            overflow: 'auto',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'flex-start', // cambia da center
            alignItems: 'flex-start',     // cambia da center
          }}
        >
          {fileUrl && file?.type === 'application/pdf' ? (
            <PdfCanvasViewer file={file} showMeanings={showMeanings} />
          ) : (
            <p style={{ color: '#888' }}>Carica un file PDF per vedere l’anteprima.</p>
          )}
        </section>

        {/* Testo estratto / Spiegazione */}
        <aside
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
            overflowY: 'auto',
            padding: '1rem 1.5rem',
            fontSize: '1rem',
            lineHeight: '1.5',
            color: '#222',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: '1rem',
              fontWeight: '700',
              borderBottom: '2px solid #0070f3',
              paddingBottom: '0.3rem',
            }}
          >
            Spiegazione voce
          </h2>
          {loading ? (
            <p style={{ fontStyle: 'italic', color: '#666' }}>Caricamento spiegazione...</p>
          ) : (
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', flex: 1 }}>
              {text || 'Seleziona una parola o clicca sul PDF per ottenere una spiegazione.'}
            </pre>
          )}
          {error && <p style={{ color: 'crimson', marginTop: '1rem' }}>{error}</p>}
        </aside>
      </main>
    </div>
  )
}
