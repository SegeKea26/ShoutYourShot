import {
    MULTIPLIER_WORDS,
    ALL_NUMBER_WORDS,
    BULL_WORDS,
    ACTION_WORDS
} from './voiceWordMappings'

/**
 * Parse voice transcript into game command
 * @param {string} transcript - Raw speech transcript
 * @returns {object|null} - { type: 'throw'|'miss'|'undo', score?, multiplier? }
 */
export function parseVoiceCommand(transcript) {
    if (!transcript) return null

    const text = transcript.toLowerCase().trim()
    const words = text.split(/\s+/)

    // Debug: log what we're receiving
    console.log('[Voice] Transcript:', text, '| Words:', words)

    // Check for action commands first (check each word)
    const action = parseAction(words, text)
    if (action) {
        console.log('[Voice] Action detected:', action)
        return action
    }

    // Check for bull (25/50) - ignores multiplier
    const bull = parseBull(words, text)
    if (bull) return bull

    // Parse multiplier + score
    return parseScore(words)
}

/**
 * Check for action words (miss, undo) - word-by-word check + substring fallback
 */
function parseAction(words, text) {
    // First try exact word match
    for (const word of words) {
        if (ACTION_WORDS[word]) {
            return { type: ACTION_WORDS[word] }
        }
    }

    // Fallback: check if text contains action keywords
    for (const [keyword, action] of Object.entries(ACTION_WORDS)) {
        if (text.includes(keyword)) {
            return { type: action }
        }
    }

    return null
}

/**
 * Check for bull words (25, 50)
 */
function parseBull(words, text) {
    // Check individual words first
    for (const word of words) {
        if (BULL_WORDS[word]) {
            return {
                type: 'throw',
                score: BULL_WORDS[word],
                multiplier: 1
            }
        }
    }

    // Check compound words (twenty-five, etc)
    for (const [phrase, score] of Object.entries(BULL_WORDS)) {
        if (phrase.includes('-') && text.includes(phrase)) {
            return {
                type: 'throw',
                score: score,
                multiplier: 1
            }
        }
    }

    return null
}

/**
 * Parse multiplier + number score
 * Only takes the LAST valid number word to prevent "een een" -> 11
 */
function parseScore(words) {
    let multiplier = 1
    let score = null

    // Process words - take the LAST multiplier and LAST number found
    for (const word of words) {
        // Check multiplier
        if (MULTIPLIER_WORDS[word]) {
            multiplier = MULTIPLIER_WORDS[word]
        }

        // Check number word (only 1-20 valid in darts)
        if (ALL_NUMBER_WORDS[word]) {
            score = ALL_NUMBER_WORDS[word]
        }

        // Check raw number (only 1-20 valid)
        const num = parseInt(word, 10)
        if (!isNaN(num) && num >= 1 && num <= 20) {
            score = num
        }
    }

    // Only return if we have a valid dart score
    if (score !== null && score >= 1 && score <= 20) {
        return {
            type: 'throw',
            score: score,
            multiplier: multiplier
        }
    }

    return null
}
