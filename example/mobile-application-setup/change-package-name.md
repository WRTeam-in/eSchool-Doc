---
sidebar_position: 2
---

# Change Package Name

1. Unzip the downloaded code. After unzipping you will have e-School SaaS - Flutter Code zip folder. Unzip that folder and open it in Android Studio or Visual Studio Code.

2. Open IDE terminal, go to your project path and execute command:
   ```bash
   flutter pub get
   ```

3. If you are running this app for iOS then run these following commands in terminal:
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. Change package name of Android app  
   Execute this command in your terminal:
   ```bash
   flutter pub run change_app_package_name:main your_new_package_name
   ```

   ![e-School SaaS](../../static/images/installation/app/changePackageName.png)

5. Change package name of iOS app  
   Open iOS folder of this project in Xcode. Go Select Runner->Targets->General->Identity and enter new package name in Build Identifier.

   ![e-School SaaS](../../static/images/installation/app/changePackageName1.png) 