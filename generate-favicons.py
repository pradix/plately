#!/usr/bin/env python3
"""
Generate Plately favicon files from SVG

Usage:
    pip install cairosvg pillow
    python generate-favicons.py
"""

import os
import sys
from pathlib import Path

def generate_favicons():
    """Generate favicon PNG files from SVG source"""

    svg_path = Path("assets/favicon.svg")

    if not svg_path.exists():
        print(f"❌ Error: {svg_path} not found")
        return False

    try:
        import cairosvg
        from PIL import Image
    except ImportError:
        print("❌ Required packages missing. Install with:")
        print("   pip install cairosvg pillow")
        return False

    try:
        # Sizes needed for different contexts
        favicon_sizes = [
            (16, "assets/favicon-16x16.png"),
            (32, "assets/favicon-32x32.png"),
            (64, "assets/favicon.png"),
            (180, "assets/apple-touch-icon.png"),
            (192, "assets/icon-192.png"),
            (512, "assets/icon-512.png"),
        ]

        for size, output_path in favicon_sizes:
            print(f"📝 Generating {size}x{size} → {output_path}")
            cairosvg.svg2png(
                url=str(svg_path),
                write_to=output_path,
                output_width=size,
                output_height=size
            )

        # Also generate web manifest icons
        print(f"📝 Updating Web App Manifest...")
        manifest = {
            "name": "Plately",
            "short_name": "Plately",
            "description": "Sla recepten op, kook ze, hou ervan",
            "start_url": "/",
            "display": "standalone",
            "orientation": "portrait",
            "theme_color": "#8da485",
            "background_color": "#fbf7f1",
            "scope": "/",
            "icons": [
                {
                    "src": "/assets/icon-192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any"
                },
                {
                    "src": "/assets/icon-512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any"
                },
                {
                    "src": "/assets/icon-192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/assets/icon-512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                }
            ],
            "categories": ["food"],
            "screenshots": [
                {
                    "src": "/assets/screenshot-1.png",
                    "sizes": "540x720",
                    "type": "image/png"
                },
                {
                    "src": "/assets/screenshot-2.png",
                    "sizes": "540x720",
                    "type": "image/png"
                }
            ]
        }

        import json
        with open("assets/manifest.json", "w") as f:
            json.dump(manifest, f, indent=2)

        print("\n✅ All favicons generated successfully!")
        print("\n📋 Generated files:")
        for _, path in favicon_sizes:
            if os.path.exists(path):
                size_kb = os.path.getsize(path) / 1024
                print(f"   ✓ {path} ({size_kb:.1f}KB)")

        return True

    except Exception as e:
        print(f"❌ Error generating favicons: {e}")
        return False

if __name__ == "__main__":
    success = generate_favicons()
    sys.exit(0 if success else 1)
