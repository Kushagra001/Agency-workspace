import os
import re
from pathlib import Path

# Mapping of hardcoded hex/oklch classes to semantic tailwind classes
# For classes: e.g. text-[oklch(97%_0.002_265)] -> text-foreground
REPLACEMENTS = [
    (r'\[oklch\(97%_0\.002_265\)\]', 'foreground'),
    (r'\[oklch\(90%_0\.005_265\)\]', 'foreground'),
    (r'\[oklch\(92%_0\.005_265\)\]', 'foreground'),
    (r'\[oklch\(85%_0\.01_265\)\]', 'foreground/80'),
    (r'\[oklch\(82%_0\.008_265\)\]', 'foreground/80'),
    (r'\[oklch\(78%_0\.008_265\)\]', 'foreground/80'),
    (r'\[oklch\(60%_0\.01_265\)\]', 'surface-muted'),
    (r'\[oklch\(55%_0\.01_265\)\]', 'surface-muted'),
    (r'\[oklch\(50%_0\.009_265\)\]', 'surface-muted'),
    (r'\[oklch\(45%_0\.008_265\)\]', 'surface-muted'),
    (r'\[oklch\(40%_0\.007_265\)\]', 'surface-muted'),
    (r'\[oklch\(35%_0\.008_265\)\]', 'surface-muted'),
    (r'\[oklch\(31%_0\.009_265\)\]', 'surface-muted'),
    (r'\[oklch\(25%_0\.008_265\)\]', 'surface-muted'),
    (r'\[oklch\(21%_0\.008_265\)\]', 'surface-border'),
    (r'\[oklch\(18%_0\.007_265\)\]', 'surface-raised'),
    (r'\[oklch\(14\.5%_0\.007_265\)\]', 'surface-overlay'),
    (r'\[oklch\(12%_0\.006_265\)\]', 'surface-raised'),
    (r'\[oklch\(10%_0\.005_265\)\]', 'surface-base'),
    (r'\[oklch\(16%_0\.006_265/0\.6\)\]', 'surface-border'),
    
    (r'\[oklch\(44%_0\.26_289\)\]', 'brand-primary'),
    (r'\[oklch\(56%_0\.21_263\)\]', 'brand-hover'),
    (r'\[oklch\(65%_0\.18_265\)\]', 'brand-primary'),

    # Handle opacity variants like [oklch(44%_0.26_289/0.5)] -> brand-primary/50
    (r'\[oklch\(44%_0\.26_289/([0-9.]+)\)\]', lambda m: f"brand-primary/{int(float(m.group(1))*100)}"),
    (r'\[oklch\(10%_0\.005_265/([0-9.]+)\)\]', lambda m: f"surface-base/{int(float(m.group(1))*100)}"),

    # For inline SVG styles
    (r'oklch\(44% 0\.26 289\)', 'var(--color-brand-primary)'),
    (r'oklch\(56% 0\.21 263\)', 'var(--color-brand-hover)'),
    (r'oklch\(65% 0\.18 265\)', 'var(--color-brand-primary)'),
    (r'oklch\(44% 0\.26 289 / ([0-9.]+)\)', lambda m: f"color-mix(in oklch, var(--color-brand-primary) {int(float(m.group(1))*100)}%, transparent)"),
]

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content = content
        for pattern, replacement in REPLACEMENTS:
            new_content = re.sub(pattern, replacement, new_content)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

components_dir = Path("c:/Users/kusha/OneDrive/Desktop/Demo Projects Pipeline/agency-workspace/projects/01-saas-landing/src/components")
for root, _, files in os.walk(components_dir):
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            process_file(os.path.join(root, f))
