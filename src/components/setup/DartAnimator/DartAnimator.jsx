import './DartAnimator.css'

import { createPortal } from 'react-dom'
import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'

function DartAnimator({ show }) {
    const dartRef = useRef(null)
    const wrapperRef = useRef(null)
    const [visible, setVisible] = useState(show)
    const [position, setPosition] = useState({ top: 0, right: 0 })

    useLayoutEffect(() => {
        if (!wrapperRef.current) return

        const updatePosition = () => {
            const placeholder = wrapperRef.current
            const setupOption = placeholder?.closest('.setup-option')
            if (setupOption) {
                const rect = setupOption.getBoundingClientRect()
                setPosition({
                    top: rect.top,
                    right: window.innerWidth - rect.right - 8
                })
            }
        }

        updatePosition()
        window.addEventListener('resize', updatePosition)
        window.addEventListener('scroll', updatePosition)

        return () => {
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('scroll', updatePosition)
        }
    }, [visible])

    useEffect(() => {
        if (show && !visible) {
            setVisible(true)
            return
        }

        if (!show && visible) {
            gsap.killTweensOf(dartRef.current)
            gsap.to(dartRef.current, {
                y: '200%',
                rotation: 90,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.in',
                onComplete: () => setVisible(false),
            })
        }
    }, [show, visible])

    useEffect(() => {
        if (visible && show && dartRef.current) {
            gsap.killTweensOf(dartRef.current)
            gsap.fromTo(
                dartRef.current,
                { x: '120%', y: '-20%', rotation: 30, opacity: 0, scale: 0.8 },
                { x: '25%', y: '0%', rotation: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
            )
        }
    }, [visible, show])

    if (!visible) return <span ref={wrapperRef} style={{ display: 'none' }} />

    const dartElement = (
        <div
            className="dart-wrapper"
            aria-hidden
            style={{
                position: 'fixed',
                top: position.top,
                right: position.right,
                transform: 'translateY(-50%)'
            }}
        >
            <svg
                ref={dartRef}
                className="dart"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.429 56.429"
                role="img"
                aria-hidden="true"
            >
                <g>
                    <g>
                        <g>
                            <path fill="currentColor" d="M56.303,15.935l-4.24-7.632c0.621-1.147,0.469-2.538-0.465-3.472c-0.903-0.903-2.288-1.079-3.46-0.458l-7.644-4.247     c-0.391-0.218-0.877-0.149-1.192,0.167L32.044,7.55c-0.254,0.254-0.353,0.624-0.258,0.97l2.569,9.418l-5.84,5.839     c-1.005-0.081-2.043,0.229-2.774,0.961l-2.517,2.517l5.95,5.95l2.517-2.517c0.659-0.659,1.022-1.538,1.022-2.475     c0-0.112-0.022-0.22-0.032-0.33l5.809-5.81l9.42,2.569c0.087,0.023,0.175,0.035,0.263,0.035c0.262,0,0.517-0.103,0.707-0.293     l7.257-7.257C56.451,16.813,56.52,16.326,56.303,15.935z M31.691,25.739l-1-1c-0.052-0.052-0.115-0.089-0.17-0.137l5.655-5.656     c0.001-0.001,0.003-0.002,0.004-0.003L48.843,6.279c0.421-0.369,0.975-0.398,1.341-0.033c0.425,0.424,0.287,0.982,0.003,1.304     l-12.7,12.7v0.001l-5.657,5.657C31.781,25.852,31.743,25.791,31.691,25.739z" />
                            <path fill="currentColor" d="M21.917,40.463l-5.95-5.95l2.215-2.215l5.95,5.95L21.917,40.463z" />
                            <path fill="currentColor" d="M9.321,41.159c-0.659,0.659-1.022,1.538-1.022,2.476c0,0.837,0.304,1.619,0.836,2.247l-8.841,8.84     c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.45,0.293,0.706,0.293s0.512-0.098,0.707-0.293l8.841-8.84     c0.628,0.532,1.41,0.835,2.247,0.835c0.937,0,1.815-0.363,2.475-1.022l1.804-1.804l-5.95-5.95L9.321,41.159z" />
                            <path fill="currentColor" d="M25.546,36.835l-5.95-5.95l2.214-2.214l5.95,5.95L25.546,36.835z" />
                            <path fill="currentColor" d="M18.488,43.892l-5.95-5.95l2.015-2.015l5.95,5.95L18.488,43.892z" />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    )

    return (
        <>
            <span ref={wrapperRef} style={{ display: 'none' }} />
            {createPortal(dartElement, document.body)}
        </>
    )
}

export default DartAnimator

