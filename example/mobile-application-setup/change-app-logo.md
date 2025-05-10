---
sidebar_position: 5
---

# Change App Logo

## Add Logo Manually

For Android, open `android > app > src > main > res` and add here your logo according to device screen size

![e-School SaaS](../../static/images/installation/app/androidAppIcon.png)

For iOS open `ios > Runner > Assets.xcassets > AppIcon.appiconset` here and add your logo according to different size.

![e-School SaaS](../../static/images/installation/app/iosAppIcon.png)

## Generate Logo Files With Package

1. Add your logo file in `assets/images` folder

2. Add it's path and filename in `pubspec.yaml` file under flutter_launcher_icons configurations

3. Run this command to generate the ic_launcher files for both Android and iOS:
   ```bash
   flutter pub run flutter_launcher_icons
   ```

![e-School SaaS](../../static/images/installation/app/generateAppLogo.png) 