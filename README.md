Este es un nuevo [**React Native**](https://reactnative.dev) proyecto, creado usando [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Primeros pasos

> **Nota**: Asegúrate de haber completado la guía [Configura tu entorno](https://reactnative.dev/docs/set-up-your-environment) antes de continuar.

## Paso 1: Iniciar Metro

Primero, debes ejecutar **Metro**, la herramienta de compilación JavaScript para React Native.

Para iniciar el servidor de desarrollo Metro, ejecuta el siguiente comando desde la raíz de tu proyecto de React Native:

```sh
# Usando npm
npm start

# O usando Yarn
yarn start
```

## Paso 2: Compilar y ejecutar tu app

Con Metro en ejecución, abre una nueva terminal/ventana desde la raíz de tu proyecto de React Native y usa uno de los siguientes comandos para compilar y ejecutar tu app en Android o iOS:

### Android

```sh
# Usando npm
npm run android

# O usando Yarn
yarn android
```

### iOS

Para iOS, recuerda instalar las dependencias de CocoaPods (esto solo es necesario la primera vez que clonas el proyecto o después de actualizar dependencias nativas).

La primera vez que creas un proyecto nuevo, ejecuta Bundler (Ruby) para instalar CocoaPods:

```sh
bundle install
```

Luego, y cada vez que actualices tus dependencias nativas, ejecuta:

```sh
bundle exec pod install
```

Para más información, visita la [guía de inicio de CocoaPods](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Usando npm
npm run ios

# O usando Yarn
yarn ios
```

Si todo está configurado correctamente, deberías ver tu nueva app ejecutándose en el emulador de Android, el simulador de iOS o en tu dispositivo conectado.

Esta es una forma de ejecutar la app — también puedes compilarla directamente desde Android Studio o Xcode.

## Paso 3: Modifica tu app

Ahora que has ejecutado la app con éxito, ¡hagamos cambios!

Abre `App.tsx` en tu editor de texto favorito y realiza algunos cambios. Al guardar, tu app se actualizará automáticamente y reflejará estos cambios — esto es posible gracias a [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

Cuando quieras recargar forzosamente, por ejemplo para reiniciar el estado de tu app, puedes realizar una recarga completa:

- **Android**: Presiona la tecla <kbd>R</kbd> dos veces o selecciona **"Reload"** desde el **Dev Menu**, accesible con <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) o <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Presiona <kbd>R</kbd> en el simulador de iOS.

## ¡Felicidades! :tada:

Has ejecutado y modificado con éxito tu app de React Native. :partying_face:

### ¿Y ahora qué?

- Si quieres agregar este nuevo código de React Native a una aplicación existente, consulta la [guía de integración](https://reactnative.dev/docs/integration-with-existing-apps).
- Si quieres aprender más sobre React Native, consulta la [documentación](https://reactnative.dev/docs/getting-started).

# Solución de problemas

Si tienes problemas para que los pasos anteriores funcionen, consulta la página de [Solución de problemas](https://reactnative.dev/docs/troubleshooting).

# Aprende más

Para aprender más sobre React Native, consulta los siguientes recursos:

- [React Native Website](https://reactnative.dev) - más información sobre React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - una **visión general** de React Native y cómo configurar tu entorno.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - un **recorrido guiado** por los **conceptos básicos** de React Native.
- [Blog](https://reactnative.dev/blog) - lee las últimas entradas del **blog** oficial de React Native.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - el repositorio de código abierto de React Native en GitHub.
