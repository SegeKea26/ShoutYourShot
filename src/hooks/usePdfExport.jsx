import { useCallback, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

/**
 * Hook for exporting an element to PDF
 * @returns {object} - { exportToPdf, isExporting }
 */
export function usePdfExport() {
    const [isExporting, setIsExporting] = useState(false)

    const exportToPdf = useCallback(async (element, filename = 'HitZone-Statistics.pdf') => {
        if (!element || isExporting) return

        setIsExporting(true)

        try {
            // Capture element as canvas
            const canvas = await html2canvas(element, {
                scale: 2, // Higher quality
                useCORS: true,
                backgroundColor: '#121212', // Match app background
                logging: false
            })

            const imgData = canvas.toDataURL('image/png')
            const imgWidth = canvas.width
            const imgHeight = canvas.height

            // Create PDF (A4 size)
            const pdf = new jsPDF({
                orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
                unit: 'px',
                format: [imgWidth, imgHeight]
            })

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
            pdf.save(filename)

            console.log('[PDF] Export successful')
        } catch (error) {
            console.error('[PDF] Export failed:', error)
        } finally {
            setIsExporting(false)
        }
    }, [isExporting])

    return { exportToPdf, isExporting }
}
