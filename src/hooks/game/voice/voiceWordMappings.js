/**
 * Word to number mappings for voice commands (EN + NL)
 */

// Multiplier words
export const MULTIPLIER_WORDS = {
    // Double
    double: 2,
    dubbel: 2,
    dubble: 2,
    dub: 2,
    dover: 2,

    // Triple
    triple: 3,
    tripel: 3,
    tripl: 3,
    trippel: 3,
    trip: 3,
    drie: 3
}

// Number words (1-20) - English
export const NUMBER_WORDS_EN = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20
}

// Number words (1-20) - Dutch + variations
export const NUMBER_WORDS_NL = {
    // 1
    een: 1,
    één: 1,
    eén: 1,
    ene: 1,

    // 2
    twee: 2,

    // 3 - also multiplier, but works as number too
    drie: 3,

    // 4
    vier: 4,

    // 5
    vijf: 5,

    // 6
    zes: 6,

    // 7
    zeven: 7,

    // 8
    acht: 8,

    // 9
    negen: 9,

    // 10 - many variations
    tien: 10,
    tién: 10,
    tin: 10,
    tine: 10,
    teen: 10,
    tienn: 10,
    thien: 10,
    team: 10,
    t: 10,

    // 11
    elf: 11,

    // 12
    twaalf: 12,

    // 13
    dertien: 13,

    // 14
    veertien: 14,

    // 15
    vijftien: 15,

    // 16
    zestien: 16,

    // 17
    zeventien: 17,

    // 18
    achttien: 18,

    // 19
    negentien: 19,

    // 20
    twintig: 20
}

// Bull words (25 and 50)
export const BULL_WORDS = {
    'twenty-five': 25,
    'twentyfive': 25,
    vijfentwintig: 25,
    '25': 25,

    bull: 50,
    bullseye: 50,
    fifty: 50,
    vijftig: 50,
    '50': 50
}

// Action words
export const ACTION_WORDS = {
    // Miss variations - English
    miss: 'miss',
    mis: 'miss',
    mist: 'miss',
    missed: 'miss',
    missing: 'miss',
    mesh: 'miss',
    mess: 'miss',
    mass: 'miss',
    must: 'miss',
    mrs: 'miss',
    misse: 'miss',
    misses: 'miss',
    myths: 'miss',
    mitts: 'miss',
    mix: 'miss',
    mes: 'miss',

    // Miss variations - Dutch
    gemist: 'miss',
    naast: 'miss',
    nast: 'miss',
    ernaast: 'miss',
    fout: 'miss',
    niks: 'miss',
    niets: 'miss',
    nul: 'miss',

    // Undo variations - English
    undo: 'undo',
    undo: 'undo',
    undone: 'undo',
    undue: 'undo',
    unto: 'undo',
    and: 'undo',
    under: 'undo',
    ander: 'undo',
    back: 'undo',
    oops: 'undo',
    whoops: 'undo',
    cancel: 'undo',
    undul: 'undo',

    // Undo variations - Dutch
    terug: 'undo',
    ongedaan: 'undo',
    annuleer: 'undo',
    annuleren: 'undo',
    vorige: 'undo',
    wissen: 'undo'
}

// Combined number words
export const ALL_NUMBER_WORDS = {
    ...NUMBER_WORDS_EN,
    ...NUMBER_WORDS_NL
}
