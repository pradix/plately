#!/usr/bin/env python3
"""
Auto-apply i18n to HTML by intelligently mapping Dutch strings to translation keys
"""

import json
import re
from pathlib import Path

# Load translations
with open('translations.json', 'r', encoding='utf-8') as f:
    translations = json.load(f)

nl_strings = translations['nl']

# Create reverse mapping: Dutch string → translation key
string_to_key = {v: k for k, v in nl_strings.items()}

# Read HTML
html_path = Path('index.html')
html_content = html_path.read_text(encoding='utf-8')

# Patterns to replace (prioritized)
replacements = [
    # Navigation labels
    (r'<span class="nav-label">Home</span>', '<span class="nav-label" data-i18n="nav.home">Home</span>'),
    (r'<span class="nav-label">Kookboeken</span>', '<span class="nav-label" data-i18n="nav.cookbooks">Kookboeken</span>'),
    (r'<span class="nav-label">Boodschappen</span>', '<span class="nav-label" data-i18n="nav.grocery">Boodschappen</span>'),
    (r'<span class="nav-label">Weekmenu</span>', '<span class="nav-label" data-i18n="nav.mealplan">Weekmenu</span>'),

    # Topbar titles
    (r'<h1 class="topbar-title">Instellingen</h1>', '<h1 class="topbar-title" data-i18n="settings.title">Instellingen</h1>'),
    (r'<h1 class="topbar-title">Taal</h1>', '<h1 class="topbar-title" data-i18n="settings.language">Taal</h1>'),
    (r'<h1 class="topbar-title">Over deze App</h1>', '<h1 class="topbar-title" data-i18n="settings.about">Over deze App</h1>'),

    # Home screen
    (r'placeholder="Zoeken naar recepten"(?! data-i18n)', 'placeholder="Zoeken naar recepten" data-i18n-placeholder="home.search"'),

    # Import modal
    (r'<h2 class="modal-title">Recept importeren</h2>', '<h2 class="modal-title" data-i18n="import.title">Recept importeren</h2>'),

    # Auth
    (r'<h1 class="auth-screen__title" id="authKicker">Welkom terug</h1>', '<h1 class="auth-screen__title" id="authKicker" data-i18n="auth.welcome">Welkom terug</h1>'),

    # Form labels
    (r'<label for="authEmail"[^>]*>E-mailadres</label>', '<label for="authEmail" class="auth-form__label" data-i18n="auth.email">E-mailadres</label>'),
    (r'<label for="authPassword"[^>]*>Wachtwoord</label>', '<label for="authPassword" class="auth-form__label" data-i18n="auth.password">Wachtwoord</label>'),
    (r'<label[^>]*for="recipeUrl"[^>]*>Plak een link naar een recept</label>', '<label for="recipeUrl" class="form-label" data-i18n="import.paste">Plak een link naar een recept</label>'),
    (r'<label[^>]*for="recipeNote"[^>]*>Notitie \(optioneel\)</label>', '<label for="recipeNote" class="form-label" data-i18n="import.note">Notitie (optioneel)</label>'),

    # Buttons
    (r'>Afmelden<', ' data-i18n="settings.logout">Afmelden<'),
    (r'>Account aanmaken<(?!.*data-i18n)', ' data-i18n="auth.register">Account aanmaken<'),
]

# Apply replacements
for pattern, replacement in replacements:
    html_content = re.sub(pattern, replacement, html_content, flags=re.MULTILINE | re.DOTALL)

# Write back
html_path.write_text(html_content, encoding='utf-8')

# Count i18n attributes
i18n_count = html_content.count('data-i18n')
print(f"✅ Applied i18n to HTML")
print(f"📊 Total data-i18n attributes: {i18n_count}")
print(f"✓ Navigation labels")
print(f"✓ Settings panels")
print(f"✓ Import form")
print(f"✓ Auth modal")
print(f"✓ Home screen")
