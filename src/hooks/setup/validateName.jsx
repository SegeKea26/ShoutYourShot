export function validateName(raw) {
    const name = (raw || '').trim();

    if (name.length < 1) return 'Name must be at least 1 character.';
    if (name.length > 16) return 'Name must be at most 16 characters.';

    const ok = /^[A-Za-z0-9 '-]+$/.test(name);
    if (!ok) return 'Name contains invalid characters.';

    return null;
}

export default validateName
